/**
 * Roleplay Studio : scénarios d'entretien prêts à l'emploi et catalogue métiers.
 * Repris d'ai-interview-platform (Achraf SILA), avec les types et objectifs de la plateforme.
 */
import { request } from "./api";
import type { InterviewType, Objective } from "./types";

export type Scenario = {
  title: string;
  type: InterviewType;
  poste: string;
  contexte: string;
  persona: string;
  objectifs: Objective[];
  questions: string[];
  domaine?: string;
};

const ROLES: Record<string, string[]> = {
  "Ressources humaines": ["Talent Acquisition Specialist", "HR Business Partner", "Responsable RH", "Learning & Development Manager"],
  "Technologie & Data": ["Software Engineer", "Data Analyst", "Data Engineer", "Cloud & DevOps Engineer", "Cybersecurity Analyst", "QA Engineer"],
  "Finance & Audit": ["Financial Analyst", "Contrôleur de gestion", "Auditeur interne", "Comptable"],
  "Business & Marketing": ["Business Developer", "Account Manager", "Digital Marketing Specialist", "Product Manager"],
  "Management & Conseil": ["Project Manager", "Business Analyst", "Consultant en stratégie", "Operations Manager"],
  "Ingénierie & Industrie": ["Industrial Engineer", "Quality Manager", "Supply Chain Analyst", "Maintenance Engineer"],
  "Service & Relation client": ["Customer Success Manager", "Customer Support Specialist", "Responsable service client"],
  "Début de carrière": ["Stage PFE", "Premier emploi", "Graduate Program"],
};
const TECHNICAL = /Software|Data |Cloud|Cyber|QA |Engineer|Analyst|Audit|Comptable|Contrôleur|Maintenance|Supply Chain/;

export const DOMAINS = Object.keys(ROLES);
export const ROLE_CATALOG = Object.entries(ROLES).flatMap(([domaine, names]) => names.map((name) => ({ name, domaine })));

export const TEMPLATES: Scenario[] = [
  {
    title: "Entretien final RH",
    type: "rh",
    poste: "",
    contexte: "Entretien final avec une DRH : motivation, qualités, axes d’amélioration, valeurs et projection.",
    persona: "Directrice RH",
    objectifs: ["structure", "communication"],
    questions: ["Qu’est-ce qui vous motive dans cette opportunité ?", "Quelle difficulté vous a fait progresser ?", "Décrivez un désaccord que vous avez résolu."],
  },
  {
    title: "Entretien avec un manager",
    type: "rh",
    poste: "",
    contexte: "Échange avec un manager : réalisations, priorisation, collaboration, leadership et prise de décision.",
    persona: "Manager recruteur",
    objectifs: ["structure", "confiance"],
    questions: ["Quelle réalisation illustre le mieux votre impact ?", "Comment arbitrez-vous deux priorités concurrentes ?", "Que feriez-vous différemment sur un projet passé ?"],
  },
  {
    title: "Entretien technique",
    type: "technique",
    poste: "",
    contexte: "Entretien technique portant sur la maîtrise métier, le raisonnement et les choix de résolution.",
    persona: "Expert technique",
    objectifs: ["connaissances", "communication"],
    questions: ["Décrivez un problème technique complexe que vous avez résolu.", "Quels compromis avez-vous envisagés ?", "Comment avez-vous vérifié votre solution ?"],
  },
  {
    title: "Premier emploi ou stage",
    type: "rh",
    poste: "",
    contexte: "Premier entretien : motivation, apprentissage, projet académique et travail en équipe.",
    persona: "Chargé de recrutement",
    objectifs: ["confiance", "structure"],
    questions: ["Présentez votre parcours.", "Quel projet vous a le plus appris ?", "Pourquoi ce premier poste ?"],
  },
];

export function scenarioForRole(name: string, domaine: string): Scenario {
  const type: InterviewType = TECHNICAL.test(name) ? "technique" : "rh";
  return {
    title: `Entretien · ${name}`,
    type,
    poste: name,
    domaine,
    contexte: `Préparation pour le poste de ${name} dans le domaine ${domaine}. Explorer les compétences, exemples et motivations en rapport avec ce rôle.`,
    persona: type === "technique" ? "Expert métier et manager recruteur" : "Manager recruteur",
    objectifs: type === "technique" ? ["connaissances", "communication"] : ["structure", "confiance"],
    questions: [`Quelles expériences vous préparent au poste de ${name} ?`, "Décrivez une situation professionnelle complexe et vos actions.", "Quel résultat concret avez-vous obtenu et qu’en avez-vous appris ?"],
  };
}

export const createScenario = (brief: string) =>
  request<Scenario>("/roleplay/scenario", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ brief }) });

/** Brouillon transmis à la préparation (comme le « roleplay-scenario-draft » d'origine). */
export const roleplayDraft = {
  set(s: Scenario) {
    try {
      window.sessionStorage.setItem("il:roleplay", JSON.stringify(s));
    } catch {
      /* stockage indisponible */
    }
  },
  take(): Scenario | null {
    try {
      const raw = window.sessionStorage.getItem("il:roleplay");
      window.sessionStorage.removeItem("il:roleplay");
      return raw ? (JSON.parse(raw) as Scenario) : null;
    } catch {
      return null;
    }
  },
};
