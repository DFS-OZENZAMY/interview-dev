/**
 * Base de connaissances validée de l'Académie (reprise des fiches « approved » d'ai-interview-platform,
 * transcrites des dix dialogues de référence du responsable produit). Pilote interne : ce ne sont pas
 * des références externes certifiées. Les brouillons ne sont jamais envoyés au modèle.
 */
export type KnowledgeDoc = { slug: string; title: string; domain: string; content: string; source: string };

export const KNOWLEDGE: KnowledgeDoc[] = [
  {
    "slug": "academy-star-reference",
    "title": "Illustrer une expérience avec STAR",
    "domain": "communication",
    "content": "Utiliser une situation professionnelle réelle : situation, tâche, action personnelle et résultat. Le candidat peut commencer par exprimer la valeur ou le résultat de son projet en une phrase avant de structurer son exemple. Ne pas inventer de chiffres ni faire de STAR une obligation universelle.",
    "source": "Dialogues de référence transmis par le responsable produit — guide interne"
  },
  {
    "slug": "academy-career-break-privacy",
    "title": "Interruption de carrière et confidentialité",
    "domain": "entretien RH",
    "content": "Un candidat peut parler sobrement de sa période d’interruption professionnelle sans détailler sa santé ou ses motifs personnels. Ne pas lui demander de diagnostic ou lui proposer de révéler une raison médicale. L’aider à mettre en avant sa préparation à un retour, seulement s’il souhaite le faire.",
    "source": "Dialogues de référence transmis par le responsable produit — guide interne"
  },
  {
    "slug": "academy-staffing-scope",
    "title": "Staffing Manager en ESN : périmètre à clarifier",
    "domain": "staffing manager esn ssii",
    "content": "Le périmètre d’un poste de Staffing Manager peut inclure allocation de consultants, anticipation des disponibilités, coordination commerciale, arbitrage de ressources et suivi de missions. Ne pas supposer que staffing signifie management hiérarchique. Demander au candidat les responsabilités de l’offre et son expérience avant de personnaliser une préparation.",
    "source": "Scénario de cadrage produit Academy — hypothèses non universelles"
  },
  {
    "slug": "academy-salary-dialogue",
    "title": "Prétentions salariales : cadrer la peur avant le chiffre",
    "domain": "salaire négociation entretien",
    "content": "En entretien, clarifier d’abord si le candidat redoute le rejet ou la sous-évaluation. Ensuite, expliquer les critères d’une fourchette contextualisée et le package global. Ne pas inventer de salaire marché ni exiger un montant exact prématurément.",
    "source": "Dialogue de référence interne n°1, propriétaire du produit"
  },
  {
    "slug": "academy-oral-fillers",
    "title": "Communication orale : tics et pauses",
    "domain": "communication entretien oral",
    "content": "Face aux répétitions écrites du type bah, genre, du coup, inviter à ralentir et à pratiquer des pauses. Ne jamais prétendre avoir mesuré des hésitations vocales ou une durée sans audio analysé.",
    "source": "Dialogue de référence interne n°3, propriétaire du produit"
  },
  {
    "slug": "academy-authentic-weakness",
    "title": "Défaut professionnel : sortir des réponses convenues",
    "domain": "entretien RH qualités défauts",
    "content": "Au lieu de réciter « trop perfectionniste », faire identifier une difficulté opérationnelle réelle, ses impacts et une action corrective. Favoriser les exemples sincères, sans jugement personnel.",
    "source": "Dialogue de référence interne n°4, propriétaire du produit"
  },
  {
    "slug": "academy-product-leadership",
    "title": "Leadership : arbitrages et décisions",
    "domain": "head of product management leadership",
    "content": "Ne pas confondre leadership et taille d’équipe. Pour un Head of Product ayant managé trois collaborateurs, chercher les preuves de priorisation, décisions difficiles, alignement des parties prenantes et résultats observables.",
    "source": "Dialogue de référence interne n°5, propriétaire du produit"
  },
  {
    "slug": "academy-conflict-example",
    "title": "Conflit : passer du principe à la situation vécue",
    "domain": "conflit communication gestion équipe",
    "content": "Si un candidat évoque seulement l’écoute active et la communication non violente, l’inviter à raconter un conflit vécu, sa première phrase et les effets de son intervention avant de recommander STAR.",
    "source": "Dialogue de référence interne n°7, propriétaire du produit"
  },
  {
    "slug": "academy-failure-ownership",
    "title": "Échec : responsabilité et apprentissage",
    "domain": "échec projet entretien",
    "content": "Lorsqu’un retard est attribué à un prestataire, explorer sans jugement les leviers d’anticipation, la capacité d’action réelle, les jalons intermédiaires et les enseignements. Ne pas lui attribuer automatiquement une faute.",
    "source": "Dialogue de référence interne n°9, propriétaire du produit"
  },
  {
    "slug": "academy-end-interview",
    "title": "Questions à poser en fin d’entretien",
    "domain": "fin entretien questions recruteur",
    "content": "Au lieu de dire que tout est clair, proposer une question contextualisée sur les défis des 90 premiers jours, les critères de réussite ou les objectifs du poste à six mois.",
    "source": "Dialogue de référence interne n°10, propriétaire du produit"
  }
];
