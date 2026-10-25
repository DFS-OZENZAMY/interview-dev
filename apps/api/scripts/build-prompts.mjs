#!/usr/bin/env node
// Convertit prompts/*.md en src/core/prompts/generated.ts (constantes TypeScript typées).
//   node scripts/build-prompts.mjs          génère le fichier
//   node scripts/build-prompts.mjs --check  échoue s'il n'est pas à jour (CI, build)
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";

const SRC = new URL("../prompts/", import.meta.url);
const OUT = new URL("../src/core/prompts/generated.ts", import.meta.url);
const check = process.argv.includes("--check");

const fail = (message) => {
  console.error(`prompts : ${message}`);
  process.exit(1);
};

// lina-relance.fr.md -> linaRelanceFr
const exportName = (file) => file.replace(/\.md$/, "").replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());

/** Vérifie les balises {{...}} et renvoie les variables utilisées. */
function variablesOf(file, text) {
  const vars = new Set();
  const open = [];
  const tag = /\{\{([#/]?)(\w+)\}\}/g;
  for (let m; (m = tag.exec(text)); ) {
    const [, kind, key] = m;
    const line = text.slice(0, m.index).split("\n").length;
    if (kind === "#") {
      if (open.length) fail(`${file}:${line} : les blocs ne s'imbriquent pas ({{#${key}}} dans {{#${open[0]}}}).`);
      open.push(key);
      vars.add(key);
    } else if (kind === "/") {
      if (open.pop() !== key) fail(`${file}:${line} : {{/${key}}} n'a pas de {{#${key}}} correspondant.`);
    } else {
      vars.add(key);
    }
  }
  if (open.length) fail(`${file} : le bloc {{#${open[0]}}} n'est jamais fermé.`);
  const stray = text.replace(tag, "").indexOf("{{");
  if (stray !== -1) fail(`${file} : balise mal formée près de « ${text.replace(tag, "").slice(stray, stray + 20)} ».`);
  return [...vars].sort();
}

const files = readdirSync(SRC)
  .filter((f) => f.endsWith(".md") && f.toLowerCase() !== "readme.md")
  .sort();
if (!files.length) fail("aucun fichier .md dans prompts/.");

const seen = new Set();
const entries = files.map((file) => {
  const name = exportName(file);
  if (seen.has(name)) fail(`${file} : nom « ${name} » déjà utilisé par un autre fichier.`);
  seen.add(name);
  const text = readFileSync(new URL(file, SRC), "utf8")
    .replace(/\r\n/g, "\n")
    .replace(/<!--[\s\S]*?-->[ \t]*\n?/g, "")
    .trim();
  if (!text) fail(`${file} : fichier vide.`);
  return { name, text, vars: variablesOf(file, text) };
});

const output = `// GÉNÉRÉ par scripts/build-prompts.mjs à partir de prompts/*.md : ne pas modifier à la main.
// Après avoir changé un .md : pnpm prompts

export const PROMPTS = {
${entries.map((e) => `  ${e.name}: ${JSON.stringify(e.text)},`).join("\n")}
} as const;

export type PromptName = keyof typeof PROMPTS;

/** Variables attendues par chaque prompt, déduites des balises {{...}} du fichier. */
export type PromptVars = {
${entries.map((e) => `  ${e.name}: ${e.vars.length ? e.vars.map((v) => JSON.stringify(v)).join(" | ") : "never"};`).join("\n")}
};
`;

if (check) {
  if (!existsSync(OUT) || readFileSync(OUT, "utf8") !== output) {
    fail("src/core/prompts/generated.ts n'est pas à jour avec prompts/*.md : lancez « pnpm prompts » et committez le résultat.");
  }
  console.log(`prompts : à jour (${entries.length} fichiers).`);
} else {
  writeFileSync(OUT, output);
  console.log(`prompts : ${entries.length} fichiers -> src/core/prompts/generated.ts`);
}
