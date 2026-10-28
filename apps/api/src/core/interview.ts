import { z } from "zod";
import type { LLM, Msg } from "./llm";
import { evaluatorPrompts, linaSystemPrompt, nudgePrompt } from "./prompts/index";
import {
  SessionNotFoundError,
  type Experience,
  type InterviewType,
  type Objective,
  type Session,
  type SessionStore,
} from "./sessions";

const MAX_ANSWER_WORDS = 250;

export class SessionDoneError extends Error {}

const score = z.coerce.number().min(0).max(10);
const reportSchema = z.object({
  scores: z.object({
    clarte: score,
    pertinence: score,
    exemples_concrets: score,
    structure: score,
    motivation: score,
  }),
  points_forts: z.array(z.string()),
  points_faibles: z.array(z.string()),
  conseils: z.array(z.string()),
  resume: z.string(),
  // Retour détaillé par question ; facultatif pour rester tolérant si le modèle l'omet.
  par_question: z
    .array(
      z.object({
        question: z.string(),
        ce_qui_va: z.string().default(""),
        a_ameliorer: z.string().default(""),
        exemple: z.string().default(""),
      }),
    )
    .max(30)
    .default([]),
  // Preuves citées par le modèle : vérifiées mot pour mot ensuite (voir verifyEvidence).
  preuves: z
    .array(z.object({ competence: z.string(), reponse: z.coerce.number().int(), citation: z.string() }).partial())
    .max(20)
    .default([]),
});

/** Question de Lina et réponse du candidat, reconstituées depuis la session (pas par le modèle). */
export type Exchange = { question: string; reponse: string | null };

/** Preuve de compétence dont la citation a été retrouvée telle quelle dans la réponse du candidat. */
export type Evidence = { competence: string; reponse: number; citation: string; statut: "declaration_non_verifiee" };

export type Report = Omit<z.infer<typeof reportSchema>, "preuves"> & { score_global: number; echanges: Exchange[]; preuves: Evidence[] };

/**
 * Contrôle déterministe des citations (repris d'ai-interview-platform, « verified quotes ») :
 * une preuve n'est gardée que si sa citation figure mot pour mot dans la réponse indiquée.
 * Ce sont des déclarations du candidat, pas des compétences démontrées.
 */
export function verifyEvidence(raw: unknown, exchanges: Exchange[]): Evidence[] {
  if (!Array.isArray(raw)) return [];
  const answers = exchanges.map((e) => e.reponse ?? "");
  const out: Evidence[] = [];
  for (const item of raw.slice(0, 12)) {
    if (!item || typeof item !== "object") continue;
    const { competence, reponse, citation } = item as { competence?: unknown; reponse?: unknown; citation?: unknown };
    if (typeof competence !== "string" || !competence.trim() || competence.length > 80) continue;
    if (typeof reponse !== "number" || !Number.isInteger(reponse) || reponse < 0 || reponse >= answers.length) continue;
    if (typeof citation !== "string" || citation.trim().length < 8 || citation.length > 240) continue;
    if (!answers[reponse]!.includes(citation.trim())) continue;
    if (out.some((o) => o.competence === competence.trim() && o.reponse === reponse)) continue;
    out.push({ competence: competence.trim(), reponse, citation: citation.trim(), statut: "declaration_non_verifiee" });
  }
  return out.slice(0, 6);
}

/** Paires question / réponse dans l'ordre de l'entretien (le premier message est l'ouverture). */
export function exchangesOf(s: Session): Exchange[] {
  const out: Exchange[] = [];
  const msgs = s.messages.slice(1);
  for (let i = 0; i < msgs.length; i++) {
    const m = msgs[i]!;
    if (m.role !== "assistant") continue;
    const next = msgs[i + 1];
    out.push({ question: m.content, reponse: next?.role === "user" ? next.content : null });
  }
  return out;
}

export type StartInput = {
  poste: string;
  type: InterviewType;
  locale: "fr" | "en";
  description?: string;
  objectifs: Objective[];
  experience?: Experience;
  questions?: number;
};

function truncateWords(text: string, max: number) {
  const words = text.trim().split(/\s+/);
  return words.length <= max
    ? { text: text.trim(), truncated: false }
    : { text: words.slice(0, max).join(" "), truncated: true };
}

/** Nombre de réponses réellement données par le candidat (hors message d'ouverture). */
const answersCount = (s: Session) => s.messages.filter((m) => m.role === "user").length - 1;

export class InterviewService {
  constructor(
    private llm: LLM,
    private sessions: SessionStore,
    private maxQuestions: number,
  ) {}

  private async nextQuestion(s: Session) {
    const n = s.asked + 1;
    const base: Msg[] = [{ role: "system", content: linaSystemPrompt(s, n) }, ...s.messages];
    let reply = await this.llm.chat(base);
    if (!reply.includes("?")) {
      reply = await this.llm.chat([
        ...base,
        {
          role: "user",
          content: nudgePrompt(s.locale),
        },
      ]);
    }
    s.messages.push({ role: "assistant", content: reply.trim() });
    s.asked = n;
    return reply.trim();
  }

  private async makeReport(s: Session): Promise<Report | { error: string }> {
    const transcript = s.messages
      .slice(1)
      .map((m) => `${m.role === "assistant" ? "Lina" : s.locale === "en" ? "Candidate" : "Candidat"} : ${m.content}`)
      .join("\n\n");
    const { system, user } = evaluatorPrompts(s, transcript);

    for (let attempt = 1; attempt <= 2; attempt++) {
      const raw = await this.llm.chat(
        [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        // Le retour par question allonge la réponse (et le raisonnement du modèle compte dans ce budget).
        { maxTokens: 4000, json: true },
      );
      try {
        const parsed = reportSchema.safeParse(JSON.parse(raw.replace(/```json|```/g, "").trim()));
        if (parsed.success) {
          const values = Object.values(parsed.data.scores);
          const score_global = Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10);
          const echanges = exchangesOf(s);
          return { ...parsed.data, score_global, echanges, preuves: verifyEvidence(parsed.data.preuves, echanges) };
        }
        console.error("Rapport invalide :", parsed.error.issues);
      } catch (e) {
        console.error("Rapport non JSON :", e);
      }
    }
    return { error: "Le rapport n'a pas pu être généré correctement." };
  }

  async start(input: StartInput) {
    const total = Math.min(Math.max(input.questions ?? this.maxQuestions, 1), this.maxQuestions);
    const s: Session = {
      id: crypto.randomUUID(),
      poste: input.poste,
      type: input.type,
      locale: input.locale,
      description: input.description || undefined,
      objectifs: input.objectifs,
      experience: input.experience,
      total,
      messages: [
        {
          role: "user",
          content: input.locale === "en" ? "I'm ready, let's start the interview." : "Je suis prêt, commençons l'entretien.",
        },
      ],
      asked: 0,
      done: false,
      createdAt: Date.now(),
    };
    const question = await this.nextQuestion(s);
    await this.sessions.save(s);
    return { sessionId: s.id, question, index: s.asked, total: s.total, locale: s.locale };
  }

  private closingFor(s: Session) {
    return s.locale === "en"
      ? "Thank you for this conversation, the interview is now over."
      : "Merci pour cet échange, l'entretien est terminé.";
  }

  async answer(sessionId: string, answer: string) {
    return this.sessions.withLock(sessionId, async () => {
      const s = await this.sessions.get(sessionId);
      if (!s) throw new SessionNotFoundError();

      // Entretien déjà terminé : on renvoie le rapport existant sans rappeler le LLM.
      if (s.done) return { done: true, closing: this.closingFor(s), report: s.report ?? null };

      const { text, truncated } = truncateWords(answer, MAX_ANSWER_WORDS);
      s.messages.push({ role: "user", content: text });

      if (s.asked >= s.total) {
        s.report = await this.makeReport(s);
        s.done = true;
        await this.sessions.save(s);
        return { done: true, truncated, closing: this.closingFor(s), report: s.report };
      }

      const question = await this.nextQuestion(s);
      await this.sessions.save(s);
      return { done: false, truncated, question, index: s.asked, total: s.total };
    });
  }

  /** Fin anticipée : bilan sur les réponses déjà données, ou aucun bilan s'il n'y en a pas. */
  async finish(sessionId: string) {
    return this.sessions.withLock(sessionId, async () => {
      const s = await this.sessions.get(sessionId);
      if (!s) throw new SessionNotFoundError();
      if (!s.done) {
        s.interrupted = true;
        s.done = true;
        s.report = answersCount(s) > 0 ? await this.makeReport(s) : null;
        await this.sessions.save(s);
      }
      return { done: true, interrupted: Boolean(s.interrupted), closing: this.closingFor(s), report: s.report ?? null };
    });
  }

  /** Texte que Lina doit prononcer maintenant : la dernière question, ou la conclusion. */
  async currentSpeech(sessionId: string) {
    const s = await this.sessions.get(sessionId);
    if (!s) throw new SessionNotFoundError();
    if (s.done) return { text: this.closingFor(s), locale: s.locale };
    const last = [...s.messages].reverse().find((m) => m.role === "assistant");
    return { text: last?.content ?? "", locale: s.locale };
  }

  /** Vérifie qu'une session accepte encore des réponses (avant une transcription). */
  async assertActive(sessionId: string) {
    const s = await this.sessions.get(sessionId);
    if (!s) throw new SessionNotFoundError();
    if (s.done) throw new SessionDoneError();
    return s;
  }

  async get(sessionId: string) {
    const s = await this.sessions.get(sessionId);
    if (!s) throw new SessionNotFoundError();
    return {
      sessionId: s.id,
      poste: s.poste,
      type: s.type,
      locale: s.locale,
      asked: s.asked,
      total: s.total,
      done: s.done,
      interrupted: Boolean(s.interrupted),
      createdAt: s.createdAt,
      report: s.report ?? null,
    };
  }
}
