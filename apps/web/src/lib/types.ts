export type Locale = "fr" | "en";
export type InterviewType = "rh" | "technique";
export type Objective = "confiance" | "structure" | "communication" | "connaissances" | "stress";
export type Experience = "debutant" | "junior" | "confirme" | "senior";
export type Situation = "etudiant" | "recherche" | "en_poste" | "reconversion";
export type Duration = 10 | 20 | 35;

export type Profile = {
  prenom: string;
  situation: Situation;
  experience: Experience;
  locale: Locale;
  objectifs: Objective[];
  createdAt: number;
};

export type InterviewConfig = {
  type: InterviewType;
  poste: string;
  description: string;
  locale: Locale;
  objectifs: Objective[];
  experience?: Experience;
  duree: Duration;
};

export type Scores = {
  clarte: number;
  pertinence: number;
  exemples_concrets: number;
  structure: number;
  motivation: number;
};

export type Report = {
  scores: Scores;
  points_forts: string[];
  points_faibles: string[];
  conseils: string[];
  resume: string;
  score_global: number;
  /** Retour détaillé par question (absent des bilans produits avant cette version). */
  par_question?: QuestionFeedback[];
  /** Questions de Lina et réponses du candidat, dans l'ordre. */
  echanges?: { question: string; reponse: string | null }[];
  /** Preuves de compétences dont la citation a été retrouvée mot pour mot (déclarations non vérifiées). */
  preuves?: { competence: string; reponse: number; citation: string; statut: string }[];
};

export type QuestionFeedback = { question: string; ce_qui_va: string; a_ameliorer: string; exemple: string };

export type ReportResult = Report | { error: string } | null;

export const isReport = (r: unknown): r is Report =>
  Boolean(r && typeof r === "object" && "scores" in r && "score_global" in r);

export type HistoryEntry = {
  sessionId: string;
  poste: string;
  type: InterviewType;
  locale: Locale;
  date: number;
  /** Durée réelle de la séance, en secondes. */
  elapsed: number;
  interrupted: boolean;
  report: ReportResult;
};

export type VoiceConfig = {
  tts: { mode: "server" | "browser" | "none"; provider: string | null; voices?: Record<Locale, string> | null; available?: boolean | null };
  stt: { mode: "server" | "browser"; provider: string | null };
  phrases: Record<"intro" | "closing", Record<Locale, string[]>>;
  maxQuestions: number;
};
