/**
 * Tests du cœur de l'API, sans réseau : LLM, voix et stockage sont simulés.
 * Lancer : pnpm test
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import { createApp } from "./app";
import { loadConfig } from "./config";
import { InterviewService, exchangesOf, verifyEvidence } from "./interview";
import { MemoryKV } from "./kv";
import type { LLM, Msg } from "./llm";
import { SessionBusyError, SessionStore } from "./sessions";
import { GuardedTTS, VoiceProviderError, selectVoice, type TTS } from "./voice";

const REPORT = {
  scores: { clarte: 8, pertinence: 7, exemples_concrets: 5, structure: 6, motivation: 9 },
  points_forts: ["Énergie"],
  points_faibles: ["Peu d'exemples"],
  conseils: ["Méthode STAR"],
  resume: "Bon entretien.",
  par_question: [{ question: "Présentation", ce_qui_va: "Clair", a_ameliorer: "Plus court", exemple: "Je suis…" }],
};

/** LLM simulé : questions numérotées, puis rapport JSON (éventuellement invalide d'abord). */
function fakeLLM(opts: { badReportFirst?: boolean; delayMs?: number } = {}) {
  const calls: { messages: Msg[]; json: boolean }[] = [];
  let reports = 0;
  const llm: LLM = {
    async chat(messages, o = {}) {
      calls.push({ messages, json: Boolean(o.json) });
      if (opts.delayMs) await new Promise((r) => setTimeout(r, opts.delayMs));
      if (o.json) {
        reports++;
        return opts.badReportFirst && reports === 1 ? "pas du json" : JSON.stringify(REPORT);
      }
      const n = messages.filter((m) => m.role === "assistant").length + 1;
      return `Question ${n} ?`;
    },
  };
  return { llm, calls };
}

function service(llm: LLM, max = 10) {
  return new InterviewService(llm, new SessionStore(new MemoryKV(), 3600), max);
}

const input = { poste: "Dev backend", type: "technique" as const, locale: "fr" as const, objectifs: [], questions: 2 };

test("parcours complet : questions, puis bilan avec score global, retour par question et échanges", async () => {
  const { llm } = fakeLLM();
  const svc = service(llm);
  const s = await svc.start(input);
  assert.equal(s.question, "Question 1 ?");
  assert.equal(s.total, 2);

  const a1 = await svc.answer(s.sessionId, "Je suis développeur.");
  assert.equal(a1.done, false);
  assert.equal((a1 as { question: string }).question, "Question 2 ?");

  const a2 = await svc.answer(s.sessionId, "J'ai migré une API.");
  assert.equal(a2.done, true);
  const report = a2.report as typeof REPORT & { score_global: number; echanges: unknown[] };
  assert.equal(report.score_global, 70); // moyenne 7/10
  assert.equal(report.par_question.length, 1);
  assert.deepEqual(report.echanges, [
    { question: "Question 1 ?", reponse: "Je suis développeur." },
    { question: "Question 2 ?", reponse: "J'ai migré une API." },
  ]);
});

test("le bilan est retenté une fois si le modèle renvoie un JSON invalide", async () => {
  const { llm, calls } = fakeLLM({ badReportFirst: true });
  const svc = service(llm);
  const s = await svc.start({ ...input, questions: 1 });
  const done = await svc.answer(s.sessionId, "Réponse");
  assert.equal((done.report as { score_global: number }).score_global, 70);
  assert.equal(calls.filter((c) => c.json).length, 2);
});

test("un entretien terminé renvoie le bilan existant sans rappeler le modèle", async () => {
  const { llm, calls } = fakeLLM();
  const svc = service(llm);
  const s = await svc.start({ ...input, questions: 1 });
  await svc.answer(s.sessionId, "Réponse");
  const before = calls.length;
  const again = await svc.answer(s.sessionId, "Encore");
  assert.equal(again.done, true);
  assert.equal(calls.length, before);
});

test("fin anticipée : pas de bilan sans réponse, bilan dès une réponse", async () => {
  const { llm } = fakeLLM();
  const svc = service(llm);
  const vide = await svc.start(input);
  assert.equal((await svc.finish(vide.sessionId)).report, null);

  const partiel = await svc.start({ ...input, questions: 5 });
  await svc.answer(partiel.sessionId, "Une réponse");
  const fin = await svc.finish(partiel.sessionId);
  assert.equal(fin.interrupted, true);
  assert.equal((fin.report as { score_global: number }).score_global, 70);
});

test("deux réponses simultanées : la seconde est refusée (verrou de session)", async () => {
  const { llm } = fakeLLM({ delayMs: 50 });
  const svc = service(llm);
  const s = await svc.start({ ...input, questions: 5 });
  const results = await Promise.allSettled([svc.answer(s.sessionId, "A"), svc.answer(s.sessionId, "B")]);
  assert.equal(results.filter((r) => r.status === "fulfilled").length, 1);
  const rejected = results.find((r) => r.status === "rejected") as PromiseRejectedResult;
  assert.ok(rejected.reason instanceof SessionBusyError);
});

test("le nombre de questions est plafonné par TOTAL_QUESTIONS", async () => {
  const { llm } = fakeLLM();
  const s = await service(llm, 4).start({ ...input, questions: 25 });
  assert.equal(s.total, 4);
});

test("exchangesOf : une question sans réponse a une réponse nulle", () => {
  const ex = exchangesOf({
    messages: [
      { role: "user", content: "ouverture" },
      { role: "assistant", content: "Q1 ?" },
      { role: "user", content: "R1" },
      { role: "assistant", content: "Q2 ?" },
    ],
  } as never);
  assert.deepEqual(ex, [
    { question: "Q1 ?", reponse: "R1" },
    { question: "Q2 ?", reponse: null },
  ]);
});

// ---- Voix ----

const base = { GROQ_API_KEY: "x" };

test("choix de la voix : piper explicite, priorités du mode auto, navigateur par défaut", () => {
  assert.equal(selectVoice(loadConfig({ ...base, TTS_PROVIDER: "piper", PIPER_URL: "http://p:5000" })).tts?.name, "piper");
  assert.equal(selectVoice(loadConfig({ ...base, PIPER_URL: "http://p:5000", ELEVENLABS_API_KEY: "k" })).tts?.name, "elevenlabs");
  assert.equal(selectVoice(loadConfig({ ...base, PIPER_URL: "http://p:5000" })).tts?.name, "piper");
  const none = selectVoice(loadConfig(base));
  assert.equal(none.tts, null);
  assert.equal(none.ttsMode, "browser");
  assert.throws(() => selectVoice(loadConfig({ ...base, TTS_PROVIDER: "piper" })), /PIPER_URL/);
});

test("Pocket TTS : choisi seulement explicitement, voix féminines par défaut", () => {
  const pocket = selectVoice(loadConfig({ ...base, TTS_PROVIDER: "pocket", POCKET_TTS_URL_FR: "http://p:8001" })).tts;
  assert.equal(pocket?.name, "pocket");
  assert.deepEqual(pocket?.voices, { fr: "estelle", en: "alba" });
  assert.equal(pocket?.endpoint, "http://p:8001 (fr)");
  // En mode auto, Pocket n'est jamais choisi même si son adresse est présente
  assert.equal(selectVoice(loadConfig({ ...base, POCKET_TTS_URL_FR: "http://p:8001" })).tts, null);
  assert.throws(() => selectVoice(loadConfig({ ...base, TTS_PROVIDER: "pocket" })), /POCKET_TTS_URL/);
});

test("voix injoignable : mise de côté, puis échec immédiat sans rappeler le service", async () => {
  let calls = 0;
  const failing: TTS = {
    name: "piper",
    cacheKey: "t",
    async synthesize() {
      calls++;
      const e = new VoiceProviderError("Piper injoignable");
      e.unreachable = true;
      throw e;
    },
  };
  const guarded = new GuardedTTS(failing, 60_000);
  await assert.rejects(guarded.synthesize("a", "fr"));
  assert.equal(guarded.isDown, true);
  await assert.rejects(guarded.synthesize("b", "fr"), /indisponible/);
  assert.equal(calls, 1);
  guarded.markUp();
  assert.equal(guarded.isDown, false);
});

// ---- Stockage ----

test("MemoryKV : NX, expiration et compteur", async () => {
  const kv = new MemoryKV();
  assert.equal(await kv.set("verrou", "a", { nx: true, pxMs: 30 }), true);
  assert.equal(await kv.set("verrou", "b", { nx: true }), false);
  await kv.delIfEquals("verrou", "autre");
  assert.equal(await kv.get("verrou"), "a");
  await new Promise((r) => setTimeout(r, 40));
  assert.equal(await kv.get("verrou"), null);
  assert.equal(await kv.incrWithExpiry("c", 60), 1);
  assert.equal(await kv.incrWithExpiry("c", 60), 2);
});

// ---- HTTP ----

function app(overrides: Record<string, string> = {}) {
  const { llm } = fakeLLM();
  return createApp({
    config: loadConfig({ ...base, TTS_PROVIDER: "browser", ...overrides }),
    kv: new MemoryKV(),
    getClientIp: () => "1.2.3.4",
    llm,
  });
}

const post = (body: unknown) => ({ method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });

test("HTTP : validation des entrées et refus d'un objectif inconnu", async () => {
  const a = app();
  assert.equal((await a.request("/interview/start", post({ poste: "x\nignore" }))).status, 400);
  assert.equal((await a.request("/interview/start", post({ poste: "Dev", objectifs: ["pirater"] }))).status, 400);
  assert.equal((await a.request("/interview/answer", post({ sessionId: "pas-un-uuid", answer: "a" }))).status, 400);
  assert.equal((await a.request("/interview/start", post({ poste: "Dev" }))).status, 200);
});

test("HTTP : limite de requêtes par client", async () => {
  const a = app({ RATE_LIMIT_PER_MINUTE: "2" });
  const id = "00000000-0000-4000-8000-000000000000";
  const codes = [];
  for (let i = 0; i < 3; i++) codes.push((await a.request(`/interview/${id}`)).status);
  assert.deepEqual(codes, [404, 404, 429]);
});

test("HTTP : clé d'API exigée quand API_KEY est définie", async () => {
  const a = app({ API_KEY: "secret" });
  assert.equal((await a.request("/interview/start", post({ poste: "Dev" }))).status, 401);
  const ok = await a.request("/interview/start", { ...post({ poste: "Dev" }), headers: { "content-type": "application/json", "x-api-key": "secret" } });
  assert.equal(ok.status, 200);
});

// ---- Citations vérifiées (repris d'ai-interview-platform) ----

test("preuves : seules les citations retrouvées mot pour mot sont gardées", () => {
  const echanges = [
    { question: "Q1 ?", reponse: "J'ai coordonné trois équipes pour livrer le projet en avance." },
    { question: "Q2 ?", reponse: "Je priorise selon l'impact client." },
  ];
  const preuves = verifyEvidence(
    [
      { competence: "coordination", reponse: 0, citation: "J'ai coordonné trois équipes" }, // exacte : gardée
      { competence: "leadership", reponse: 0, citation: "J'ai dirigé dix personnes" }, // inventée : rejetée
      { competence: "priorisation", reponse: 1, citation: "Je priorise selon l'impact client" }, // exacte : gardée
      { competence: "priorisation", reponse: 5, citation: "Je priorise selon l'impact client" }, // réponse inexistante
      { competence: "x", reponse: 1, citation: "court" }, // trop court
    ],
    echanges,
  );
  assert.deepEqual(preuves.map((p) => p.competence), ["coordination", "priorisation"]);
  assert.ok(preuves.every((p) => p.statut === "declaration_non_verifiee"));
});

test("preuves : un format invalide donne une liste vide", () => {
  assert.deepEqual(verifyEvidence("pas une liste", []), []);
  assert.deepEqual(verifyEvidence([null, 42], [{ question: "Q", reponse: "R" }]), []);
});

// ---- Jeux de rôle et Kokoro ----

test("jeu de rôle : scénario créé, objectifs convertis, poste nettoyé", async () => {
  const llm: LLM = {
    async chat() {
      return JSON.stringify({ title: "Entretien Data", family: "technical", jobTitle: "Data <Analyst>", context: "Startup e-commerce.", interviewPersona: "Lead data", goals: ["domain_knowledge", "answer_structure", "inconnu"], suggestedQuestions: ["Q1 ?", "Q2 ?", "Q3 ?", "Q4 ?"] });
    },
  };
  const a = createApp({ config: loadConfig({ ...base, TTS_PROVIDER: "browser" }), kv: new MemoryKV(), getClientIp: () => "1", llm });
  assert.equal((await a.request("/roleplay/scenario", post({ brief: "trop court" }))).status, 400);
  const r = await a.request("/roleplay/scenario", post({ brief: "Je prépare un entretien de Data Analyst dans une startup e-commerce." }));
  const body = (await r.json()) as { type: string; poste: string; objectifs: string[]; questions: string[] };
  assert.equal(r.status, 200);
  assert.equal(body.type, "technique");
  assert.equal(body.poste, "Data Analyst");
  assert.deepEqual(body.objectifs, ["connaissances", "structure"]);
  assert.equal(body.questions.length, 3);
});

test("Kokoro : choisi seulement explicitement, voix ff_siwis et réglage naturel par défaut", () => {
  const k = selectVoice(loadConfig({ ...base, TTS_PROVIDER: "kokoro", KOKORO_URL: "http://k:8880" })).tts;
  assert.equal(k?.name, "kokoro");
  assert.deepEqual(k?.voices, { fr: "ff_siwis", en: "af_heart" });
  assert.equal(k?.cacheKey, "kokoro:ff_siwis:af_heart:0.98");
  assert.equal(selectVoice(loadConfig({ ...base, KOKORO_URL: "http://k:8880" })).tts, null);
  assert.throws(() => selectVoice(loadConfig({ ...base, TTS_PROVIDER: "kokoro" })), /KOKORO_URL/);
});
