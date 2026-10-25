import { LABELS } from "../labels";
import type { Session } from "../sessions";
import { renderPrompt } from "./render";

/** Objectifs du candidat, dans la langue de la séance (« prendre confiance, gérer la pression »). */
const objectifsLabel = (s: Session) => s.objectifs.map((o) => LABELS[s.locale].objectifs[o]).join(", ");

/** Instructions de Lina (prompts/lina.fr.md ou lina.en.md) pour la question numéro `n`. */
export function linaSystemPrompt(s: Session, n: number): string {
  const L = LABELS[s.locale];
  return renderPrompt(s.locale === "en" ? "linaEn" : "linaFr", {
    type: L.type[s.type],
    poste: s.poste,
    niveau: s.experience ? L.experience[s.experience] : "",
    objectifs: objectifsLabel(s),
    fiche_de_poste: s.description ?? "",
    premiere_question: n === 1,
    question: n,
    total: s.total,
  });
}

/** Rappel envoyé à Lina quand sa réponse ne contient pas de question. */
export function nudgePrompt(locale: Session["locale"]): string {
  return renderPrompt(locale === "en" ? "linaRelanceEn" : "linaRelanceFr");
}

/** Message système et message utilisateur de l'évaluateur qui rédige le rapport. */
export function evaluatorPrompts(s: Session, transcript: string) {
  return {
    system: renderPrompt("evaluateur", {
      interrompu: Boolean(s.interrupted),
      objectifs: objectifsLabel(s) || "non précisés",
      langue: s.locale === "en" ? "English" : "français",
    }),
    user: renderPrompt("evaluateurEntree", {
      poste: s.poste,
      type_entretien: s.type === "rh" ? "entretien RH" : "entretien technique",
      transcript,
    }),
  };
}
