import type { Duration, Experience, InterviewType, Objective, Situation } from "./types";

export const OBJECTIVES: Record<Objective, { label: string; detail: string }> = {
  confiance: { label: "Prendre confiance", detail: "Aborder l’entretien plus sereinement." },
  structure: { label: "Structurer mes réponses", detail: "Contexte, action, résultat : la méthode STAR." },
  communication: { label: "Mieux communiquer", detail: "Une idée claire, puis un exemple." },
  connaissances: { label: "Connaissances métier", detail: "Argumenter avec précision sur le poste." },
  stress: { label: "Gérer la pression", detail: "Garder le fil face aux questions difficiles." },
};

export const TYPES: Record<InterviewType, { label: string; detail: string }> = {
  rh: { label: "Entretien RH", detail: "Parcours, motivation, savoir-être et mises en situation." },
  technique: { label: "Entretien technique", detail: "Connaissances métier, raisonnement et résolution de problèmes." },
};

export const EXPERIENCES: Record<Experience, string> = {
  debutant: "Débutant",
  junior: "1 à 3 ans",
  confirme: "3 à 7 ans",
  senior: "Plus de 7 ans",
};

export const SITUATIONS: Record<Situation, string> = {
  etudiant: "Étudiant ou jeune diplômé",
  recherche: "En recherche d’emploi",
  en_poste: "En poste, à l’écoute du marché",
  reconversion: "En reconversion",
};

export const DURATIONS: Duration[] = [10, 20, 35];
/** Nombre de questions demandé à l’API selon la durée choisie (plafonné côté serveur). */
export const QUESTIONS_BY_DURATION: Record<Duration, number> = { 10: 4, 20: 7, 35: 10 };

export const CRITERIA: Record<string, string> = {
  clarte: "Clarté",
  pertinence: "Pertinence",
  exemples_concrets: "Exemples concrets",
  structure: "Structure",
  motivation: "Motivation",
};

export const formatDuration = (s: number) => `${Math.floor(s / 60)} min ${String(s % 60).padStart(2, "0")} s`;
export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
