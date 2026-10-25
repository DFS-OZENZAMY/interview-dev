import { config } from "./config";

import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { z } from "zod";
import { GroqLLM } from "./ai/llm";
import { answerQuestion, getInterview, SessionNotFoundError, startInterview } from "./interview";
import { apiKeyAuth, rateLimit } from "./middleware";
import { redis, SessionBusyError } from "./store";

const llm = new GroqLLM(config.GROQ_API_KEY, config.GROQ_MODEL);
const app = new Hono();

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

app.get("/health", async (c) => {
  const redisOk = await redis.ping().then(() => true, () => false);
  return c.json({ ok: redisOk, redis: redisOk }, redisOk ? 200 : 503);
});

app.use("/interview/*", apiKeyAuth, rateLimit);

app.post("/interview/start", async (c) => {
  const body = startSchema.safeParse(await c.req.json().catch(() => ({})));
  if (!body.success) return c.json({ error: "poste invalide (2 à 100 caractères)" }, 400);
  return c.json(await startInterview(llm, body.data.poste));
});

app.post("/interview/answer", async (c) => {
  const body = answerSchema.safeParse(await c.req.json().catch(() => null));
  if (!body.success) return c.json({ error: "sessionId (uuid) et answer requis" }, 400);
  return c.json(await answerQuestion(llm, body.data.sessionId, body.data.answer));
});

app.get("/interview/:id", async (c) => {
  const id = z.uuid().safeParse(c.req.param("id"));
  if (!id.success) return c.json({ error: "id invalide" }, 400);
  return c.json(await getInterview(id.data));
});

// Les détails techniques restent dans les logs serveur, jamais dans la réponse.
app.onError((err, c) => {
  if (err instanceof SessionNotFoundError) return c.json({ error: "Session introuvable ou expirée" }, 404);
  if (err instanceof SessionBusyError) return c.json({ error: "Une réponse est déjà en cours de traitement" }, 409);
  console.error(err);
  return c.json({ error: "Erreur interne, réessayez plus tard" }, 500);
});

serve({ fetch: app.fetch, port: config.PORT }, (info) => {
  console.log(`API prête sur http://localhost:${info.port}`);
});
