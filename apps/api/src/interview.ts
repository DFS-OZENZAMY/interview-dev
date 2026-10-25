import { randomUUID } from "node:crypto";
import type { LLM, Msg } from "./ai/llm";

const total = () => Number(process.env.TOTAL_QUESTIONS ?? 10);
const MAX_ANSWER_WORDS = 200;

type Session = { id: string; poste: string; messages: Msg[]; asked: number };
const sessions = new Map<string, Session>();


function systemPrompt(poste: string, n: number) {
  return `Tu es Lina, recruteuse bienveillante et professionnelle. Tu fais passer un entretien en français pour le poste : ${poste}.
Règles :
- Pose UNE seule question à la fois, de 40 à 60 mots maximum, et termine toujours ton message par un point d'interrogation.
- Si la réponse précédente est vague, fais une courte relance ; sinon passe à un nouveau sujet.
- N'évalue pas le candidat et ne donne aucun conseil.
- Ne conclus JAMAIS l'entretien : pas de remerciement final, pas de « nous vous recontacterons », pas d'au revoir. La fin est gérée par l'application, y compris à la question ${total()}.
- Tu poses actuellement la question ${n} sur ${total()}.`;
}

function truncateWords(text: string, max: number) {
  const words = text.trim().split(/\s+/);
  return words.length <= max ? text.trim() : words.slice(0, max).join(" ");
}


async function nextQuestion(llm: LLM, s: Session) {
  const n = s.asked + 1;
  const base: Msg[] = [
    { role: "system", content: systemPrompt(s.poste, n) },
    ...s.messages,
  ];
  let reply = await llm.chat(base);
  if (!reply.includes("?")) {
    reply = await llm.chat([
      ...base,
      { role: "user", content: "Pose maintenant ta question suivante. Ne conclus pas." },
    ]);
  }
  s.messages.push({ role: "assistant", content: reply });
  s.asked = n;
  return reply;
}

async function makeReport(llm: LLM, s: Session) {
  const transcript = s.messages
    .slice(1)
    .map((m) => `${m.role === "assistant" ? "Lina" : "Candidat"} : ${m.content}`)
    .join("\n\n");

  const prompt = `Tu es un évaluateur RH rigoureux. Voici le transcript d'un entretien pour le poste : ${s.poste}.

${transcript}

Note le candidat de 0 à 10 sur chaque critère. Réponds UNIQUEMENT avec du JSON de cette forme :
{"scores":{"clarte":0,"pertinence":0,"exemples_concrets":0,"structure":0,"motivation":0},"points_forts":["..."],"points_faibles":["..."],"conseils":["..."],"resume":"..."}`;

  const raw = await llm.chat([{ role: "user", content: prompt }], { maxTokens: 2000 });
  const json = raw.replace(/```json|```/g, "").trim();
  try {
    return JSON.parse(json);
  } catch {
    return { raw };
  }
}

export async function startInterview(llm: LLM, poste: string) {
  const s: Session = {
    id: randomUUID(),
    poste,
    messages: [{ role: "user", content: "Je suis prêt, commençons l'entretien." }],
    asked: 0,
  };
  sessions.set(s.id, s);
  const question = await nextQuestion(llm, s);
  return { sessionId: s.id, question, index: s.asked, total: total() };
}

export async function answerQuestion(llm: LLM, sessionId: string, text: string) {
  const s = sessions.get(sessionId);
  if (!s) throw new Error("session introuvable");
  s.messages.push({ role: "user", content: truncateWords(text, MAX_ANSWER_WORDS) });

  if (s.asked >= total()) {
    return {
      done: true,
      closing: "Merci pour cet échange, l'entretien est terminé.",
      report: await makeReport(llm, s),
    };
  }
  
  const question = await nextQuestion(llm, s);
  return { done: false, question, index: s.asked, total: total() };
}
