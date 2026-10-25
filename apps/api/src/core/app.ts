import { Hono, type Context, type MiddlewareHandler } from "hono";
import { z } from "zod";
import type { Config } from "./config";
import { InterviewService } from "./interview";
import type { KV } from "./kv";
import { GroqLLM, type LLM } from "./llm";
import { SessionBusyError, SessionNotFoundError, SessionStore } from "./sessions";

/** Ce que chaque plateforme fournit à l'application. */
export type AppDeps = {
  config: Config;
  kv: KV;
  /** Adresse IP réelle du client, selon la plateforme (sert à la limite de requêtes). */
  getClientIp: (c: Context) => string | undefined;
  /** Remplaçable pour les tests. */
  llm?: LLM;
};

function safeEqual(a: string, b: string) {
  const ea = new TextEncoder().encode(a);
  const eb = new TextEncoder().encode(b);
  let diff = ea.length ^ eb.length;
  for (let i = 0; i < Math.max(ea.length, eb.length); i++) diff |= (ea[i] ?? 0) ^ (eb[i] ?? 0);
  return diff === 0;
}

const startSchema = z.object({
  poste: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .regex(/^[^\n\r<>{}`]+$/, "caractères non autorisés")
    .default("Data engineer"),
});

const answerSchema = z.object({
  sessionId: z.uuid(),
  answer: z.string().trim().min(1).max(5000),
});

export function createApp({ config, kv, getClientIp, llm }: AppDeps) {
  const model =
    llm ?? new GroqLLM(config.GROQ_API_KEY, config.GROQ_MODEL, config.GROQ_BASE_URL, config.LLM_TIMEOUT_MS);
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

  app.get("/health", async (c) => {
    const storeOk = await kv.ping().catch(() => false);
    return c.json({ ok: storeOk, store: kv.kind }, storeOk ? 200 : 503);
  });

  app.use("/interview/*", apiKeyAuth, rateLimit);

  app.post("/interview/start", async (c) => {
    const body = startSchema.safeParse(await c.req.json().catch(() => ({})));
    if (!body.success) return c.json({ error: "poste invalide (2 à 100 caractères)" }, 400);
    return c.json(await interviews.start(body.data.poste));
  });

  app.post("/interview/answer", async (c) => {
    const body = answerSchema.safeParse(await c.req.json().catch(() => null));
    if (!body.success) return c.json({ error: "sessionId (uuid) et answer requis" }, 400);
    return c.json(await interviews.answer(body.data.sessionId, body.data.answer));
  });

  app.get("/interview/:id", async (c) => {
    const id = z.uuid().safeParse(c.req.param("id"));
    if (!id.success) return c.json({ error: "id invalide" }, 400);
    return c.json(await interviews.get(id.data));
  });

  app.notFound((c) => c.json({ error: "Route introuvable" }, 404));

  // Les détails techniques restent dans les logs serveur, jamais dans la réponse.
  app.onError((err, c) => {
    if (err instanceof SessionNotFoundError) return c.json({ error: "Session introuvable ou expirée" }, 404);
    if (err instanceof SessionBusyError) return c.json({ error: "Une réponse est déjà en cours de traitement" }, 409);
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
