/** Libellés affichés dans les prompts, par langue (données de présentation, pas des instructions). */
export const LABELS = {
  fr: {
    objectifs: {
      confiance: "prendre confiance",
      structure: "structurer ses réponses (méthode STAR)",
      communication: "mieux communiquer à l'oral",
      connaissances: "consolider ses connaissances métier",
      stress: "gérer la pression",
    },
    experience: { debutant: "débutant", junior: "junior (1 à 3 ans)", confirme: "confirmé (3 à 7 ans)", senior: "senior (plus de 7 ans)" },
    type: {
      rh: "un entretien RH : parcours, motivation, savoir-être et mises en situation comportementales",
      technique: "un entretien technique : connaissances métier, raisonnement, résolution de problèmes et cas pratiques liés au poste",
    },
  },
  en: {
    objectifs: {
      confiance: "build confidence",
      structure: "structure answers (STAR method)",
      communication: "communicate better orally",
      connaissances: "strengthen domain knowledge",
      stress: "handle pressure",
    },
    experience: { debutant: "entry level", junior: "junior (1-3 years)", confirme: "mid-level (3-7 years)", senior: "senior (7+ years)" },
    type: {
      rh: "an HR interview: background, motivation, soft skills and behavioural scenarios",
      technique: "a technical interview: domain knowledge, reasoning, problem solving and practical cases related to the role",
    },
  },
} as const;
