import type { Exercise } from "./catalog";

export type PremiumGuide = {
  objective: string;
  context: string;
  methodology: string;
  evidence: string[];
  pitfalls: string[];
  example: string;
  reflection: string;
};

/** Révision pédagogique assistée par IA, pour pilote interne uniquement. Pas de validation humaine/certification. */
const guides: Record<string, PremiumGuide> = {
  "pitch-1-foundation": {
    objective: "Construire une présentation claire et mémorable en une minute.",
    context: "Vous rencontrez un recruteur pour la première fois. Il attend une présentation ciblée, et non la lecture de votre CV.",
    methodology: "Présent → expérience utile → preuve → lien avec le poste. Visez environ 90 à 120 mots, puis ajustez au débit naturel et à la clarté de votre voix.",
    evidence: ["Une identité professionnelle claire dès l'ouverture.", "Une expérience ou un projet concret illustrant une compétence.", "Une phrase qui relie le parcours au poste convoité.", "Une durée proche de 60 secondes à l'oral."],
    pitfalls: ["Énumérer toutes ses expériences dans l'ordre chronologique.", "Utiliser des adjectifs sans illustration.", "Terminer sans évoquer le poste ciblé."],
    example: "Je termine une formation en analyse de données. Lors de mon projet de fin d'études, j'ai construit un tableau de bord pour faciliter le suivi d'indicateurs. J'y ai appris à clarifier un besoin métier et à présenter des résultats simplement. Je souhaite aujourd'hui développer ces compétences dans une équipe Data.",
    reflection: "Votre interlocuteur pourrait-il résumer votre proposition de valeur en une phrase ?"
  },
  "pitch-1-practice": {
    objective: "Adapter son pitch à une opportunité précise avec des preuves.",
    context: "Vous candidatez à un poste qui met l'accent sur la collaboration et l'amélioration continue. Le recruteur vous demande de vous présenter en une minute.",
    methodology: "Choisissez deux compétences attendues, puis associez chacune à une réalisation prouvable. Terminez par votre motivation pour cette mission.",
    evidence: ["Deux compétences reliées au poste.", "Au moins un exemple vérifiable.", "Une transition naturelle entre les idées.", "Une conclusion spécifique à l'opportunité."],
    pitfalls: ["Reprendre le même pitch pour tous les postes.", "Réciter des compétences sans preuves.", "Surévaluer son rôle dans un résultat collectif."],
    example: "Je travaille sur des projets transverses depuis trois ans. J'ai notamment coordonné une amélioration de processus avec deux équipes, ce qui a réduit les reprises manuelles. Cette expérience m'a appris à construire des solutions avec les utilisateurs. C'est cet équilibre entre analyse et collaboration que je souhaite retrouver dans votre équipe.",
    reflection: "Qu'avez-vous changé dans votre pitch en fonction de cette opportunité ?"
  },
  "pitch-1-challenge": {
    objective: "Défendre une proposition de valeur concise face à un recruteur exigeant.",
    context: "Un dirigeant dispose de 45 secondes et vous interrompt : « Beaucoup de candidats ont ce type d'expérience. Qu'est-ce qui vous distingue réellement ? »",
    methodology: "Répondez d'abord par une différence observable, apportez une preuve, puis formulez le bénéfice attendu pour l'équipe.",
    evidence: ["Une différenciation précise, sans prétention excessive.", "Une preuve personnelle et vérifiable.", "Un impact formulé en termes métier.", "Une réponse concise malgré l'interruption."],
    pitfalls: ["Confondre assurance et affirmation non démontrée.", "Reprendre tout son CV pour se justifier.", "Inventer une mesure pour convaincre."],
    example: "Ma différence tient à ma capacité à transformer un problème mal cadré en plan d'action partagé. Dans mon dernier projet, j'ai aligné les équipes métier et technique sur trois priorités mesurables. Les décisions ont pu être prises dans un cadre partagé, avec des responsabilités plus claires. C'est cette approche structurée que je peux apporter ici.",
    reflection: "Votre argument résisterait-il à la question : « Pouvez-vous me le démontrer ? »"
  },
  "communication-1-foundation": {
    objective: "Expliquer son métier à une personne extérieure à son secteur.",
    context: "Une personne du service RH vous demande simplement : « En quoi consiste votre travail au quotidien ? »",
    methodology: "Problème traité → action principale → utilité. Évitez les sigles non expliqués.",
    evidence: ["Un problème compréhensible sans expertise technique.", "Une action décrite avec des mots simples.", "Un bénéfice concret pour l'organisation.", "Aucun jargon indispensable laissé sans explication."],
    pitfalls: ["Multiplier les acronymes.", "Parler exclusivement des outils.", "Oublier de préciser pour qui le travail est utile."],
    example: "J'aide les équipes à comprendre leurs données pour prendre de meilleures décisions. Je rassemble les informations, vérifie leur qualité et prépare des indicateurs faciles à lire. L'objectif est que les responsables puissent repérer les problèmes plus tôt.",
    reflection: "Une personne qui ne connaît pas votre secteur comprendrait-elle votre valeur ajoutée ?"
  },
  "behavior-1-foundation": {
    objective: "Décrire un conflit professionnel sans désigner de coupable.",
    context: "En entretien comportemental, le recruteur demande comment vous avez géré un désaccord avec un collègue.",
    methodology: "Situation factuelle → point de divergence → écoute → solution → apprentissage. Distinguez les faits de vos interprétations.",
    evidence: ["Le désaccord est expliqué sans jugement de valeur.", "Votre rôle et vos actions sont identifiables.", "La recherche de solution est explicite.", "L'apprentissage est formulé honnêtement."],
    pitfalls: ["Présenter l'autre personne comme le problème.", "Décrire une victoire personnelle plutôt qu'une résolution.", "Omettre ce qui a changé après le conflit."],
    example: "Nous avions des priorités différentes pour une livraison. J'ai proposé de clarifier les contraintes de chacun avec notre responsable de projet. Nous avons identifié un périmètre commun, puis revu le calendrier. J’ai appris à clarifier les contraintes de chacun avant qu’un désaccord ne s’installe.",
    reflection: "Votre récit donne-t-il des preuves de coopération et de responsabilité ?"
  },
  "structure-1-foundation": {
    objective: "Raconter une situation en suivant quatre étapes distinctes.",
    context: "Le recruteur souhaite un exemple de problème résolu dans vos études ou au travail.",
    methodology: "STAR : Situation (contexte), Tâche (responsabilité), Action (contribution personnelle), Résultat (conséquence observable).",
    evidence: ["La situation de départ est compréhensible.", "La responsabilité est identifiée.", "Les actions personnelles sont spécifiques.", "Le résultat est factuel, même non chiffré."],
    pitfalls: ["Confondre actions collectives et contribution personnelle.", "Décrire longuement le contexte sans résultat.", "Inventer un pourcentage ou une performance."],
    example: "Dans un projet de groupe, nous recevions les informations trop tard (S). Je devais fluidifier la coordination (T). J'ai mis en place un point hebdomadaire et un tableau des tâches (A). L'équipe a pu livrer son dossier dans les délais (R).",
    reflection: "Si vous surlignez chaque phrase, retrouvez-vous bien S, T, A et R ?"
  }
};
const a2Guides: Record<string, PremiumGuide> = {
  "pitch-1-foundation": {
    "objective": "Un fil professionnel identifiable — découverte.",
    "context": "Situation de pratique : Présentez votre parcours en 60 secondes sans réciter votre CV. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "La progression relie passé utile, contribution actuelle et ambition. Nommez un fait simple et expliquez votre contribution.",
    "evidence": [
      "La réponse démontre : un fil professionnel identifiable.",
      "Le candidat apporte un élément concret et vérifiable lié à « Se présenter en 60 secondes ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau découverte et à l'interlocuteur."
    ],
    "pitfalls": [
      "Une chronologie exhaustive cache la valeur créée.",
      "Évitez d’ajouter des détails inutiles.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : la progression relie passé utile, contribution actuelle et ambition.",
    "reflection": "Qu'est-ce que le recruteur doit retenir de vous ?"
  },
  "pitch-1-practice": {
    "objective": "Un fil professionnel identifiable — approfondissement.",
    "context": "Situation de pratique : Présentez votre parcours en 60 secondes sans réciter votre CV. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "La progression relie passé utile, contribution actuelle et ambition. Mobilisez un exemple précis, une preuve vérifiable et un lien au poste.",
    "evidence": [
      "La réponse démontre : un fil professionnel identifiable.",
      "Le candidat apporte un élément concret et vérifiable lié à « Se présenter en 60 secondes ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau approfondissement et à l'interlocuteur."
    ],
    "pitfalls": [
      "Une chronologie exhaustive cache la valeur créée.",
      "Évitez les réponses génériques non adaptées au contexte.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : la progression relie passé utile, contribution actuelle et ambition.",
    "reflection": "Qu'est-ce que le recruteur doit retenir de vous ?"
  },
  "pitch-1-challenge": {
    "objective": "Un fil professionnel identifiable — challenge.",
    "context": "Situation de pratique : Présentez votre parcours en 60 secondes sans réciter votre CV. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "La progression relie passé utile, contribution actuelle et ambition. Ajoutez une objection plausible du recruteur et montrez comment vous y répondez avec nuance.",
    "evidence": [
      "La réponse démontre : un fil professionnel identifiable.",
      "Le candidat apporte un élément concret et vérifiable lié à « Se présenter en 60 secondes ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau challenge et à l'interlocuteur."
    ],
    "pitfalls": [
      "Une chronologie exhaustive cache la valeur créée.",
      "Évitez d’inventer une certitude ou un chiffre sous pression.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : la progression relie passé utile, contribution actuelle et ambition.",
    "reflection": "Qu'est-ce que le recruteur doit retenir de vous ?"
  },
  "pitch-2-foundation": {
    "objective": "Trois transitions justifiées — découverte.",
    "context": "Situation de pratique : Racontez votre évolution professionnelle en trois étapes cohérentes. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Chaque changement est motivé par un apprentissage ou une responsabilité. Nommez un fait simple et expliquez votre contribution.",
    "evidence": [
      "La réponse démontre : trois transitions justifiées.",
      "Le candidat apporte un élément concret et vérifiable lié à « Présenter son parcours en trois actes ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau découverte et à l'interlocuteur."
    ],
    "pitfalls": [
      "Ne raconter que des dates et des intitulés.",
      "Évitez d’ajouter des détails inutiles.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : chaque changement est motivé par un apprentissage ou une responsabilité.",
    "reflection": "Quel lien causal unit les étapes de votre parcours ?"
  },
  "pitch-2-practice": {
    "objective": "Trois transitions justifiées — approfondissement.",
    "context": "Situation de pratique : Racontez votre évolution professionnelle en trois étapes cohérentes. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Chaque changement est motivé par un apprentissage ou une responsabilité. Mobilisez un exemple précis, une preuve vérifiable et un lien au poste.",
    "evidence": [
      "La réponse démontre : trois transitions justifiées.",
      "Le candidat apporte un élément concret et vérifiable lié à « Présenter son parcours en trois actes ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau approfondissement et à l'interlocuteur."
    ],
    "pitfalls": [
      "Ne raconter que des dates et des intitulés.",
      "Évitez les réponses génériques non adaptées au contexte.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : chaque changement est motivé par un apprentissage ou une responsabilité.",
    "reflection": "Quel lien causal unit les étapes de votre parcours ?"
  },
  "pitch-2-challenge": {
    "objective": "Trois transitions justifiées — challenge.",
    "context": "Situation de pratique : Racontez votre évolution professionnelle en trois étapes cohérentes. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Chaque changement est motivé par un apprentissage ou une responsabilité. Ajoutez une objection plausible du recruteur et montrez comment vous y répondez avec nuance.",
    "evidence": [
      "La réponse démontre : trois transitions justifiées.",
      "Le candidat apporte un élément concret et vérifiable lié à « Présenter son parcours en trois actes ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau challenge et à l'interlocuteur."
    ],
    "pitfalls": [
      "Ne raconter que des dates et des intitulés.",
      "Évitez d’inventer une certitude ou un chiffre sous pression.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : chaque changement est motivé par un apprentissage ou une responsabilité.",
    "reflection": "Quel lien causal unit les étapes de votre parcours ?"
  },
  "pitch-3-foundation": {
    "objective": "Des compétences transférables prouvées — découverte.",
    "context": "Situation de pratique : Expliquez ce qui motive votre réorientation et les compétences transférables. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Montrer ce qui reste pertinent dans le nouveau domaine. Nommez un fait simple et expliquez votre contribution.",
    "evidence": [
      "La réponse démontre : des compétences transférables prouvées.",
      "Le candidat apporte un élément concret et vérifiable lié à « Expliquer un changement de carrière ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau découverte et à l'interlocuteur."
    ],
    "pitfalls": [
      "Présenter la réorientation comme une fuite du précédent métier.",
      "Évitez d’ajouter des détails inutiles.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : montrer ce qui reste pertinent dans le nouveau domaine.",
    "reflection": "Quelle preuve montre que vous pouvez réussir la transition ?"
  },
  "pitch-3-practice": {
    "objective": "Des compétences transférables prouvées — approfondissement.",
    "context": "Situation de pratique : Expliquez ce qui motive votre réorientation et les compétences transférables. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Montrer ce qui reste pertinent dans le nouveau domaine. Mobilisez un exemple précis, une preuve vérifiable et un lien au poste.",
    "evidence": [
      "La réponse démontre : des compétences transférables prouvées.",
      "Le candidat apporte un élément concret et vérifiable lié à « Expliquer un changement de carrière ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau approfondissement et à l'interlocuteur."
    ],
    "pitfalls": [
      "Présenter la réorientation comme une fuite du précédent métier.",
      "Évitez les réponses génériques non adaptées au contexte.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : montrer ce qui reste pertinent dans le nouveau domaine.",
    "reflection": "Quelle preuve montre que vous pouvez réussir la transition ?"
  },
  "pitch-3-challenge": {
    "objective": "Des compétences transférables prouvées — challenge.",
    "context": "Situation de pratique : Expliquez ce qui motive votre réorientation et les compétences transférables. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Montrer ce qui reste pertinent dans le nouveau domaine. Ajoutez une objection plausible du recruteur et montrez comment vous y répondez avec nuance.",
    "evidence": [
      "La réponse démontre : des compétences transférables prouvées.",
      "Le candidat apporte un élément concret et vérifiable lié à « Expliquer un changement de carrière ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau challenge et à l'interlocuteur."
    ],
    "pitfalls": [
      "Présenter la réorientation comme une fuite du précédent métier.",
      "Évitez d’inventer une certitude ou un chiffre sous pression.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : montrer ce qui reste pertinent dans le nouveau domaine.",
    "reflection": "Quelle preuve montre que vous pouvez réussir la transition ?"
  },
  "pitch-4-foundation": {
    "objective": "Une proposition de valeur concrète — découverte.",
    "context": "Situation de pratique : Formulez votre proposition de valeur professionnelle en deux phrases. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Associer un point fort à un problème que l'employeur rencontre. Nommez un fait simple et expliquez votre contribution.",
    "evidence": [
      "La réponse démontre : une proposition de valeur concrète.",
      "Le candidat apporte un élément concret et vérifiable lié à « Créer une accroche mémorable ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau découverte et à l'interlocuteur."
    ],
    "pitfalls": [
      "Employer une formule impressionnante mais vide.",
      "Évitez d’ajouter des détails inutiles.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : associer un point fort à un problème que l'employeur rencontre.",
    "reflection": "Votre accroche pourrait-elle être utilisée par n'importe quel candidat ?"
  },
  "pitch-4-practice": {
    "objective": "Une proposition de valeur concrète — approfondissement.",
    "context": "Situation de pratique : Formulez votre proposition de valeur professionnelle en deux phrases. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Associer un point fort à un problème que l'employeur rencontre. Mobilisez un exemple précis, une preuve vérifiable et un lien au poste.",
    "evidence": [
      "La réponse démontre : une proposition de valeur concrète.",
      "Le candidat apporte un élément concret et vérifiable lié à « Créer une accroche mémorable ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau approfondissement et à l'interlocuteur."
    ],
    "pitfalls": [
      "Employer une formule impressionnante mais vide.",
      "Évitez les réponses génériques non adaptées au contexte.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : associer un point fort à un problème que l'employeur rencontre.",
    "reflection": "Votre accroche pourrait-elle être utilisée par n'importe quel candidat ?"
  },
  "pitch-4-challenge": {
    "objective": "Une proposition de valeur concrète — challenge.",
    "context": "Situation de pratique : Formulez votre proposition de valeur professionnelle en deux phrases. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Associer un point fort à un problème que l'employeur rencontre. Ajoutez une objection plausible du recruteur et montrez comment vous y répondez avec nuance.",
    "evidence": [
      "La réponse démontre : une proposition de valeur concrète.",
      "Le candidat apporte un élément concret et vérifiable lié à « Créer une accroche mémorable ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau challenge et à l'interlocuteur."
    ],
    "pitfalls": [
      "Employer une formule impressionnante mais vide.",
      "Évitez d’inventer une certitude ou un chiffre sous pression.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : associer un point fort à un problème que l'employeur rencontre.",
    "reflection": "Votre accroche pourrait-elle être utilisée par n'importe quel candidat ?"
  },
  "pitch-5-foundation": {
    "objective": "Une réalisation vérifiable — découverte.",
    "context": "Situation de pratique : Présentez une réussite dont vous êtes fier sans surestimer votre rôle. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Distinguer contexte, contribution personnelle et conséquence. Nommez un fait simple et expliquez votre contribution.",
    "evidence": [
      "La réponse démontre : une réalisation vérifiable.",
      "Le candidat apporte un élément concret et vérifiable lié à « Parler de sa principale réussite ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau découverte et à l'interlocuteur."
    ],
    "pitfalls": [
      "S'attribuer l'intégralité du travail collectif.",
      "Évitez d’ajouter des détails inutiles.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : distinguer contexte, contribution personnelle et conséquence.",
    "reflection": "Quels faits permettraient de vérifier votre rôle ?"
  },
  "pitch-5-practice": {
    "objective": "Une réalisation vérifiable — approfondissement.",
    "context": "Situation de pratique : Présentez une réussite dont vous êtes fier sans surestimer votre rôle. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Distinguer contexte, contribution personnelle et conséquence. Mobilisez un exemple précis, une preuve vérifiable et un lien au poste.",
    "evidence": [
      "La réponse démontre : une réalisation vérifiable.",
      "Le candidat apporte un élément concret et vérifiable lié à « Parler de sa principale réussite ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau approfondissement et à l'interlocuteur."
    ],
    "pitfalls": [
      "S'attribuer l'intégralité du travail collectif.",
      "Évitez les réponses génériques non adaptées au contexte.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : distinguer contexte, contribution personnelle et conséquence.",
    "reflection": "Quels faits permettraient de vérifier votre rôle ?"
  },
  "pitch-5-challenge": {
    "objective": "Une réalisation vérifiable — challenge.",
    "context": "Situation de pratique : Présentez une réussite dont vous êtes fier sans surestimer votre rôle. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Distinguer contexte, contribution personnelle et conséquence. Ajoutez une objection plausible du recruteur et montrez comment vous y répondez avec nuance.",
    "evidence": [
      "La réponse démontre : une réalisation vérifiable.",
      "Le candidat apporte un élément concret et vérifiable lié à « Parler de sa principale réussite ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau challenge et à l'interlocuteur."
    ],
    "pitfalls": [
      "S'attribuer l'intégralité du travail collectif.",
      "Évitez d’inventer une certitude ou un chiffre sous pression.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : distinguer contexte, contribution personnelle et conséquence.",
    "reflection": "Quels faits permettraient de vérifier votre rôle ?"
  },
  "pitch-6-foundation": {
    "objective": "Une période expliquée sans excès — découverte.",
    "context": "Situation de pratique : Expliquez une période sans emploi de façon factuelle et constructive. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Présenter les faits, les acquis éventuels et la disponibilité actuelle. Nommez un fait simple et expliquez votre contribution.",
    "evidence": [
      "La réponse démontre : une période expliquée sans excès.",
      "Le candidat apporte un élément concret et vérifiable lié à « Présenter un trou dans le CV ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau découverte et à l'interlocuteur."
    ],
    "pitfalls": [
      "Fournir des détails intimes non nécessaires.",
      "Évitez d’ajouter des détails inutiles.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : présenter les faits, les acquis éventuels et la disponibilité actuelle.",
    "reflection": "Votre explication est-elle factuelle et suffisamment brève ?"
  },
  "pitch-6-practice": {
    "objective": "Une période expliquée sans excès — approfondissement.",
    "context": "Situation de pratique : Expliquez une période sans emploi de façon factuelle et constructive. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Présenter les faits, les acquis éventuels et la disponibilité actuelle. Mobilisez un exemple précis, une preuve vérifiable et un lien au poste.",
    "evidence": [
      "La réponse démontre : une période expliquée sans excès.",
      "Le candidat apporte un élément concret et vérifiable lié à « Présenter un trou dans le CV ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau approfondissement et à l'interlocuteur."
    ],
    "pitfalls": [
      "Fournir des détails intimes non nécessaires.",
      "Évitez les réponses génériques non adaptées au contexte.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : présenter les faits, les acquis éventuels et la disponibilité actuelle.",
    "reflection": "Votre explication est-elle factuelle et suffisamment brève ?"
  },
  "pitch-6-challenge": {
    "objective": "Une période expliquée sans excès — challenge.",
    "context": "Situation de pratique : Expliquez une période sans emploi de façon factuelle et constructive. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Présenter les faits, les acquis éventuels et la disponibilité actuelle. Ajoutez une objection plausible du recruteur et montrez comment vous y répondez avec nuance.",
    "evidence": [
      "La réponse démontre : une période expliquée sans excès.",
      "Le candidat apporte un élément concret et vérifiable lié à « Présenter un trou dans le CV ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau challenge et à l'interlocuteur."
    ],
    "pitfalls": [
      "Fournir des détails intimes non nécessaires.",
      "Évitez d’inventer une certitude ou un chiffre sous pression.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : présenter les faits, les acquis éventuels et la disponibilité actuelle.",
    "reflection": "Votre explication est-elle factuelle et suffisamment brève ?"
  },
  "pitch-7-foundation": {
    "objective": "Une candidature adaptée — découverte.",
    "context": "Situation de pratique : Présentez-vous comme candidat à un poste précis avec deux arguments pertinents. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Relier deux attentes du poste à deux éléments du parcours. Nommez un fait simple et expliquez votre contribution.",
    "evidence": [
      "La réponse démontre : une candidature adaptée.",
      "Le candidat apporte un élément concret et vérifiable lié à « Adapter son pitch au poste ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau découverte et à l'interlocuteur."
    ],
    "pitfalls": [
      "Réciter un argument générique pour chaque employeur.",
      "Évitez d’ajouter des détails inutiles.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : relier deux attentes du poste à deux éléments du parcours.",
    "reflection": "Les exemples correspondent-ils vraiment au poste ?"
  },
  "pitch-7-practice": {
    "objective": "Une candidature adaptée — approfondissement.",
    "context": "Situation de pratique : Présentez-vous comme candidat à un poste précis avec deux arguments pertinents. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Relier deux attentes du poste à deux éléments du parcours. Mobilisez un exemple précis, une preuve vérifiable et un lien au poste.",
    "evidence": [
      "La réponse démontre : une candidature adaptée.",
      "Le candidat apporte un élément concret et vérifiable lié à « Adapter son pitch au poste ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau approfondissement et à l'interlocuteur."
    ],
    "pitfalls": [
      "Réciter un argument générique pour chaque employeur.",
      "Évitez les réponses génériques non adaptées au contexte.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : relier deux attentes du poste à deux éléments du parcours.",
    "reflection": "Les exemples correspondent-ils vraiment au poste ?"
  },
  "pitch-7-challenge": {
    "objective": "Une candidature adaptée — challenge.",
    "context": "Situation de pratique : Présentez-vous comme candidat à un poste précis avec deux arguments pertinents. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Relier deux attentes du poste à deux éléments du parcours. Ajoutez une objection plausible du recruteur et montrez comment vous y répondez avec nuance.",
    "evidence": [
      "La réponse démontre : une candidature adaptée.",
      "Le candidat apporte un élément concret et vérifiable lié à « Adapter son pitch au poste ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau challenge et à l'interlocuteur."
    ],
    "pitfalls": [
      "Réciter un argument générique pour chaque employeur.",
      "Évitez d’inventer une certitude ou un chiffre sous pression.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : relier deux attentes du poste à deux éléments du parcours.",
    "reflection": "Les exemples correspondent-ils vraiment au poste ?"
  },
  "pitch-8-foundation": {
    "objective": "Une conclusion tournée vers la mission — découverte.",
    "context": "Situation de pratique : Terminez votre présentation en reliant votre parcours au besoin du recruteur. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Faire converger votre expérience et le besoin du recruteur. Nommez un fait simple et expliquez votre contribution.",
    "evidence": [
      "La réponse démontre : une conclusion tournée vers la mission.",
      "Le candidat apporte un élément concret et vérifiable lié à « Conclure sa présentation ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau découverte et à l'interlocuteur."
    ],
    "pitfalls": [
      "Clore par une banalité sans lien avec le poste.",
      "Évitez d’ajouter des détails inutiles.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : faire converger votre expérience et le besoin du recruteur.",
    "reflection": "La dernière phrase donne-t-elle une raison de poursuivre l'échange ?"
  },
  "pitch-8-practice": {
    "objective": "Une conclusion tournée vers la mission — approfondissement.",
    "context": "Situation de pratique : Terminez votre présentation en reliant votre parcours au besoin du recruteur. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Faire converger votre expérience et le besoin du recruteur. Mobilisez un exemple précis, une preuve vérifiable et un lien au poste.",
    "evidence": [
      "La réponse démontre : une conclusion tournée vers la mission.",
      "Le candidat apporte un élément concret et vérifiable lié à « Conclure sa présentation ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau approfondissement et à l'interlocuteur."
    ],
    "pitfalls": [
      "Clore par une banalité sans lien avec le poste.",
      "Évitez les réponses génériques non adaptées au contexte.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : faire converger votre expérience et le besoin du recruteur.",
    "reflection": "La dernière phrase donne-t-elle une raison de poursuivre l'échange ?"
  },
  "pitch-8-challenge": {
    "objective": "Une conclusion tournée vers la mission — challenge.",
    "context": "Situation de pratique : Terminez votre présentation en reliant votre parcours au besoin du recruteur. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Faire converger votre expérience et le besoin du recruteur. Ajoutez une objection plausible du recruteur et montrez comment vous y répondez avec nuance.",
    "evidence": [
      "La réponse démontre : une conclusion tournée vers la mission.",
      "Le candidat apporte un élément concret et vérifiable lié à « Conclure sa présentation ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau challenge et à l'interlocuteur."
    ],
    "pitfalls": [
      "Clore par une banalité sans lien avec le poste.",
      "Évitez d’inventer une certitude ou un chiffre sous pression.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : faire converger votre expérience et le besoin du recruteur.",
    "reflection": "La dernière phrase donne-t-elle une raison de poursuivre l'échange ?"
  },
  "communication-1-foundation": {
    "objective": "Un vocabulaire accessible — découverte.",
    "context": "Situation de pratique : Expliquez votre activité à une personne qui ne connaît pas votre métier. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Expliquer problème, action et valeur à une personne hors métier. Nommez un fait simple et expliquez votre contribution.",
    "evidence": [
      "La réponse démontre : un vocabulaire accessible.",
      "Le candidat apporte un élément concret et vérifiable lié à « Parler avec précision ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau découverte et à l'interlocuteur."
    ],
    "pitfalls": [
      "Accumuler des sigles ou des noms d'outils.",
      "Évitez d’ajouter des détails inutiles.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : expliquer problème, action et valeur à une personne hors métier.",
    "reflection": "Une personne non spécialiste pourrait-elle expliquer votre rôle ?"
  },
  "communication-1-practice": {
    "objective": "Un vocabulaire accessible — approfondissement.",
    "context": "Situation de pratique : Expliquez votre activité à une personne qui ne connaît pas votre métier. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Expliquer problème, action et valeur à une personne hors métier. Mobilisez un exemple précis, une preuve vérifiable et un lien au poste.",
    "evidence": [
      "La réponse démontre : un vocabulaire accessible.",
      "Le candidat apporte un élément concret et vérifiable lié à « Parler avec précision ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau approfondissement et à l'interlocuteur."
    ],
    "pitfalls": [
      "Accumuler des sigles ou des noms d'outils.",
      "Évitez les réponses génériques non adaptées au contexte.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : expliquer problème, action et valeur à une personne hors métier.",
    "reflection": "Une personne non spécialiste pourrait-elle expliquer votre rôle ?"
  },
  "communication-1-challenge": {
    "objective": "Un vocabulaire accessible — challenge.",
    "context": "Situation de pratique : Expliquez votre activité à une personne qui ne connaît pas votre métier. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Expliquer problème, action et valeur à une personne hors métier. Ajoutez une objection plausible du recruteur et montrez comment vous y répondez avec nuance.",
    "evidence": [
      "La réponse démontre : un vocabulaire accessible.",
      "Le candidat apporte un élément concret et vérifiable lié à « Parler avec précision ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau challenge et à l'interlocuteur."
    ],
    "pitfalls": [
      "Accumuler des sigles ou des noms d'outils.",
      "Évitez d’inventer une certitude ou un chiffre sous pression.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : expliquer problème, action et valeur à une personne hors métier.",
    "reflection": "Une personne non spécialiste pourrait-elle expliquer votre rôle ?"
  },
  "communication-2-foundation": {
    "objective": "Un rythme audible — découverte.",
    "context": "Situation de pratique : Présentez une idée en prévoyant deux pauses pour structurer votre discours. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Utiliser de vraies pauses entre idée, preuve et conclusion. Nommez un fait simple et expliquez votre contribution.",
    "evidence": [
      "La réponse démontre : un rythme audible.",
      "Le candidat apporte un élément concret et vérifiable lié à « Faire une pause utile ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau découverte et à l'interlocuteur."
    ],
    "pitfalls": [
      "Parler sans respirer ou forcer une vitesse artificielle.",
      "Évitez d’ajouter des détails inutiles.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : utiliser de vraies pauses entre idée, preuve et conclusion.",
    "reflection": "Les idées clés sont-elles facilement repérables à l'oral ?"
  },
  "communication-2-practice": {
    "objective": "Un rythme audible — approfondissement.",
    "context": "Situation de pratique : Présentez une idée en prévoyant deux pauses pour structurer votre discours. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Utiliser de vraies pauses entre idée, preuve et conclusion. Mobilisez un exemple précis, une preuve vérifiable et un lien au poste.",
    "evidence": [
      "La réponse démontre : un rythme audible.",
      "Le candidat apporte un élément concret et vérifiable lié à « Faire une pause utile ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau approfondissement et à l'interlocuteur."
    ],
    "pitfalls": [
      "Parler sans respirer ou forcer une vitesse artificielle.",
      "Évitez les réponses génériques non adaptées au contexte.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : utiliser de vraies pauses entre idée, preuve et conclusion.",
    "reflection": "Les idées clés sont-elles facilement repérables à l'oral ?"
  },
  "communication-2-challenge": {
    "objective": "Un rythme audible — challenge.",
    "context": "Situation de pratique : Présentez une idée en prévoyant deux pauses pour structurer votre discours. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Utiliser de vraies pauses entre idée, preuve et conclusion. Ajoutez une objection plausible du recruteur et montrez comment vous y répondez avec nuance.",
    "evidence": [
      "La réponse démontre : un rythme audible.",
      "Le candidat apporte un élément concret et vérifiable lié à « Faire une pause utile ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau challenge et à l'interlocuteur."
    ],
    "pitfalls": [
      "Parler sans respirer ou forcer une vitesse artificielle.",
      "Évitez d’inventer une certitude ou un chiffre sous pression.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : utiliser de vraies pauses entre idée, preuve et conclusion.",
    "reflection": "Les idées clés sont-elles facilement repérables à l'oral ?"
  },
  "communication-3-foundation": {
    "objective": "Un bénéfice compréhensible — découverte.",
    "context": "Situation de pratique : Traduisez une réalisation technique en bénéfice métier compréhensible. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Remplacer les noms d'outils par ce qu'ils permettent de résoudre. Nommez un fait simple et expliquez votre contribution.",
    "evidence": [
      "La réponse démontre : un bénéfice compréhensible.",
      "Le candidat apporte un élément concret et vérifiable lié à « Éviter le jargon ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau découverte et à l'interlocuteur."
    ],
    "pitfalls": [
      "Confondre expertise et accumulation de jargon.",
      "Évitez d’ajouter des détails inutiles.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : remplacer les noms d'outils par ce qu'ils permettent de résoudre.",
    "reflection": "Quelle conséquence concrète le destinataire comprend-il ?"
  },
  "communication-3-practice": {
    "objective": "Un bénéfice compréhensible — approfondissement.",
    "context": "Situation de pratique : Traduisez une réalisation technique en bénéfice métier compréhensible. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Remplacer les noms d'outils par ce qu'ils permettent de résoudre. Mobilisez un exemple précis, une preuve vérifiable et un lien au poste.",
    "evidence": [
      "La réponse démontre : un bénéfice compréhensible.",
      "Le candidat apporte un élément concret et vérifiable lié à « Éviter le jargon ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau approfondissement et à l'interlocuteur."
    ],
    "pitfalls": [
      "Confondre expertise et accumulation de jargon.",
      "Évitez les réponses génériques non adaptées au contexte.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : remplacer les noms d'outils par ce qu'ils permettent de résoudre.",
    "reflection": "Quelle conséquence concrète le destinataire comprend-il ?"
  },
  "communication-3-challenge": {
    "objective": "Un bénéfice compréhensible — challenge.",
    "context": "Situation de pratique : Traduisez une réalisation technique en bénéfice métier compréhensible. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Remplacer les noms d'outils par ce qu'ils permettent de résoudre. Ajoutez une objection plausible du recruteur et montrez comment vous y répondez avec nuance.",
    "evidence": [
      "La réponse démontre : un bénéfice compréhensible.",
      "Le candidat apporte un élément concret et vérifiable lié à « Éviter le jargon ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau challenge et à l'interlocuteur."
    ],
    "pitfalls": [
      "Confondre expertise et accumulation de jargon.",
      "Évitez d’inventer une certitude ou un chiffre sous pression.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : remplacer les noms d'outils par ce qu'ils permettent de résoudre.",
    "reflection": "Quelle conséquence concrète le destinataire comprend-il ?"
  },
  "communication-4-foundation": {
    "objective": "Une correction respectueuse — découverte.",
    "context": "Situation de pratique : Corrigez poliment une affirmation inexacte formulée par un recruteur. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Reconnaître le point exprimé, préciser les faits et proposer une clarification. Nommez un fait simple et expliquez votre contribution.",
    "evidence": [
      "La réponse démontre : une correction respectueuse.",
      "Le candidat apporte un élément concret et vérifiable lié à « Répondre avec tact ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau découverte et à l'interlocuteur."
    ],
    "pitfalls": [
      "Mettre l'interlocuteur en défaut.",
      "Évitez d’ajouter des détails inutiles.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : reconnaître le point exprimé, préciser les faits et proposer une clarification.",
    "reflection": "Avez-vous préservé la qualité du dialogue ?"
  },
  "communication-4-practice": {
    "objective": "Une correction respectueuse — approfondissement.",
    "context": "Situation de pratique : Corrigez poliment une affirmation inexacte formulée par un recruteur. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Reconnaître le point exprimé, préciser les faits et proposer une clarification. Mobilisez un exemple précis, une preuve vérifiable et un lien au poste.",
    "evidence": [
      "La réponse démontre : une correction respectueuse.",
      "Le candidat apporte un élément concret et vérifiable lié à « Répondre avec tact ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau approfondissement et à l'interlocuteur."
    ],
    "pitfalls": [
      "Mettre l'interlocuteur en défaut.",
      "Évitez les réponses génériques non adaptées au contexte.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : reconnaître le point exprimé, préciser les faits et proposer une clarification.",
    "reflection": "Avez-vous préservé la qualité du dialogue ?"
  },
  "communication-4-challenge": {
    "objective": "Une correction respectueuse — challenge.",
    "context": "Situation de pratique : Corrigez poliment une affirmation inexacte formulée par un recruteur. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Reconnaître le point exprimé, préciser les faits et proposer une clarification. Ajoutez une objection plausible du recruteur et montrez comment vous y répondez avec nuance.",
    "evidence": [
      "La réponse démontre : une correction respectueuse.",
      "Le candidat apporte un élément concret et vérifiable lié à « Répondre avec tact ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau challenge et à l'interlocuteur."
    ],
    "pitfalls": [
      "Mettre l'interlocuteur en défaut.",
      "Évitez d’inventer une certitude ou un chiffre sous pression.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : reconnaître le point exprimé, préciser les faits et proposer une clarification.",
    "reflection": "Avez-vous préservé la qualité du dialogue ?"
  },
  "communication-5-foundation": {
    "objective": "Une reprise cohérente — découverte.",
    "context": "Situation de pratique : Reprenez naturellement une réponse après une interruption. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Rappeler brièvement l'idée en cours puis poursuivre. Nommez un fait simple et expliquez votre contribution.",
    "evidence": [
      "La réponse démontre : une reprise cohérente.",
      "Le candidat apporte un élément concret et vérifiable lié à « Gérer une interruption ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau découverte et à l'interlocuteur."
    ],
    "pitfalls": [
      "Recommencer la réponse entière après une interruption.",
      "Évitez d’ajouter des détails inutiles.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : rappeler brièvement l'idée en cours puis poursuivre.",
    "reflection": "La reprise reste-t-elle naturelle et pertinente ?"
  },
  "communication-5-practice": {
    "objective": "Une reprise cohérente — approfondissement.",
    "context": "Situation de pratique : Reprenez naturellement une réponse après une interruption. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Rappeler brièvement l'idée en cours puis poursuivre. Mobilisez un exemple précis, une preuve vérifiable et un lien au poste.",
    "evidence": [
      "La réponse démontre : une reprise cohérente.",
      "Le candidat apporte un élément concret et vérifiable lié à « Gérer une interruption ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau approfondissement et à l'interlocuteur."
    ],
    "pitfalls": [
      "Recommencer la réponse entière après une interruption.",
      "Évitez les réponses génériques non adaptées au contexte.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : rappeler brièvement l'idée en cours puis poursuivre.",
    "reflection": "La reprise reste-t-elle naturelle et pertinente ?"
  },
  "communication-5-challenge": {
    "objective": "Une reprise cohérente — challenge.",
    "context": "Situation de pratique : Reprenez naturellement une réponse après une interruption. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Rappeler brièvement l'idée en cours puis poursuivre. Ajoutez une objection plausible du recruteur et montrez comment vous y répondez avec nuance.",
    "evidence": [
      "La réponse démontre : une reprise cohérente.",
      "Le candidat apporte un élément concret et vérifiable lié à « Gérer une interruption ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau challenge et à l'interlocuteur."
    ],
    "pitfalls": [
      "Recommencer la réponse entière après une interruption.",
      "Évitez d’inventer une certitude ou un chiffre sous pression.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : rappeler brièvement l'idée en cours puis poursuivre.",
    "reflection": "La reprise reste-t-elle naturelle et pertinente ?"
  },
  "communication-6-foundation": {
    "objective": "Une conviction étayée — découverte.",
    "context": "Situation de pratique : Défendez une proposition en variant exemples et raisonnement. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Associer avis personnel, preuve et réserve raisonnable. Nommez un fait simple et expliquez votre contribution.",
    "evidence": [
      "La réponse démontre : une conviction étayée.",
      "Le candidat apporte un élément concret et vérifiable lié à « Argumenter sans réciter ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau découverte et à l'interlocuteur."
    ],
    "pitfalls": [
      "Affirmer avec force sans démontrer.",
      "Évitez d’ajouter des détails inutiles.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : associer avis personnel, preuve et réserve raisonnable.",
    "reflection": "Quel argument pourrait convaincre un contradicteur de bonne foi ?"
  },
  "communication-6-practice": {
    "objective": "Une conviction étayée — approfondissement.",
    "context": "Situation de pratique : Défendez une proposition en variant exemples et raisonnement. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Associer avis personnel, preuve et réserve raisonnable. Mobilisez un exemple précis, une preuve vérifiable et un lien au poste.",
    "evidence": [
      "La réponse démontre : une conviction étayée.",
      "Le candidat apporte un élément concret et vérifiable lié à « Argumenter sans réciter ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau approfondissement et à l'interlocuteur."
    ],
    "pitfalls": [
      "Affirmer avec force sans démontrer.",
      "Évitez les réponses génériques non adaptées au contexte.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : associer avis personnel, preuve et réserve raisonnable.",
    "reflection": "Quel argument pourrait convaincre un contradicteur de bonne foi ?"
  },
  "communication-6-challenge": {
    "objective": "Une conviction étayée — challenge.",
    "context": "Situation de pratique : Défendez une proposition en variant exemples et raisonnement. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Associer avis personnel, preuve et réserve raisonnable. Ajoutez une objection plausible du recruteur et montrez comment vous y répondez avec nuance.",
    "evidence": [
      "La réponse démontre : une conviction étayée.",
      "Le candidat apporte un élément concret et vérifiable lié à « Argumenter sans réciter ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau challenge et à l'interlocuteur."
    ],
    "pitfalls": [
      "Affirmer avec force sans démontrer.",
      "Évitez d’inventer une certitude ou un chiffre sous pression.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : associer avis personnel, preuve et réserve raisonnable.",
    "reflection": "Quel argument pourrait convaincre un contradicteur de bonne foi ?"
  },
  "communication-7-foundation": {
    "objective": "Un désaccord constructif — découverte.",
    "context": "Situation de pratique : Formulez un désaccord professionnel sans confrontation. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Formuler la divergence, le fondement et une option alternative. Nommez un fait simple et expliquez votre contribution.",
    "evidence": [
      "La réponse démontre : un désaccord constructif.",
      "Le candidat apporte un élément concret et vérifiable lié à « Exprimer un désaccord ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau découverte et à l'interlocuteur."
    ],
    "pitfalls": [
      "Personnaliser la critique.",
      "Évitez d’ajouter des détails inutiles.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : formuler la divergence, le fondement et une option alternative.",
    "reflection": "Votre proposition ouvre-t-elle une discussion utile ?"
  },
  "communication-7-practice": {
    "objective": "Un désaccord constructif — approfondissement.",
    "context": "Situation de pratique : Formulez un désaccord professionnel sans confrontation. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Formuler la divergence, le fondement et une option alternative. Mobilisez un exemple précis, une preuve vérifiable et un lien au poste.",
    "evidence": [
      "La réponse démontre : un désaccord constructif.",
      "Le candidat apporte un élément concret et vérifiable lié à « Exprimer un désaccord ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau approfondissement et à l'interlocuteur."
    ],
    "pitfalls": [
      "Personnaliser la critique.",
      "Évitez les réponses génériques non adaptées au contexte.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : formuler la divergence, le fondement et une option alternative.",
    "reflection": "Votre proposition ouvre-t-elle une discussion utile ?"
  },
  "communication-7-challenge": {
    "objective": "Un désaccord constructif — challenge.",
    "context": "Situation de pratique : Formulez un désaccord professionnel sans confrontation. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Formuler la divergence, le fondement et une option alternative. Ajoutez une objection plausible du recruteur et montrez comment vous y répondez avec nuance.",
    "evidence": [
      "La réponse démontre : un désaccord constructif.",
      "Le candidat apporte un élément concret et vérifiable lié à « Exprimer un désaccord ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau challenge et à l'interlocuteur."
    ],
    "pitfalls": [
      "Personnaliser la critique.",
      "Évitez d’inventer une certitude ou un chiffre sous pression.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : formuler la divergence, le fondement et une option alternative.",
    "reflection": "Votre proposition ouvre-t-elle une discussion utile ?"
  },
  "communication-8-foundation": {
    "objective": "Une synthèse mémorable — découverte.",
    "context": "Situation de pratique : Résumez le message principal d'une réponse en une phrase mémorable. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Choisir une conclusion courte fidèle à l'argument développé. Nommez un fait simple et expliquez votre contribution.",
    "evidence": [
      "La réponse démontre : une synthèse mémorable.",
      "Le candidat apporte un élément concret et vérifiable lié à « Conclure en une phrase ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau découverte et à l'interlocuteur."
    ],
    "pitfalls": [
      "Introduire une idée nouvelle dans la conclusion.",
      "Évitez d’ajouter des détails inutiles.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : choisir une conclusion courte fidèle à l'argument développé.",
    "reflection": "Que retiendra-t-on dix minutes plus tard ?"
  },
  "communication-8-practice": {
    "objective": "Une synthèse mémorable — approfondissement.",
    "context": "Situation de pratique : Résumez le message principal d'une réponse en une phrase mémorable. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Choisir une conclusion courte fidèle à l'argument développé. Mobilisez un exemple précis, une preuve vérifiable et un lien au poste.",
    "evidence": [
      "La réponse démontre : une synthèse mémorable.",
      "Le candidat apporte un élément concret et vérifiable lié à « Conclure en une phrase ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau approfondissement et à l'interlocuteur."
    ],
    "pitfalls": [
      "Introduire une idée nouvelle dans la conclusion.",
      "Évitez les réponses génériques non adaptées au contexte.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : choisir une conclusion courte fidèle à l'argument développé.",
    "reflection": "Que retiendra-t-on dix minutes plus tard ?"
  },
  "communication-8-challenge": {
    "objective": "Une synthèse mémorable — challenge.",
    "context": "Situation de pratique : Résumez le message principal d'une réponse en une phrase mémorable. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Choisir une conclusion courte fidèle à l'argument développé. Ajoutez une objection plausible du recruteur et montrez comment vous y répondez avec nuance.",
    "evidence": [
      "La réponse démontre : une synthèse mémorable.",
      "Le candidat apporte un élément concret et vérifiable lié à « Conclure en une phrase ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau challenge et à l'interlocuteur."
    ],
    "pitfalls": [
      "Introduire une idée nouvelle dans la conclusion.",
      "Évitez d’inventer une certitude ou un chiffre sous pression.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : choisir une conclusion courte fidèle à l'argument développé.",
    "reflection": "Que retiendra-t-on dix minutes plus tard ?"
  },
  "behavior-1-foundation": {
    "objective": "Une résolution collaborative — découverte.",
    "context": "Situation de pratique : Racontez un désaccord avec un collègue et la façon dont il a été résolu. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Présenter les intérêts opposés, votre écoute et un résultat réel. Nommez un fait simple et expliquez votre contribution.",
    "evidence": [
      "La réponse démontre : une résolution collaborative.",
      "Le candidat apporte un élément concret et vérifiable lié à « Résoudre un conflit ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau découverte et à l'interlocuteur."
    ],
    "pitfalls": [
      "Mettre un collègue en accusation.",
      "Évitez d’ajouter des détails inutiles.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : présenter les intérêts opposés, votre écoute et un résultat réel.",
    "reflection": "Comment avez-vous aidé à rétablir la coopération ?"
  },
  "behavior-1-practice": {
    "objective": "Une résolution collaborative — approfondissement.",
    "context": "Situation de pratique : Racontez un désaccord avec un collègue et la façon dont il a été résolu. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Présenter les intérêts opposés, votre écoute et un résultat réel. Mobilisez un exemple précis, une preuve vérifiable et un lien au poste.",
    "evidence": [
      "La réponse démontre : une résolution collaborative.",
      "Le candidat apporte un élément concret et vérifiable lié à « Résoudre un conflit ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau approfondissement et à l'interlocuteur."
    ],
    "pitfalls": [
      "Mettre un collègue en accusation.",
      "Évitez les réponses génériques non adaptées au contexte.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : présenter les intérêts opposés, votre écoute et un résultat réel.",
    "reflection": "Comment avez-vous aidé à rétablir la coopération ?"
  },
  "behavior-1-challenge": {
    "objective": "Une résolution collaborative — challenge.",
    "context": "Situation de pratique : Racontez un désaccord avec un collègue et la façon dont il a été résolu. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Présenter les intérêts opposés, votre écoute et un résultat réel. Ajoutez une objection plausible du recruteur et montrez comment vous y répondez avec nuance.",
    "evidence": [
      "La réponse démontre : une résolution collaborative.",
      "Le candidat apporte un élément concret et vérifiable lié à « Résoudre un conflit ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau challenge et à l'interlocuteur."
    ],
    "pitfalls": [
      "Mettre un collègue en accusation.",
      "Évitez d’inventer une certitude ou un chiffre sous pression.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : présenter les intérêts opposés, votre écoute et un résultat réel.",
    "reflection": "Comment avez-vous aidé à rétablir la coopération ?"
  },
  "behavior-2-foundation": {
    "objective": "Une contribution transversale — découverte.",
    "context": "Situation de pratique : Illustrez une réussite impliquant plusieurs équipes. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Identifier responsabilités partagées et coordination effective. Nommez un fait simple et expliquez votre contribution.",
    "evidence": [
      "La réponse démontre : une contribution transversale.",
      "Le candidat apporte un élément concret et vérifiable lié à « Collaborer en transversal ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau découverte et à l'interlocuteur."
    ],
    "pitfalls": [
      "Présenter la réunion comme une réalisation suffisante.",
      "Évitez d’ajouter des détails inutiles.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : identifier responsabilités partagées et coordination effective.",
    "reflection": "Quelle action concrète a amélioré la collaboration ?"
  },
  "behavior-2-practice": {
    "objective": "Une contribution transversale — approfondissement.",
    "context": "Situation de pratique : Illustrez une réussite impliquant plusieurs équipes. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Identifier responsabilités partagées et coordination effective. Mobilisez un exemple précis, une preuve vérifiable et un lien au poste.",
    "evidence": [
      "La réponse démontre : une contribution transversale.",
      "Le candidat apporte un élément concret et vérifiable lié à « Collaborer en transversal ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau approfondissement et à l'interlocuteur."
    ],
    "pitfalls": [
      "Présenter la réunion comme une réalisation suffisante.",
      "Évitez les réponses génériques non adaptées au contexte.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : identifier responsabilités partagées et coordination effective.",
    "reflection": "Quelle action concrète a amélioré la collaboration ?"
  },
  "behavior-2-challenge": {
    "objective": "Une contribution transversale — challenge.",
    "context": "Situation de pratique : Illustrez une réussite impliquant plusieurs équipes. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Identifier responsabilités partagées et coordination effective. Ajoutez une objection plausible du recruteur et montrez comment vous y répondez avec nuance.",
    "evidence": [
      "La réponse démontre : une contribution transversale.",
      "Le candidat apporte un élément concret et vérifiable lié à « Collaborer en transversal ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau challenge et à l'interlocuteur."
    ],
    "pitfalls": [
      "Présenter la réunion comme une réalisation suffisante.",
      "Évitez d’inventer une certitude ou un chiffre sous pression.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : identifier responsabilités partagées et coordination effective.",
    "reflection": "Quelle action concrète a amélioré la collaboration ?"
  },
  "behavior-3-foundation": {
    "objective": "Un feedback transformé en action — découverte.",
    "context": "Situation de pratique : Expliquez un retour critique et ce que vous en avez fait. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Citer un retour précis, votre réaction et le changement produit. Nommez un fait simple et expliquez votre contribution.",
    "evidence": [
      "La réponse démontre : un feedback transformé en action.",
      "Le candidat apporte un élément concret et vérifiable lié à « Recevoir un feedback difficile ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau découverte et à l'interlocuteur."
    ],
    "pitfalls": [
      "Se défendre sans analyser le message.",
      "Évitez d’ajouter des détails inutiles.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : citer un retour précis, votre réaction et le changement produit.",
    "reflection": "Quel comportement avez-vous réellement changé ?"
  },
  "behavior-3-practice": {
    "objective": "Un feedback transformé en action — approfondissement.",
    "context": "Situation de pratique : Expliquez un retour critique et ce que vous en avez fait. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Citer un retour précis, votre réaction et le changement produit. Mobilisez un exemple précis, une preuve vérifiable et un lien au poste.",
    "evidence": [
      "La réponse démontre : un feedback transformé en action.",
      "Le candidat apporte un élément concret et vérifiable lié à « Recevoir un feedback difficile ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau approfondissement et à l'interlocuteur."
    ],
    "pitfalls": [
      "Se défendre sans analyser le message.",
      "Évitez les réponses génériques non adaptées au contexte.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : citer un retour précis, votre réaction et le changement produit.",
    "reflection": "Quel comportement avez-vous réellement changé ?"
  },
  "behavior-3-challenge": {
    "objective": "Un feedback transformé en action — challenge.",
    "context": "Situation de pratique : Expliquez un retour critique et ce que vous en avez fait. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Citer un retour précis, votre réaction et le changement produit. Ajoutez une objection plausible du recruteur et montrez comment vous y répondez avec nuance.",
    "evidence": [
      "La réponse démontre : un feedback transformé en action.",
      "Le candidat apporte un élément concret et vérifiable lié à « Recevoir un feedback difficile ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau challenge et à l'interlocuteur."
    ],
    "pitfalls": [
      "Se défendre sans analyser le message.",
      "Évitez d’inventer une certitude ou un chiffre sous pression.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : citer un retour précis, votre réaction et le changement produit.",
    "reflection": "Quel comportement avez-vous réellement changé ?"
  },
  "behavior-4-foundation": {
    "objective": "Une adaptation observable — découverte.",
    "context": "Situation de pratique : Décrivez une situation où vos priorités ont brusquement changé. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Montrer comment les priorités ont été revues et communiquées. Nommez un fait simple et expliquez votre contribution.",
    "evidence": [
      "La réponse démontre : une adaptation observable.",
      "Le candidat apporte un élément concret et vérifiable lié à « S'adapter au changement ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau découverte et à l'interlocuteur."
    ],
    "pitfalls": [
      "Confondre agilité et improvisation permanente.",
      "Évitez d’ajouter des détails inutiles.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : montrer comment les priorités ont été revues et communiquées.",
    "reflection": "Quels compromis avez-vous explicités ?"
  },
  "behavior-4-practice": {
    "objective": "Une adaptation observable — approfondissement.",
    "context": "Situation de pratique : Décrivez une situation où vos priorités ont brusquement changé. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Montrer comment les priorités ont été revues et communiquées. Mobilisez un exemple précis, une preuve vérifiable et un lien au poste.",
    "evidence": [
      "La réponse démontre : une adaptation observable.",
      "Le candidat apporte un élément concret et vérifiable lié à « S'adapter au changement ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau approfondissement et à l'interlocuteur."
    ],
    "pitfalls": [
      "Confondre agilité et improvisation permanente.",
      "Évitez les réponses génériques non adaptées au contexte.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : montrer comment les priorités ont été revues et communiquées.",
    "reflection": "Quels compromis avez-vous explicités ?"
  },
  "behavior-4-challenge": {
    "objective": "Une adaptation observable — challenge.",
    "context": "Situation de pratique : Décrivez une situation où vos priorités ont brusquement changé. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Montrer comment les priorités ont été revues et communiquées. Ajoutez une objection plausible du recruteur et montrez comment vous y répondez avec nuance.",
    "evidence": [
      "La réponse démontre : une adaptation observable.",
      "Le candidat apporte un élément concret et vérifiable lié à « S'adapter au changement ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau challenge et à l'interlocuteur."
    ],
    "pitfalls": [
      "Confondre agilité et improvisation permanente.",
      "Évitez d’inventer une certitude ou un chiffre sous pression.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : montrer comment les priorités ont été revues et communiquées.",
    "reflection": "Quels compromis avez-vous explicités ?"
  },
  "behavior-5-foundation": {
    "objective": "Une initiative utile — découverte.",
    "context": "Situation de pratique : Racontez une amélioration que vous avez proposée sans qu'on vous le demande. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Partir d'un besoin réel, décrire l'initiative et son effet. Nommez un fait simple et expliquez votre contribution.",
    "evidence": [
      "La réponse démontre : une initiative utile.",
      "Le candidat apporte un élément concret et vérifiable lié à « Faire preuve d'initiative ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau découverte et à l'interlocuteur."
    ],
    "pitfalls": [
      "Vanter une idée non mise en oeuvre.",
      "Évitez d’ajouter des détails inutiles.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : partir d'un besoin réel, décrire l'initiative et son effet.",
    "reflection": "Qu'avez-vous fait sans attendre une instruction ?"
  },
  "behavior-5-practice": {
    "objective": "Une initiative utile — approfondissement.",
    "context": "Situation de pratique : Racontez une amélioration que vous avez proposée sans qu'on vous le demande. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Partir d'un besoin réel, décrire l'initiative et son effet. Mobilisez un exemple précis, une preuve vérifiable et un lien au poste.",
    "evidence": [
      "La réponse démontre : une initiative utile.",
      "Le candidat apporte un élément concret et vérifiable lié à « Faire preuve d'initiative ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau approfondissement et à l'interlocuteur."
    ],
    "pitfalls": [
      "Vanter une idée non mise en oeuvre.",
      "Évitez les réponses génériques non adaptées au contexte.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : partir d'un besoin réel, décrire l'initiative et son effet.",
    "reflection": "Qu'avez-vous fait sans attendre une instruction ?"
  },
  "behavior-5-challenge": {
    "objective": "Une initiative utile — challenge.",
    "context": "Situation de pratique : Racontez une amélioration que vous avez proposée sans qu'on vous le demande. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Partir d'un besoin réel, décrire l'initiative et son effet. Ajoutez une objection plausible du recruteur et montrez comment vous y répondez avec nuance.",
    "evidence": [
      "La réponse démontre : une initiative utile.",
      "Le candidat apporte un élément concret et vérifiable lié à « Faire preuve d'initiative ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau challenge et à l'interlocuteur."
    ],
    "pitfalls": [
      "Vanter une idée non mise en oeuvre.",
      "Évitez d’inventer une certitude ou un chiffre sous pression.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : partir d'un besoin réel, décrire l'initiative et son effet.",
    "reflection": "Qu'avez-vous fait sans attendre une instruction ?"
  },
  "behavior-6-foundation": {
    "objective": "Un arbitrage éthique explicable — découverte.",
    "context": "Situation de pratique : Expliquez comment vous avez géré un dilemme professionnel. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Identifier les contraintes, les parties concernées et l'action responsable. Nommez un fait simple et expliquez votre contribution.",
    "evidence": [
      "La réponse démontre : un arbitrage éthique explicable.",
      "Le candidat apporte un élément concret et vérifiable lié à « Agir avec éthique ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau découverte et à l'interlocuteur."
    ],
    "pitfalls": [
      "Présenter la conformité comme optionnelle.",
      "Évitez d’ajouter des détails inutiles.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : identifier les contraintes, les parties concernées et l'action responsable.",
    "reflection": "Votre choix serait-il défendable devant les parties prenantes ?"
  },
  "behavior-6-practice": {
    "objective": "Un arbitrage éthique explicable — approfondissement.",
    "context": "Situation de pratique : Expliquez comment vous avez géré un dilemme professionnel. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Identifier les contraintes, les parties concernées et l'action responsable. Mobilisez un exemple précis, une preuve vérifiable et un lien au poste.",
    "evidence": [
      "La réponse démontre : un arbitrage éthique explicable.",
      "Le candidat apporte un élément concret et vérifiable lié à « Agir avec éthique ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau approfondissement et à l'interlocuteur."
    ],
    "pitfalls": [
      "Présenter la conformité comme optionnelle.",
      "Évitez les réponses génériques non adaptées au contexte.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : identifier les contraintes, les parties concernées et l'action responsable.",
    "reflection": "Votre choix serait-il défendable devant les parties prenantes ?"
  },
  "behavior-6-challenge": {
    "objective": "Un arbitrage éthique explicable — challenge.",
    "context": "Situation de pratique : Expliquez comment vous avez géré un dilemme professionnel. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Identifier les contraintes, les parties concernées et l'action responsable. Ajoutez une objection plausible du recruteur et montrez comment vous y répondez avec nuance.",
    "evidence": [
      "La réponse démontre : un arbitrage éthique explicable.",
      "Le candidat apporte un élément concret et vérifiable lié à « Agir avec éthique ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau challenge et à l'interlocuteur."
    ],
    "pitfalls": [
      "Présenter la conformité comme optionnelle.",
      "Évitez d’inventer une certitude ou un chiffre sous pression.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : identifier les contraintes, les parties concernées et l'action responsable.",
    "reflection": "Votre choix serait-il défendable devant les parties prenantes ?"
  },
  "behavior-7-foundation": {
    "objective": "Un apprentissage appliqué — découverte.",
    "context": "Situation de pratique : Présentez une compétence acquise pour résoudre un problème nouveau. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Relier nouvelle compétence, méthode d'apprentissage et application. Nommez un fait simple et expliquez votre contribution.",
    "evidence": [
      "La réponse démontre : un apprentissage appliqué.",
      "Le candidat apporte un élément concret et vérifiable lié à « Apprendre rapidement ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau découverte et à l'interlocuteur."
    ],
    "pitfalls": [
      "Énumérer des cours sans résultat pratique.",
      "Évitez d’ajouter des détails inutiles.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : relier nouvelle compétence, méthode d'apprentissage et application.",
    "reflection": "Qu'avez-vous pu faire après l'apprentissage ?"
  },
  "behavior-7-practice": {
    "objective": "Un apprentissage appliqué — approfondissement.",
    "context": "Situation de pratique : Présentez une compétence acquise pour résoudre un problème nouveau. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Relier nouvelle compétence, méthode d'apprentissage et application. Mobilisez un exemple précis, une preuve vérifiable et un lien au poste.",
    "evidence": [
      "La réponse démontre : un apprentissage appliqué.",
      "Le candidat apporte un élément concret et vérifiable lié à « Apprendre rapidement ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau approfondissement et à l'interlocuteur."
    ],
    "pitfalls": [
      "Énumérer des cours sans résultat pratique.",
      "Évitez les réponses génériques non adaptées au contexte.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : relier nouvelle compétence, méthode d'apprentissage et application.",
    "reflection": "Qu'avez-vous pu faire après l'apprentissage ?"
  },
  "behavior-7-challenge": {
    "objective": "Un apprentissage appliqué — challenge.",
    "context": "Situation de pratique : Présentez une compétence acquise pour résoudre un problème nouveau. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Relier nouvelle compétence, méthode d'apprentissage et application. Ajoutez une objection plausible du recruteur et montrez comment vous y répondez avec nuance.",
    "evidence": [
      "La réponse démontre : un apprentissage appliqué.",
      "Le candidat apporte un élément concret et vérifiable lié à « Apprendre rapidement ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau challenge et à l'interlocuteur."
    ],
    "pitfalls": [
      "Énumérer des cours sans résultat pratique.",
      "Évitez d’inventer une certitude ou un chiffre sous pression.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : relier nouvelle compétence, méthode d'apprentissage et application.",
    "reflection": "Qu'avez-vous pu faire après l'apprentissage ?"
  },
  "behavior-8-foundation": {
    "objective": "Une entraide avec impact — découverte.",
    "context": "Situation de pratique : Donnez un exemple de soutien apporté à un pair. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Décrire le besoin du collègue, votre soutien et son autonomie finale. Nommez un fait simple et expliquez votre contribution.",
    "evidence": [
      "La réponse démontre : une entraide avec impact.",
      "Le candidat apporte un élément concret et vérifiable lié à « Aider un collègue ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau découverte et à l'interlocuteur."
    ],
    "pitfalls": [
      "Se présenter comme le sauveur d'une équipe.",
      "Évitez d’ajouter des détails inutiles.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : décrire le besoin du collègue, votre soutien et son autonomie finale.",
    "reflection": "Comment avez-vous rendu le collègue plus autonome ?"
  },
  "behavior-8-practice": {
    "objective": "Une entraide avec impact — approfondissement.",
    "context": "Situation de pratique : Donnez un exemple de soutien apporté à un pair. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Décrire le besoin du collègue, votre soutien et son autonomie finale. Mobilisez un exemple précis, une preuve vérifiable et un lien au poste.",
    "evidence": [
      "La réponse démontre : une entraide avec impact.",
      "Le candidat apporte un élément concret et vérifiable lié à « Aider un collègue ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau approfondissement et à l'interlocuteur."
    ],
    "pitfalls": [
      "Se présenter comme le sauveur d'une équipe.",
      "Évitez les réponses génériques non adaptées au contexte.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : décrire le besoin du collègue, votre soutien et son autonomie finale.",
    "reflection": "Comment avez-vous rendu le collègue plus autonome ?"
  },
  "behavior-8-challenge": {
    "objective": "Une entraide avec impact — challenge.",
    "context": "Situation de pratique : Donnez un exemple de soutien apporté à un pair. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Décrire le besoin du collègue, votre soutien et son autonomie finale. Ajoutez une objection plausible du recruteur et montrez comment vous y répondez avec nuance.",
    "evidence": [
      "La réponse démontre : une entraide avec impact.",
      "Le candidat apporte un élément concret et vérifiable lié à « Aider un collègue ».",
      "La contribution personnelle est distinguée des actions collectives.",
      "Le raisonnement est adapté au niveau challenge et à l'interlocuteur."
    ],
    "pitfalls": [
      "Se présenter comme le sauveur d'une équipe.",
      "Évitez d’inventer une certitude ou un chiffre sous pression.",
      "Inventer des résultats ou des faits pour rendre l'exemple plus convaincant."
    ],
    "example": "Trame de réponse (à personnaliser, pas à réciter) : « Dans [situation précise], mon objectif était [but]. J'ai choisi [action personnelle] car [raison]. Le résultat observable a été [fait vérifiable]. Cela m'a appris [enseignement lié à la compétence]. » Pour cet atelier, vérifiez particulièrement : décrire le besoin du collègue, votre soutien et son autonomie finale.",
    "reflection": "Comment avez-vous rendu le collègue plus autonome ?"
  }
};

const remainingGuides: Record<string, PremiumGuide> = {
  "motivation-1-foundation": {
    "objective": "Pourquoi ce poste ? — Découverte",
    "context": "Atelier découverte : Expliquez pourquoi ce poste constitue une étape logique pour vous. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : relier le poste à une contribution possible. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : relier le poste à une contribution possible.",
      "La réponse traite bien de la situation « Pourquoi ce poste ? » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas confondre motivation et flatterie.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : relier le poste à une contribution possible.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de relier le poste à une contribution possible ?"
  },
  "motivation-1-practice": {
    "objective": "Pourquoi ce poste ? — Approfondissement",
    "context": "Atelier approfondissement : Expliquez pourquoi ce poste constitue une étape logique pour vous. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : relier le poste à une contribution possible. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : relier le poste à une contribution possible.",
      "La réponse traite bien de la situation « Pourquoi ce poste ? » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas confondre motivation et flatterie.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : relier le poste à une contribution possible.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de relier le poste à une contribution possible ?"
  },
  "motivation-1-challenge": {
    "objective": "Pourquoi ce poste ? — Mise en situation",
    "context": "Atelier mise en situation : Expliquez pourquoi ce poste constitue une étape logique pour vous. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : relier le poste à une contribution possible. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : relier le poste à une contribution possible.",
      "La réponse traite bien de la situation « Pourquoi ce poste ? » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas confondre motivation et flatterie.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : relier le poste à une contribution possible.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de relier le poste à une contribution possible ?"
  },
  "motivation-2-foundation": {
    "objective": "Pourquoi cette entreprise ? — Découverte",
    "context": "Atelier découverte : Décrivez ce qui vous attire dans la mission de cette organisation sans compliments génériques. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : appuyer un intérêt pour l’entreprise sur un fait vérifié. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : appuyer un intérêt pour l’entreprise sur un fait vérifié.",
      "La réponse traite bien de la situation « Pourquoi cette entreprise ? » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Éviter des affirmations non documentées sur l’entreprise.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : appuyer un intérêt pour l’entreprise sur un fait vérifié.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de appuyer un intérêt pour l’entreprise sur un fait vérifié ?"
  },
  "motivation-2-practice": {
    "objective": "Pourquoi cette entreprise ? — Approfondissement",
    "context": "Atelier approfondissement : Décrivez ce qui vous attire dans la mission de cette organisation sans compliments génériques. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : appuyer un intérêt pour l’entreprise sur un fait vérifié. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : appuyer un intérêt pour l’entreprise sur un fait vérifié.",
      "La réponse traite bien de la situation « Pourquoi cette entreprise ? » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Éviter des affirmations non documentées sur l’entreprise.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : appuyer un intérêt pour l’entreprise sur un fait vérifié.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de appuyer un intérêt pour l’entreprise sur un fait vérifié ?"
  },
  "motivation-2-challenge": {
    "objective": "Pourquoi cette entreprise ? — Mise en situation",
    "context": "Atelier mise en situation : Décrivez ce qui vous attire dans la mission de cette organisation sans compliments génériques. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : appuyer un intérêt pour l’entreprise sur un fait vérifié. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : appuyer un intérêt pour l’entreprise sur un fait vérifié.",
      "La réponse traite bien de la situation « Pourquoi cette entreprise ? » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Éviter des affirmations non documentées sur l’entreprise.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : appuyer un intérêt pour l’entreprise sur un fait vérifié.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de appuyer un intérêt pour l’entreprise sur un fait vérifié ?"
  },
  "motivation-3-foundation": {
    "objective": "Votre projet à trois ans — Découverte",
    "context": "Atelier découverte : Présentez un projet professionnel ambitieux et réaliste. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : formuler une perspective cohérente et ouverte. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : formuler une perspective cohérente et ouverte.",
      "La réponse traite bien de la situation « Votre projet à trois ans » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas promettre un avenir rigide.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : formuler une perspective cohérente et ouverte.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de formuler une perspective cohérente et ouverte ?"
  },
  "motivation-3-practice": {
    "objective": "Votre projet à trois ans — Approfondissement",
    "context": "Atelier approfondissement : Présentez un projet professionnel ambitieux et réaliste. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : formuler une perspective cohérente et ouverte. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : formuler une perspective cohérente et ouverte.",
      "La réponse traite bien de la situation « Votre projet à trois ans » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas promettre un avenir rigide.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : formuler une perspective cohérente et ouverte.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de formuler une perspective cohérente et ouverte ?"
  },
  "motivation-3-challenge": {
    "objective": "Votre projet à trois ans — Mise en situation",
    "context": "Atelier mise en situation : Présentez un projet professionnel ambitieux et réaliste. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : formuler une perspective cohérente et ouverte. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : formuler une perspective cohérente et ouverte.",
      "La réponse traite bien de la situation « Votre projet à trois ans » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas promettre un avenir rigide.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : formuler une perspective cohérente et ouverte.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de formuler une perspective cohérente et ouverte ?"
  },
  "motivation-4-foundation": {
    "objective": "Vos critères de choix — Découverte",
    "context": "Atelier découverte : Hiérarchisez trois critères importants pour votre prochaine opportunité. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : hiérarchiser des critères explicitement. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : hiérarchiser des critères explicitement.",
      "La réponse traite bien de la situation « Vos critères de choix » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas annoncer uniquement la rémunération.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : hiérarchiser des critères explicitement.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de hiérarchiser des critères explicitement ?"
  },
  "motivation-4-practice": {
    "objective": "Vos critères de choix — Approfondissement",
    "context": "Atelier approfondissement : Hiérarchisez trois critères importants pour votre prochaine opportunité. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : hiérarchiser des critères explicitement. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : hiérarchiser des critères explicitement.",
      "La réponse traite bien de la situation « Vos critères de choix » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas annoncer uniquement la rémunération.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : hiérarchiser des critères explicitement.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de hiérarchiser des critères explicitement ?"
  },
  "motivation-4-challenge": {
    "objective": "Vos critères de choix — Mise en situation",
    "context": "Atelier mise en situation : Hiérarchisez trois critères importants pour votre prochaine opportunité. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : hiérarchiser des critères explicitement. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : hiérarchiser des critères explicitement.",
      "La réponse traite bien de la situation « Vos critères de choix » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas annoncer uniquement la rémunération.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : hiérarchiser des critères explicitement.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de hiérarchiser des critères explicitement ?"
  },
  "motivation-5-foundation": {
    "objective": "Vos valeurs professionnelles — Découverte",
    "context": "Atelier découverte : Illustrez une valeur qui influence réellement vos choix au travail. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : illustrer une valeur par un comportement. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : illustrer une valeur par un comportement.",
      "La réponse traite bien de la situation « Vos valeurs professionnelles » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas citer des valeurs sans preuve.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : illustrer une valeur par un comportement.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de illustrer une valeur par un comportement ?"
  },
  "motivation-5-practice": {
    "objective": "Vos valeurs professionnelles — Approfondissement",
    "context": "Atelier approfondissement : Illustrez une valeur qui influence réellement vos choix au travail. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : illustrer une valeur par un comportement. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : illustrer une valeur par un comportement.",
      "La réponse traite bien de la situation « Vos valeurs professionnelles » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas citer des valeurs sans preuve.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : illustrer une valeur par un comportement.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de illustrer une valeur par un comportement ?"
  },
  "motivation-5-challenge": {
    "objective": "Vos valeurs professionnelles — Mise en situation",
    "context": "Atelier mise en situation : Illustrez une valeur qui influence réellement vos choix au travail. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : illustrer une valeur par un comportement. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : illustrer une valeur par un comportement.",
      "La réponse traite bien de la situation « Vos valeurs professionnelles » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas citer des valeurs sans preuve.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : illustrer une valeur par un comportement.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de illustrer une valeur par un comportement ?"
  },
  "motivation-6-foundation": {
    "objective": "Votre moteur au quotidien — Découverte",
    "context": "Atelier découverte : Expliquez ce qui vous donne de l'énergie au travail avec un exemple. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : identifier une source de motivation durable. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : identifier une source de motivation durable.",
      "La réponse traite bien de la situation « Votre moteur au quotidien » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Éviter les généralités telles que « je suis passionné ».",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : identifier une source de motivation durable.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de identifier une source de motivation durable ?"
  },
  "motivation-6-practice": {
    "objective": "Votre moteur au quotidien — Approfondissement",
    "context": "Atelier approfondissement : Expliquez ce qui vous donne de l'énergie au travail avec un exemple. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : identifier une source de motivation durable. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : identifier une source de motivation durable.",
      "La réponse traite bien de la situation « Votre moteur au quotidien » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Éviter les généralités telles que « je suis passionné ».",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : identifier une source de motivation durable.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de identifier une source de motivation durable ?"
  },
  "motivation-6-challenge": {
    "objective": "Votre moteur au quotidien — Mise en situation",
    "context": "Atelier mise en situation : Expliquez ce qui vous donne de l'énergie au travail avec un exemple. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : identifier une source de motivation durable. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : identifier une source de motivation durable.",
      "La réponse traite bien de la situation « Votre moteur au quotidien » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Éviter les généralités telles que « je suis passionné ».",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : identifier une source de motivation durable.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de identifier une source de motivation durable ?"
  },
  "motivation-7-foundation": {
    "objective": "Pourquoi maintenant ? — Découverte",
    "context": "Atelier découverte : Justifiez le timing de votre recherche de mobilité. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : expliquer le bon moment pour changer. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : expliquer le bon moment pour changer.",
      "La réponse traite bien de la situation « Pourquoi maintenant ? » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas dénigrer le poste actuel.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : expliquer le bon moment pour changer.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de expliquer le bon moment pour changer ?"
  },
  "motivation-7-practice": {
    "objective": "Pourquoi maintenant ? — Approfondissement",
    "context": "Atelier approfondissement : Justifiez le timing de votre recherche de mobilité. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : expliquer le bon moment pour changer. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : expliquer le bon moment pour changer.",
      "La réponse traite bien de la situation « Pourquoi maintenant ? » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas dénigrer le poste actuel.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : expliquer le bon moment pour changer.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de expliquer le bon moment pour changer ?"
  },
  "motivation-7-challenge": {
    "objective": "Pourquoi maintenant ? — Mise en situation",
    "context": "Atelier mise en situation : Justifiez le timing de votre recherche de mobilité. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : expliquer le bon moment pour changer. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : expliquer le bon moment pour changer.",
      "La réponse traite bien de la situation « Pourquoi maintenant ? » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas dénigrer le poste actuel.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : expliquer le bon moment pour changer.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de expliquer le bon moment pour changer ?"
  },
  "motivation-8-foundation": {
    "objective": "Vos attentes du manager — Découverte",
    "context": "Atelier découverte : Décrivez le cadre de management dans lequel vous donnez le meilleur. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : définir des attentes de collaboration réciproques. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : définir des attentes de collaboration réciproques.",
      "La réponse traite bien de la situation « Vos attentes du manager » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas décrire un manager idéal irréaliste.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : définir des attentes de collaboration réciproques.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de définir des attentes de collaboration réciproques ?"
  },
  "motivation-8-practice": {
    "objective": "Vos attentes du manager — Approfondissement",
    "context": "Atelier approfondissement : Décrivez le cadre de management dans lequel vous donnez le meilleur. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : définir des attentes de collaboration réciproques. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : définir des attentes de collaboration réciproques.",
      "La réponse traite bien de la situation « Vos attentes du manager » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas décrire un manager idéal irréaliste.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : définir des attentes de collaboration réciproques.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de définir des attentes de collaboration réciproques ?"
  },
  "motivation-8-challenge": {
    "objective": "Vos attentes du manager — Mise en situation",
    "context": "Atelier mise en situation : Décrivez le cadre de management dans lequel vous donnez le meilleur. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : définir des attentes de collaboration réciproques. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : définir des attentes de collaboration réciproques.",
      "La réponse traite bien de la situation « Vos attentes du manager » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas décrire un manager idéal irréaliste.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : définir des attentes de collaboration réciproques.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de définir des attentes de collaboration réciproques ?"
  },
  "structure-1-foundation": {
    "objective": "Méthode STAR — Découverte",
    "context": "Atelier découverte : Décrivez une réussite en suivant Situation, Tâche, Actions et Résultat. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : identifier situation, responsabilité, action et résultat. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : identifier situation, responsabilité, action et résultat.",
      "La réponse traite bien de la situation « Méthode STAR » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas fondre action collective et action personnelle.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : identifier situation, responsabilité, action et résultat.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de identifier situation, responsabilité, action et résultat ?"
  },
  "structure-1-practice": {
    "objective": "Méthode STAR — Approfondissement",
    "context": "Atelier approfondissement : Décrivez une réussite en suivant Situation, Tâche, Actions et Résultat. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : identifier situation, responsabilité, action et résultat. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : identifier situation, responsabilité, action et résultat.",
      "La réponse traite bien de la situation « Méthode STAR » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas fondre action collective et action personnelle.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : identifier situation, responsabilité, action et résultat.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de identifier situation, responsabilité, action et résultat ?"
  },
  "structure-1-challenge": {
    "objective": "Méthode STAR — Mise en situation",
    "context": "Atelier mise en situation : Décrivez une réussite en suivant Situation, Tâche, Actions et Résultat. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : identifier situation, responsabilité, action et résultat. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : identifier situation, responsabilité, action et résultat.",
      "La réponse traite bien de la situation « Méthode STAR » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas fondre action collective et action personnelle.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : identifier situation, responsabilité, action et résultat.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de identifier situation, responsabilité, action et résultat ?"
  },
  "structure-2-foundation": {
    "objective": "Répondre sans se disperser — Découverte",
    "context": "Atelier découverte : Répondez en trois idées à la question : qu'apporterez-vous à l'équipe ? Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : retenir trois idées hiérarchisées. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : retenir trois idées hiérarchisées.",
      "La réponse traite bien de la situation « Répondre sans se disperser » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Éviter le catalogue d’arguments.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : retenir trois idées hiérarchisées.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de retenir trois idées hiérarchisées ?"
  },
  "structure-2-practice": {
    "objective": "Répondre sans se disperser — Approfondissement",
    "context": "Atelier approfondissement : Répondez en trois idées à la question : qu'apporterez-vous à l'équipe ? Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : retenir trois idées hiérarchisées. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : retenir trois idées hiérarchisées.",
      "La réponse traite bien de la situation « Répondre sans se disperser » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Éviter le catalogue d’arguments.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : retenir trois idées hiérarchisées.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de retenir trois idées hiérarchisées ?"
  },
  "structure-2-challenge": {
    "objective": "Répondre sans se disperser — Mise en situation",
    "context": "Atelier mise en situation : Répondez en trois idées à la question : qu'apporterez-vous à l'équipe ? Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : retenir trois idées hiérarchisées. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : retenir trois idées hiérarchisées.",
      "La réponse traite bien de la situation « Répondre sans se disperser » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Éviter le catalogue d’arguments.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : retenir trois idées hiérarchisées.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de retenir trois idées hiérarchisées ?"
  },
  "structure-3-foundation": {
    "objective": "Ouvrir avec une conclusion — Découverte",
    "context": "Atelier découverte : Commencez par votre réponse principale avant de justifier votre raisonnement. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : annoncer la conclusion avant les justifications. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : annoncer la conclusion avant les justifications.",
      "La réponse traite bien de la situation « Ouvrir avec une conclusion » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas cacher le message principal.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : annoncer la conclusion avant les justifications.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de annoncer la conclusion avant les justifications ?"
  },
  "structure-3-practice": {
    "objective": "Ouvrir avec une conclusion — Approfondissement",
    "context": "Atelier approfondissement : Commencez par votre réponse principale avant de justifier votre raisonnement. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : annoncer la conclusion avant les justifications. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : annoncer la conclusion avant les justifications.",
      "La réponse traite bien de la situation « Ouvrir avec une conclusion » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas cacher le message principal.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : annoncer la conclusion avant les justifications.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de annoncer la conclusion avant les justifications ?"
  },
  "structure-3-challenge": {
    "objective": "Ouvrir avec une conclusion — Mise en situation",
    "context": "Atelier mise en situation : Commencez par votre réponse principale avant de justifier votre raisonnement. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : annoncer la conclusion avant les justifications. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : annoncer la conclusion avant les justifications.",
      "La réponse traite bien de la situation « Ouvrir avec une conclusion » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas cacher le message principal.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : annoncer la conclusion avant les justifications.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de annoncer la conclusion avant les justifications ?"
  },
  "structure-4-foundation": {
    "objective": "Quantifier un résultat — Découverte",
    "context": "Atelier découverte : Expliquez un impact concret en précisant un indicateur réellement connu. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : citer un indicateur fiable et sa limite. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : citer un indicateur fiable et sa limite.",
      "La réponse traite bien de la situation « Quantifier un résultat » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne jamais inventer un chiffre.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : citer un indicateur fiable et sa limite.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de citer un indicateur fiable et sa limite ?"
  },
  "structure-4-practice": {
    "objective": "Quantifier un résultat — Approfondissement",
    "context": "Atelier approfondissement : Expliquez un impact concret en précisant un indicateur réellement connu. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : citer un indicateur fiable et sa limite. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : citer un indicateur fiable et sa limite.",
      "La réponse traite bien de la situation « Quantifier un résultat » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne jamais inventer un chiffre.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : citer un indicateur fiable et sa limite.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de citer un indicateur fiable et sa limite ?"
  },
  "structure-4-challenge": {
    "objective": "Quantifier un résultat — Mise en situation",
    "context": "Atelier mise en situation : Expliquez un impact concret en précisant un indicateur réellement connu. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : citer un indicateur fiable et sa limite. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : citer un indicateur fiable et sa limite.",
      "La réponse traite bien de la situation « Quantifier un résultat » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne jamais inventer un chiffre.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : citer un indicateur fiable et sa limite.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de citer un indicateur fiable et sa limite ?"
  },
  "structure-5-foundation": {
    "objective": "Reformuler une question ambiguë — Découverte",
    "context": "Atelier découverte : Face à une question vague, formulez une demande de clarification professionnelle. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : poser une question de clarification ciblée. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : poser une question de clarification ciblée.",
      "La réponse traite bien de la situation « Reformuler une question ambiguë » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas répondre sur une hypothèse silencieuse.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : poser une question de clarification ciblée.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de poser une question de clarification ciblée ?"
  },
  "structure-5-practice": {
    "objective": "Reformuler une question ambiguë — Approfondissement",
    "context": "Atelier approfondissement : Face à une question vague, formulez une demande de clarification professionnelle. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : poser une question de clarification ciblée. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : poser une question de clarification ciblée.",
      "La réponse traite bien de la situation « Reformuler une question ambiguë » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas répondre sur une hypothèse silencieuse.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : poser une question de clarification ciblée.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de poser une question de clarification ciblée ?"
  },
  "structure-5-challenge": {
    "objective": "Reformuler une question ambiguë — Mise en situation",
    "context": "Atelier mise en situation : Face à une question vague, formulez une demande de clarification professionnelle. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : poser une question de clarification ciblée. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : poser une question de clarification ciblée.",
      "La réponse traite bien de la situation « Reformuler une question ambiguë » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas répondre sur une hypothèse silencieuse.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : poser une question de clarification ciblée.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de poser une question de clarification ciblée ?"
  },
  "structure-6-foundation": {
    "objective": "Construire un exemple négatif — Découverte",
    "context": "Atelier découverte : Racontez un échec avec votre apprentissage et votre changement de pratique. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : assumer un apprentissage vérifiable. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : assumer un apprentissage vérifiable.",
      "La réponse traite bien de la situation « Construire un exemple négatif » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas présenter un échec comme une réussite déguisée.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : assumer un apprentissage vérifiable.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de assumer un apprentissage vérifiable ?"
  },
  "structure-6-practice": {
    "objective": "Construire un exemple négatif — Approfondissement",
    "context": "Atelier approfondissement : Racontez un échec avec votre apprentissage et votre changement de pratique. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : assumer un apprentissage vérifiable. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : assumer un apprentissage vérifiable.",
      "La réponse traite bien de la situation « Construire un exemple négatif » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas présenter un échec comme une réussite déguisée.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : assumer un apprentissage vérifiable.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de assumer un apprentissage vérifiable ?"
  },
  "structure-6-challenge": {
    "objective": "Construire un exemple négatif — Mise en situation",
    "context": "Atelier mise en situation : Racontez un échec avec votre apprentissage et votre changement de pratique. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : assumer un apprentissage vérifiable. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : assumer un apprentissage vérifiable.",
      "La réponse traite bien de la situation « Construire un exemple négatif » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas présenter un échec comme une réussite déguisée.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : assumer un apprentissage vérifiable.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de assumer un apprentissage vérifiable ?"
  },
  "structure-7-foundation": {
    "objective": "Faire court sous pression — Découverte",
    "context": "Atelier découverte : Répondez en moins de deux minutes à une question complexe. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : prioriser les informations utiles à la décision. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : prioriser les informations utiles à la décision.",
      "La réponse traite bien de la situation « Faire court sous pression » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Éviter l’accumulation de contexte.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : prioriser les informations utiles à la décision.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de prioriser les informations utiles à la décision ?"
  },
  "structure-7-practice": {
    "objective": "Faire court sous pression — Approfondissement",
    "context": "Atelier approfondissement : Répondez en moins de deux minutes à une question complexe. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : prioriser les informations utiles à la décision. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : prioriser les informations utiles à la décision.",
      "La réponse traite bien de la situation « Faire court sous pression » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Éviter l’accumulation de contexte.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : prioriser les informations utiles à la décision.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de prioriser les informations utiles à la décision ?"
  },
  "structure-7-challenge": {
    "objective": "Faire court sous pression — Mise en situation",
    "context": "Atelier mise en situation : Répondez en moins de deux minutes à une question complexe. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : prioriser les informations utiles à la décision. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : prioriser les informations utiles à la décision.",
      "La réponse traite bien de la situation « Faire court sous pression » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Éviter l’accumulation de contexte.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : prioriser les informations utiles à la décision.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de prioriser les informations utiles à la décision ?"
  },
  "structure-8-foundation": {
    "objective": "Faire le lien avec le poste — Découverte",
    "context": "Atelier découverte : Concluez un exemple en expliquant en quoi il vous prépare à la mission visée. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : conclure par la pertinence pour le poste. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : conclure par la pertinence pour le poste.",
      "La réponse traite bien de la situation « Faire le lien avec le poste » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas répéter mécaniquement son CV.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : conclure par la pertinence pour le poste.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de conclure par la pertinence pour le poste ?"
  },
  "structure-8-practice": {
    "objective": "Faire le lien avec le poste — Approfondissement",
    "context": "Atelier approfondissement : Concluez un exemple en expliquant en quoi il vous prépare à la mission visée. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : conclure par la pertinence pour le poste. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : conclure par la pertinence pour le poste.",
      "La réponse traite bien de la situation « Faire le lien avec le poste » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas répéter mécaniquement son CV.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : conclure par la pertinence pour le poste.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de conclure par la pertinence pour le poste ?"
  },
  "structure-8-challenge": {
    "objective": "Faire le lien avec le poste — Mise en situation",
    "context": "Atelier mise en situation : Concluez un exemple en expliquant en quoi il vous prépare à la mission visée. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : conclure par la pertinence pour le poste. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : conclure par la pertinence pour le poste.",
      "La réponse traite bien de la situation « Faire le lien avec le poste » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas répéter mécaniquement son CV.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : conclure par la pertinence pour le poste.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de conclure par la pertinence pour le poste ?"
  },
  "confidence-1-foundation": {
    "objective": "Commencer malgré le trac — Découverte",
    "context": "Atelier découverte : Construisez une première phrase stable avant une question importante. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : préparer un début clair et naturel. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : préparer un début clair et naturel.",
      "La réponse traite bien de la situation « Commencer malgré le trac » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas assimiler débit rapide et compétence.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : préparer un début clair et naturel.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de préparer un début clair et naturel ?"
  },
  "confidence-1-practice": {
    "objective": "Commencer malgré le trac — Approfondissement",
    "context": "Atelier approfondissement : Construisez une première phrase stable avant une question importante. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : préparer un début clair et naturel. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : préparer un début clair et naturel.",
      "La réponse traite bien de la situation « Commencer malgré le trac » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas assimiler débit rapide et compétence.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : préparer un début clair et naturel.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de préparer un début clair et naturel ?"
  },
  "confidence-1-challenge": {
    "objective": "Commencer malgré le trac — Mise en situation",
    "context": "Atelier mise en situation : Construisez une première phrase stable avant une question importante. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : préparer un début clair et naturel. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : préparer un début clair et naturel.",
      "La réponse traite bien de la situation « Commencer malgré le trac » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas assimiler débit rapide et compétence.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : préparer un début clair et naturel.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de préparer un début clair et naturel ?"
  },
  "confidence-2-foundation": {
    "objective": "Gérer une question imprévue — Découverte",
    "context": "Atelier découverte : Expliquez comment vous répondrez si vous avez besoin de réfléchir. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : demander quelques secondes de réflexion. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : demander quelques secondes de réflexion.",
      "La réponse traite bien de la situation « Gérer une question imprévue » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas improviser une fausse certitude.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : demander quelques secondes de réflexion.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de demander quelques secondes de réflexion ?"
  },
  "confidence-2-practice": {
    "objective": "Gérer une question imprévue — Approfondissement",
    "context": "Atelier approfondissement : Expliquez comment vous répondrez si vous avez besoin de réfléchir. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : demander quelques secondes de réflexion. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : demander quelques secondes de réflexion.",
      "La réponse traite bien de la situation « Gérer une question imprévue » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas improviser une fausse certitude.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : demander quelques secondes de réflexion.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de demander quelques secondes de réflexion ?"
  },
  "confidence-2-challenge": {
    "objective": "Gérer une question imprévue — Mise en situation",
    "context": "Atelier mise en situation : Expliquez comment vous répondrez si vous avez besoin de réfléchir. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : demander quelques secondes de réflexion. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : demander quelques secondes de réflexion.",
      "La réponse traite bien de la situation « Gérer une question imprévue » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas improviser une fausse certitude.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : demander quelques secondes de réflexion.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de demander quelques secondes de réflexion ?"
  },
  "confidence-3-foundation": {
    "objective": "Admettre une limite — Découverte",
    "context": "Atelier découverte : Répondez à une question dont vous ignorez la réponse sans inventer. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : reconnaître ses limites et proposer une méthode. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : reconnaître ses limites et proposer une méthode.",
      "La réponse traite bien de la situation « Admettre une limite » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas inventer une expérience.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : reconnaître ses limites et proposer une méthode.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de reconnaître ses limites et proposer une méthode ?"
  },
  "confidence-3-practice": {
    "objective": "Admettre une limite — Approfondissement",
    "context": "Atelier approfondissement : Répondez à une question dont vous ignorez la réponse sans inventer. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : reconnaître ses limites et proposer une méthode. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : reconnaître ses limites et proposer une méthode.",
      "La réponse traite bien de la situation « Admettre une limite » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas inventer une expérience.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : reconnaître ses limites et proposer une méthode.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de reconnaître ses limites et proposer une méthode ?"
  },
  "confidence-3-challenge": {
    "objective": "Admettre une limite — Mise en situation",
    "context": "Atelier mise en situation : Répondez à une question dont vous ignorez la réponse sans inventer. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : reconnaître ses limites et proposer une méthode. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : reconnaître ses limites et proposer une méthode.",
      "La réponse traite bien de la situation « Admettre une limite » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas inventer une expérience.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : reconnaître ses limites et proposer une méthode.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de reconnaître ses limites et proposer une méthode ?"
  },
  "confidence-4-foundation": {
    "objective": "Rebondir après une erreur — Découverte",
    "context": "Atelier découverte : Rectifiez calmement une réponse que vous venez de mal formuler. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : corriger une erreur avec calme et précision. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : corriger une erreur avec calme et précision.",
      "La réponse traite bien de la situation « Rebondir après une erreur » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas s’excuser à répétition.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : corriger une erreur avec calme et précision.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de corriger une erreur avec calme et précision ?"
  },
  "confidence-4-practice": {
    "objective": "Rebondir après une erreur — Approfondissement",
    "context": "Atelier approfondissement : Rectifiez calmement une réponse que vous venez de mal formuler. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : corriger une erreur avec calme et précision. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : corriger une erreur avec calme et précision.",
      "La réponse traite bien de la situation « Rebondir après une erreur » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas s’excuser à répétition.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : corriger une erreur avec calme et précision.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de corriger une erreur avec calme et précision ?"
  },
  "confidence-4-challenge": {
    "objective": "Rebondir après une erreur — Mise en situation",
    "context": "Atelier mise en situation : Rectifiez calmement une réponse que vous venez de mal formuler. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : corriger une erreur avec calme et précision. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : corriger une erreur avec calme et précision.",
      "La réponse traite bien de la situation « Rebondir après une erreur » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas s’excuser à répétition.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : corriger une erreur avec calme et précision.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de corriger une erreur avec calme et précision ?"
  },
  "confidence-5-foundation": {
    "objective": "Faire face au silence — Découverte",
    "context": "Atelier découverte : Préparez une manière naturelle de laisser le recruteur réfléchir. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : laisser un temps de réflexion à l’interlocuteur. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : laisser un temps de réflexion à l’interlocuteur.",
      "La réponse traite bien de la situation « Faire face au silence » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas combler tous les silences.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : laisser un temps de réflexion à l’interlocuteur.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de laisser un temps de réflexion à l’interlocuteur ?"
  },
  "confidence-5-practice": {
    "objective": "Faire face au silence — Approfondissement",
    "context": "Atelier approfondissement : Préparez une manière naturelle de laisser le recruteur réfléchir. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : laisser un temps de réflexion à l’interlocuteur. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : laisser un temps de réflexion à l’interlocuteur.",
      "La réponse traite bien de la situation « Faire face au silence » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas combler tous les silences.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : laisser un temps de réflexion à l’interlocuteur.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de laisser un temps de réflexion à l’interlocuteur ?"
  },
  "confidence-5-challenge": {
    "objective": "Faire face au silence — Mise en situation",
    "context": "Atelier mise en situation : Préparez une manière naturelle de laisser le recruteur réfléchir. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : laisser un temps de réflexion à l’interlocuteur. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : laisser un temps de réflexion à l’interlocuteur.",
      "La réponse traite bien de la situation « Faire face au silence » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas combler tous les silences.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : laisser un temps de réflexion à l’interlocuteur.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de laisser un temps de réflexion à l’interlocuteur ?"
  },
  "confidence-6-foundation": {
    "objective": "Sortir d'une réponse confuse — Découverte",
    "context": "Atelier découverte : Reformulez une réponse trop longue en deux idées. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : appuyer une force sur une preuve concrète. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : appuyer une force sur une preuve concrète.",
      "La réponse traite bien de la situation « Sortir d'une réponse confuse » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas se comparer dévalorisamment aux autres.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : appuyer une force sur une preuve concrète.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de appuyer une force sur une preuve concrète ?"
  },
  "confidence-6-practice": {
    "objective": "Sortir d'une réponse confuse — Approfondissement",
    "context": "Atelier approfondissement : Reformulez une réponse trop longue en deux idées. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : appuyer une force sur une preuve concrète. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : appuyer une force sur une preuve concrète.",
      "La réponse traite bien de la situation « Sortir d'une réponse confuse » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas se comparer dévalorisamment aux autres.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : appuyer une force sur une preuve concrète.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de appuyer une force sur une preuve concrète ?"
  },
  "confidence-6-challenge": {
    "objective": "Sortir d'une réponse confuse — Mise en situation",
    "context": "Atelier mise en situation : Reformulez une réponse trop longue en deux idées. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : appuyer une force sur une preuve concrète. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : appuyer une force sur une preuve concrète.",
      "La réponse traite bien de la situation « Sortir d'une réponse confuse » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas se comparer dévalorisamment aux autres.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : appuyer une force sur une preuve concrète.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de appuyer une force sur une preuve concrète ?"
  },
  "confidence-7-foundation": {
    "objective": "Présenter sa force sans arrogance — Découverte",
    "context": "Atelier découverte : Défendez une compétence en vous appuyant sur une preuve factuelle. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : reformuler une réponse trop longue. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : reformuler une réponse trop longue.",
      "La réponse traite bien de la situation « Présenter sa force sans arrogance » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas répéter les mêmes idées.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : reformuler une réponse trop longue.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de reformuler une réponse trop longue ?"
  },
  "confidence-7-practice": {
    "objective": "Présenter sa force sans arrogance — Approfondissement",
    "context": "Atelier approfondissement : Défendez une compétence en vous appuyant sur une preuve factuelle. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : reformuler une réponse trop longue. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : reformuler une réponse trop longue.",
      "La réponse traite bien de la situation « Présenter sa force sans arrogance » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas répéter les mêmes idées.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : reformuler une réponse trop longue.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de reformuler une réponse trop longue ?"
  },
  "confidence-7-challenge": {
    "objective": "Présenter sa force sans arrogance — Mise en situation",
    "context": "Atelier mise en situation : Défendez une compétence en vous appuyant sur une preuve factuelle. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : reformuler une réponse trop longue. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : reformuler une réponse trop longue.",
      "La réponse traite bien de la situation « Présenter sa force sans arrogance » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas répéter les mêmes idées.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : reformuler une réponse trop longue.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de reformuler une réponse trop longue ?"
  },
  "confidence-8-foundation": {
    "objective": "Recevoir une objection — Découverte",
    "context": "Atelier découverte : Accueillez une objection sur votre expérience puis répondez avec des faits. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : répondre à une objection par des faits. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : répondre à une objection par des faits.",
      "La réponse traite bien de la situation « Recevoir une objection » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas transformer une objection en confrontation.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : répondre à une objection par des faits.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de répondre à une objection par des faits ?"
  },
  "confidence-8-practice": {
    "objective": "Recevoir une objection — Approfondissement",
    "context": "Atelier approfondissement : Accueillez une objection sur votre expérience puis répondez avec des faits. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : répondre à une objection par des faits. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : répondre à une objection par des faits.",
      "La réponse traite bien de la situation « Recevoir une objection » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas transformer une objection en confrontation.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : répondre à une objection par des faits.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de répondre à une objection par des faits ?"
  },
  "confidence-8-challenge": {
    "objective": "Recevoir une objection — Mise en situation",
    "context": "Atelier mise en situation : Accueillez une objection sur votre expérience puis répondez avec des faits. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : répondre à une objection par des faits. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : répondre à une objection par des faits.",
      "La réponse traite bien de la situation « Recevoir une objection » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas transformer une objection en confrontation.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : répondre à une objection par des faits.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de répondre à une objection par des faits ?"
  },
  "leadership-1-foundation": {
    "objective": "Donner un cap — Découverte",
    "context": "Atelier découverte : Expliquez comment vous avez mobilisé une équipe autour d'un objectif. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : formuler une direction partagée et mesurable. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : formuler une direction partagée et mesurable.",
      "La réponse traite bien de la situation « Donner un cap » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas confondre vision et slogan.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : formuler une direction partagée et mesurable.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de formuler une direction partagée et mesurable ?"
  },
  "leadership-1-practice": {
    "objective": "Donner un cap — Approfondissement",
    "context": "Atelier approfondissement : Expliquez comment vous avez mobilisé une équipe autour d'un objectif. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : formuler une direction partagée et mesurable. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : formuler une direction partagée et mesurable.",
      "La réponse traite bien de la situation « Donner un cap » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas confondre vision et slogan.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : formuler une direction partagée et mesurable.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de formuler une direction partagée et mesurable ?"
  },
  "leadership-1-challenge": {
    "objective": "Donner un cap — Mise en situation",
    "context": "Atelier mise en situation : Expliquez comment vous avez mobilisé une équipe autour d'un objectif. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : formuler une direction partagée et mesurable. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : formuler une direction partagée et mesurable.",
      "La réponse traite bien de la situation « Donner un cap » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas confondre vision et slogan.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : formuler une direction partagée et mesurable.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de formuler une direction partagée et mesurable ?"
  },
  "leadership-2-foundation": {
    "objective": "Déléguer efficacement — Découverte",
    "context": "Atelier découverte : Racontez comment vous avez confié une responsabilité et assuré le suivi. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : expliciter responsabilité, autonomie et suivi. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : expliciter responsabilité, autonomie et suivi.",
      "La réponse traite bien de la situation « Déléguer efficacement » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas présenter la délégation comme un abandon.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : expliciter responsabilité, autonomie et suivi.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de expliciter responsabilité, autonomie et suivi ?"
  },
  "leadership-2-practice": {
    "objective": "Déléguer efficacement — Approfondissement",
    "context": "Atelier approfondissement : Racontez comment vous avez confié une responsabilité et assuré le suivi. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : expliciter responsabilité, autonomie et suivi. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : expliciter responsabilité, autonomie et suivi.",
      "La réponse traite bien de la situation « Déléguer efficacement » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas présenter la délégation comme un abandon.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : expliciter responsabilité, autonomie et suivi.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de expliciter responsabilité, autonomie et suivi ?"
  },
  "leadership-2-challenge": {
    "objective": "Déléguer efficacement — Mise en situation",
    "context": "Atelier mise en situation : Racontez comment vous avez confié une responsabilité et assuré le suivi. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : expliciter responsabilité, autonomie et suivi. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : expliciter responsabilité, autonomie et suivi.",
      "La réponse traite bien de la situation « Déléguer efficacement » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas présenter la délégation comme un abandon.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : expliciter responsabilité, autonomie et suivi.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de expliciter responsabilité, autonomie et suivi ?"
  },
  "leadership-3-foundation": {
    "objective": "Gérer une sous-performance — Découverte",
    "context": "Atelier découverte : Décrivez comment vous accompagneriez un collaborateur en difficulté. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : décrire un accompagnement juste et factuel. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : décrire un accompagnement juste et factuel.",
      "La réponse traite bien de la situation « Gérer une sous-performance » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas diagnostiquer la personnalité du collaborateur.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : décrire un accompagnement juste et factuel.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de décrire un accompagnement juste et factuel ?"
  },
  "leadership-3-practice": {
    "objective": "Gérer une sous-performance — Approfondissement",
    "context": "Atelier approfondissement : Décrivez comment vous accompagneriez un collaborateur en difficulté. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : décrire un accompagnement juste et factuel. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : décrire un accompagnement juste et factuel.",
      "La réponse traite bien de la situation « Gérer une sous-performance » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas diagnostiquer la personnalité du collaborateur.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : décrire un accompagnement juste et factuel.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de décrire un accompagnement juste et factuel ?"
  },
  "leadership-3-challenge": {
    "objective": "Gérer une sous-performance — Mise en situation",
    "context": "Atelier mise en situation : Décrivez comment vous accompagneriez un collaborateur en difficulté. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : décrire un accompagnement juste et factuel. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : décrire un accompagnement juste et factuel.",
      "La réponse traite bien de la situation « Gérer une sous-performance » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas diagnostiquer la personnalité du collaborateur.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : décrire un accompagnement juste et factuel.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de décrire un accompagnement juste et factuel ?"
  },
  "leadership-4-foundation": {
    "objective": "Conduire le changement — Découverte",
    "context": "Atelier découverte : Présentez une transformation à laquelle vous avez contribué. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : montrer l’adhésion et les obstacles d’un changement. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : montrer l’adhésion et les obstacles d’un changement.",
      "La réponse traite bien de la situation « Conduire le changement » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas ignorer les inquiétudes des équipes.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : montrer l’adhésion et les obstacles d’un changement.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de montrer l’adhésion et les obstacles d’un changement ?"
  },
  "leadership-4-practice": {
    "objective": "Conduire le changement — Approfondissement",
    "context": "Atelier approfondissement : Présentez une transformation à laquelle vous avez contribué. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : montrer l’adhésion et les obstacles d’un changement. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : montrer l’adhésion et les obstacles d’un changement.",
      "La réponse traite bien de la situation « Conduire le changement » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas ignorer les inquiétudes des équipes.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : montrer l’adhésion et les obstacles d’un changement.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de montrer l’adhésion et les obstacles d’un changement ?"
  },
  "leadership-4-challenge": {
    "objective": "Conduire le changement — Mise en situation",
    "context": "Atelier mise en situation : Présentez une transformation à laquelle vous avez contribué. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : montrer l’adhésion et les obstacles d’un changement. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : montrer l’adhésion et les obstacles d’un changement.",
      "La réponse traite bien de la situation « Conduire le changement » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas ignorer les inquiétudes des équipes.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : montrer l’adhésion et les obstacles d’un changement.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de montrer l’adhésion et les obstacles d’un changement ?"
  },
  "leadership-5-foundation": {
    "objective": "Prioriser une équipe — Découverte",
    "context": "Atelier découverte : Expliquez comment répartir les efforts face à trois urgences concurrentes. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : arbitrer des priorités sous contraintes. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : arbitrer des priorités sous contraintes.",
      "La réponse traite bien de la situation « Prioriser une équipe » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas promettre de tout livrer simultanément.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : arbitrer des priorités sous contraintes.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de arbitrer des priorités sous contraintes ?"
  },
  "leadership-5-practice": {
    "objective": "Prioriser une équipe — Approfondissement",
    "context": "Atelier approfondissement : Expliquez comment répartir les efforts face à trois urgences concurrentes. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : arbitrer des priorités sous contraintes. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : arbitrer des priorités sous contraintes.",
      "La réponse traite bien de la situation « Prioriser une équipe » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas promettre de tout livrer simultanément.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : arbitrer des priorités sous contraintes.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de arbitrer des priorités sous contraintes ?"
  },
  "leadership-5-challenge": {
    "objective": "Prioriser une équipe — Mise en situation",
    "context": "Atelier mise en situation : Expliquez comment répartir les efforts face à trois urgences concurrentes. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : arbitrer des priorités sous contraintes. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : arbitrer des priorités sous contraintes.",
      "La réponse traite bien de la situation « Prioriser une équipe » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas promettre de tout livrer simultanément.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : arbitrer des priorités sous contraintes.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de arbitrer des priorités sous contraintes ?"
  },
  "leadership-6-foundation": {
    "objective": "Influencer sans autorité — Découverte",
    "context": "Atelier découverte : Racontez comment vous avez obtenu l'adhésion d'un acteur hors de votre hiérarchie. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : convaincre sans lien hiérarchique. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : convaincre sans lien hiérarchique.",
      "La réponse traite bien de la situation « Influencer sans autorité » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas confondre influence et pression.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : convaincre sans lien hiérarchique.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de convaincre sans lien hiérarchique ?"
  },
  "leadership-6-practice": {
    "objective": "Influencer sans autorité — Approfondissement",
    "context": "Atelier approfondissement : Racontez comment vous avez obtenu l'adhésion d'un acteur hors de votre hiérarchie. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : convaincre sans lien hiérarchique. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : convaincre sans lien hiérarchique.",
      "La réponse traite bien de la situation « Influencer sans autorité » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas confondre influence et pression.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : convaincre sans lien hiérarchique.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de convaincre sans lien hiérarchique ?"
  },
  "leadership-6-challenge": {
    "objective": "Influencer sans autorité — Mise en situation",
    "context": "Atelier mise en situation : Racontez comment vous avez obtenu l'adhésion d'un acteur hors de votre hiérarchie. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : convaincre sans lien hiérarchique. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : convaincre sans lien hiérarchique.",
      "La réponse traite bien de la situation « Influencer sans autorité » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas confondre influence et pression.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : convaincre sans lien hiérarchique.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de convaincre sans lien hiérarchique ?"
  },
  "leadership-7-foundation": {
    "objective": "Gérer un conflit d'équipe — Découverte",
    "context": "Atelier découverte : Décrivez la façon dont vous restaureriez une collaboration dégradée. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : rechercher une médiation équitable. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : rechercher une médiation équitable.",
      "La réponse traite bien de la situation « Gérer un conflit d'équipe » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas prendre parti sans entendre les faits.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : rechercher une médiation équitable.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de rechercher une médiation équitable ?"
  },
  "leadership-7-practice": {
    "objective": "Gérer un conflit d'équipe — Approfondissement",
    "context": "Atelier approfondissement : Décrivez la façon dont vous restaureriez une collaboration dégradée. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : rechercher une médiation équitable. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : rechercher une médiation équitable.",
      "La réponse traite bien de la situation « Gérer un conflit d'équipe » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas prendre parti sans entendre les faits.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : rechercher une médiation équitable.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de rechercher une médiation équitable ?"
  },
  "leadership-7-challenge": {
    "objective": "Gérer un conflit d'équipe — Mise en situation",
    "context": "Atelier mise en situation : Décrivez la façon dont vous restaureriez une collaboration dégradée. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : rechercher une médiation équitable. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : rechercher une médiation équitable.",
      "La réponse traite bien de la situation « Gérer un conflit d'équipe » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas prendre parti sans entendre les faits.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : rechercher une médiation équitable.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de rechercher une médiation équitable ?"
  },
  "leadership-8-foundation": {
    "objective": "Prendre une décision impopulaire — Découverte",
    "context": "Atelier découverte : Justifiez une décision nécessaire malgré des résistances. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : expliquer une décision difficile et ses conséquences. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : expliquer une décision difficile et ses conséquences.",
      "La réponse traite bien de la situation « Prendre une décision impopulaire » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas minimiser l’impact humain.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : expliquer une décision difficile et ses conséquences.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de expliquer une décision difficile et ses conséquences ?"
  },
  "leadership-8-practice": {
    "objective": "Prendre une décision impopulaire — Approfondissement",
    "context": "Atelier approfondissement : Justifiez une décision nécessaire malgré des résistances. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : expliquer une décision difficile et ses conséquences. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : expliquer une décision difficile et ses conséquences.",
      "La réponse traite bien de la situation « Prendre une décision impopulaire » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas minimiser l’impact humain.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : expliquer une décision difficile et ses conséquences.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de expliquer une décision difficile et ses conséquences ?"
  },
  "leadership-8-challenge": {
    "objective": "Prendre une décision impopulaire — Mise en situation",
    "context": "Atelier mise en situation : Justifiez une décision nécessaire malgré des résistances. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : expliquer une décision difficile et ses conséquences. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : expliquer une décision difficile et ses conséquences.",
      "La réponse traite bien de la situation « Prendre une décision impopulaire » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas minimiser l’impact humain.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : expliquer une décision difficile et ses conséquences.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de expliquer une décision difficile et ses conséquences ?"
  },
  "negotiation-1-foundation": {
    "objective": "Parler de rémunération — Découverte",
    "context": "Atelier découverte : Présentez vos attentes salariales avec une justification professionnelle. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : justifier une fourchette par marché et périmètre. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : justifier une fourchette par marché et périmètre.",
      "La réponse traite bien de la situation « Parler de rémunération » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Éviter une exigence sans contexte.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : justifier une fourchette par marché et périmètre.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de justifier une fourchette par marché et périmètre ?"
  },
  "negotiation-1-practice": {
    "objective": "Parler de rémunération — Approfondissement",
    "context": "Atelier approfondissement : Présentez vos attentes salariales avec une justification professionnelle. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : justifier une fourchette par marché et périmètre. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : justifier une fourchette par marché et périmètre.",
      "La réponse traite bien de la situation « Parler de rémunération » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Éviter une exigence sans contexte.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : justifier une fourchette par marché et périmètre.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de justifier une fourchette par marché et périmètre ?"
  },
  "negotiation-1-challenge": {
    "objective": "Parler de rémunération — Mise en situation",
    "context": "Atelier mise en situation : Présentez vos attentes salariales avec une justification professionnelle. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : justifier une fourchette par marché et périmètre. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : justifier une fourchette par marché et périmètre.",
      "La réponse traite bien de la situation « Parler de rémunération » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Éviter une exigence sans contexte.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : justifier une fourchette par marché et périmètre.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de justifier une fourchette par marché et périmètre ?"
  },
  "negotiation-2-foundation": {
    "objective": "Expliquer un départ — Découverte",
    "context": "Atelier découverte : Expliquez pourquoi vous quittez votre poste sans dénigrer votre employeur. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : expliquer un départ sans critique personnelle. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : expliquer un départ sans critique personnelle.",
      "La réponse traite bien de la situation « Expliquer un départ » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas divulguer d’informations confidentielles.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : expliquer un départ sans critique personnelle.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de expliquer un départ sans critique personnelle ?"
  },
  "negotiation-2-practice": {
    "objective": "Expliquer un départ — Approfondissement",
    "context": "Atelier approfondissement : Expliquez pourquoi vous quittez votre poste sans dénigrer votre employeur. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : expliquer un départ sans critique personnelle. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : expliquer un départ sans critique personnelle.",
      "La réponse traite bien de la situation « Expliquer un départ » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas divulguer d’informations confidentielles.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : expliquer un départ sans critique personnelle.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de expliquer un départ sans critique personnelle ?"
  },
  "negotiation-2-challenge": {
    "objective": "Expliquer un départ — Mise en situation",
    "context": "Atelier mise en situation : Expliquez pourquoi vous quittez votre poste sans dénigrer votre employeur. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : expliquer un départ sans critique personnelle. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : expliquer un départ sans critique personnelle.",
      "La réponse traite bien de la situation « Expliquer un départ » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas divulguer d’informations confidentielles.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : expliquer un départ sans critique personnelle.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de expliquer un départ sans critique personnelle ?"
  },
  "negotiation-3-foundation": {
    "objective": "Justifier un manque d'expérience — Découverte",
    "context": "Atelier découverte : Présentez vos compétences transférables face à une exigence non maîtrisée. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : valoriser des apprentissages transférables. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : valoriser des apprentissages transférables.",
      "La réponse traite bien de la situation « Justifier un manque d'expérience » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas nier une lacune réelle.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : valoriser des apprentissages transférables.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de valoriser des apprentissages transférables ?"
  },
  "negotiation-3-practice": {
    "objective": "Justifier un manque d'expérience — Approfondissement",
    "context": "Atelier approfondissement : Présentez vos compétences transférables face à une exigence non maîtrisée. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : valoriser des apprentissages transférables. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : valoriser des apprentissages transférables.",
      "La réponse traite bien de la situation « Justifier un manque d'expérience » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas nier une lacune réelle.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : valoriser des apprentissages transférables.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de valoriser des apprentissages transférables ?"
  },
  "negotiation-3-challenge": {
    "objective": "Justifier un manque d'expérience — Mise en situation",
    "context": "Atelier mise en situation : Présentez vos compétences transférables face à une exigence non maîtrisée. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : valoriser des apprentissages transférables. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : valoriser des apprentissages transférables.",
      "La réponse traite bien de la situation « Justifier un manque d'expérience » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas nier une lacune réelle.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : valoriser des apprentissages transférables.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de valoriser des apprentissages transférables ?"
  },
  "negotiation-4-foundation": {
    "objective": "Répondre à une objection — Découverte",
    "context": "Atelier découverte : Répondez à : votre profil semble différent de ce que nous cherchons. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : écouter l’objection avant de répondre. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : écouter l’objection avant de répondre.",
      "La réponse traite bien de la situation « Répondre à une objection » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas adopter un ton défensif.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : écouter l’objection avant de répondre.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de écouter l’objection avant de répondre ?"
  },
  "negotiation-4-practice": {
    "objective": "Répondre à une objection — Approfondissement",
    "context": "Atelier approfondissement : Répondez à : votre profil semble différent de ce que nous cherchons. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : écouter l’objection avant de répondre. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : écouter l’objection avant de répondre.",
      "La réponse traite bien de la situation « Répondre à une objection » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas adopter un ton défensif.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : écouter l’objection avant de répondre.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de écouter l’objection avant de répondre ?"
  },
  "negotiation-4-challenge": {
    "objective": "Répondre à une objection — Mise en situation",
    "context": "Atelier mise en situation : Répondez à : votre profil semble différent de ce que nous cherchons. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : écouter l’objection avant de répondre. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : écouter l’objection avant de répondre.",
      "La réponse traite bien de la situation « Répondre à une objection » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas adopter un ton défensif.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : écouter l’objection avant de répondre.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de écouter l’objection avant de répondre ?"
  },
  "negotiation-5-foundation": {
    "objective": "Aborder une rupture de contrat — Découverte",
    "context": "Atelier découverte : Expliquez factuellement une fin de collaboration difficile. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : expliquer sobrement une rupture de contrat. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : expliquer sobrement une rupture de contrat.",
      "La réponse traite bien de la situation « Aborder une rupture de contrat » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas livrer de données privées superflues.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : expliquer sobrement une rupture de contrat.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de expliquer sobrement une rupture de contrat ?"
  },
  "negotiation-5-practice": {
    "objective": "Aborder une rupture de contrat — Approfondissement",
    "context": "Atelier approfondissement : Expliquez factuellement une fin de collaboration difficile. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : expliquer sobrement une rupture de contrat. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : expliquer sobrement une rupture de contrat.",
      "La réponse traite bien de la situation « Aborder une rupture de contrat » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas livrer de données privées superflues.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : expliquer sobrement une rupture de contrat.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de expliquer sobrement une rupture de contrat ?"
  },
  "negotiation-5-challenge": {
    "objective": "Aborder une rupture de contrat — Mise en situation",
    "context": "Atelier mise en situation : Expliquez factuellement une fin de collaboration difficile. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : expliquer sobrement une rupture de contrat. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : expliquer sobrement une rupture de contrat.",
      "La réponse traite bien de la situation « Aborder une rupture de contrat » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas livrer de données privées superflues.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : expliquer sobrement une rupture de contrat.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de expliquer sobrement une rupture de contrat ?"
  },
  "negotiation-6-foundation": {
    "objective": "Gérer deux offres — Découverte",
    "context": "Atelier découverte : Expliquez avec tact que vous avez plusieurs processus en cours. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : rester transparent sur le calendrier de décision. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : rester transparent sur le calendrier de décision.",
      "La réponse traite bien de la situation « Gérer deux offres » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas inventer une offre concurrente.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : rester transparent sur le calendrier de décision.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de rester transparent sur le calendrier de décision ?"
  },
  "negotiation-6-practice": {
    "objective": "Gérer deux offres — Approfondissement",
    "context": "Atelier approfondissement : Expliquez avec tact que vous avez plusieurs processus en cours. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : rester transparent sur le calendrier de décision. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : rester transparent sur le calendrier de décision.",
      "La réponse traite bien de la situation « Gérer deux offres » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas inventer une offre concurrente.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : rester transparent sur le calendrier de décision.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de rester transparent sur le calendrier de décision ?"
  },
  "negotiation-6-challenge": {
    "objective": "Gérer deux offres — Mise en situation",
    "context": "Atelier mise en situation : Expliquez avec tact que vous avez plusieurs processus en cours. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : rester transparent sur le calendrier de décision. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : rester transparent sur le calendrier de décision.",
      "La réponse traite bien de la situation « Gérer deux offres » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas inventer une offre concurrente.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : rester transparent sur le calendrier de décision.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de rester transparent sur le calendrier de décision ?"
  },
  "negotiation-7-foundation": {
    "objective": "Négocier une date de démarrage — Découverte",
    "context": "Atelier découverte : Proposez un calendrier de prise de poste réaliste. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : proposer un démarrage réalisable. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : proposer un démarrage réalisable.",
      "La réponse traite bien de la situation « Négocier une date de démarrage » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas s’engager contre ses obligations.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : proposer un démarrage réalisable.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de proposer un démarrage réalisable ?"
  },
  "negotiation-7-practice": {
    "objective": "Négocier une date de démarrage — Approfondissement",
    "context": "Atelier approfondissement : Proposez un calendrier de prise de poste réaliste. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : proposer un démarrage réalisable. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : proposer un démarrage réalisable.",
      "La réponse traite bien de la situation « Négocier une date de démarrage » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas s’engager contre ses obligations.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : proposer un démarrage réalisable.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de proposer un démarrage réalisable ?"
  },
  "negotiation-7-challenge": {
    "objective": "Négocier une date de démarrage — Mise en situation",
    "context": "Atelier mise en situation : Proposez un calendrier de prise de poste réaliste. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : proposer un démarrage réalisable. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : proposer un démarrage réalisable.",
      "La réponse traite bien de la situation « Négocier une date de démarrage » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas s’engager contre ses obligations.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : proposer un démarrage réalisable.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de proposer un démarrage réalisable ?"
  },
  "negotiation-8-foundation": {
    "objective": "Poser une question exigeante — Découverte",
    "context": "Atelier découverte : Posez une question pertinente sur les difficultés du poste. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : poser une question qui éclaire un risque réel. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : poser une question qui éclaire un risque réel.",
      "La réponse traite bien de la situation « Poser une question exigeante » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Éviter les provocations gratuites.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : poser une question qui éclaire un risque réel.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de poser une question qui éclaire un risque réel ?"
  },
  "negotiation-8-practice": {
    "objective": "Poser une question exigeante — Approfondissement",
    "context": "Atelier approfondissement : Posez une question pertinente sur les difficultés du poste. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : poser une question qui éclaire un risque réel. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : poser une question qui éclaire un risque réel.",
      "La réponse traite bien de la situation « Poser une question exigeante » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Éviter les provocations gratuites.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : poser une question qui éclaire un risque réel.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de poser une question qui éclaire un risque réel ?"
  },
  "negotiation-8-challenge": {
    "objective": "Poser une question exigeante — Mise en situation",
    "context": "Atelier mise en situation : Posez une question pertinente sur les difficultés du poste. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : poser une question qui éclaire un risque réel. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : poser une question qui éclaire un risque réel.",
      "La réponse traite bien de la situation « Poser une question exigeante » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Éviter les provocations gratuites.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : poser une question qui éclaire un risque réel.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de poser une question qui éclaire un risque réel ?"
  },
  "problem-1-foundation": {
    "objective": "Analyser un problème inconnu — Découverte",
    "context": "Atelier découverte : Expliquez comment vous cadreriez un problème avec peu d'informations. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : cadrer les symptômes, parties prenantes et contraintes. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : cadrer les symptômes, parties prenantes et contraintes.",
      "La réponse traite bien de la situation « Analyser un problème inconnu » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas choisir la solution avant le diagnostic.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : cadrer les symptômes, parties prenantes et contraintes.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de cadrer les symptômes, parties prenantes et contraintes ?"
  },
  "problem-1-practice": {
    "objective": "Analyser un problème inconnu — Approfondissement",
    "context": "Atelier approfondissement : Expliquez comment vous cadreriez un problème avec peu d'informations. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : cadrer les symptômes, parties prenantes et contraintes. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : cadrer les symptômes, parties prenantes et contraintes.",
      "La réponse traite bien de la situation « Analyser un problème inconnu » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas choisir la solution avant le diagnostic.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : cadrer les symptômes, parties prenantes et contraintes.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de cadrer les symptômes, parties prenantes et contraintes ?"
  },
  "problem-1-challenge": {
    "objective": "Analyser un problème inconnu — Mise en situation",
    "context": "Atelier mise en situation : Expliquez comment vous cadreriez un problème avec peu d'informations. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : cadrer les symptômes, parties prenantes et contraintes. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : cadrer les symptômes, parties prenantes et contraintes.",
      "La réponse traite bien de la situation « Analyser un problème inconnu » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas choisir la solution avant le diagnostic.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : cadrer les symptômes, parties prenantes et contraintes.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de cadrer les symptômes, parties prenantes et contraintes ?"
  },
  "problem-2-foundation": {
    "objective": "Prioriser des hypothèses — Découverte",
    "context": "Atelier découverte : Choisissez deux hypothèses à tester pour comprendre une baisse de performance. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : ordonner les hypothèses par impact et testabilité. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : ordonner les hypothèses par impact et testabilité.",
      "La réponse traite bien de la situation « Prioriser des hypothèses » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas confondre intuition et validation.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : ordonner les hypothèses par impact et testabilité.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de ordonner les hypothèses par impact et testabilité ?"
  },
  "problem-2-practice": {
    "objective": "Prioriser des hypothèses — Approfondissement",
    "context": "Atelier approfondissement : Choisissez deux hypothèses à tester pour comprendre une baisse de performance. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : ordonner les hypothèses par impact et testabilité. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : ordonner les hypothèses par impact et testabilité.",
      "La réponse traite bien de la situation « Prioriser des hypothèses » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas confondre intuition et validation.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : ordonner les hypothèses par impact et testabilité.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de ordonner les hypothèses par impact et testabilité ?"
  },
  "problem-2-challenge": {
    "objective": "Prioriser des hypothèses — Mise en situation",
    "context": "Atelier mise en situation : Choisissez deux hypothèses à tester pour comprendre une baisse de performance. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : ordonner les hypothèses par impact et testabilité. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : ordonner les hypothèses par impact et testabilité.",
      "La réponse traite bien de la situation « Prioriser des hypothèses » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas confondre intuition et validation.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : ordonner les hypothèses par impact et testabilité.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de ordonner les hypothèses par impact et testabilité ?"
  },
  "problem-3-foundation": {
    "objective": "Décider avec des données incomplètes — Découverte",
    "context": "Atelier découverte : Présentez votre méthode de décision sous incertitude. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : rendre visibles les risques et incertitudes. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : rendre visibles les risques et incertitudes.",
      "La réponse traite bien de la situation « Décider avec des données incomplètes » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas prétendre disposer de données inexistantes.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : rendre visibles les risques et incertitudes.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de rendre visibles les risques et incertitudes ?"
  },
  "problem-3-practice": {
    "objective": "Décider avec des données incomplètes — Approfondissement",
    "context": "Atelier approfondissement : Présentez votre méthode de décision sous incertitude. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : rendre visibles les risques et incertitudes. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : rendre visibles les risques et incertitudes.",
      "La réponse traite bien de la situation « Décider avec des données incomplètes » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas prétendre disposer de données inexistantes.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : rendre visibles les risques et incertitudes.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de rendre visibles les risques et incertitudes ?"
  },
  "problem-3-challenge": {
    "objective": "Décider avec des données incomplètes — Mise en situation",
    "context": "Atelier mise en situation : Présentez votre méthode de décision sous incertitude. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : rendre visibles les risques et incertitudes. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : rendre visibles les risques et incertitudes.",
      "La réponse traite bien de la situation « Décider avec des données incomplètes » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas prétendre disposer de données inexistantes.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : rendre visibles les risques et incertitudes.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de rendre visibles les risques et incertitudes ?"
  },
  "problem-4-foundation": {
    "objective": "Mesurer un impact — Découverte",
    "context": "Atelier découverte : Définissez trois indicateurs utiles pour évaluer une nouvelle initiative. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : choisir des indicateurs alignés aux objectifs. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : choisir des indicateurs alignés aux objectifs.",
      "La réponse traite bien de la situation « Mesurer un impact » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas privilégier des métriques flatteuses mais inutiles.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : choisir des indicateurs alignés aux objectifs.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de choisir des indicateurs alignés aux objectifs ?"
  },
  "problem-4-practice": {
    "objective": "Mesurer un impact — Approfondissement",
    "context": "Atelier approfondissement : Définissez trois indicateurs utiles pour évaluer une nouvelle initiative. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : choisir des indicateurs alignés aux objectifs. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : choisir des indicateurs alignés aux objectifs.",
      "La réponse traite bien de la situation « Mesurer un impact » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas privilégier des métriques flatteuses mais inutiles.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : choisir des indicateurs alignés aux objectifs.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de choisir des indicateurs alignés aux objectifs ?"
  },
  "problem-4-challenge": {
    "objective": "Mesurer un impact — Mise en situation",
    "context": "Atelier mise en situation : Définissez trois indicateurs utiles pour évaluer une nouvelle initiative. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : choisir des indicateurs alignés aux objectifs. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : choisir des indicateurs alignés aux objectifs.",
      "La réponse traite bien de la situation « Mesurer un impact » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas privilégier des métriques flatteuses mais inutiles.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : choisir des indicateurs alignés aux objectifs.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de choisir des indicateurs alignés aux objectifs ?"
  },
  "problem-5-foundation": {
    "objective": "Diagnostiquer une dérive — Découverte",
    "context": "Atelier découverte : Expliquez votre démarche face à un projet en retard. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : distinguer cause racine et symptômes. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : distinguer cause racine et symptômes.",
      "La réponse traite bien de la situation « Diagnostiquer une dérive » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas désigner de responsable trop tôt.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : distinguer cause racine et symptômes.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de distinguer cause racine et symptômes ?"
  },
  "problem-5-practice": {
    "objective": "Diagnostiquer une dérive — Approfondissement",
    "context": "Atelier approfondissement : Expliquez votre démarche face à un projet en retard. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : distinguer cause racine et symptômes. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : distinguer cause racine et symptômes.",
      "La réponse traite bien de la situation « Diagnostiquer une dérive » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas désigner de responsable trop tôt.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : distinguer cause racine et symptômes.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de distinguer cause racine et symptômes ?"
  },
  "problem-5-challenge": {
    "objective": "Diagnostiquer une dérive — Mise en situation",
    "context": "Atelier mise en situation : Expliquez votre démarche face à un projet en retard. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : distinguer cause racine et symptômes. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : distinguer cause racine et symptômes.",
      "La réponse traite bien de la situation « Diagnostiquer une dérive » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas désigner de responsable trop tôt.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : distinguer cause racine et symptômes.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de distinguer cause racine et symptômes ?"
  },
  "problem-6-foundation": {
    "objective": "Arbitrer un compromis — Découverte",
    "context": "Atelier découverte : Présentez un choix entre qualité, délai et coût. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : expliciter un compromis coût-qualité-délai. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : expliciter un compromis coût-qualité-délai.",
      "La réponse traite bien de la situation « Arbitrer un compromis » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas promettre une optimisation simultanée sans preuve.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : expliciter un compromis coût-qualité-délai.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de expliciter un compromis coût-qualité-délai ?"
  },
  "problem-6-practice": {
    "objective": "Arbitrer un compromis — Approfondissement",
    "context": "Atelier approfondissement : Présentez un choix entre qualité, délai et coût. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : expliciter un compromis coût-qualité-délai. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : expliciter un compromis coût-qualité-délai.",
      "La réponse traite bien de la situation « Arbitrer un compromis » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas promettre une optimisation simultanée sans preuve.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : expliciter un compromis coût-qualité-délai.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de expliciter un compromis coût-qualité-délai ?"
  },
  "problem-6-challenge": {
    "objective": "Arbitrer un compromis — Mise en situation",
    "context": "Atelier mise en situation : Présentez un choix entre qualité, délai et coût. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : expliciter un compromis coût-qualité-délai. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : expliciter un compromis coût-qualité-délai.",
      "La réponse traite bien de la situation « Arbitrer un compromis » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas promettre une optimisation simultanée sans preuve.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : expliciter un compromis coût-qualité-délai.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de expliciter un compromis coût-qualité-délai ?"
  },
  "problem-7-foundation": {
    "objective": "Faire un plan d'action — Découverte",
    "context": "Atelier découverte : Construisez les trois premières étapes face à une situation urgente. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : proposer un plan court avec propriétaires et échéances. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : proposer un plan court avec propriétaires et échéances.",
      "La réponse traite bien de la situation « Faire un plan d'action » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas lister des actions sans priorité.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : proposer un plan court avec propriétaires et échéances.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de proposer un plan court avec propriétaires et échéances ?"
  },
  "problem-7-practice": {
    "objective": "Faire un plan d'action — Approfondissement",
    "context": "Atelier approfondissement : Construisez les trois premières étapes face à une situation urgente. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : proposer un plan court avec propriétaires et échéances. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : proposer un plan court avec propriétaires et échéances.",
      "La réponse traite bien de la situation « Faire un plan d'action » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas lister des actions sans priorité.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : proposer un plan court avec propriétaires et échéances.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de proposer un plan court avec propriétaires et échéances ?"
  },
  "problem-7-challenge": {
    "objective": "Faire un plan d'action — Mise en situation",
    "context": "Atelier mise en situation : Construisez les trois premières étapes face à une situation urgente. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : proposer un plan court avec propriétaires et échéances. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : proposer un plan court avec propriétaires et échéances.",
      "La réponse traite bien de la situation « Faire un plan d'action » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas lister des actions sans priorité.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : proposer un plan court avec propriétaires et échéances.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de proposer un plan court avec propriétaires et échéances ?"
  },
  "problem-8-foundation": {
    "objective": "Expliquer un échec d'analyse — Découverte",
    "context": "Atelier découverte : Décrivez une hypothèse démentie par les faits et votre réaction. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : reconnaître et corriger une hypothèse démentie. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : reconnaître et corriger une hypothèse démentie.",
      "La réponse traite bien de la situation « Expliquer un échec d'analyse » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas cacher les données contradictoires.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : reconnaître et corriger une hypothèse démentie.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de reconnaître et corriger une hypothèse démentie ?"
  },
  "problem-8-practice": {
    "objective": "Expliquer un échec d'analyse — Approfondissement",
    "context": "Atelier approfondissement : Décrivez une hypothèse démentie par les faits et votre réaction. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : reconnaître et corriger une hypothèse démentie. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : reconnaître et corriger une hypothèse démentie.",
      "La réponse traite bien de la situation « Expliquer un échec d'analyse » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas cacher les données contradictoires.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : reconnaître et corriger une hypothèse démentie.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de reconnaître et corriger une hypothèse démentie ?"
  },
  "problem-8-challenge": {
    "objective": "Expliquer un échec d'analyse — Mise en situation",
    "context": "Atelier mise en situation : Décrivez une hypothèse démentie par les faits et votre réaction. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : reconnaître et corriger une hypothèse démentie. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : reconnaître et corriger une hypothèse démentie.",
      "La réponse traite bien de la situation « Expliquer un échec d'analyse » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas cacher les données contradictoires.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : reconnaître et corriger une hypothèse démentie.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de reconnaître et corriger une hypothèse démentie ?"
  },
  "technical-1-foundation": {
    "objective": "Expliquer une architecture — Découverte",
    "context": "Atelier découverte : Présentez l'architecture générale d'un système que vous connaissez. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : décrire frontières, composants et flux du système. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : décrire frontières, composants et flux du système.",
      "La réponse traite bien de la situation « Expliquer une architecture » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas noyer le recruteur dans les acronymes.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : décrire frontières, composants et flux du système.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de décrire frontières, composants et flux du système ?"
  },
  "technical-1-practice": {
    "objective": "Expliquer une architecture — Approfondissement",
    "context": "Atelier approfondissement : Présentez l'architecture générale d'un système que vous connaissez. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : décrire frontières, composants et flux du système. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : décrire frontières, composants et flux du système.",
      "La réponse traite bien de la situation « Expliquer une architecture » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas noyer le recruteur dans les acronymes.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : décrire frontières, composants et flux du système.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de décrire frontières, composants et flux du système ?"
  },
  "technical-1-challenge": {
    "objective": "Expliquer une architecture — Mise en situation",
    "context": "Atelier mise en situation : Présentez l'architecture générale d'un système que vous connaissez. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : décrire frontières, composants et flux du système. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : décrire frontières, composants et flux du système.",
      "La réponse traite bien de la situation « Expliquer une architecture » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas noyer le recruteur dans les acronymes.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : décrire frontières, composants et flux du système.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de décrire frontières, composants et flux du système ?"
  },
  "technical-2-foundation": {
    "objective": "Défendre un choix technique — Découverte",
    "context": "Atelier découverte : Justifiez une technologie face à une alternative crédible. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : comparer les options avec critères explicites. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : comparer les options avec critères explicites.",
      "La réponse traite bien de la situation « Défendre un choix technique » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas déclarer une technologie universellement supérieure.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : comparer les options avec critères explicites.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de comparer les options avec critères explicites ?"
  },
  "technical-2-practice": {
    "objective": "Défendre un choix technique — Approfondissement",
    "context": "Atelier approfondissement : Justifiez une technologie face à une alternative crédible. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : comparer les options avec critères explicites. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : comparer les options avec critères explicites.",
      "La réponse traite bien de la situation « Défendre un choix technique » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas déclarer une technologie universellement supérieure.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : comparer les options avec critères explicites.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de comparer les options avec critères explicites ?"
  },
  "technical-2-challenge": {
    "objective": "Défendre un choix technique — Mise en situation",
    "context": "Atelier mise en situation : Justifiez une technologie face à une alternative crédible. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : comparer les options avec critères explicites. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : comparer les options avec critères explicites.",
      "La réponse traite bien de la situation « Défendre un choix technique » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas déclarer une technologie universellement supérieure.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : comparer les options avec critères explicites.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de comparer les options avec critères explicites ?"
  },
  "technical-3-foundation": {
    "objective": "Traiter un incident — Découverte",
    "context": "Atelier découverte : Décrivez votre démarche face à une panne critique. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : distinguer confinement, diagnostic, correction et prévention. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : distinguer confinement, diagnostic, correction et prévention.",
      "La réponse traite bien de la situation « Traiter un incident » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas ignorer l’impact pour les utilisateurs.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : distinguer confinement, diagnostic, correction et prévention.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de distinguer confinement, diagnostic, correction et prévention ?"
  },
  "technical-3-practice": {
    "objective": "Traiter un incident — Approfondissement",
    "context": "Atelier approfondissement : Décrivez votre démarche face à une panne critique. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : distinguer confinement, diagnostic, correction et prévention. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : distinguer confinement, diagnostic, correction et prévention.",
      "La réponse traite bien de la situation « Traiter un incident » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas ignorer l’impact pour les utilisateurs.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : distinguer confinement, diagnostic, correction et prévention.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de distinguer confinement, diagnostic, correction et prévention ?"
  },
  "technical-3-challenge": {
    "objective": "Traiter un incident — Mise en situation",
    "context": "Atelier mise en situation : Décrivez votre démarche face à une panne critique. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : distinguer confinement, diagnostic, correction et prévention. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : distinguer confinement, diagnostic, correction et prévention.",
      "La réponse traite bien de la situation « Traiter un incident » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas ignorer l’impact pour les utilisateurs.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : distinguer confinement, diagnostic, correction et prévention.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de distinguer confinement, diagnostic, correction et prévention ?"
  },
  "technical-4-foundation": {
    "objective": "Fiabiliser la qualité — Découverte",
    "context": "Atelier découverte : Expliquez comment vous testez et validez un livrable. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : montrer une stratégie de tests adaptée au risque. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : montrer une stratégie de tests adaptée au risque.",
      "La réponse traite bien de la situation « Fiabiliser la qualité » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas confondre quantité de tests et qualité.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : montrer une stratégie de tests adaptée au risque.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de montrer une stratégie de tests adaptée au risque ?"
  },
  "technical-4-practice": {
    "objective": "Fiabiliser la qualité — Approfondissement",
    "context": "Atelier approfondissement : Expliquez comment vous testez et validez un livrable. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : montrer une stratégie de tests adaptée au risque. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : montrer une stratégie de tests adaptée au risque.",
      "La réponse traite bien de la situation « Fiabiliser la qualité » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas confondre quantité de tests et qualité.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : montrer une stratégie de tests adaptée au risque.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de montrer une stratégie de tests adaptée au risque ?"
  },
  "technical-4-challenge": {
    "objective": "Fiabiliser la qualité — Mise en situation",
    "context": "Atelier mise en situation : Expliquez comment vous testez et validez un livrable. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : montrer une stratégie de tests adaptée au risque. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : montrer une stratégie de tests adaptée au risque.",
      "La réponse traite bien de la situation « Fiabiliser la qualité » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas confondre quantité de tests et qualité.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : montrer une stratégie de tests adaptée au risque.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de montrer une stratégie de tests adaptée au risque ?"
  },
  "technical-5-foundation": {
    "objective": "Protéger les données — Découverte",
    "context": "Atelier découverte : Présentez les précautions prises pour traiter des données sensibles. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : aborder minimisation, accès et traçabilité des données. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : aborder minimisation, accès et traçabilité des données.",
      "La réponse traite bien de la situation « Protéger les données » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas révéler des informations sensibles réelles.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : aborder minimisation, accès et traçabilité des données.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de aborder minimisation, accès et traçabilité des données ?"
  },
  "technical-5-practice": {
    "objective": "Protéger les données — Approfondissement",
    "context": "Atelier approfondissement : Présentez les précautions prises pour traiter des données sensibles. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : aborder minimisation, accès et traçabilité des données. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : aborder minimisation, accès et traçabilité des données.",
      "La réponse traite bien de la situation « Protéger les données » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas révéler des informations sensibles réelles.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : aborder minimisation, accès et traçabilité des données.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de aborder minimisation, accès et traçabilité des données ?"
  },
  "technical-5-challenge": {
    "objective": "Protéger les données — Mise en situation",
    "context": "Atelier mise en situation : Présentez les précautions prises pour traiter des données sensibles. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : aborder minimisation, accès et traçabilité des données. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : aborder minimisation, accès et traçabilité des données.",
      "La réponse traite bien de la situation « Protéger les données » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas révéler des informations sensibles réelles.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : aborder minimisation, accès et traçabilité des données.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de aborder minimisation, accès et traçabilité des données ?"
  },
  "technical-6-foundation": {
    "objective": "Faire parler des données — Découverte",
    "context": "Atelier découverte : Racontez comment vous avez transformé une analyse en décision. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : relier une analyse à une décision observable. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : relier une analyse à une décision observable.",
      "La réponse traite bien de la situation « Faire parler des données » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas confondre corrélation et causalité.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : relier une analyse à une décision observable.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de relier une analyse à une décision observable ?"
  },
  "technical-6-practice": {
    "objective": "Faire parler des données — Approfondissement",
    "context": "Atelier approfondissement : Racontez comment vous avez transformé une analyse en décision. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : relier une analyse à une décision observable. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : relier une analyse à une décision observable.",
      "La réponse traite bien de la situation « Faire parler des données » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas confondre corrélation et causalité.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : relier une analyse à une décision observable.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de relier une analyse à une décision observable ?"
  },
  "technical-6-challenge": {
    "objective": "Faire parler des données — Mise en situation",
    "context": "Atelier mise en situation : Racontez comment vous avez transformé une analyse en décision. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : relier une analyse à une décision observable. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : relier une analyse à une décision observable.",
      "La réponse traite bien de la situation « Faire parler des données » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas confondre corrélation et causalité.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : relier une analyse à une décision observable.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de relier une analyse à une décision observable ?"
  },
  "technical-7-foundation": {
    "objective": "Gérer une dette technique — Découverte",
    "context": "Atelier découverte : Justifiez votre méthode de priorisation d'une dette technique. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : argumenter la priorisation d’une dette technique. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : argumenter la priorisation d’une dette technique.",
      "La réponse traite bien de la situation « Gérer une dette technique » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas promettre zéro dette technique.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : argumenter la priorisation d’une dette technique.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de argumenter la priorisation d’une dette technique ?"
  },
  "technical-7-practice": {
    "objective": "Gérer une dette technique — Approfondissement",
    "context": "Atelier approfondissement : Justifiez votre méthode de priorisation d'une dette technique. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : argumenter la priorisation d’une dette technique. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : argumenter la priorisation d’une dette technique.",
      "La réponse traite bien de la situation « Gérer une dette technique » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas promettre zéro dette technique.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : argumenter la priorisation d’une dette technique.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de argumenter la priorisation d’une dette technique ?"
  },
  "technical-7-challenge": {
    "objective": "Gérer une dette technique — Mise en situation",
    "context": "Atelier mise en situation : Justifiez votre méthode de priorisation d'une dette technique. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : argumenter la priorisation d’une dette technique. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : argumenter la priorisation d’une dette technique.",
      "La réponse traite bien de la situation « Gérer une dette technique » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas promettre zéro dette technique.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : argumenter la priorisation d’une dette technique.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de argumenter la priorisation d’une dette technique ?"
  },
  "technical-8-foundation": {
    "objective": "Collaborer avec le métier — Découverte",
    "context": "Atelier découverte : Expliquez comment vous traduisez un besoin métier en exigences concrètes. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : traduire une demande métier en critères vérifiables. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : traduire une demande métier en critères vérifiables.",
      "La réponse traite bien de la situation « Collaborer avec le métier » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas présenter une exigence supposée comme validée.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : traduire une demande métier en critères vérifiables.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de traduire une demande métier en critères vérifiables ?"
  },
  "technical-8-practice": {
    "objective": "Collaborer avec le métier — Approfondissement",
    "context": "Atelier approfondissement : Expliquez comment vous traduisez un besoin métier en exigences concrètes. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : traduire une demande métier en critères vérifiables. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : traduire une demande métier en critères vérifiables.",
      "La réponse traite bien de la situation « Collaborer avec le métier » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas présenter une exigence supposée comme validée.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : traduire une demande métier en critères vérifiables.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de traduire une demande métier en critères vérifiables ?"
  },
  "technical-8-challenge": {
    "objective": "Collaborer avec le métier — Mise en situation",
    "context": "Atelier mise en situation : Expliquez comment vous traduisez un besoin métier en exigences concrètes. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : traduire une demande métier en critères vérifiables. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : traduire une demande métier en critères vérifiables.",
      "La réponse traite bien de la situation « Collaborer avec le métier » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas présenter une exigence supposée comme validée.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : traduire une demande métier en critères vérifiables.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de traduire une demande métier en critères vérifiables ?"
  },
  "graduates-1-foundation": {
    "objective": "Présenter un projet académique — Découverte",
    "context": "Atelier découverte : Présentez un projet d'études comme une expérience démontrant une compétence. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : présenter une réalisation académique vérifiable. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : présenter une réalisation académique vérifiable.",
      "La réponse traite bien de la situation « Présenter un projet académique » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas faire passer un projet académique pour un emploi.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : présenter une réalisation académique vérifiable.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de présenter une réalisation académique vérifiable ?"
  },
  "graduates-1-practice": {
    "objective": "Présenter un projet académique — Approfondissement",
    "context": "Atelier approfondissement : Présentez un projet d'études comme une expérience démontrant une compétence. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : présenter une réalisation académique vérifiable. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : présenter une réalisation académique vérifiable.",
      "La réponse traite bien de la situation « Présenter un projet académique » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas faire passer un projet académique pour un emploi.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : présenter une réalisation académique vérifiable.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de présenter une réalisation académique vérifiable ?"
  },
  "graduates-1-challenge": {
    "objective": "Présenter un projet académique — Mise en situation",
    "context": "Atelier mise en situation : Présentez un projet d'études comme une expérience démontrant une compétence. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : présenter une réalisation académique vérifiable. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : présenter une réalisation académique vérifiable.",
      "La réponse traite bien de la situation « Présenter un projet académique » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas faire passer un projet académique pour un emploi.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : présenter une réalisation académique vérifiable.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de présenter une réalisation académique vérifiable ?"
  },
  "graduates-2-foundation": {
    "objective": "Valoriser un stage — Découverte",
    "context": "Atelier découverte : Racontez une contribution précise apportée pendant un stage. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : décrire une contribution précise lors d’un stage. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : décrire une contribution précise lors d’un stage.",
      "La réponse traite bien de la situation « Valoriser un stage » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas attribuer tous les résultats du stage à soi seul.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : décrire une contribution précise lors d’un stage.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de décrire une contribution précise lors d’un stage ?"
  },
  "graduates-2-practice": {
    "objective": "Valoriser un stage — Approfondissement",
    "context": "Atelier approfondissement : Racontez une contribution précise apportée pendant un stage. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : décrire une contribution précise lors d’un stage. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : décrire une contribution précise lors d’un stage.",
      "La réponse traite bien de la situation « Valoriser un stage » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas attribuer tous les résultats du stage à soi seul.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : décrire une contribution précise lors d’un stage.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de décrire une contribution précise lors d’un stage ?"
  },
  "graduates-2-challenge": {
    "objective": "Valoriser un stage — Mise en situation",
    "context": "Atelier mise en situation : Racontez une contribution précise apportée pendant un stage. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : décrire une contribution précise lors d’un stage. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : décrire une contribution précise lors d’un stage.",
      "La réponse traite bien de la situation « Valoriser un stage » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas attribuer tous les résultats du stage à soi seul.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : décrire une contribution précise lors d’un stage.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de décrire une contribution précise lors d’un stage ?"
  },
  "graduates-3-foundation": {
    "objective": "Parler sans expérience — Découverte",
    "context": "Atelier découverte : Répondez à la question : pourquoi vous choisir sans expérience professionnelle ? Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : valoriser potentiel, apprentissage et réalisations. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : valoriser potentiel, apprentissage et réalisations.",
      "La réponse traite bien de la situation « Parler sans expérience » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas inventer une expérience professionnelle.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : valoriser potentiel, apprentissage et réalisations.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de valoriser potentiel, apprentissage et réalisations ?"
  },
  "graduates-3-practice": {
    "objective": "Parler sans expérience — Approfondissement",
    "context": "Atelier approfondissement : Répondez à la question : pourquoi vous choisir sans expérience professionnelle ? Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : valoriser potentiel, apprentissage et réalisations. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : valoriser potentiel, apprentissage et réalisations.",
      "La réponse traite bien de la situation « Parler sans expérience » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas inventer une expérience professionnelle.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : valoriser potentiel, apprentissage et réalisations.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de valoriser potentiel, apprentissage et réalisations ?"
  },
  "graduates-3-challenge": {
    "objective": "Parler sans expérience — Mise en situation",
    "context": "Atelier mise en situation : Répondez à la question : pourquoi vous choisir sans expérience professionnelle ? Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : valoriser potentiel, apprentissage et réalisations. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : valoriser potentiel, apprentissage et réalisations.",
      "La réponse traite bien de la situation « Parler sans expérience » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas inventer une expérience professionnelle.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : valoriser potentiel, apprentissage et réalisations.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de valoriser potentiel, apprentissage et réalisations ?"
  },
  "graduates-4-foundation": {
    "objective": "Expliquer son mémoire ou PFE — Découverte",
    "context": "Atelier découverte : Présentez la problématique, la méthode et le résultat de votre projet de fin d'études. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : expliquer problème, méthode et limites du PFE. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : expliquer problème, méthode et limites du PFE.",
      "La réponse traite bien de la situation « Expliquer son mémoire ou PFE » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas prétendre que le projet prouve une expertise senior.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : expliquer problème, méthode et limites du PFE.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de expliquer problème, méthode et limites du PFE ?"
  },
  "graduates-4-practice": {
    "objective": "Expliquer son mémoire ou PFE — Approfondissement",
    "context": "Atelier approfondissement : Présentez la problématique, la méthode et le résultat de votre projet de fin d'études. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : expliquer problème, méthode et limites du PFE. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : expliquer problème, méthode et limites du PFE.",
      "La réponse traite bien de la situation « Expliquer son mémoire ou PFE » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas prétendre que le projet prouve une expertise senior.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : expliquer problème, méthode et limites du PFE.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de expliquer problème, méthode et limites du PFE ?"
  },
  "graduates-4-challenge": {
    "objective": "Expliquer son mémoire ou PFE — Mise en situation",
    "context": "Atelier mise en situation : Présentez la problématique, la méthode et le résultat de votre projet de fin d'études. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : expliquer problème, méthode et limites du PFE. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : expliquer problème, méthode et limites du PFE.",
      "La réponse traite bien de la situation « Expliquer son mémoire ou PFE » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas prétendre que le projet prouve une expertise senior.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : expliquer problème, méthode et limites du PFE.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de expliquer problème, méthode et limites du PFE ?"
  },
  "graduates-5-foundation": {
    "objective": "Exprimer sa motivation junior — Découverte",
    "context": "Atelier découverte : Expliquez ce que vous voulez apprendre dans les premiers mois. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : formuler des objectifs d’apprentissage concrets. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : formuler des objectifs d’apprentissage concrets.",
      "La réponse traite bien de la situation « Exprimer sa motivation junior » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas réciter des motivations vagues.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : formuler des objectifs d’apprentissage concrets.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de formuler des objectifs d’apprentissage concrets ?"
  },
  "graduates-5-practice": {
    "objective": "Exprimer sa motivation junior — Approfondissement",
    "context": "Atelier approfondissement : Expliquez ce que vous voulez apprendre dans les premiers mois. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : formuler des objectifs d’apprentissage concrets. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : formuler des objectifs d’apprentissage concrets.",
      "La réponse traite bien de la situation « Exprimer sa motivation junior » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas réciter des motivations vagues.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : formuler des objectifs d’apprentissage concrets.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de formuler des objectifs d’apprentissage concrets ?"
  },
  "graduates-5-challenge": {
    "objective": "Exprimer sa motivation junior — Mise en situation",
    "context": "Atelier mise en situation : Expliquez ce que vous voulez apprendre dans les premiers mois. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : formuler des objectifs d’apprentissage concrets. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : formuler des objectifs d’apprentissage concrets.",
      "La réponse traite bien de la situation « Exprimer sa motivation junior » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas réciter des motivations vagues.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : formuler des objectifs d’apprentissage concrets.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de formuler des objectifs d’apprentissage concrets ?"
  },
  "graduates-6-foundation": {
    "objective": "Valoriser une association — Découverte",
    "context": "Atelier découverte : Reliez un engagement associatif à une compétence professionnelle. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : relier une activité associative à une compétence observée. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : relier une activité associative à une compétence observée.",
      "La réponse traite bien de la situation « Valoriser une association » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas sur-vendre une responsabilité associative.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : relier une activité associative à une compétence observée.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de relier une activité associative à une compétence observée ?"
  },
  "graduates-6-practice": {
    "objective": "Valoriser une association — Approfondissement",
    "context": "Atelier approfondissement : Reliez un engagement associatif à une compétence professionnelle. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : relier une activité associative à une compétence observée. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : relier une activité associative à une compétence observée.",
      "La réponse traite bien de la situation « Valoriser une association » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas sur-vendre une responsabilité associative.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : relier une activité associative à une compétence observée.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de relier une activité associative à une compétence observée ?"
  },
  "graduates-6-challenge": {
    "objective": "Valoriser une association — Mise en situation",
    "context": "Atelier mise en situation : Reliez un engagement associatif à une compétence professionnelle. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : relier une activité associative à une compétence observée. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : relier une activité associative à une compétence observée.",
      "La réponse traite bien de la situation « Valoriser une association » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas sur-vendre une responsabilité associative.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : relier une activité associative à une compétence observée.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de relier une activité associative à une compétence observée ?"
  },
  "graduates-7-foundation": {
    "objective": "Demander un encadrement — Découverte",
    "context": "Atelier découverte : Expliquez le type de feedback dont vous avez besoin pour progresser. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : formuler un besoin d’accompagnement compatible avec l’autonomie. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : formuler un besoin d’accompagnement compatible avec l’autonomie.",
      "La réponse traite bien de la situation « Demander un encadrement » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas attendre que le manager organise chaque tâche.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : formuler un besoin d’accompagnement compatible avec l’autonomie.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de formuler un besoin d’accompagnement compatible avec l’autonomie ?"
  },
  "graduates-7-practice": {
    "objective": "Demander un encadrement — Approfondissement",
    "context": "Atelier approfondissement : Expliquez le type de feedback dont vous avez besoin pour progresser. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : formuler un besoin d’accompagnement compatible avec l’autonomie. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : formuler un besoin d’accompagnement compatible avec l’autonomie.",
      "La réponse traite bien de la situation « Demander un encadrement » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas attendre que le manager organise chaque tâche.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : formuler un besoin d’accompagnement compatible avec l’autonomie.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de formuler un besoin d’accompagnement compatible avec l’autonomie ?"
  },
  "graduates-7-challenge": {
    "objective": "Demander un encadrement — Mise en situation",
    "context": "Atelier mise en situation : Expliquez le type de feedback dont vous avez besoin pour progresser. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : formuler un besoin d’accompagnement compatible avec l’autonomie. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : formuler un besoin d’accompagnement compatible avec l’autonomie.",
      "La réponse traite bien de la situation « Demander un encadrement » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas attendre que le manager organise chaque tâche.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : formuler un besoin d’accompagnement compatible avec l’autonomie.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de formuler un besoin d’accompagnement compatible avec l’autonomie ?"
  },
  "graduates-8-foundation": {
    "objective": "Poser ses premières questions — Découverte",
    "context": "Atelier découverte : Formulez trois questions de qualité sur un stage. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : poser des questions sur missions, apprentissage et supervision. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : poser des questions sur missions, apprentissage et supervision.",
      "La réponse traite bien de la situation « Poser ses premières questions » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Ne pas réduire la discussion aux avantages.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : poser des questions sur missions, apprentissage et supervision.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de poser des questions sur missions, apprentissage et supervision ?"
  },
  "graduates-8-practice": {
    "objective": "Poser ses premières questions — Approfondissement",
    "context": "Atelier approfondissement : Formulez trois questions de qualité sur un stage. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : poser des questions sur missions, apprentissage et supervision. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : poser des questions sur missions, apprentissage et supervision.",
      "La réponse traite bien de la situation « Poser ses premières questions » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Ne pas réduire la discussion aux avantages.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : poser des questions sur missions, apprentissage et supervision.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de poser des questions sur missions, apprentissage et supervision ?"
  },
  "graduates-8-challenge": {
    "objective": "Poser ses premières questions — Mise en situation",
    "context": "Atelier mise en situation : Formulez trois questions de qualité sur un stage. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : poser des questions sur missions, apprentissage et supervision. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : poser des questions sur missions, apprentissage et supervision.",
      "La réponse traite bien de la situation « Poser ses premières questions » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Ne pas réduire la discussion aux avantages.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Trame d'entraînement à personnaliser : « Dans [situation précise], ma responsabilité était [rôle]. J'ai choisi [action concrète] pour [raison]. Le résultat observable a été [conséquence vérifiable]. Ce que j'en retiens : [apprentissage]. » Pour cet exercice : poser des questions sur missions, apprentissage et supervision.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de poser des questions sur missions, apprentissage et supervision ?"
  },
  "international-1-foundation": {
    "objective": "Introduce yourself in English — Découverte",
    "context": "Atelier découverte : Introduce your background and career goal in clear professional English. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : tell a concise career story in accessible English. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : tell a concise career story in accessible English.",
      "La réponse traite bien de la situation « Introduce yourself in English » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Avoid memorised idioms and exaggerated fluency claims.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Guided response structure (adapt it to your real experience): 'The situation was [specific context]. My responsibility was [your role]. I chose [action] because [reason]. The observed result was [verifiable result]. Looking back, I learned [lesson].' Focus on: tell a concise career story in accessible English.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de tell a concise career story in accessible English ?"
  },
  "international-1-practice": {
    "objective": "Introduce yourself in English — Approfondissement",
    "context": "Atelier approfondissement : Introduce your background and career goal in clear professional English. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : tell a concise career story in accessible English. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : tell a concise career story in accessible English.",
      "La réponse traite bien de la situation « Introduce yourself in English » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Avoid memorised idioms and exaggerated fluency claims.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Guided response structure (adapt it to your real experience): 'The situation was [specific context]. My responsibility was [your role]. I chose [action] because [reason]. The observed result was [verifiable result]. Looking back, I learned [lesson].' Focus on: tell a concise career story in accessible English.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de tell a concise career story in accessible English ?"
  },
  "international-1-challenge": {
    "objective": "Introduce yourself in English — Mise en situation",
    "context": "Atelier mise en situation : Introduce your background and career goal in clear professional English. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : tell a concise career story in accessible English. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : tell a concise career story in accessible English.",
      "La réponse traite bien de la situation « Introduce yourself in English » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Avoid memorised idioms and exaggerated fluency claims.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Guided response structure (adapt it to your real experience): 'The situation was [specific context]. My responsibility was [your role]. I chose [action] because [reason]. The observed result was [verifiable result]. Looking back, I learned [lesson].' Focus on: tell a concise career story in accessible English.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de tell a concise career story in accessible English ?"
  },
  "international-2-foundation": {
    "objective": "Behavioral interview in English — Découverte",
    "context": "Atelier découverte : Tell me about a time you handled disagreement in an international team. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : give a specific example of cross-cultural teamwork. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : give a specific example of cross-cultural teamwork.",
      "La réponse traite bien de la situation « Behavioral interview in English » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Avoid stereotyping colleagues by nationality.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Guided response structure (adapt it to your real experience): 'The situation was [specific context]. My responsibility was [your role]. I chose [action] because [reason]. The observed result was [verifiable result]. Looking back, I learned [lesson].' Focus on: give a specific example of cross-cultural teamwork.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de give a specific example of cross-cultural teamwork ?"
  },
  "international-2-practice": {
    "objective": "Behavioral interview in English — Approfondissement",
    "context": "Atelier approfondissement : Tell me about a time you handled disagreement in an international team. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : give a specific example of cross-cultural teamwork. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : give a specific example of cross-cultural teamwork.",
      "La réponse traite bien de la situation « Behavioral interview in English » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Avoid stereotyping colleagues by nationality.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Guided response structure (adapt it to your real experience): 'The situation was [specific context]. My responsibility was [your role]. I chose [action] because [reason]. The observed result was [verifiable result]. Looking back, I learned [lesson].' Focus on: give a specific example of cross-cultural teamwork.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de give a specific example of cross-cultural teamwork ?"
  },
  "international-2-challenge": {
    "objective": "Behavioral interview in English — Mise en situation",
    "context": "Atelier mise en situation : Tell me about a time you handled disagreement in an international team. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : give a specific example of cross-cultural teamwork. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : give a specific example of cross-cultural teamwork.",
      "La réponse traite bien de la situation « Behavioral interview in English » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Avoid stereotyping colleagues by nationality.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Guided response structure (adapt it to your real experience): 'The situation was [specific context]. My responsibility was [your role]. I chose [action] because [reason]. The observed result was [verifiable result]. Looking back, I learned [lesson].' Focus on: give a specific example of cross-cultural teamwork.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de give a specific example of cross-cultural teamwork ?"
  },
  "international-3-foundation": {
    "objective": "Explain a career move — Découverte",
    "context": "Atelier découverte : Explain why you are considering an international opportunity. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : describe an international move with realistic motivations. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : describe an international move with realistic motivations.",
      "La réponse traite bien de la situation « Explain a career move » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Avoid vague reasons detached from the job.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Guided response structure (adapt it to your real experience): 'The situation was [specific context]. My responsibility was [your role]. I chose [action] because [reason]. The observed result was [verifiable result]. Looking back, I learned [lesson].' Focus on: describe an international move with realistic motivations.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de describe an international move with realistic motivations ?"
  },
  "international-3-practice": {
    "objective": "Explain a career move — Approfondissement",
    "context": "Atelier approfondissement : Explain why you are considering an international opportunity. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : describe an international move with realistic motivations. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : describe an international move with realistic motivations.",
      "La réponse traite bien de la situation « Explain a career move » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Avoid vague reasons detached from the job.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Guided response structure (adapt it to your real experience): 'The situation was [specific context]. My responsibility was [your role]. I chose [action] because [reason]. The observed result was [verifiable result]. Looking back, I learned [lesson].' Focus on: describe an international move with realistic motivations.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de describe an international move with realistic motivations ?"
  },
  "international-3-challenge": {
    "objective": "Explain a career move — Mise en situation",
    "context": "Atelier mise en situation : Explain why you are considering an international opportunity. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : describe an international move with realistic motivations. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : describe an international move with realistic motivations.",
      "La réponse traite bien de la situation « Explain a career move » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Avoid vague reasons detached from the job.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Guided response structure (adapt it to your real experience): 'The situation was [specific context]. My responsibility was [your role]. I chose [action] because [reason]. The observed result was [verifiable result]. Looking back, I learned [lesson].' Focus on: describe an international move with realistic motivations.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de describe an international move with realistic motivations ?"
  },
  "international-4-foundation": {
    "objective": "Remote collaboration — Découverte",
    "context": "Atelier découverte : Describe how you collaborate effectively across time zones. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : explain async communication and timezone coordination. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : explain async communication and timezone coordination.",
      "La réponse traite bien de la situation « Remote collaboration » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Avoid assuming everyone is always available.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Guided response structure (adapt it to your real experience): 'The situation was [specific context]. My responsibility was [your role]. I chose [action] because [reason]. The observed result was [verifiable result]. Looking back, I learned [lesson].' Focus on: explain async communication and timezone coordination.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de explain async communication and timezone coordination ?"
  },
  "international-4-practice": {
    "objective": "Remote collaboration — Approfondissement",
    "context": "Atelier approfondissement : Describe how you collaborate effectively across time zones. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : explain async communication and timezone coordination. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : explain async communication and timezone coordination.",
      "La réponse traite bien de la situation « Remote collaboration » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Avoid assuming everyone is always available.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Guided response structure (adapt it to your real experience): 'The situation was [specific context]. My responsibility was [your role]. I chose [action] because [reason]. The observed result was [verifiable result]. Looking back, I learned [lesson].' Focus on: explain async communication and timezone coordination.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de explain async communication and timezone coordination ?"
  },
  "international-4-challenge": {
    "objective": "Remote collaboration — Mise en situation",
    "context": "Atelier mise en situation : Describe how you collaborate effectively across time zones. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : explain async communication and timezone coordination. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : explain async communication and timezone coordination.",
      "La réponse traite bien de la situation « Remote collaboration » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Avoid assuming everyone is always available.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Guided response structure (adapt it to your real experience): 'The situation was [specific context]. My responsibility was [your role]. I chose [action] because [reason]. The observed result was [verifiable result]. Looking back, I learned [lesson].' Focus on: explain async communication and timezone coordination.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de explain async communication and timezone coordination ?"
  },
  "international-5-foundation": {
    "objective": "Cultural adaptability — Découverte",
    "context": "Atelier découverte : Give an example of adapting your communication to a different working culture. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : show adaptation through listening and clarification. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : show adaptation through listening and clarification.",
      "La réponse traite bien de la situation « Cultural adaptability » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Avoid presenting cultures as homogeneous.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Guided response structure (adapt it to your real experience): 'The situation was [specific context]. My responsibility was [your role]. I chose [action] because [reason]. The observed result was [verifiable result]. Looking back, I learned [lesson].' Focus on: show adaptation through listening and clarification.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de show adaptation through listening and clarification ?"
  },
  "international-5-practice": {
    "objective": "Cultural adaptability — Approfondissement",
    "context": "Atelier approfondissement : Give an example of adapting your communication to a different working culture. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : show adaptation through listening and clarification. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : show adaptation through listening and clarification.",
      "La réponse traite bien de la situation « Cultural adaptability » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Avoid presenting cultures as homogeneous.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Guided response structure (adapt it to your real experience): 'The situation was [specific context]. My responsibility was [your role]. I chose [action] because [reason]. The observed result was [verifiable result]. Looking back, I learned [lesson].' Focus on: show adaptation through listening and clarification.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de show adaptation through listening and clarification ?"
  },
  "international-5-challenge": {
    "objective": "Cultural adaptability — Mise en situation",
    "context": "Atelier mise en situation : Give an example of adapting your communication to a different working culture. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : show adaptation through listening and clarification. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : show adaptation through listening and clarification.",
      "La réponse traite bien de la situation « Cultural adaptability » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Avoid presenting cultures as homogeneous.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Guided response structure (adapt it to your real experience): 'The situation was [specific context]. My responsibility was [your role]. I chose [action] because [reason]. The observed result was [verifiable result]. Looking back, I learned [lesson].' Focus on: show adaptation through listening and clarification.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de show adaptation through listening and clarification ?"
  },
  "international-6-foundation": {
    "objective": "Present a technical project — Découverte",
    "context": "Atelier découverte : Explain a technical project to an international non-specialist audience. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : explain a technical project to non-specialists. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : explain a technical project to non-specialists.",
      "La réponse traite bien de la situation « Present a technical project » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Avoid acronyms without context.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Guided response structure (adapt it to your real experience): 'The situation was [specific context]. My responsibility was [your role]. I chose [action] because [reason]. The observed result was [verifiable result]. Looking back, I learned [lesson].' Focus on: explain a technical project to non-specialists.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de explain a technical project to non-specialists ?"
  },
  "international-6-practice": {
    "objective": "Present a technical project — Approfondissement",
    "context": "Atelier approfondissement : Explain a technical project to an international non-specialist audience. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : explain a technical project to non-specialists. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : explain a technical project to non-specialists.",
      "La réponse traite bien de la situation « Present a technical project » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Avoid acronyms without context.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Guided response structure (adapt it to your real experience): 'The situation was [specific context]. My responsibility was [your role]. I chose [action] because [reason]. The observed result was [verifiable result]. Looking back, I learned [lesson].' Focus on: explain a technical project to non-specialists.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de explain a technical project to non-specialists ?"
  },
  "international-6-challenge": {
    "objective": "Present a technical project — Mise en situation",
    "context": "Atelier mise en situation : Explain a technical project to an international non-specialist audience. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : explain a technical project to non-specialists. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : explain a technical project to non-specialists.",
      "La réponse traite bien de la situation « Present a technical project » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Avoid acronyms without context.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Guided response structure (adapt it to your real experience): 'The situation was [specific context]. My responsibility was [your role]. I chose [action] because [reason]. The observed result was [verifiable result]. Looking back, I learned [lesson].' Focus on: explain a technical project to non-specialists.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de explain a technical project to non-specialists ?"
  },
  "international-7-foundation": {
    "objective": "Ask smart questions — Découverte",
    "context": "Atelier découverte : Prepare thoughtful questions about an international team and its ways of working. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : ask thoughtful questions about goals and collaboration. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : ask thoughtful questions about goals and collaboration.",
      "La réponse traite bien de la situation « Ask smart questions » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Avoid questions answered in the job description.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Guided response structure (adapt it to your real experience): 'The situation was [specific context]. My responsibility was [your role]. I chose [action] because [reason]. The observed result was [verifiable result]. Looking back, I learned [lesson].' Focus on: ask thoughtful questions about goals and collaboration.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de ask thoughtful questions about goals and collaboration ?"
  },
  "international-7-practice": {
    "objective": "Ask smart questions — Approfondissement",
    "context": "Atelier approfondissement : Prepare thoughtful questions about an international team and its ways of working. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : ask thoughtful questions about goals and collaboration. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : ask thoughtful questions about goals and collaboration.",
      "La réponse traite bien de la situation « Ask smart questions » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Avoid questions answered in the job description.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Guided response structure (adapt it to your real experience): 'The situation was [specific context]. My responsibility was [your role]. I chose [action] because [reason]. The observed result was [verifiable result]. Looking back, I learned [lesson].' Focus on: ask thoughtful questions about goals and collaboration.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de ask thoughtful questions about goals and collaboration ?"
  },
  "international-7-challenge": {
    "objective": "Ask smart questions — Mise en situation",
    "context": "Atelier mise en situation : Prepare thoughtful questions about an international team and its ways of working. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : ask thoughtful questions about goals and collaboration. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : ask thoughtful questions about goals and collaboration.",
      "La réponse traite bien de la situation « Ask smart questions » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Avoid questions answered in the job description.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Guided response structure (adapt it to your real experience): 'The situation was [specific context]. My responsibility was [your role]. I chose [action] because [reason]. The observed result was [verifiable result]. Looking back, I learned [lesson].' Focus on: ask thoughtful questions about goals and collaboration.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de ask thoughtful questions about goals and collaboration ?"
  },
  "international-8-foundation": {
    "objective": "Handle a misunderstanding — Découverte",
    "context": "Atelier découverte : Explain how you would clarify a misunderstanding during an English-language interview. Identifiez une idée principale et ajoutez un exemple concret.",
    "methodology": "Objectif : clarify misunderstanding calmly and check shared understanding. À ce niveau, décrivez une situation simple et un exemple vérifiable.",
    "evidence": [
      "L'idée principale est explicite : clarify misunderstanding calmly and check shared understanding.",
      "La réponse traite bien de la situation « Handle a misunderstanding » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau découverte est respecté : décrivez une situation simple et un exemple vérifiable."
    ],
    "pitfalls": [
      "Avoid blaming language ability or cultural origin.",
      "Ne surchargez pas la réponse.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Guided response structure (adapt it to your real experience): 'The situation was [specific context]. My responsibility was [your role]. I chose [action] because [reason]. The observed result was [verifiable result]. Looking back, I learned [lesson].' Focus on: clarify misunderstanding calmly and check shared understanding.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de clarify misunderstanding calmly and check shared understanding ?"
  },
  "international-8-practice": {
    "objective": "Handle a misunderstanding — Approfondissement",
    "context": "Atelier approfondissement : Explain how you would clarify a misunderstanding during an English-language interview. Formulez une réponse structurée et justifiez votre raisonnement.",
    "methodology": "Objectif : clarify misunderstanding calmly and check shared understanding. À ce niveau, justifiez votre choix et reliez-le aux attentes du poste.",
    "evidence": [
      "L'idée principale est explicite : clarify misunderstanding calmly and check shared understanding.",
      "La réponse traite bien de la situation « Handle a misunderstanding » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau approfondissement est respecté : justifiez votre choix et reliez-le aux attentes du poste."
    ],
    "pitfalls": [
      "Avoid blaming language ability or cultural origin.",
      "Évitez les arguments génériques.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Guided response structure (adapt it to your real experience): 'The situation was [specific context]. My responsibility was [your role]. I chose [action] because [reason]. The observed result was [verifiable result]. Looking back, I learned [lesson].' Focus on: clarify misunderstanding calmly and check shared understanding.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de clarify misunderstanding calmly and check shared understanding ?"
  },
  "international-8-challenge": {
    "objective": "Handle a misunderstanding — Mise en situation",
    "context": "Atelier mise en situation : Explain how you would clarify a misunderstanding during an English-language interview. Imaginez un recruteur exigeant : répondez avec précision puis anticipez une relance.",
    "methodology": "Objectif : clarify misunderstanding calmly and check shared understanding. À ce niveau, anticipez une relance critique et expliquez un arbitrage ou une limite.",
    "evidence": [
      "L'idée principale est explicite : clarify misunderstanding calmly and check shared understanding.",
      "La réponse traite bien de la situation « Handle a misunderstanding » plutôt que d'un sujet voisin.",
      "Au moins un fait, une action ou un raisonnement personnel est identifiable.",
      "Le niveau mise en situation est respecté : anticipez une relance critique et expliquez un arbitrage ou une limite."
    ],
    "pitfalls": [
      "Avoid blaming language ability or cultural origin.",
      "Ne répondez pas avec une certitude inventée.",
      "Inventer une situation, un chiffre ou une expertise non vécue."
    ],
    "example": "Guided response structure (adapt it to your real experience): 'The situation was [specific context]. My responsibility was [your role]. I chose [action] because [reason]. The observed result was [verifiable result]. Looking back, I learned [lesson].' Focus on: clarify misunderstanding calmly and check shared understanding.",
    "reflection": "Pouvez-vous démontrer comment votre réponse permet de clarify misunderstanding calmly and check shared understanding ?"
  }
};

export function premiumGuide(exercise: Exercise): PremiumGuide | null {
  return guides[exercise.id] ?? a2Guides[exercise.id] ?? remainingGuides[exercise.id] ?? null;
}
