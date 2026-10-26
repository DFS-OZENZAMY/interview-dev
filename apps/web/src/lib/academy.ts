/**
 * Académie côté navigateur : catalogue (servi par l'API), coach, retours sur exercice,
 * et progression enregistrée dans ce navigateur (comme l'historique des entretiens).
 * Fonctionnalité reprise d'ai-interview-platform (Achraf SILA), adaptée à notre architecture sans compte.
 */
import { request } from "./api";
import { historyStore } from "./storage";
import { isReport, type Profile, type Report } from "./types";

export type Exercise = {
  id: string;
  category: string;
  categoryLabel: string;
  level: "foundation" | "practice" | "challenge" | string;
  levelLabel: string;
  duration: string;
  name: string;
  skill: string;
  prompt: string;
  intro: string;
  steps: string[];
  tip: string;
};
export type Guide = {
  objective: string;
  context: string;
  methodology: string;
  evidence: string[];
  pitfalls: string[];
  example: string;
  reflection: string;
};
export type AcademyPath = {
  id: string;
  title: string;
  audience: string;
  category: string;
  level: "foundation" | "practice" | "challenge";
  goal: string;
  modules: string[];
  description: string;
  duration: string;
  steps: { category: string; exerciseId: string | null }[];
};
export type Catalog = { exercises: Exercise[]; paths: AcademyPath[]; themes: { key: string; label: string; pathId: string }[] };

export type Turn = { role: "user" | "assistant"; content: string };
export type Reference = { slug: string; title: string; source: string };
export type PlanStep = { exerciseId: string; exerciseName: string; pathId: string; pathTitle: string; goal: string; method?: string };
export type CoachRecommend = {
  kind: "recommend";
  need: string;
  pathId: string;
  pathTitle: string;
  exerciseId: string;
  exerciseName: string;
  reason: string;
  understanding?: string;
  needs?: { key: string; label: string }[];
  steps?: PlanStep[];
  context?: string;
  references?: Reference[];
};
export type CoachClarify = { kind: "clarify"; understanding?: string; question: string; options: string[]; references?: Reference[] };
export type CoachAnswer = { kind: "answer"; reply: string; question?: string; references?: Reference[] };
export type CoachResponse = CoachRecommend | CoachClarify | CoachAnswer;
export type Feedback = { strength: string; improvement: string; nextAction: string };

export const LEVELS: Record<string, string> = { foundation: "Découverte", practice: "Approfondissement", challenge: "Mise en situation" };

// ---- API ----

let catalogPromise: Promise<Catalog> | null = null;
/** Le catalogue (288 exercices, parcours) est chargé une fois par visite. */
export function loadCatalog() {
  catalogPromise ??= request<Catalog>("/academy/catalog").catch((e) => {
    catalogPromise = null;
    throw e;
  });
  return catalogPromise;
}

export const academyApi = {
  exercise: (id: string) => request<{ exercise: Exercise; guide: Guide | null }>(`/academy/exercises/${encodeURIComponent(id)}`),
  coach: (body: { messages: Turn[]; history?: Turn[]; previousPlan?: { needs: string[]; context?: string } }) =>
    request<CoachResponse>("/academy/coach", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }),
  feedback: (exerciseId: string, answer: string) =>
    request<Feedback>("/academy/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ exerciseId, answer }) }),
};

// ---- Stockage local ----

function read<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}
function write(key: string, value: unknown) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* stockage indisponible : la séance continue sans mémoire */
  }
}

export type Attempt = { exerciseId: string; completedAt: number; answer: string; checked: number[]; feedback: Feedback | null };
export type SavedPlan = { needs: { key: string; label: string }[]; steps: PlanStep[]; pathId: string; context?: string; savedAt: number };

export const academyStore = {
  attempts: () => read<Attempt[]>("il:academy:attempts") ?? [],
  addAttempt(a: Attempt) {
    write("il:academy:attempts", [a, ...academyStore.attempts()].slice(0, 300));
  },
  completedIds: () => [...new Set(academyStore.attempts().map((a) => a.exerciseId))],
  conversation: () => (read<Turn[]>("il:academy:conversation") ?? []).filter((t) => (t.role === "user" || t.role === "assistant") && typeof t.content === "string").slice(-20),
  saveConversation: (turns: Turn[]) => write("il:academy:conversation", turns.slice(-20)),
  clearConversation: () => write("il:academy:conversation", null),
  plan: () => read<SavedPlan>("il:academy:plan"),
  savePlan: (p: SavedPlan) => write("il:academy:plan", p),
  activePath: () => read<string>("il:academy:active-path"),
  setActivePath: (id: string | null) => write("il:academy:active-path", id),
};

// ---- Recommandations (moteur d'Achraf, adapté au profil et aux bilans de la plateforme) ----

/** Critère du bilan le plus faible → module d'exercices à travailler en priorité. */
const CRITERION_MODULE: Record<string, { module: string; label: string }> = {
  clarte: { module: "communication", label: "clarté" },
  pertinence: { module: "structure", label: "pertinence des réponses" },
  exemples_concrets: { module: "behavior", label: "illustration des réalisations" },
  structure: { module: "structure", label: "structuration des réponses" },
  motivation: { module: "motivation", label: "motivation" },
};
const GOAL_MODULES: Record<string, string[]> = {
  confiance: ["confidence", "communication"],
  stress: ["confidence", "communication"],
  structure: ["structure", "behavior"],
  communication: ["communication", "pitch"],
  connaissances: ["technical", "problem"],
};
const JOB_PATHS: { pattern: RegExp; id: string }[] = [
  { pattern: /data|analyst|business intelligence|scientist/i, id: "data" },
  { pattern: /cloud|devops|infrastructure|sre/i, id: "devops" },
  { pattern: /cyber|security|sécurité informatique/i, id: "cyber" },
  { pattern: /test|qa|quality assurance/i, id: "qa" },
  { pattern: /software|developer|développeu|ingénieur logiciel|backend|frontend|full.?stack/i, id: "engineering" },
  { pattern: /recrut|talent acquisition|ressources humaines|\bhr\b|\brh\b/i, id: "hr" },
  { pattern: /financ|audit|contrôle de gestion/i, id: "finance" },
  { pattern: /legal|juridique|compliance|conformité/i, id: "legal" },
  { pattern: /product|business analyst|product owner/i, id: "product" },
  { pattern: /project|projet|scrum|agile/i, id: "project" },
  { pattern: /commercial|sales|business development/i, id: "sales" },
  { pattern: /marketing/i, id: "marketing" },
  { pattern: /consult|conseil/i, id: "consulting" },
];

export type PathRecommendation = { path: AcademyPath; reasons: string[]; score: number; priorityModule: string | null };

export function recommendPaths(catalog: Catalog, profile: Profile | null): PathRecommendation[] {
  const latest = historyStore.list().find((h) => isReport(h.report));
  const report = latest?.report as Report | undefined;
  const weakest = report ? Object.entries(report.scores).sort((a, b) => a[1] - b[1])[0]?.[0] : undefined;
  const concern = weakest ? CRITERION_MODULE[weakest] : undefined;
  const job = historyStore.list()[0]?.poste ?? "";
  const jobMatch = JOB_PATHS.find((x) => x.pattern.test(job));
  const wanted = new Set((profile?.objectifs ?? []).flatMap((g) => GOAL_MODULES[g] ?? []));
  const seniority = profile?.experience;

  const ranked = catalog.paths
    .map((path) => {
      let score = 0;
      const reasons: string[] = [];
      if (concern && path.modules.includes(concern.module)) {
        score += 35;
        reasons.push(`En lien avec votre dernier bilan : ${concern.label}.`);
      }
      if (jobMatch && path.id === jobMatch.id) {
        score += 25;
        reasons.push("Ciblé sur le poste de votre dernière simulation.");
      }
      if (path.modules.some((m) => wanted.has(m))) {
        score += 15;
        reasons.push("Correspond à vos objectifs de préparation.");
      }
      const suitable =
        (["debutant", "junior"].includes(seniority ?? "") && path.level === "foundation") ||
        (seniority === "confirme" && path.level === "practice") ||
        (seniority === "senior" && path.level === "challenge");
      if (suitable) {
        score += 20;
        reasons.push("Difficulté cohérente avec votre expérience déclarée.");
      }
      if (profile?.situation === "etudiant" && ["first-job", "internship", "graduate-tech", "graduate-business"].includes(path.id)) {
        score += 15;
        reasons.push("Aligné sur votre situation.");
      }
      if (profile?.situation === "reconversion" && ["career-switch", "internal-mobility"].includes(path.id)) {
        score += 15;
        reasons.push("Aligné sur votre reconversion.");
      }
      if (!score && path.id === "week") {
        score = 1;
        reasons.push("Parcours polyvalent pour démarrer.");
      }
      return { path, score, reasons, priorityModule: concern && path.modules.includes(concern.module) ? concern.module : null };
    })
    .sort((a, b) => b.score - a.score || a.path.title.localeCompare(b.path.title, "fr"));

  const chosen: PathRecommendation[] = [];
  for (const item of ranked) {
    if (chosen.length >= 3) break;
    // Diversité : pas deux parcours de la même catégorie tant qu'une autre catégorie pertinente existe.
    if (
      chosen.some((x) => x.path.category === item.path.category) &&
      ranked.some((x) => x.score > 0 && x.path.category !== item.path.category && !chosen.some((c) => c.path.id === x.path.id))
    )
      continue;
    chosen.push(item);
  }
  return chosen;
}

/** Étapes d'un parcours, la priorité du dernier bilan en premier. */
export function orderedSteps(path: AcademyPath, priorityModule: string | null) {
  return priorityModule ? [...path.steps].sort((a, b) => Number(b.category === priorityModule) - Number(a.category === priorityModule)) : path.steps;
}

/** Prochain exercice conseillé : plan du coach d'abord, sinon parcours recommandé, sinon un exercice de départ. */
export function nextExercise(catalog: Catalog, profile: Profile | null): { exerciseId: string; source: "coach" | "parcours" | "depart" } {
  const done = new Set(academyStore.completedIds());
  const plan = academyStore.plan();
  const planned = plan?.steps.find((s) => !done.has(s.exerciseId) && catalog.exercises.some((e) => e.id === s.exerciseId));
  if (planned) return { exerciseId: planned.exerciseId, source: "coach" };
  const pick = recommendPaths(catalog, profile)[0];
  if (pick) {
    const steps = orderedSteps(pick.path, pick.priorityModule);
    const next = steps.find((s) => s.exerciseId && !done.has(s.exerciseId)) ?? steps[0];
    if (next?.exerciseId) return { exerciseId: next.exerciseId, source: "parcours" };
  }
  return { exerciseId: "pitch-1-foundation", source: "depart" };
}
