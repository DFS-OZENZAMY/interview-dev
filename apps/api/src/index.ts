import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { GroqLLM } from "./ai/llm";
import { startInterview, answerQuestion } from "./interview";

const llm = new GroqLLM(process.env.GROQ_API_KEY ?? "");
const app = new Hono();

app.get("/health", (c) => c.json({ ok: true }));

app.post("/interview/start", async (c) => {
  try {
    const body: any = await c.req.json().catch(() => ({}));
    return c.json(await startInterview(llm, body.poste ?? "Data engineer"));
  } catch (e) {
    console.error(e);
    return c.json({ error: String(e) }, 500);
  }
});

app.post("/interview/answer", async (c) => {
  try {
    const body: any = await c.req.json().catch(() => null);
    if (!body?.sessionId || !body?.answer) {
      return c.json({ error: "sessionId et answer requis" }, 400);
    }
    return c.json(await answerQuestion(llm, body.sessionId, body.answer));
  } catch (e) {
    console.error(e);
    return c.json({ error: String(e) }, 500);
  }
});

serve({ fetch: app.fetch, port: 3000 });