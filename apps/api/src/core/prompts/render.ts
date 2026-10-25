import { PROMPTS, type PromptName, type PromptVars } from "./generated";

export type PromptValue = string | number | boolean;

/** Variables exigées par un prompt : aucune pour un prompt sans balise, sinon un objet complet. */
type VarsArg<N extends PromptName> = [PromptVars[N]] extends [never] ? [] : [vars: Record<PromptVars[N], PromptValue>];

// Bloc seul sur ses lignes : les lignes de balises disparaissent (pas de ligne vide parasite).
const STANDALONE_BLOCK = /^[ \t]*\{\{#(\w+)\}\}[ \t]*\n([\s\S]*?)^[ \t]*\{\{\/\1\}\}[ \t]*(?:\n|$)/gm;
const INLINE_BLOCK = /\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g;
const VARIABLE = /\{\{(\w+)\}\}/g;

/**
 * Remplace les balises d'un gabarit. Les valeurs sont insérées en dernier et en un seul passage :
 * un texte saisi par le candidat (fiche de poste, réponse) n'est jamais réinterprété comme une balise.
 */
export function renderTemplate(template: string, vars: Record<string, PromptValue>): string {
  const get = (key: string): PromptValue => {
    if (!Object.hasOwn(vars, key)) throw new Error(`Variable de prompt manquante : « ${key} »`);
    return vars[key]!;
  };
  return template
    .replace(STANDALONE_BLOCK, (_m, key: string, body: string) => (get(key) ? body : ""))
    .replace(INLINE_BLOCK, (_m, key: string, body: string) => (get(key) ? body : ""))
    .replace(VARIABLE, (_m, key: string) => String(get(key)));
}

/** Rend un prompt du dossier prompts/. Le compilateur vérifie le nom et les variables. */
export function renderPrompt<N extends PromptName>(name: N, ...args: VarsArg<N>): string {
  return renderTemplate(PROMPTS[name], (args[0] ?? {}) as Record<string, PromptValue>);
}
