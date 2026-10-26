/**
 * Recherche dans la base de connaissances validée, sans base de données : équivalent portable de la
 * fonction SQL `academy_hybrid_search` d'ai-interview-platform (plein texte français + trigrammes).
 * Mêmes poids : 65 % correspondance des mots (BM25 normalisé), 35 % similarité approximative du titre.
 */
import { KNOWLEDGE, type KnowledgeDoc } from "./content/knowledge";

const STOPWORDS = new Set(
  ("a au aux avec ce ces dans de des du elle en et eux il je la le les leur lui ma mais me meme mes moi mon ne nos notre nous on ou par pas pour qu que qui sa se ses son sur ta te tes toi ton tu un une vos votre vous c d j l m n s t y est sont ai as avons avez ont etre avoir fait faire plus tres comment quoi quel quelle quels quelles dois veux peux suis " +
    // verbes trop généraux dans une conversation de coaching
    "sans parler parle dire faut peut doit veut souvent vraiment").split(" "),
);

/**
 * Synonymes du vocabulaire de l'entretien (racines) : rapprochent « trou dans le CV » d'« interruption »,
 * à défaut de la recherche sémantique par embeddings de la version d'origine.
 */
const SYNONYMS: string[][] = [
  ["interruption", "trou", "pause", "arret", "absence", "break", "coupure", "inactivit", "chomag"],
  ["salair", "salarial", "remuneration", "pretention", "package", "paie", "negoci"],
  ["defaut", "faibless", "faibl", "perfectionnist", "axe"],
  ["stress", "trac", "anxiet", "panique", "paniqu", "peur", "angoiss"],
  ["leadership", "manag", "encadr", "equip", "manageri"],
  ["echec", "erreur", "rate", "faut"],
  ["conflit", "desaccord", "tension", "litig"],
  ["tic", "bah", "genre", "hesit", "remplissag"],
];
const SYN_INDEX = new Map<string, string[]>();
for (const group of SYNONYMS) for (const w of group) SYN_INDEX.set(w, group);
function expand(terms: string[]) {
  const out = new Set(terms);
  // « du coup » ne doit pas évoquer « coupure » : une racine courte ne déclenche pas de synonymes.
  for (const t of terms) for (const [key, group] of SYN_INDEX) if (t.startsWith(key) || (t.length >= 5 && key.startsWith(t))) group.forEach((g) => out.add(g));
  return [...out];
}

const normalize = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/** Racinisation légère du français : suffit à rapprocher « négocier » et « négociation ». */
function stem(word: string) {
  let w = word;
  for (const suffix of ["issements", "issement", "ations", "ation", "ements", "ement", "euses", "euse", "eurs", "eur", "ites", "ite", "ives", "ive", "ifs", "if", "ees", "ee", "er", "ez", "es", "s", "x", "e"]) {
    if (w.length - suffix.length >= 4 && w.endsWith(suffix)) {
      w = w.slice(0, -suffix.length);
      break;
    }
  }
  return w;
}

export function tokens(text: string) {
  return normalize(text)
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))
    .map(stem);
}

function trigrams(text: string) {
  const out = new Set<string>();
  for (const word of normalize(text).split(/[^a-z0-9]+/).filter(Boolean)) {
    const padded = `  ${word} `;
    for (let i = 0; i < padded.length - 2; i++) out.add(padded.slice(i, i + 3));
  }
  return out;
}

/** Similarité de trigrammes, comme `similarity()` de pg_trgm. */
export function similarity(a: string, b: string) {
  const ta = trigrams(a);
  const tb = trigrams(b);
  if (!ta.size || !tb.size) return 0;
  let common = 0;
  for (const t of ta) if (tb.has(t)) common++;
  return common / (ta.size + tb.size - common);
}

type Indexed = { doc: KnowledgeDoc; terms: Map<string, number>; length: number };

const INDEX: Indexed[] = KNOWLEDGE.map((doc) => {
  const terms = new Map<string, number>();
  const all = tokens(`${doc.title} ${doc.domain} ${doc.content}`);
  for (const t of all) {
    terms.set(t, (terms.get(t) ?? 0) + 1);
    // une racine de synonyme contenue dans le mot (« interruption » → « interruption ») compte aussi
    for (const key of SYN_INDEX.keys()) if (key !== t && t.startsWith(key) && key.length >= 4) terms.set(key, (terms.get(key) ?? 0) + 1);
  }
  return { doc, terms, length: all.length };
});
const AVG_LENGTH = INDEX.reduce((s, d) => s + d.length, 0) / Math.max(INDEX.length, 1);

function bm25(query: string[], item: Indexed) {
  const k1 = 1.2;
  const b = 0.75;
  let score = 0;
  for (const term of new Set(query)) {
    const tf = item.terms.get(term) ?? 0;
    if (!tf) continue;
    const df = INDEX.filter((d) => d.terms.has(term)).length;
    const idf = Math.log(1 + (INDEX.length - df + 0.5) / (df + 0.5));
    score += idf * ((tf * (k1 + 1)) / (tf + k1 * (1 - b + (b * item.length) / AVG_LENGTH)));
  }
  return score;
}

export type Citation = KnowledgeDoc & { relevance: number };

export function searchKnowledge(queryText: string, limit = 3): Citation[] {
  const phrase = queryText.trim().slice(0, 500);
  if (phrase.length < 3) return [];
  const query = expand(tokens(phrase));
  const scored = INDEX.map((item) => {
    const raw = bm25(query, item);
    const lexical = raw / (raw + 2); // ramène le score BM25 entre 0 et 1
    const fuzzy = similarity(`${item.doc.title} ${item.doc.domain}`, phrase);
    return { ...item.doc, lexical, fuzzy, relevance: Math.min(lexical, 1) * 0.65 + fuzzy * 0.35 };
  })
    .filter((r) => r.lexical > 0 || r.fuzzy >= 0.11)
    .sort((a, b) => b.relevance - a.relevance);
  // Avec une petite base, un mot courant (« parler », « entretien ») suffit à remonter une fiche hors sujet :
  // on ne garde que les fiches proches du meilleur résultat.
  const best = scored[0]?.relevance ?? 0;
  return scored
    .filter((r) => r.relevance >= best * 0.4)
    .slice(0, Math.min(Math.max(limit, 1), 5))
    .map(({ lexical: _l, fuzzy: _f, ...rest }) => rest);
}
