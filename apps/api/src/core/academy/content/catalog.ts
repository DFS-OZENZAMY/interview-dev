/* Catalogue pédagogique initial — exercices de pratique, non évaluations de recrutement validées. */
export type Exercise = {id:string;category:string;categoryLabel:string;level:string;levelLabel:string;duration:string;name:string;skill:string;prompt:string;intro:string;steps:string[];tip:string};
export const exercises: Exercise[] = [
 {
  "id": "pitch-1-foundation",
  "category": "pitch",
  "categoryLabel": "Présentation & pitch",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Se présenter en 60 secondes · Fondamentaux",
  "skill": "Clarté",
  "prompt": "Présentez votre parcours en 60 secondes sans réciter votre CV. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de clarté pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "pitch-1-practice",
  "category": "pitch",
  "categoryLabel": "Présentation & pitch",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Se présenter en 60 secondes · Application",
  "skill": "Clarté",
  "prompt": "Présentez votre parcours en 60 secondes sans réciter votre CV. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de clarté pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "pitch-1-challenge",
  "category": "pitch",
  "categoryLabel": "Présentation & pitch",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Se présenter en 60 secondes · Challenge",
  "skill": "Clarté",
  "prompt": "Présentez votre parcours en 60 secondes sans réciter votre CV. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de clarté pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "pitch-2-foundation",
  "category": "pitch",
  "categoryLabel": "Présentation & pitch",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Présenter son parcours en trois actes · Fondamentaux",
  "skill": "Narration",
  "prompt": "Racontez votre évolution professionnelle en trois étapes cohérentes. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de narration pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "pitch-2-practice",
  "category": "pitch",
  "categoryLabel": "Présentation & pitch",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Présenter son parcours en trois actes · Application",
  "skill": "Narration",
  "prompt": "Racontez votre évolution professionnelle en trois étapes cohérentes. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de narration pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "pitch-2-challenge",
  "category": "pitch",
  "categoryLabel": "Présentation & pitch",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Présenter son parcours en trois actes · Challenge",
  "skill": "Narration",
  "prompt": "Racontez votre évolution professionnelle en trois étapes cohérentes. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de narration pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "pitch-3-foundation",
  "category": "pitch",
  "categoryLabel": "Présentation & pitch",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Expliquer un changement de carrière · Fondamentaux",
  "skill": "Transition",
  "prompt": "Expliquez ce qui motive votre réorientation et les compétences transférables. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de transition pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "pitch-3-practice",
  "category": "pitch",
  "categoryLabel": "Présentation & pitch",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Expliquer un changement de carrière · Application",
  "skill": "Transition",
  "prompt": "Expliquez ce qui motive votre réorientation et les compétences transférables. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de transition pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "pitch-3-challenge",
  "category": "pitch",
  "categoryLabel": "Présentation & pitch",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Expliquer un changement de carrière · Challenge",
  "skill": "Transition",
  "prompt": "Expliquez ce qui motive votre réorientation et les compétences transférables. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de transition pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "pitch-4-foundation",
  "category": "pitch",
  "categoryLabel": "Présentation & pitch",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Créer une accroche mémorable · Fondamentaux",
  "skill": "Impact",
  "prompt": "Formulez votre proposition de valeur professionnelle en deux phrases. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de impact pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "pitch-4-practice",
  "category": "pitch",
  "categoryLabel": "Présentation & pitch",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Créer une accroche mémorable · Application",
  "skill": "Impact",
  "prompt": "Formulez votre proposition de valeur professionnelle en deux phrases. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de impact pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "pitch-4-challenge",
  "category": "pitch",
  "categoryLabel": "Présentation & pitch",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Créer une accroche mémorable · Challenge",
  "skill": "Impact",
  "prompt": "Formulez votre proposition de valeur professionnelle en deux phrases. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de impact pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "pitch-5-foundation",
  "category": "pitch",
  "categoryLabel": "Présentation & pitch",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Parler de sa principale réussite · Fondamentaux",
  "skill": "Crédibilité",
  "prompt": "Présentez une réussite dont vous êtes fier sans surestimer votre rôle. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de crédibilité pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "pitch-5-practice",
  "category": "pitch",
  "categoryLabel": "Présentation & pitch",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Parler de sa principale réussite · Application",
  "skill": "Crédibilité",
  "prompt": "Présentez une réussite dont vous êtes fier sans surestimer votre rôle. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de crédibilité pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "pitch-5-challenge",
  "category": "pitch",
  "categoryLabel": "Présentation & pitch",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Parler de sa principale réussite · Challenge",
  "skill": "Crédibilité",
  "prompt": "Présentez une réussite dont vous êtes fier sans surestimer votre rôle. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de crédibilité pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "pitch-6-foundation",
  "category": "pitch",
  "categoryLabel": "Présentation & pitch",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Présenter un trou dans le CV · Fondamentaux",
  "skill": "Authenticité",
  "prompt": "Expliquez une période sans emploi de façon factuelle et constructive. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de authenticité pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "pitch-6-practice",
  "category": "pitch",
  "categoryLabel": "Présentation & pitch",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Présenter un trou dans le CV · Application",
  "skill": "Authenticité",
  "prompt": "Expliquez une période sans emploi de façon factuelle et constructive. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de authenticité pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "pitch-6-challenge",
  "category": "pitch",
  "categoryLabel": "Présentation & pitch",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Présenter un trou dans le CV · Challenge",
  "skill": "Authenticité",
  "prompt": "Expliquez une période sans emploi de façon factuelle et constructive. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de authenticité pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "pitch-7-foundation",
  "category": "pitch",
  "categoryLabel": "Présentation & pitch",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Adapter son pitch au poste · Fondamentaux",
  "skill": "Pertinence",
  "prompt": "Présentez-vous comme candidat à un poste précis avec deux arguments pertinents. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de pertinence pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "pitch-7-practice",
  "category": "pitch",
  "categoryLabel": "Présentation & pitch",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Adapter son pitch au poste · Application",
  "skill": "Pertinence",
  "prompt": "Présentez-vous comme candidat à un poste précis avec deux arguments pertinents. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de pertinence pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "pitch-7-challenge",
  "category": "pitch",
  "categoryLabel": "Présentation & pitch",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Adapter son pitch au poste · Challenge",
  "skill": "Pertinence",
  "prompt": "Présentez-vous comme candidat à un poste précis avec deux arguments pertinents. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de pertinence pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "pitch-8-foundation",
  "category": "pitch",
  "categoryLabel": "Présentation & pitch",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Conclure sa présentation · Fondamentaux",
  "skill": "Conclusion",
  "prompt": "Terminez votre présentation en reliant votre parcours au besoin du recruteur. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de conclusion pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "pitch-8-practice",
  "category": "pitch",
  "categoryLabel": "Présentation & pitch",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Conclure sa présentation · Application",
  "skill": "Conclusion",
  "prompt": "Terminez votre présentation en reliant votre parcours au besoin du recruteur. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de conclusion pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "pitch-8-challenge",
  "category": "pitch",
  "categoryLabel": "Présentation & pitch",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Conclure sa présentation · Challenge",
  "skill": "Conclusion",
  "prompt": "Terminez votre présentation en reliant votre parcours au besoin du recruteur. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de conclusion pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "motivation-1-foundation",
  "category": "motivation",
  "categoryLabel": "Motivation & projet",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Pourquoi ce poste ? · Fondamentaux",
  "skill": "Motivation",
  "prompt": "Expliquez pourquoi ce poste constitue une étape logique pour vous. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de motivation pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "motivation-1-practice",
  "category": "motivation",
  "categoryLabel": "Motivation & projet",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Pourquoi ce poste ? · Application",
  "skill": "Motivation",
  "prompt": "Expliquez pourquoi ce poste constitue une étape logique pour vous. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de motivation pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "motivation-1-challenge",
  "category": "motivation",
  "categoryLabel": "Motivation & projet",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Pourquoi ce poste ? · Challenge",
  "skill": "Motivation",
  "prompt": "Expliquez pourquoi ce poste constitue une étape logique pour vous. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de motivation pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "motivation-2-foundation",
  "category": "motivation",
  "categoryLabel": "Motivation & projet",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Pourquoi cette entreprise ? · Fondamentaux",
  "skill": "Recherche",
  "prompt": "Décrivez ce qui vous attire dans la mission de cette organisation sans compliments génériques. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de recherche pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "motivation-2-practice",
  "category": "motivation",
  "categoryLabel": "Motivation & projet",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Pourquoi cette entreprise ? · Application",
  "skill": "Recherche",
  "prompt": "Décrivez ce qui vous attire dans la mission de cette organisation sans compliments génériques. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de recherche pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "motivation-2-challenge",
  "category": "motivation",
  "categoryLabel": "Motivation & projet",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Pourquoi cette entreprise ? · Challenge",
  "skill": "Recherche",
  "prompt": "Décrivez ce qui vous attire dans la mission de cette organisation sans compliments génériques. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de recherche pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "motivation-3-foundation",
  "category": "motivation",
  "categoryLabel": "Motivation & projet",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Votre projet à trois ans · Fondamentaux",
  "skill": "Projection",
  "prompt": "Présentez un projet professionnel ambitieux et réaliste. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de projection pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "motivation-3-practice",
  "category": "motivation",
  "categoryLabel": "Motivation & projet",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Votre projet à trois ans · Application",
  "skill": "Projection",
  "prompt": "Présentez un projet professionnel ambitieux et réaliste. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de projection pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "motivation-3-challenge",
  "category": "motivation",
  "categoryLabel": "Motivation & projet",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Votre projet à trois ans · Challenge",
  "skill": "Projection",
  "prompt": "Présentez un projet professionnel ambitieux et réaliste. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de projection pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "motivation-4-foundation",
  "category": "motivation",
  "categoryLabel": "Motivation & projet",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Vos critères de choix · Fondamentaux",
  "skill": "Décision",
  "prompt": "Hiérarchisez trois critères importants pour votre prochaine opportunité. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de décision pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "motivation-4-practice",
  "category": "motivation",
  "categoryLabel": "Motivation & projet",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Vos critères de choix · Application",
  "skill": "Décision",
  "prompt": "Hiérarchisez trois critères importants pour votre prochaine opportunité. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de décision pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "motivation-4-challenge",
  "category": "motivation",
  "categoryLabel": "Motivation & projet",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Vos critères de choix · Challenge",
  "skill": "Décision",
  "prompt": "Hiérarchisez trois critères importants pour votre prochaine opportunité. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de décision pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "motivation-5-foundation",
  "category": "motivation",
  "categoryLabel": "Motivation & projet",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Vos valeurs professionnelles · Fondamentaux",
  "skill": "Valeurs",
  "prompt": "Illustrez une valeur qui influence réellement vos choix au travail. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de valeurs pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "motivation-5-practice",
  "category": "motivation",
  "categoryLabel": "Motivation & projet",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Vos valeurs professionnelles · Application",
  "skill": "Valeurs",
  "prompt": "Illustrez une valeur qui influence réellement vos choix au travail. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de valeurs pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "motivation-5-challenge",
  "category": "motivation",
  "categoryLabel": "Motivation & projet",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Vos valeurs professionnelles · Challenge",
  "skill": "Valeurs",
  "prompt": "Illustrez une valeur qui influence réellement vos choix au travail. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de valeurs pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "motivation-6-foundation",
  "category": "motivation",
  "categoryLabel": "Motivation & projet",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Votre moteur au quotidien · Fondamentaux",
  "skill": "Authenticité",
  "prompt": "Expliquez ce qui vous donne de l'énergie au travail avec un exemple. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de authenticité pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "motivation-6-practice",
  "category": "motivation",
  "categoryLabel": "Motivation & projet",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Votre moteur au quotidien · Application",
  "skill": "Authenticité",
  "prompt": "Expliquez ce qui vous donne de l'énergie au travail avec un exemple. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de authenticité pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "motivation-6-challenge",
  "category": "motivation",
  "categoryLabel": "Motivation & projet",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Votre moteur au quotidien · Challenge",
  "skill": "Authenticité",
  "prompt": "Expliquez ce qui vous donne de l'énergie au travail avec un exemple. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de authenticité pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "motivation-7-foundation",
  "category": "motivation",
  "categoryLabel": "Motivation & projet",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Pourquoi maintenant ? · Fondamentaux",
  "skill": "Cohérence",
  "prompt": "Justifiez le timing de votre recherche de mobilité. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de cohérence pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "motivation-7-practice",
  "category": "motivation",
  "categoryLabel": "Motivation & projet",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Pourquoi maintenant ? · Application",
  "skill": "Cohérence",
  "prompt": "Justifiez le timing de votre recherche de mobilité. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de cohérence pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "motivation-7-challenge",
  "category": "motivation",
  "categoryLabel": "Motivation & projet",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Pourquoi maintenant ? · Challenge",
  "skill": "Cohérence",
  "prompt": "Justifiez le timing de votre recherche de mobilité. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de cohérence pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "motivation-8-foundation",
  "category": "motivation",
  "categoryLabel": "Motivation & projet",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Vos attentes du manager · Fondamentaux",
  "skill": "Collaboration",
  "prompt": "Décrivez le cadre de management dans lequel vous donnez le meilleur. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de collaboration pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "motivation-8-practice",
  "category": "motivation",
  "categoryLabel": "Motivation & projet",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Vos attentes du manager · Application",
  "skill": "Collaboration",
  "prompt": "Décrivez le cadre de management dans lequel vous donnez le meilleur. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de collaboration pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "motivation-8-challenge",
  "category": "motivation",
  "categoryLabel": "Motivation & projet",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Vos attentes du manager · Challenge",
  "skill": "Collaboration",
  "prompt": "Décrivez le cadre de management dans lequel vous donnez le meilleur. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de collaboration pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "structure-1-foundation",
  "category": "structure",
  "categoryLabel": "Structure des réponses",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Méthode STAR · Fondamentaux",
  "skill": "STAR",
  "prompt": "Décrivez une réussite en suivant Situation, Tâche, Actions et Résultat. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de star pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "structure-1-practice",
  "category": "structure",
  "categoryLabel": "Structure des réponses",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Méthode STAR · Application",
  "skill": "STAR",
  "prompt": "Décrivez une réussite en suivant Situation, Tâche, Actions et Résultat. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de star pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "structure-1-challenge",
  "category": "structure",
  "categoryLabel": "Structure des réponses",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Méthode STAR · Challenge",
  "skill": "STAR",
  "prompt": "Décrivez une réussite en suivant Situation, Tâche, Actions et Résultat. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de star pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "structure-2-foundation",
  "category": "structure",
  "categoryLabel": "Structure des réponses",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Répondre sans se disperser · Fondamentaux",
  "skill": "Synthèse",
  "prompt": "Répondez en trois idées à la question : qu'apporterez-vous à l'équipe ? Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de synthèse pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "structure-2-practice",
  "category": "structure",
  "categoryLabel": "Structure des réponses",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Répondre sans se disperser · Application",
  "skill": "Synthèse",
  "prompt": "Répondez en trois idées à la question : qu'apporterez-vous à l'équipe ? Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de synthèse pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "structure-2-challenge",
  "category": "structure",
  "categoryLabel": "Structure des réponses",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Répondre sans se disperser · Challenge",
  "skill": "Synthèse",
  "prompt": "Répondez en trois idées à la question : qu'apporterez-vous à l'équipe ? Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de synthèse pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "structure-3-foundation",
  "category": "structure",
  "categoryLabel": "Structure des réponses",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Ouvrir avec une conclusion · Fondamentaux",
  "skill": "Clarté",
  "prompt": "Commencez par votre réponse principale avant de justifier votre raisonnement. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de clarté pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "structure-3-practice",
  "category": "structure",
  "categoryLabel": "Structure des réponses",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Ouvrir avec une conclusion · Application",
  "skill": "Clarté",
  "prompt": "Commencez par votre réponse principale avant de justifier votre raisonnement. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de clarté pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "structure-3-challenge",
  "category": "structure",
  "categoryLabel": "Structure des réponses",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Ouvrir avec une conclusion · Challenge",
  "skill": "Clarté",
  "prompt": "Commencez par votre réponse principale avant de justifier votre raisonnement. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de clarté pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "structure-4-foundation",
  "category": "structure",
  "categoryLabel": "Structure des réponses",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Quantifier un résultat · Fondamentaux",
  "skill": "Preuve",
  "prompt": "Expliquez un impact concret en précisant un indicateur réellement connu. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de preuve pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "structure-4-practice",
  "category": "structure",
  "categoryLabel": "Structure des réponses",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Quantifier un résultat · Application",
  "skill": "Preuve",
  "prompt": "Expliquez un impact concret en précisant un indicateur réellement connu. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de preuve pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "structure-4-challenge",
  "category": "structure",
  "categoryLabel": "Structure des réponses",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Quantifier un résultat · Challenge",
  "skill": "Preuve",
  "prompt": "Expliquez un impact concret en précisant un indicateur réellement connu. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de preuve pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "structure-5-foundation",
  "category": "structure",
  "categoryLabel": "Structure des réponses",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Reformuler une question ambiguë · Fondamentaux",
  "skill": "Écoute",
  "prompt": "Face à une question vague, formulez une demande de clarification professionnelle. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de écoute pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "structure-5-practice",
  "category": "structure",
  "categoryLabel": "Structure des réponses",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Reformuler une question ambiguë · Application",
  "skill": "Écoute",
  "prompt": "Face à une question vague, formulez une demande de clarification professionnelle. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de écoute pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "structure-5-challenge",
  "category": "structure",
  "categoryLabel": "Structure des réponses",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Reformuler une question ambiguë · Challenge",
  "skill": "Écoute",
  "prompt": "Face à une question vague, formulez une demande de clarification professionnelle. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de écoute pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "structure-6-foundation",
  "category": "structure",
  "categoryLabel": "Structure des réponses",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Construire un exemple négatif · Fondamentaux",
  "skill": "Réflexivité",
  "prompt": "Racontez un échec avec votre apprentissage et votre changement de pratique. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de réflexivité pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "structure-6-practice",
  "category": "structure",
  "categoryLabel": "Structure des réponses",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Construire un exemple négatif · Application",
  "skill": "Réflexivité",
  "prompt": "Racontez un échec avec votre apprentissage et votre changement de pratique. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de réflexivité pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "structure-6-challenge",
  "category": "structure",
  "categoryLabel": "Structure des réponses",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Construire un exemple négatif · Challenge",
  "skill": "Réflexivité",
  "prompt": "Racontez un échec avec votre apprentissage et votre changement de pratique. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de réflexivité pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "structure-7-foundation",
  "category": "structure",
  "categoryLabel": "Structure des réponses",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Faire court sous pression · Fondamentaux",
  "skill": "Priorisation",
  "prompt": "Répondez en moins de deux minutes à une question complexe. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de priorisation pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "structure-7-practice",
  "category": "structure",
  "categoryLabel": "Structure des réponses",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Faire court sous pression · Application",
  "skill": "Priorisation",
  "prompt": "Répondez en moins de deux minutes à une question complexe. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de priorisation pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "structure-7-challenge",
  "category": "structure",
  "categoryLabel": "Structure des réponses",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Faire court sous pression · Challenge",
  "skill": "Priorisation",
  "prompt": "Répondez en moins de deux minutes à une question complexe. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de priorisation pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "structure-8-foundation",
  "category": "structure",
  "categoryLabel": "Structure des réponses",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Faire le lien avec le poste · Fondamentaux",
  "skill": "Pertinence",
  "prompt": "Concluez un exemple en expliquant en quoi il vous prépare à la mission visée. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de pertinence pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "structure-8-practice",
  "category": "structure",
  "categoryLabel": "Structure des réponses",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Faire le lien avec le poste · Application",
  "skill": "Pertinence",
  "prompt": "Concluez un exemple en expliquant en quoi il vous prépare à la mission visée. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de pertinence pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "structure-8-challenge",
  "category": "structure",
  "categoryLabel": "Structure des réponses",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Faire le lien avec le poste · Challenge",
  "skill": "Pertinence",
  "prompt": "Concluez un exemple en expliquant en quoi il vous prépare à la mission visée. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de pertinence pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "communication-1-foundation",
  "category": "communication",
  "categoryLabel": "Communication & éloquence",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Parler avec précision · Fondamentaux",
  "skill": "Vulgarisation",
  "prompt": "Expliquez votre activité à une personne qui ne connaît pas votre métier. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de vulgarisation pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "communication-1-practice",
  "category": "communication",
  "categoryLabel": "Communication & éloquence",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Parler avec précision · Application",
  "skill": "Vulgarisation",
  "prompt": "Expliquez votre activité à une personne qui ne connaît pas votre métier. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de vulgarisation pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "communication-1-challenge",
  "category": "communication",
  "categoryLabel": "Communication & éloquence",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Parler avec précision · Challenge",
  "skill": "Vulgarisation",
  "prompt": "Expliquez votre activité à une personne qui ne connaît pas votre métier. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de vulgarisation pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "communication-2-foundation",
  "category": "communication",
  "categoryLabel": "Communication & éloquence",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Faire une pause utile · Fondamentaux",
  "skill": "Rythme",
  "prompt": "Présentez une idée en prévoyant deux pauses pour structurer votre discours. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de rythme pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "communication-2-practice",
  "category": "communication",
  "categoryLabel": "Communication & éloquence",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Faire une pause utile · Application",
  "skill": "Rythme",
  "prompt": "Présentez une idée en prévoyant deux pauses pour structurer votre discours. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de rythme pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "communication-2-challenge",
  "category": "communication",
  "categoryLabel": "Communication & éloquence",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Faire une pause utile · Challenge",
  "skill": "Rythme",
  "prompt": "Présentez une idée en prévoyant deux pauses pour structurer votre discours. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de rythme pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "communication-3-foundation",
  "category": "communication",
  "categoryLabel": "Communication & éloquence",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Éviter le jargon · Fondamentaux",
  "skill": "Pédagogie",
  "prompt": "Traduisez une réalisation technique en bénéfice métier compréhensible. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de pédagogie pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "communication-3-practice",
  "category": "communication",
  "categoryLabel": "Communication & éloquence",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Éviter le jargon · Application",
  "skill": "Pédagogie",
  "prompt": "Traduisez une réalisation technique en bénéfice métier compréhensible. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de pédagogie pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "communication-3-challenge",
  "category": "communication",
  "categoryLabel": "Communication & éloquence",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Éviter le jargon · Challenge",
  "skill": "Pédagogie",
  "prompt": "Traduisez une réalisation technique en bénéfice métier compréhensible. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de pédagogie pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "communication-4-foundation",
  "category": "communication",
  "categoryLabel": "Communication & éloquence",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Répondre avec tact · Fondamentaux",
  "skill": "Diplomatie",
  "prompt": "Corrigez poliment une affirmation inexacte formulée par un recruteur. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de diplomatie pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "communication-4-practice",
  "category": "communication",
  "categoryLabel": "Communication & éloquence",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Répondre avec tact · Application",
  "skill": "Diplomatie",
  "prompt": "Corrigez poliment une affirmation inexacte formulée par un recruteur. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de diplomatie pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "communication-4-challenge",
  "category": "communication",
  "categoryLabel": "Communication & éloquence",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Répondre avec tact · Challenge",
  "skill": "Diplomatie",
  "prompt": "Corrigez poliment une affirmation inexacte formulée par un recruteur. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de diplomatie pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "communication-5-foundation",
  "category": "communication",
  "categoryLabel": "Communication & éloquence",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Gérer une interruption · Fondamentaux",
  "skill": "Aisance",
  "prompt": "Reprenez naturellement une réponse après une interruption. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de aisance pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "communication-5-practice",
  "category": "communication",
  "categoryLabel": "Communication & éloquence",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Gérer une interruption · Application",
  "skill": "Aisance",
  "prompt": "Reprenez naturellement une réponse après une interruption. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de aisance pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "communication-5-challenge",
  "category": "communication",
  "categoryLabel": "Communication & éloquence",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Gérer une interruption · Challenge",
  "skill": "Aisance",
  "prompt": "Reprenez naturellement une réponse après une interruption. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de aisance pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "communication-6-foundation",
  "category": "communication",
  "categoryLabel": "Communication & éloquence",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Argumenter sans réciter · Fondamentaux",
  "skill": "Conviction",
  "prompt": "Défendez une proposition en variant exemples et raisonnement. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de conviction pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "communication-6-practice",
  "category": "communication",
  "categoryLabel": "Communication & éloquence",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Argumenter sans réciter · Application",
  "skill": "Conviction",
  "prompt": "Défendez une proposition en variant exemples et raisonnement. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de conviction pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "communication-6-challenge",
  "category": "communication",
  "categoryLabel": "Communication & éloquence",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Argumenter sans réciter · Challenge",
  "skill": "Conviction",
  "prompt": "Défendez une proposition en variant exemples et raisonnement. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de conviction pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "communication-7-foundation",
  "category": "communication",
  "categoryLabel": "Communication & éloquence",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Exprimer un désaccord · Fondamentaux",
  "skill": "Assertivité",
  "prompt": "Formulez un désaccord professionnel sans confrontation. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de assertivité pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "communication-7-practice",
  "category": "communication",
  "categoryLabel": "Communication & éloquence",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Exprimer un désaccord · Application",
  "skill": "Assertivité",
  "prompt": "Formulez un désaccord professionnel sans confrontation. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de assertivité pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "communication-7-challenge",
  "category": "communication",
  "categoryLabel": "Communication & éloquence",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Exprimer un désaccord · Challenge",
  "skill": "Assertivité",
  "prompt": "Formulez un désaccord professionnel sans confrontation. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de assertivité pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "communication-8-foundation",
  "category": "communication",
  "categoryLabel": "Communication & éloquence",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Conclure en une phrase · Fondamentaux",
  "skill": "Synthèse",
  "prompt": "Résumez le message principal d'une réponse en une phrase mémorable. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de synthèse pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "communication-8-practice",
  "category": "communication",
  "categoryLabel": "Communication & éloquence",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Conclure en une phrase · Application",
  "skill": "Synthèse",
  "prompt": "Résumez le message principal d'une réponse en une phrase mémorable. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de synthèse pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "communication-8-challenge",
  "category": "communication",
  "categoryLabel": "Communication & éloquence",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Conclure en une phrase · Challenge",
  "skill": "Synthèse",
  "prompt": "Résumez le message principal d'une réponse en une phrase mémorable. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de synthèse pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "confidence-1-foundation",
  "category": "confidence",
  "categoryLabel": "Confiance & gestion du stress",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Commencer malgré le trac · Fondamentaux",
  "skill": "Sérénité",
  "prompt": "Construisez une première phrase stable avant une question importante. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de sérénité pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "confidence-1-practice",
  "category": "confidence",
  "categoryLabel": "Confiance & gestion du stress",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Commencer malgré le trac · Application",
  "skill": "Sérénité",
  "prompt": "Construisez une première phrase stable avant une question importante. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de sérénité pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "confidence-1-challenge",
  "category": "confidence",
  "categoryLabel": "Confiance & gestion du stress",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Commencer malgré le trac · Challenge",
  "skill": "Sérénité",
  "prompt": "Construisez une première phrase stable avant une question importante. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de sérénité pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "confidence-2-foundation",
  "category": "confidence",
  "categoryLabel": "Confiance & gestion du stress",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Gérer une question imprévue · Fondamentaux",
  "skill": "Adaptation",
  "prompt": "Expliquez comment vous répondrez si vous avez besoin de réfléchir. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de adaptation pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "confidence-2-practice",
  "category": "confidence",
  "categoryLabel": "Confiance & gestion du stress",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Gérer une question imprévue · Application",
  "skill": "Adaptation",
  "prompt": "Expliquez comment vous répondrez si vous avez besoin de réfléchir. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de adaptation pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "confidence-2-challenge",
  "category": "confidence",
  "categoryLabel": "Confiance & gestion du stress",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Gérer une question imprévue · Challenge",
  "skill": "Adaptation",
  "prompt": "Expliquez comment vous répondrez si vous avez besoin de réfléchir. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de adaptation pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "confidence-3-foundation",
  "category": "confidence",
  "categoryLabel": "Confiance & gestion du stress",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Admettre une limite · Fondamentaux",
  "skill": "Honnêteté",
  "prompt": "Répondez à une question dont vous ignorez la réponse sans inventer. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de honnêteté pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "confidence-3-practice",
  "category": "confidence",
  "categoryLabel": "Confiance & gestion du stress",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Admettre une limite · Application",
  "skill": "Honnêteté",
  "prompt": "Répondez à une question dont vous ignorez la réponse sans inventer. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de honnêteté pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "confidence-3-challenge",
  "category": "confidence",
  "categoryLabel": "Confiance & gestion du stress",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Admettre une limite · Challenge",
  "skill": "Honnêteté",
  "prompt": "Répondez à une question dont vous ignorez la réponse sans inventer. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de honnêteté pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "confidence-4-foundation",
  "category": "confidence",
  "categoryLabel": "Confiance & gestion du stress",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Rebondir après une erreur · Fondamentaux",
  "skill": "Résilience",
  "prompt": "Rectifiez calmement une réponse que vous venez de mal formuler. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de résilience pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "confidence-4-practice",
  "category": "confidence",
  "categoryLabel": "Confiance & gestion du stress",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Rebondir après une erreur · Application",
  "skill": "Résilience",
  "prompt": "Rectifiez calmement une réponse que vous venez de mal formuler. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de résilience pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "confidence-4-challenge",
  "category": "confidence",
  "categoryLabel": "Confiance & gestion du stress",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Rebondir après une erreur · Challenge",
  "skill": "Résilience",
  "prompt": "Rectifiez calmement une réponse que vous venez de mal formuler. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de résilience pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "confidence-5-foundation",
  "category": "confidence",
  "categoryLabel": "Confiance & gestion du stress",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Faire face au silence · Fondamentaux",
  "skill": "Confort",
  "prompt": "Préparez une manière naturelle de laisser le recruteur réfléchir. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de confort pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "confidence-5-practice",
  "category": "confidence",
  "categoryLabel": "Confiance & gestion du stress",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Faire face au silence · Application",
  "skill": "Confort",
  "prompt": "Préparez une manière naturelle de laisser le recruteur réfléchir. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de confort pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "confidence-5-challenge",
  "category": "confidence",
  "categoryLabel": "Confiance & gestion du stress",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Faire face au silence · Challenge",
  "skill": "Confort",
  "prompt": "Préparez une manière naturelle de laisser le recruteur réfléchir. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de confort pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "confidence-6-foundation",
  "category": "confidence",
  "categoryLabel": "Confiance & gestion du stress",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Sortir d'une réponse confuse · Fondamentaux",
  "skill": "Clarté",
  "prompt": "Reformulez une réponse trop longue en deux idées. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de clarté pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "confidence-6-practice",
  "category": "confidence",
  "categoryLabel": "Confiance & gestion du stress",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Sortir d'une réponse confuse · Application",
  "skill": "Clarté",
  "prompt": "Reformulez une réponse trop longue en deux idées. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de clarté pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "confidence-6-challenge",
  "category": "confidence",
  "categoryLabel": "Confiance & gestion du stress",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Sortir d'une réponse confuse · Challenge",
  "skill": "Clarté",
  "prompt": "Reformulez une réponse trop longue en deux idées. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de clarté pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "confidence-7-foundation",
  "category": "confidence",
  "categoryLabel": "Confiance & gestion du stress",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Présenter sa force sans arrogance · Fondamentaux",
  "skill": "Confiance",
  "prompt": "Défendez une compétence en vous appuyant sur une preuve factuelle. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de confiance pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "confidence-7-practice",
  "category": "confidence",
  "categoryLabel": "Confiance & gestion du stress",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Présenter sa force sans arrogance · Application",
  "skill": "Confiance",
  "prompt": "Défendez une compétence en vous appuyant sur une preuve factuelle. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de confiance pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "confidence-7-challenge",
  "category": "confidence",
  "categoryLabel": "Confiance & gestion du stress",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Présenter sa force sans arrogance · Challenge",
  "skill": "Confiance",
  "prompt": "Défendez une compétence en vous appuyant sur une preuve factuelle. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de confiance pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "confidence-8-foundation",
  "category": "confidence",
  "categoryLabel": "Confiance & gestion du stress",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Recevoir une objection · Fondamentaux",
  "skill": "Résilience",
  "prompt": "Accueillez une objection sur votre expérience puis répondez avec des faits. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de résilience pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "confidence-8-practice",
  "category": "confidence",
  "categoryLabel": "Confiance & gestion du stress",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Recevoir une objection · Application",
  "skill": "Résilience",
  "prompt": "Accueillez une objection sur votre expérience puis répondez avec des faits. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de résilience pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "confidence-8-challenge",
  "category": "confidence",
  "categoryLabel": "Confiance & gestion du stress",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Recevoir une objection · Challenge",
  "skill": "Résilience",
  "prompt": "Accueillez une objection sur votre expérience puis répondez avec des faits. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de résilience pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "behavior-1-foundation",
  "category": "behavior",
  "categoryLabel": "Comportemental & soft skills",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Résoudre un conflit · Fondamentaux",
  "skill": "Conflit",
  "prompt": "Racontez un désaccord avec un collègue et la façon dont il a été résolu. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de conflit pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "behavior-1-practice",
  "category": "behavior",
  "categoryLabel": "Comportemental & soft skills",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Résoudre un conflit · Application",
  "skill": "Conflit",
  "prompt": "Racontez un désaccord avec un collègue et la façon dont il a été résolu. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de conflit pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "behavior-1-challenge",
  "category": "behavior",
  "categoryLabel": "Comportemental & soft skills",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Résoudre un conflit · Challenge",
  "skill": "Conflit",
  "prompt": "Racontez un désaccord avec un collègue et la façon dont il a été résolu. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de conflit pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "behavior-2-foundation",
  "category": "behavior",
  "categoryLabel": "Comportemental & soft skills",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Collaborer en transversal · Fondamentaux",
  "skill": "Coopération",
  "prompt": "Illustrez une réussite impliquant plusieurs équipes. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de coopération pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "behavior-2-practice",
  "category": "behavior",
  "categoryLabel": "Comportemental & soft skills",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Collaborer en transversal · Application",
  "skill": "Coopération",
  "prompt": "Illustrez une réussite impliquant plusieurs équipes. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de coopération pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "behavior-2-challenge",
  "category": "behavior",
  "categoryLabel": "Comportemental & soft skills",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Collaborer en transversal · Challenge",
  "skill": "Coopération",
  "prompt": "Illustrez une réussite impliquant plusieurs équipes. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de coopération pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "behavior-3-foundation",
  "category": "behavior",
  "categoryLabel": "Comportemental & soft skills",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Recevoir un feedback difficile · Fondamentaux",
  "skill": "Ouverture",
  "prompt": "Expliquez un retour critique et ce que vous en avez fait. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de ouverture pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "behavior-3-practice",
  "category": "behavior",
  "categoryLabel": "Comportemental & soft skills",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Recevoir un feedback difficile · Application",
  "skill": "Ouverture",
  "prompt": "Expliquez un retour critique et ce que vous en avez fait. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de ouverture pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "behavior-3-challenge",
  "category": "behavior",
  "categoryLabel": "Comportemental & soft skills",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Recevoir un feedback difficile · Challenge",
  "skill": "Ouverture",
  "prompt": "Expliquez un retour critique et ce que vous en avez fait. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de ouverture pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "behavior-4-foundation",
  "category": "behavior",
  "categoryLabel": "Comportemental & soft skills",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "S'adapter au changement · Fondamentaux",
  "skill": "Agilité",
  "prompt": "Décrivez une situation où vos priorités ont brusquement changé. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de agilité pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "behavior-4-practice",
  "category": "behavior",
  "categoryLabel": "Comportemental & soft skills",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "S'adapter au changement · Application",
  "skill": "Agilité",
  "prompt": "Décrivez une situation où vos priorités ont brusquement changé. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de agilité pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "behavior-4-challenge",
  "category": "behavior",
  "categoryLabel": "Comportemental & soft skills",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "S'adapter au changement · Challenge",
  "skill": "Agilité",
  "prompt": "Décrivez une situation où vos priorités ont brusquement changé. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de agilité pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "behavior-5-foundation",
  "category": "behavior",
  "categoryLabel": "Comportemental & soft skills",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Faire preuve d'initiative · Fondamentaux",
  "skill": "Initiative",
  "prompt": "Racontez une amélioration que vous avez proposée sans qu'on vous le demande. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de initiative pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "behavior-5-practice",
  "category": "behavior",
  "categoryLabel": "Comportemental & soft skills",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Faire preuve d'initiative · Application",
  "skill": "Initiative",
  "prompt": "Racontez une amélioration que vous avez proposée sans qu'on vous le demande. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de initiative pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "behavior-5-challenge",
  "category": "behavior",
  "categoryLabel": "Comportemental & soft skills",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Faire preuve d'initiative · Challenge",
  "skill": "Initiative",
  "prompt": "Racontez une amélioration que vous avez proposée sans qu'on vous le demande. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de initiative pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "behavior-6-foundation",
  "category": "behavior",
  "categoryLabel": "Comportemental & soft skills",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Agir avec éthique · Fondamentaux",
  "skill": "Éthique",
  "prompt": "Expliquez comment vous avez géré un dilemme professionnel. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de éthique pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "behavior-6-practice",
  "category": "behavior",
  "categoryLabel": "Comportemental & soft skills",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Agir avec éthique · Application",
  "skill": "Éthique",
  "prompt": "Expliquez comment vous avez géré un dilemme professionnel. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de éthique pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "behavior-6-challenge",
  "category": "behavior",
  "categoryLabel": "Comportemental & soft skills",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Agir avec éthique · Challenge",
  "skill": "Éthique",
  "prompt": "Expliquez comment vous avez géré un dilemme professionnel. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de éthique pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "behavior-7-foundation",
  "category": "behavior",
  "categoryLabel": "Comportemental & soft skills",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Apprendre rapidement · Fondamentaux",
  "skill": "Apprentissage",
  "prompt": "Présentez une compétence acquise pour résoudre un problème nouveau. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de apprentissage pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "behavior-7-practice",
  "category": "behavior",
  "categoryLabel": "Comportemental & soft skills",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Apprendre rapidement · Application",
  "skill": "Apprentissage",
  "prompt": "Présentez une compétence acquise pour résoudre un problème nouveau. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de apprentissage pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "behavior-7-challenge",
  "category": "behavior",
  "categoryLabel": "Comportemental & soft skills",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Apprendre rapidement · Challenge",
  "skill": "Apprentissage",
  "prompt": "Présentez une compétence acquise pour résoudre un problème nouveau. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de apprentissage pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "behavior-8-foundation",
  "category": "behavior",
  "categoryLabel": "Comportemental & soft skills",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Aider un collègue · Fondamentaux",
  "skill": "Entraide",
  "prompt": "Donnez un exemple de soutien apporté à un pair. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de entraide pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "behavior-8-practice",
  "category": "behavior",
  "categoryLabel": "Comportemental & soft skills",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Aider un collègue · Application",
  "skill": "Entraide",
  "prompt": "Donnez un exemple de soutien apporté à un pair. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de entraide pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "behavior-8-challenge",
  "category": "behavior",
  "categoryLabel": "Comportemental & soft skills",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Aider un collègue · Challenge",
  "skill": "Entraide",
  "prompt": "Donnez un exemple de soutien apporté à un pair. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de entraide pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "leadership-1-foundation",
  "category": "leadership",
  "categoryLabel": "Leadership & management",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Donner un cap · Fondamentaux",
  "skill": "Vision",
  "prompt": "Expliquez comment vous avez mobilisé une équipe autour d'un objectif. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de vision pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "leadership-1-practice",
  "category": "leadership",
  "categoryLabel": "Leadership & management",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Donner un cap · Application",
  "skill": "Vision",
  "prompt": "Expliquez comment vous avez mobilisé une équipe autour d'un objectif. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de vision pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "leadership-1-challenge",
  "category": "leadership",
  "categoryLabel": "Leadership & management",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Donner un cap · Challenge",
  "skill": "Vision",
  "prompt": "Expliquez comment vous avez mobilisé une équipe autour d'un objectif. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de vision pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "leadership-2-foundation",
  "category": "leadership",
  "categoryLabel": "Leadership & management",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Déléguer efficacement · Fondamentaux",
  "skill": "Délégation",
  "prompt": "Racontez comment vous avez confié une responsabilité et assuré le suivi. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de délégation pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "leadership-2-practice",
  "category": "leadership",
  "categoryLabel": "Leadership & management",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Déléguer efficacement · Application",
  "skill": "Délégation",
  "prompt": "Racontez comment vous avez confié une responsabilité et assuré le suivi. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de délégation pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "leadership-2-challenge",
  "category": "leadership",
  "categoryLabel": "Leadership & management",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Déléguer efficacement · Challenge",
  "skill": "Délégation",
  "prompt": "Racontez comment vous avez confié une responsabilité et assuré le suivi. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de délégation pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "leadership-3-foundation",
  "category": "leadership",
  "categoryLabel": "Leadership & management",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Gérer une sous-performance · Fondamentaux",
  "skill": "Coaching",
  "prompt": "Décrivez comment vous accompagneriez un collaborateur en difficulté. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de coaching pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "leadership-3-practice",
  "category": "leadership",
  "categoryLabel": "Leadership & management",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Gérer une sous-performance · Application",
  "skill": "Coaching",
  "prompt": "Décrivez comment vous accompagneriez un collaborateur en difficulté. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de coaching pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "leadership-3-challenge",
  "category": "leadership",
  "categoryLabel": "Leadership & management",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Gérer une sous-performance · Challenge",
  "skill": "Coaching",
  "prompt": "Décrivez comment vous accompagneriez un collaborateur en difficulté. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de coaching pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "leadership-4-foundation",
  "category": "leadership",
  "categoryLabel": "Leadership & management",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Conduire le changement · Fondamentaux",
  "skill": "Changement",
  "prompt": "Présentez une transformation à laquelle vous avez contribué. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de changement pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "leadership-4-practice",
  "category": "leadership",
  "categoryLabel": "Leadership & management",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Conduire le changement · Application",
  "skill": "Changement",
  "prompt": "Présentez une transformation à laquelle vous avez contribué. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de changement pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "leadership-4-challenge",
  "category": "leadership",
  "categoryLabel": "Leadership & management",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Conduire le changement · Challenge",
  "skill": "Changement",
  "prompt": "Présentez une transformation à laquelle vous avez contribué. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de changement pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "leadership-5-foundation",
  "category": "leadership",
  "categoryLabel": "Leadership & management",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Prioriser une équipe · Fondamentaux",
  "skill": "Priorités",
  "prompt": "Expliquez comment répartir les efforts face à trois urgences concurrentes. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de priorités pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "leadership-5-practice",
  "category": "leadership",
  "categoryLabel": "Leadership & management",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Prioriser une équipe · Application",
  "skill": "Priorités",
  "prompt": "Expliquez comment répartir les efforts face à trois urgences concurrentes. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de priorités pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "leadership-5-challenge",
  "category": "leadership",
  "categoryLabel": "Leadership & management",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Prioriser une équipe · Challenge",
  "skill": "Priorités",
  "prompt": "Expliquez comment répartir les efforts face à trois urgences concurrentes. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de priorités pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "leadership-6-foundation",
  "category": "leadership",
  "categoryLabel": "Leadership & management",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Influencer sans autorité · Fondamentaux",
  "skill": "Influence",
  "prompt": "Racontez comment vous avez obtenu l'adhésion d'un acteur hors de votre hiérarchie. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de influence pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "leadership-6-practice",
  "category": "leadership",
  "categoryLabel": "Leadership & management",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Influencer sans autorité · Application",
  "skill": "Influence",
  "prompt": "Racontez comment vous avez obtenu l'adhésion d'un acteur hors de votre hiérarchie. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de influence pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "leadership-6-challenge",
  "category": "leadership",
  "categoryLabel": "Leadership & management",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Influencer sans autorité · Challenge",
  "skill": "Influence",
  "prompt": "Racontez comment vous avez obtenu l'adhésion d'un acteur hors de votre hiérarchie. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de influence pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "leadership-7-foundation",
  "category": "leadership",
  "categoryLabel": "Leadership & management",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Gérer un conflit d'équipe · Fondamentaux",
  "skill": "Médiation",
  "prompt": "Décrivez la façon dont vous restaureriez une collaboration dégradée. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de médiation pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "leadership-7-practice",
  "category": "leadership",
  "categoryLabel": "Leadership & management",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Gérer un conflit d'équipe · Application",
  "skill": "Médiation",
  "prompt": "Décrivez la façon dont vous restaureriez une collaboration dégradée. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de médiation pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "leadership-7-challenge",
  "category": "leadership",
  "categoryLabel": "Leadership & management",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Gérer un conflit d'équipe · Challenge",
  "skill": "Médiation",
  "prompt": "Décrivez la façon dont vous restaureriez une collaboration dégradée. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de médiation pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "leadership-8-foundation",
  "category": "leadership",
  "categoryLabel": "Leadership & management",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Prendre une décision impopulaire · Fondamentaux",
  "skill": "Courage",
  "prompt": "Justifiez une décision nécessaire malgré des résistances. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de courage pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "leadership-8-practice",
  "category": "leadership",
  "categoryLabel": "Leadership & management",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Prendre une décision impopulaire · Application",
  "skill": "Courage",
  "prompt": "Justifiez une décision nécessaire malgré des résistances. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de courage pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "leadership-8-challenge",
  "category": "leadership",
  "categoryLabel": "Leadership & management",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Prendre une décision impopulaire · Challenge",
  "skill": "Courage",
  "prompt": "Justifiez une décision nécessaire malgré des résistances. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de courage pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "negotiation-1-foundation",
  "category": "negotiation",
  "categoryLabel": "Négociation & questions difficiles",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Parler de rémunération · Fondamentaux",
  "skill": "Négociation",
  "prompt": "Présentez vos attentes salariales avec une justification professionnelle. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de négociation pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "negotiation-1-practice",
  "category": "negotiation",
  "categoryLabel": "Négociation & questions difficiles",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Parler de rémunération · Application",
  "skill": "Négociation",
  "prompt": "Présentez vos attentes salariales avec une justification professionnelle. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de négociation pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "negotiation-1-challenge",
  "category": "negotiation",
  "categoryLabel": "Négociation & questions difficiles",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Parler de rémunération · Challenge",
  "skill": "Négociation",
  "prompt": "Présentez vos attentes salariales avec une justification professionnelle. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de négociation pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "negotiation-2-foundation",
  "category": "negotiation",
  "categoryLabel": "Négociation & questions difficiles",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Expliquer un départ · Fondamentaux",
  "skill": "Diplomatie",
  "prompt": "Expliquez pourquoi vous quittez votre poste sans dénigrer votre employeur. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de diplomatie pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "negotiation-2-practice",
  "category": "negotiation",
  "categoryLabel": "Négociation & questions difficiles",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Expliquer un départ · Application",
  "skill": "Diplomatie",
  "prompt": "Expliquez pourquoi vous quittez votre poste sans dénigrer votre employeur. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de diplomatie pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "negotiation-2-challenge",
  "category": "negotiation",
  "categoryLabel": "Négociation & questions difficiles",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Expliquer un départ · Challenge",
  "skill": "Diplomatie",
  "prompt": "Expliquez pourquoi vous quittez votre poste sans dénigrer votre employeur. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de diplomatie pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "negotiation-3-foundation",
  "category": "negotiation",
  "categoryLabel": "Négociation & questions difficiles",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Justifier un manque d'expérience · Fondamentaux",
  "skill": "Transfert",
  "prompt": "Présentez vos compétences transférables face à une exigence non maîtrisée. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de transfert pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "negotiation-3-practice",
  "category": "negotiation",
  "categoryLabel": "Négociation & questions difficiles",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Justifier un manque d'expérience · Application",
  "skill": "Transfert",
  "prompt": "Présentez vos compétences transférables face à une exigence non maîtrisée. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de transfert pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "negotiation-3-challenge",
  "category": "negotiation",
  "categoryLabel": "Négociation & questions difficiles",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Justifier un manque d'expérience · Challenge",
  "skill": "Transfert",
  "prompt": "Présentez vos compétences transférables face à une exigence non maîtrisée. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de transfert pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "negotiation-4-foundation",
  "category": "negotiation",
  "categoryLabel": "Négociation & questions difficiles",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Répondre à une objection · Fondamentaux",
  "skill": "Conviction",
  "prompt": "Répondez à : votre profil semble différent de ce que nous cherchons. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de conviction pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "negotiation-4-practice",
  "category": "negotiation",
  "categoryLabel": "Négociation & questions difficiles",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Répondre à une objection · Application",
  "skill": "Conviction",
  "prompt": "Répondez à : votre profil semble différent de ce que nous cherchons. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de conviction pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "negotiation-4-challenge",
  "category": "negotiation",
  "categoryLabel": "Négociation & questions difficiles",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Répondre à une objection · Challenge",
  "skill": "Conviction",
  "prompt": "Répondez à : votre profil semble différent de ce que nous cherchons. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de conviction pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "negotiation-5-foundation",
  "category": "negotiation",
  "categoryLabel": "Négociation & questions difficiles",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Aborder une rupture de contrat · Fondamentaux",
  "skill": "Transparence",
  "prompt": "Expliquez factuellement une fin de collaboration difficile. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de transparence pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "negotiation-5-practice",
  "category": "negotiation",
  "categoryLabel": "Négociation & questions difficiles",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Aborder une rupture de contrat · Application",
  "skill": "Transparence",
  "prompt": "Expliquez factuellement une fin de collaboration difficile. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de transparence pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "negotiation-5-challenge",
  "category": "negotiation",
  "categoryLabel": "Négociation & questions difficiles",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Aborder une rupture de contrat · Challenge",
  "skill": "Transparence",
  "prompt": "Expliquez factuellement une fin de collaboration difficile. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de transparence pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "negotiation-6-foundation",
  "category": "negotiation",
  "categoryLabel": "Négociation & questions difficiles",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Gérer deux offres · Fondamentaux",
  "skill": "Professionnalisme",
  "prompt": "Expliquez avec tact que vous avez plusieurs processus en cours. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de professionnalisme pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "negotiation-6-practice",
  "category": "negotiation",
  "categoryLabel": "Négociation & questions difficiles",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Gérer deux offres · Application",
  "skill": "Professionnalisme",
  "prompt": "Expliquez avec tact que vous avez plusieurs processus en cours. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de professionnalisme pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "negotiation-6-challenge",
  "category": "negotiation",
  "categoryLabel": "Négociation & questions difficiles",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Gérer deux offres · Challenge",
  "skill": "Professionnalisme",
  "prompt": "Expliquez avec tact que vous avez plusieurs processus en cours. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de professionnalisme pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "negotiation-7-foundation",
  "category": "negotiation",
  "categoryLabel": "Négociation & questions difficiles",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Négocier une date de démarrage · Fondamentaux",
  "skill": "Accord",
  "prompt": "Proposez un calendrier de prise de poste réaliste. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de accord pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "negotiation-7-practice",
  "category": "negotiation",
  "categoryLabel": "Négociation & questions difficiles",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Négocier une date de démarrage · Application",
  "skill": "Accord",
  "prompt": "Proposez un calendrier de prise de poste réaliste. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de accord pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "negotiation-7-challenge",
  "category": "negotiation",
  "categoryLabel": "Négociation & questions difficiles",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Négocier une date de démarrage · Challenge",
  "skill": "Accord",
  "prompt": "Proposez un calendrier de prise de poste réaliste. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de accord pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "negotiation-8-foundation",
  "category": "negotiation",
  "categoryLabel": "Négociation & questions difficiles",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Poser une question exigeante · Fondamentaux",
  "skill": "Curiosité",
  "prompt": "Posez une question pertinente sur les difficultés du poste. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de curiosité pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "negotiation-8-practice",
  "category": "negotiation",
  "categoryLabel": "Négociation & questions difficiles",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Poser une question exigeante · Application",
  "skill": "Curiosité",
  "prompt": "Posez une question pertinente sur les difficultés du poste. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de curiosité pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "negotiation-8-challenge",
  "category": "negotiation",
  "categoryLabel": "Négociation & questions difficiles",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Poser une question exigeante · Challenge",
  "skill": "Curiosité",
  "prompt": "Posez une question pertinente sur les difficultés du poste. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de curiosité pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "problem-1-foundation",
  "category": "problem",
  "categoryLabel": "Résolution de problèmes",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Analyser un problème inconnu · Fondamentaux",
  "skill": "Analyse",
  "prompt": "Expliquez comment vous cadreriez un problème avec peu d'informations. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de analyse pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "problem-1-practice",
  "category": "problem",
  "categoryLabel": "Résolution de problèmes",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Analyser un problème inconnu · Application",
  "skill": "Analyse",
  "prompt": "Expliquez comment vous cadreriez un problème avec peu d'informations. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de analyse pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "problem-1-challenge",
  "category": "problem",
  "categoryLabel": "Résolution de problèmes",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Analyser un problème inconnu · Challenge",
  "skill": "Analyse",
  "prompt": "Expliquez comment vous cadreriez un problème avec peu d'informations. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de analyse pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "problem-2-foundation",
  "category": "problem",
  "categoryLabel": "Résolution de problèmes",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Prioriser des hypothèses · Fondamentaux",
  "skill": "Hypothèses",
  "prompt": "Choisissez deux hypothèses à tester pour comprendre une baisse de performance. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de hypothèses pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "problem-2-practice",
  "category": "problem",
  "categoryLabel": "Résolution de problèmes",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Prioriser des hypothèses · Application",
  "skill": "Hypothèses",
  "prompt": "Choisissez deux hypothèses à tester pour comprendre une baisse de performance. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de hypothèses pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "problem-2-challenge",
  "category": "problem",
  "categoryLabel": "Résolution de problèmes",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Prioriser des hypothèses · Challenge",
  "skill": "Hypothèses",
  "prompt": "Choisissez deux hypothèses à tester pour comprendre une baisse de performance. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de hypothèses pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "problem-3-foundation",
  "category": "problem",
  "categoryLabel": "Résolution de problèmes",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Décider avec des données incomplètes · Fondamentaux",
  "skill": "Jugement",
  "prompt": "Présentez votre méthode de décision sous incertitude. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de jugement pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "problem-3-practice",
  "category": "problem",
  "categoryLabel": "Résolution de problèmes",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Décider avec des données incomplètes · Application",
  "skill": "Jugement",
  "prompt": "Présentez votre méthode de décision sous incertitude. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de jugement pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "problem-3-challenge",
  "category": "problem",
  "categoryLabel": "Résolution de problèmes",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Décider avec des données incomplètes · Challenge",
  "skill": "Jugement",
  "prompt": "Présentez votre méthode de décision sous incertitude. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de jugement pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "problem-4-foundation",
  "category": "problem",
  "categoryLabel": "Résolution de problèmes",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Mesurer un impact · Fondamentaux",
  "skill": "Mesure",
  "prompt": "Définissez trois indicateurs utiles pour évaluer une nouvelle initiative. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de mesure pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "problem-4-practice",
  "category": "problem",
  "categoryLabel": "Résolution de problèmes",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Mesurer un impact · Application",
  "skill": "Mesure",
  "prompt": "Définissez trois indicateurs utiles pour évaluer une nouvelle initiative. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de mesure pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "problem-4-challenge",
  "category": "problem",
  "categoryLabel": "Résolution de problèmes",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Mesurer un impact · Challenge",
  "skill": "Mesure",
  "prompt": "Définissez trois indicateurs utiles pour évaluer une nouvelle initiative. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de mesure pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "problem-5-foundation",
  "category": "problem",
  "categoryLabel": "Résolution de problèmes",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Diagnostiquer une dérive · Fondamentaux",
  "skill": "Diagnostic",
  "prompt": "Expliquez votre démarche face à un projet en retard. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de diagnostic pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "problem-5-practice",
  "category": "problem",
  "categoryLabel": "Résolution de problèmes",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Diagnostiquer une dérive · Application",
  "skill": "Diagnostic",
  "prompt": "Expliquez votre démarche face à un projet en retard. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de diagnostic pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "problem-5-challenge",
  "category": "problem",
  "categoryLabel": "Résolution de problèmes",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Diagnostiquer une dérive · Challenge",
  "skill": "Diagnostic",
  "prompt": "Expliquez votre démarche face à un projet en retard. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de diagnostic pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "problem-6-foundation",
  "category": "problem",
  "categoryLabel": "Résolution de problèmes",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Arbitrer un compromis · Fondamentaux",
  "skill": "Arbitrage",
  "prompt": "Présentez un choix entre qualité, délai et coût. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de arbitrage pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "problem-6-practice",
  "category": "problem",
  "categoryLabel": "Résolution de problèmes",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Arbitrer un compromis · Application",
  "skill": "Arbitrage",
  "prompt": "Présentez un choix entre qualité, délai et coût. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de arbitrage pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "problem-6-challenge",
  "category": "problem",
  "categoryLabel": "Résolution de problèmes",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Arbitrer un compromis · Challenge",
  "skill": "Arbitrage",
  "prompt": "Présentez un choix entre qualité, délai et coût. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de arbitrage pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "problem-7-foundation",
  "category": "problem",
  "categoryLabel": "Résolution de problèmes",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Faire un plan d'action · Fondamentaux",
  "skill": "Exécution",
  "prompt": "Construisez les trois premières étapes face à une situation urgente. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de exécution pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "problem-7-practice",
  "category": "problem",
  "categoryLabel": "Résolution de problèmes",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Faire un plan d'action · Application",
  "skill": "Exécution",
  "prompt": "Construisez les trois premières étapes face à une situation urgente. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de exécution pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "problem-7-challenge",
  "category": "problem",
  "categoryLabel": "Résolution de problèmes",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Faire un plan d'action · Challenge",
  "skill": "Exécution",
  "prompt": "Construisez les trois premières étapes face à une situation urgente. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de exécution pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "problem-8-foundation",
  "category": "problem",
  "categoryLabel": "Résolution de problèmes",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Expliquer un échec d'analyse · Fondamentaux",
  "skill": "Apprentissage",
  "prompt": "Décrivez une hypothèse démentie par les faits et votre réaction. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de apprentissage pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "problem-8-practice",
  "category": "problem",
  "categoryLabel": "Résolution de problèmes",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Expliquer un échec d'analyse · Application",
  "skill": "Apprentissage",
  "prompt": "Décrivez une hypothèse démentie par les faits et votre réaction. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de apprentissage pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "problem-8-challenge",
  "category": "problem",
  "categoryLabel": "Résolution de problèmes",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Expliquer un échec d'analyse · Challenge",
  "skill": "Apprentissage",
  "prompt": "Décrivez une hypothèse démentie par les faits et votre réaction. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de apprentissage pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "technical-1-foundation",
  "category": "technical",
  "categoryLabel": "Entretiens techniques & métiers",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Expliquer une architecture · Fondamentaux",
  "skill": "Architecture",
  "prompt": "Présentez l'architecture générale d'un système que vous connaissez. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de architecture pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "technical-1-practice",
  "category": "technical",
  "categoryLabel": "Entretiens techniques & métiers",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Expliquer une architecture · Application",
  "skill": "Architecture",
  "prompt": "Présentez l'architecture générale d'un système que vous connaissez. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de architecture pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "technical-1-challenge",
  "category": "technical",
  "categoryLabel": "Entretiens techniques & métiers",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Expliquer une architecture · Challenge",
  "skill": "Architecture",
  "prompt": "Présentez l'architecture générale d'un système que vous connaissez. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de architecture pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "technical-2-foundation",
  "category": "technical",
  "categoryLabel": "Entretiens techniques & métiers",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Défendre un choix technique · Fondamentaux",
  "skill": "Trade-off",
  "prompt": "Justifiez une technologie face à une alternative crédible. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de trade-off pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "technical-2-practice",
  "category": "technical",
  "categoryLabel": "Entretiens techniques & métiers",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Défendre un choix technique · Application",
  "skill": "Trade-off",
  "prompt": "Justifiez une technologie face à une alternative crédible. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de trade-off pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "technical-2-challenge",
  "category": "technical",
  "categoryLabel": "Entretiens techniques & métiers",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Défendre un choix technique · Challenge",
  "skill": "Trade-off",
  "prompt": "Justifiez une technologie face à une alternative crédible. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de trade-off pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "technical-3-foundation",
  "category": "technical",
  "categoryLabel": "Entretiens techniques & métiers",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Traiter un incident · Fondamentaux",
  "skill": "Incident",
  "prompt": "Décrivez votre démarche face à une panne critique. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de incident pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "technical-3-practice",
  "category": "technical",
  "categoryLabel": "Entretiens techniques & métiers",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Traiter un incident · Application",
  "skill": "Incident",
  "prompt": "Décrivez votre démarche face à une panne critique. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de incident pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "technical-3-challenge",
  "category": "technical",
  "categoryLabel": "Entretiens techniques & métiers",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Traiter un incident · Challenge",
  "skill": "Incident",
  "prompt": "Décrivez votre démarche face à une panne critique. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de incident pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "technical-4-foundation",
  "category": "technical",
  "categoryLabel": "Entretiens techniques & métiers",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Fiabiliser la qualité · Fondamentaux",
  "skill": "Qualité",
  "prompt": "Expliquez comment vous testez et validez un livrable. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de qualité pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "technical-4-practice",
  "category": "technical",
  "categoryLabel": "Entretiens techniques & métiers",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Fiabiliser la qualité · Application",
  "skill": "Qualité",
  "prompt": "Expliquez comment vous testez et validez un livrable. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de qualité pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "technical-4-challenge",
  "category": "technical",
  "categoryLabel": "Entretiens techniques & métiers",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Fiabiliser la qualité · Challenge",
  "skill": "Qualité",
  "prompt": "Expliquez comment vous testez et validez un livrable. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de qualité pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "technical-5-foundation",
  "category": "technical",
  "categoryLabel": "Entretiens techniques & métiers",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Protéger les données · Fondamentaux",
  "skill": "Sécurité",
  "prompt": "Présentez les précautions prises pour traiter des données sensibles. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de sécurité pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "technical-5-practice",
  "category": "technical",
  "categoryLabel": "Entretiens techniques & métiers",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Protéger les données · Application",
  "skill": "Sécurité",
  "prompt": "Présentez les précautions prises pour traiter des données sensibles. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de sécurité pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "technical-5-challenge",
  "category": "technical",
  "categoryLabel": "Entretiens techniques & métiers",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Protéger les données · Challenge",
  "skill": "Sécurité",
  "prompt": "Présentez les précautions prises pour traiter des données sensibles. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de sécurité pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "technical-6-foundation",
  "category": "technical",
  "categoryLabel": "Entretiens techniques & métiers",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Faire parler des données · Fondamentaux",
  "skill": "Analyse",
  "prompt": "Racontez comment vous avez transformé une analyse en décision. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de analyse pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "technical-6-practice",
  "category": "technical",
  "categoryLabel": "Entretiens techniques & métiers",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Faire parler des données · Application",
  "skill": "Analyse",
  "prompt": "Racontez comment vous avez transformé une analyse en décision. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de analyse pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "technical-6-challenge",
  "category": "technical",
  "categoryLabel": "Entretiens techniques & métiers",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Faire parler des données · Challenge",
  "skill": "Analyse",
  "prompt": "Racontez comment vous avez transformé une analyse en décision. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de analyse pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "technical-7-foundation",
  "category": "technical",
  "categoryLabel": "Entretiens techniques & métiers",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Gérer une dette technique · Fondamentaux",
  "skill": "Priorisation",
  "prompt": "Justifiez votre méthode de priorisation d'une dette technique. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de priorisation pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "technical-7-practice",
  "category": "technical",
  "categoryLabel": "Entretiens techniques & métiers",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Gérer une dette technique · Application",
  "skill": "Priorisation",
  "prompt": "Justifiez votre méthode de priorisation d'une dette technique. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de priorisation pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "technical-7-challenge",
  "category": "technical",
  "categoryLabel": "Entretiens techniques & métiers",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Gérer une dette technique · Challenge",
  "skill": "Priorisation",
  "prompt": "Justifiez votre méthode de priorisation d'une dette technique. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de priorisation pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "technical-8-foundation",
  "category": "technical",
  "categoryLabel": "Entretiens techniques & métiers",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Collaborer avec le métier · Fondamentaux",
  "skill": "Collaboration",
  "prompt": "Expliquez comment vous traduisez un besoin métier en exigences concrètes. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de collaboration pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "technical-8-practice",
  "category": "technical",
  "categoryLabel": "Entretiens techniques & métiers",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Collaborer avec le métier · Application",
  "skill": "Collaboration",
  "prompt": "Expliquez comment vous traduisez un besoin métier en exigences concrètes. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de collaboration pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "technical-8-challenge",
  "category": "technical",
  "categoryLabel": "Entretiens techniques & métiers",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Collaborer avec le métier · Challenge",
  "skill": "Collaboration",
  "prompt": "Expliquez comment vous traduisez un besoin métier en exigences concrètes. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de collaboration pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "graduates-1-foundation",
  "category": "graduates",
  "categoryLabel": "Stages & premier emploi",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Présenter un projet académique · Fondamentaux",
  "skill": "Projet",
  "prompt": "Présentez un projet d'études comme une expérience démontrant une compétence. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de projet pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "graduates-1-practice",
  "category": "graduates",
  "categoryLabel": "Stages & premier emploi",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Présenter un projet académique · Application",
  "skill": "Projet",
  "prompt": "Présentez un projet d'études comme une expérience démontrant une compétence. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de projet pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "graduates-1-challenge",
  "category": "graduates",
  "categoryLabel": "Stages & premier emploi",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Présenter un projet académique · Challenge",
  "skill": "Projet",
  "prompt": "Présentez un projet d'études comme une expérience démontrant une compétence. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de projet pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "graduates-2-foundation",
  "category": "graduates",
  "categoryLabel": "Stages & premier emploi",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Valoriser un stage · Fondamentaux",
  "skill": "Contribution",
  "prompt": "Racontez une contribution précise apportée pendant un stage. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de contribution pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "graduates-2-practice",
  "category": "graduates",
  "categoryLabel": "Stages & premier emploi",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Valoriser un stage · Application",
  "skill": "Contribution",
  "prompt": "Racontez une contribution précise apportée pendant un stage. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de contribution pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "graduates-2-challenge",
  "category": "graduates",
  "categoryLabel": "Stages & premier emploi",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Valoriser un stage · Challenge",
  "skill": "Contribution",
  "prompt": "Racontez une contribution précise apportée pendant un stage. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de contribution pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "graduates-3-foundation",
  "category": "graduates",
  "categoryLabel": "Stages & premier emploi",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Parler sans expérience · Fondamentaux",
  "skill": "Potentiel",
  "prompt": "Répondez à la question : pourquoi vous choisir sans expérience professionnelle ? Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de potentiel pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "graduates-3-practice",
  "category": "graduates",
  "categoryLabel": "Stages & premier emploi",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Parler sans expérience · Application",
  "skill": "Potentiel",
  "prompt": "Répondez à la question : pourquoi vous choisir sans expérience professionnelle ? Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de potentiel pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "graduates-3-challenge",
  "category": "graduates",
  "categoryLabel": "Stages & premier emploi",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Parler sans expérience · Challenge",
  "skill": "Potentiel",
  "prompt": "Répondez à la question : pourquoi vous choisir sans expérience professionnelle ? Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de potentiel pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "graduates-4-foundation",
  "category": "graduates",
  "categoryLabel": "Stages & premier emploi",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Expliquer son mémoire ou PFE · Fondamentaux",
  "skill": "PFE",
  "prompt": "Présentez la problématique, la méthode et le résultat de votre projet de fin d'études. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de pfe pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "graduates-4-practice",
  "category": "graduates",
  "categoryLabel": "Stages & premier emploi",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Expliquer son mémoire ou PFE · Application",
  "skill": "PFE",
  "prompt": "Présentez la problématique, la méthode et le résultat de votre projet de fin d'études. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de pfe pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "graduates-4-challenge",
  "category": "graduates",
  "categoryLabel": "Stages & premier emploi",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Expliquer son mémoire ou PFE · Challenge",
  "skill": "PFE",
  "prompt": "Présentez la problématique, la méthode et le résultat de votre projet de fin d'études. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de pfe pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "graduates-5-foundation",
  "category": "graduates",
  "categoryLabel": "Stages & premier emploi",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Exprimer sa motivation junior · Fondamentaux",
  "skill": "Apprentissage",
  "prompt": "Expliquez ce que vous voulez apprendre dans les premiers mois. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de apprentissage pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "graduates-5-practice",
  "category": "graduates",
  "categoryLabel": "Stages & premier emploi",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Exprimer sa motivation junior · Application",
  "skill": "Apprentissage",
  "prompt": "Expliquez ce que vous voulez apprendre dans les premiers mois. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de apprentissage pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "graduates-5-challenge",
  "category": "graduates",
  "categoryLabel": "Stages & premier emploi",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Exprimer sa motivation junior · Challenge",
  "skill": "Apprentissage",
  "prompt": "Expliquez ce que vous voulez apprendre dans les premiers mois. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de apprentissage pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "graduates-6-foundation",
  "category": "graduates",
  "categoryLabel": "Stages & premier emploi",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Valoriser une association · Fondamentaux",
  "skill": "Transfert",
  "prompt": "Reliez un engagement associatif à une compétence professionnelle. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de transfert pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "graduates-6-practice",
  "category": "graduates",
  "categoryLabel": "Stages & premier emploi",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Valoriser une association · Application",
  "skill": "Transfert",
  "prompt": "Reliez un engagement associatif à une compétence professionnelle. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de transfert pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "graduates-6-challenge",
  "category": "graduates",
  "categoryLabel": "Stages & premier emploi",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Valoriser une association · Challenge",
  "skill": "Transfert",
  "prompt": "Reliez un engagement associatif à une compétence professionnelle. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de transfert pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "graduates-7-foundation",
  "category": "graduates",
  "categoryLabel": "Stages & premier emploi",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Demander un encadrement · Fondamentaux",
  "skill": "Autonomie",
  "prompt": "Expliquez le type de feedback dont vous avez besoin pour progresser. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de autonomie pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "graduates-7-practice",
  "category": "graduates",
  "categoryLabel": "Stages & premier emploi",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Demander un encadrement · Application",
  "skill": "Autonomie",
  "prompt": "Expliquez le type de feedback dont vous avez besoin pour progresser. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de autonomie pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "graduates-7-challenge",
  "category": "graduates",
  "categoryLabel": "Stages & premier emploi",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Demander un encadrement · Challenge",
  "skill": "Autonomie",
  "prompt": "Expliquez le type de feedback dont vous avez besoin pour progresser. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de autonomie pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "graduates-8-foundation",
  "category": "graduates",
  "categoryLabel": "Stages & premier emploi",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Poser ses premières questions · Fondamentaux",
  "skill": "Curiosité",
  "prompt": "Formulez trois questions de qualité sur un stage. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de curiosité pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "graduates-8-practice",
  "category": "graduates",
  "categoryLabel": "Stages & premier emploi",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Poser ses premières questions · Application",
  "skill": "Curiosité",
  "prompt": "Formulez trois questions de qualité sur un stage. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de curiosité pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "graduates-8-challenge",
  "category": "graduates",
  "categoryLabel": "Stages & premier emploi",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Poser ses premières questions · Challenge",
  "skill": "Curiosité",
  "prompt": "Formulez trois questions de qualité sur un stage. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de curiosité pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "international-1-foundation",
  "category": "international",
  "categoryLabel": "Entretiens internationaux",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Introduce yourself in English · Fondamentaux",
  "skill": "English",
  "prompt": "Introduce your background and career goal in clear professional English. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de english pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "international-1-practice",
  "category": "international",
  "categoryLabel": "Entretiens internationaux",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Introduce yourself in English · Application",
  "skill": "English",
  "prompt": "Introduce your background and career goal in clear professional English. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de english pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "international-1-challenge",
  "category": "international",
  "categoryLabel": "Entretiens internationaux",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Introduce yourself in English · Challenge",
  "skill": "English",
  "prompt": "Introduce your background and career goal in clear professional English. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de english pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "international-2-foundation",
  "category": "international",
  "categoryLabel": "Entretiens internationaux",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Behavioral interview in English · Fondamentaux",
  "skill": "English",
  "prompt": "Tell me about a time you handled disagreement in an international team. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de english pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "international-2-practice",
  "category": "international",
  "categoryLabel": "Entretiens internationaux",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Behavioral interview in English · Application",
  "skill": "English",
  "prompt": "Tell me about a time you handled disagreement in an international team. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de english pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "international-2-challenge",
  "category": "international",
  "categoryLabel": "Entretiens internationaux",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Behavioral interview in English · Challenge",
  "skill": "English",
  "prompt": "Tell me about a time you handled disagreement in an international team. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de english pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "international-3-foundation",
  "category": "international",
  "categoryLabel": "Entretiens internationaux",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Explain a career move · Fondamentaux",
  "skill": "English",
  "prompt": "Explain why you are considering an international opportunity. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de english pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "international-3-practice",
  "category": "international",
  "categoryLabel": "Entretiens internationaux",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Explain a career move · Application",
  "skill": "English",
  "prompt": "Explain why you are considering an international opportunity. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de english pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "international-3-challenge",
  "category": "international",
  "categoryLabel": "Entretiens internationaux",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Explain a career move · Challenge",
  "skill": "English",
  "prompt": "Explain why you are considering an international opportunity. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de english pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "international-4-foundation",
  "category": "international",
  "categoryLabel": "Entretiens internationaux",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Remote collaboration · Fondamentaux",
  "skill": "Remote",
  "prompt": "Describe how you collaborate effectively across time zones. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de remote pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "international-4-practice",
  "category": "international",
  "categoryLabel": "Entretiens internationaux",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Remote collaboration · Application",
  "skill": "Remote",
  "prompt": "Describe how you collaborate effectively across time zones. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de remote pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "international-4-challenge",
  "category": "international",
  "categoryLabel": "Entretiens internationaux",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Remote collaboration · Challenge",
  "skill": "Remote",
  "prompt": "Describe how you collaborate effectively across time zones. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de remote pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "international-5-foundation",
  "category": "international",
  "categoryLabel": "Entretiens internationaux",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Cultural adaptability · Fondamentaux",
  "skill": "Culture",
  "prompt": "Give an example of adapting your communication to a different working culture. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de culture pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "international-5-practice",
  "category": "international",
  "categoryLabel": "Entretiens internationaux",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Cultural adaptability · Application",
  "skill": "Culture",
  "prompt": "Give an example of adapting your communication to a different working culture. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de culture pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "international-5-challenge",
  "category": "international",
  "categoryLabel": "Entretiens internationaux",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Cultural adaptability · Challenge",
  "skill": "Culture",
  "prompt": "Give an example of adapting your communication to a different working culture. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de culture pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "international-6-foundation",
  "category": "international",
  "categoryLabel": "Entretiens internationaux",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Present a technical project · Fondamentaux",
  "skill": "English",
  "prompt": "Explain a technical project to an international non-specialist audience. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de english pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "international-6-practice",
  "category": "international",
  "categoryLabel": "Entretiens internationaux",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Present a technical project · Application",
  "skill": "English",
  "prompt": "Explain a technical project to an international non-specialist audience. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de english pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "international-6-challenge",
  "category": "international",
  "categoryLabel": "Entretiens internationaux",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Present a technical project · Challenge",
  "skill": "English",
  "prompt": "Explain a technical project to an international non-specialist audience. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de english pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "international-7-foundation",
  "category": "international",
  "categoryLabel": "Entretiens internationaux",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Ask smart questions · Fondamentaux",
  "skill": "English",
  "prompt": "Prepare thoughtful questions about an international team and its ways of working. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de english pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "international-7-practice",
  "category": "international",
  "categoryLabel": "Entretiens internationaux",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Ask smart questions · Application",
  "skill": "English",
  "prompt": "Prepare thoughtful questions about an international team and its ways of working. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de english pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "international-7-challenge",
  "category": "international",
  "categoryLabel": "Entretiens internationaux",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Ask smart questions · Challenge",
  "skill": "English",
  "prompt": "Prepare thoughtful questions about an international team and its ways of working. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de english pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "international-8-foundation",
  "category": "international",
  "categoryLabel": "Entretiens internationaux",
  "level": "foundation",
  "levelLabel": "Découverte",
  "duration": "5 min",
  "name": "Handle a misunderstanding · Fondamentaux",
  "skill": "Clarity",
  "prompt": "Explain how you would clarify a misunderstanding during an English-language interview. Identifiez une idée principale et ajoutez un exemple concret.",
  "intro": "Exercice de clarity pour découverte.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "international-8-practice",
  "category": "international",
  "categoryLabel": "Entretiens internationaux",
  "level": "practice",
  "levelLabel": "Approfondissement",
  "duration": "8 min",
  "name": "Handle a misunderstanding · Application",
  "skill": "Clarity",
  "prompt": "Explain how you would clarify a misunderstanding during an English-language interview. Formulez une réponse structurée et justifiez votre raisonnement.",
  "intro": "Exercice de clarity pour approfondissement.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 },
 {
  "id": "international-8-challenge",
  "category": "international",
  "categoryLabel": "Entretiens internationaux",
  "level": "challenge",
  "levelLabel": "Mise en situation",
  "duration": "12 min",
  "name": "Handle a misunderstanding · Challenge",
  "skill": "Clarity",
  "prompt": "Explain how you would clarify a misunderstanding during an English-language interview. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
  "intro": "Exercice de clarity pour mise en situation.",
  "steps": [
   "Quel est le message principal que vous voulez transmettre ?",
   "Quelle situation ou preuve concrète soutient ce message ?",
   "Quel a été votre rôle personnel ou votre raisonnement ?",
   "Comment conclure clairement en lien avec le poste ?"
  ],
  "tip": "Soyez précis, authentique et étayez vos propos sans inventer de résultats."
 }
];
