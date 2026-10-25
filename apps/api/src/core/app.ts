import { Hono, type Context, type MiddlewareHandler } from "hono";
import { bodyLimit } from "hono/body-limit";
import { cors } from "hono/cors";
import { z } from "zod";
import type { Config } from "./config";
import { InterviewService, SessionDoneError } from "./interview";
import type { KV } from "./kv";
import { GroqLLM, type LLM } from "./llm";
import { SessionBusyError, SessionNotFoundError, SessionStore } from "./sessions";
import { PHRASES, selectVoice, synthesizeCached, VoiceProviderError, type Audio, type CachedAudio, type Locale, type VoiceSetup } from "./voice";

/** Ce que chaque plateforme fournit à l'application. */
export type AppDeps = {
  config: Config;
  kv: KV;
  /** Adresse IP réelle du client, selon la plateforme (sert à la limite de requêtes). */
  getClientIp: (c: Context) => string | undefined;
  /** Remplaçables pour les tests. */
  llm?: LLM;
  voice?: VoiceSetup;
};

function safeEqual(a: string, b: string) {
  const ea = new TextEncoder().encode(a);
  const eb = new TextEncoder().encode(b);
  let diff = ea.length ^ eb.length;
  for (let i = 0; i < Math.max(ea.length, eb.length); i++) diff |= (ea[i] ?? 0) ^ (eb[i] ?? 0);
  return diff === 0;
}

const MAX_AUDIO_BYTES = 8 * 1024 * 1024;
const noControl = /^[^\n\r<>{}`]+$/;

const startSchema = z.object({
  poste: z.string().trim().min(2).max(100).regex(noControl, "caractères non autorisés").default("Data engineer"),
  type: z.enum(["rh", "technique"]).default("rh"),
  locale: z.enum(["fr", "en"]).default("fr"),
  // La fiche de poste est encadrée dans le prompt et traitée comme une simple donnée.
  description: z
    .string()
    .max(3000)
    .transform((v) => v.replace(/<\/?fiche_de_poste>/gi, "").trim())
    .optional(),
  objectifs: z.array(z.enum(["confiance", "structure", "communication", "connaissances", "stress"])).max(3).default([]),
  experience: z.enum(["debutant", "junior", "confirme", "senior"]).optional(),
  questions: z.coerce.number().int().min(1).max(30).optional(),
});

const answerSchema = z.object({
  sessionId: z.uuid(),
  answer: z.string().trim().min(1).max(8000),
});

function audioResponse(audio: CachedAudio | Audio, cacheControl: string) {
  const isBytes = "bytes" in audio;
  return new Response(isBytes ? audio.bytes : audio.body, {
    headers: {
      "Content-Type": audio.contentType,
      "Cache-Control": cacheControl,
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export function createApp({ config, kv, getClientIp, llm, voice }: AppDeps) {
  const model =
    llm ?? new GroqLLM(config.GROQ_API_KEY, config.GROQ_MODEL, config.GROQ_BASE_URL, config.LLM_TIMEOUT_MS);
  const voiceSetup = voice ?? selectVoice(config);
  const interviews = new InterviewService(model, new SessionStore(kv, config.SESSION_TTL_SECONDS), config.TOTAL_QUESTIONS);

  const apiKeyAuth: MiddlewareHandler = async (c, next) => {
    if (!config.API_KEY) return next();
    if (!safeEqual(c.req.header("x-api-key") ?? "", config.API_KEY)) {
      return c.json({ error: "Non autorisé" }, 401);
    }
    return next();
  };

  const rateLimit: MiddlewareHandler = async (c, next) => {
    const ip = getClientIp(c) ?? "unknown";
    const window = Math.floor(Date.now() / 60_000);
    const count = await kv.incrWithExpiry(`rl:${ip}:${window}`, 60);
    if (count > config.RATE_LIMIT_PER_MINUTE) {
      return c.json({ error: "Trop de requêtes, réessayez dans une minute" }, 429);
    }
    return next();
  };

  const app = new Hono();

  // Front hébergé sur un autre domaine : CORS_ORIGINS="https://mon-front.com,https://autre.com" ou "*".
  if (config.CORS_ORIGINS) {
    const origins = config.CORS_ORIGINS.split(",").map((o) => o.trim()).filter(Boolean);
    app.use(
      "*",
      cors({
        origin: origins.includes("*") ? "*" : origins,
        allowHeaders: ["Content-Type", "x-api-key"],
        allowMethods: ["GET", "POST", "OPTIONS"],
        maxAge: 600,
      }),
    );
  }

  app.get("/health", async (c) => {
    const storeOk = await kv.ping().catch(() => false);
    return c.json({ ok: storeOk, store: kv.kind }, storeOk ? 200 : 503);
  });

  // ---- Voix ----

  app.get("/voice/config", (c) =>
    c.json({
      tts: {
        mode: voiceSetup.ttsMode,
        provider: voiceSetup.tts?.name ?? null,
        // Nom des voix Piper utilisées (affiché dans la préparation).
        voices: voiceSetup.tts?.voices ?? null,
        // Fournisseur momentanément injoignable : le front utilise la voix du navigateur.
        available: voiceSetup.tts ? !voiceSetup.tts.isDown : null,
      },
      stt: { mode: voiceSetup.sttMode, provider: voiceSetup.stt?.name ?? null },
      phrases: PHRASES,
      maxQuestions: config.TOTAL_QUESTIONS,
    }),
  );

  app.use("/voice/phrase/*", apiKeyAuth, rateLimit);
  app.get("/voice/phrase/:name", async (c) => {
    const name = z.enum(["intro", "closing"]).safeParse(c.req.param("name"));
    const locale = z.enum(["fr", "en"]).safeParse(c.req.query("locale") ?? "fr");
    if (!name.success || !locale.success) return c.json({ error: "Phrase inconnue" }, 400);
    if (!voiceSetup.tts) return c.json({ error: "Synthèse vocale serveur désactivée", mode: voiceSetup.ttsMode }, 404);
    const text = PHRASES[name.data][locale.data].join(" ");
    const audio = await synthesizeCached(voiceSetup.tts, kv, text, locale.data);
    return audioResponse(audio, "public, max-age=86400");
  });

  // ---- Entretien ----

  app.use("/interview/*", apiKeyAuth, rateLimit);

  app.post("/interview/start", async (c) => {
    const body = startSchema.safeParse(await c.req.json().catch(() => ({})));
    if (!body.success) return c.json({ error: "Configuration d'entretien invalide", details: z.treeifyError(body.error) }, 400);
    return c.json(await interviews.start(body.data));
  });

  app.post("/interview/answer", async (c) => {
    const body = answerSchema.safeParse(await c.req.json().catch(() => null));
    if (!body.success) return c.json({ error: "sessionId (uuid) et answer requis" }, 400);
    return c.json(await interviews.answer(body.data.sessionId, body.data.answer));
  });

  const sessionId = (c: Context) => {
    const id = z.uuid().safeParse(c.req.param("id"));
    return id.success ? id.data : null;
  };

  app.get("/interview/:id", async (c) => {
    const id = sessionId(c);
    if (!id) return c.json({ error: "id invalide" }, 400);
    return c.json(await interviews.get(id));
  });

  app.post("/interview/:id/finish", async (c) => {
    const id = sessionId(c);
    if (!id) return c.json({ error: "id invalide" }, 400);
    return c.json(await interviews.finish(id));
  });

  // Lina prononce la dernière question de la session : le texte vient du serveur, jamais du client.
  app.get("/interview/:id/speech", async (c) => {
    const id = sessionId(c);
    if (!id) return c.json({ error: "id invalide" }, 400);
    if (!voiceSetup.tts) return c.json({ error: "Synthèse vocale serveur désactivée", mode: voiceSetup.ttsMode }, 404);
    const { text, locale } = await interviews.currentSpeech(id);
    if (!text) return c.json({ error: "Rien à prononcer" }, 404);
    const audio = await voiceSetup.tts.synthesize(text, locale as Locale);
    return audioResponse(audio, "private, max-age=600");
  });

  app.post(
    "/interview/:id/transcribe",
    bodyLimit({ maxSize: MAX_AUDIO_BYTES, onError: (c) => c.json({ error: "Audio trop volumineux (8 Mo max)" }, 413) }),
    async (c) => {
      const id = sessionId(c);
      if (!id) return c.json({ error: "id invalide" }, 400);
      if (!voiceSetup.stt) return c.json({ error: "Transcription serveur désactivée", mode: "browser" }, 404);
      const session = await interviews.assertActive(id);
      const form = await c.req.parseBody().catch(() => null);
      const audio = form?.["audio"];
      if (!(audio instanceof Blob) || audio.size === 0) return c.json({ error: "Champ audio manquant" }, 400);
      if (!/^audio\/|^video\/webm/.test(audio.type || "audio/webm")) return c.json({ error: "Format audio non pris en charge" }, 415);
      const text = await voiceSetup.stt.transcribe(audio, session.locale);
      return c.json({ text });
    },
  );

  app.notFound((c) => c.json({ error: "Route introuvable" }, 404));

  // Les détails techniques restent dans les logs serveur, jamais dans la réponse.
  app.onError((err, c) => {
    if (err instanceof SessionNotFoundError) return c.json({ error: "Session introuvable ou expirée" }, 404);
    if (err instanceof SessionBusyError) return c.json({ error: "Une réponse est déjà en cours de traitement" }, 409);
    if (err instanceof SessionDoneError) return c.json({ error: "L'entretien est déjà terminé" }, 409);
    // Redis tombé en cours de route : erreur claire, sans trace répétée à chaque requête.
    if (err.name === "MaxRetriesPerRequestError" || /ECONNREFUSED|ETIMEDOUT|Connection is closed/.test(err.message)) {
      console.error(`[stockage] indisponible : ${err.message}`);
      return c.json({ error: "Le stockage des sessions est momentanément indisponible, réessayez dans un instant." }, 503);
    }
    if (err instanceof VoiceProviderError) {
      console.error(`[voix] ${err.message}`);
      return c.json({ error: "Le service vocal est momentanément indisponible" }, err.unreachable ? 503 : 502);
    }
    console.error(err);
    return c.json({ error: "Erreur interne, réessayez plus tard" }, 500);
  });

  return app;
}

/** Lit l'IP du client dans un en-tête posé par la plateforme (non falsifiable par le client). */
export const ipFromHeader =
  (...headers: string[]) =>
  (c: Context) => {
    for (const h of headers) {
      const v = c.req.header(h);
      if (v) return v.split(",")[0]!.trim();
    }
    return undefined;
  };
