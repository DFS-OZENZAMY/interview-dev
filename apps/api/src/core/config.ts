import { z } from "zod";

/**
 * Configuration lue depuis un objet d'environnement quelconque :
 * process.env sous Node, Vercel, Lambda et Netlify, ou `env` sous Cloudflare Workers.
 * Aucun accès direct à process.env ici, pour rester compatible avec tous les runtimes.
 */
const schema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),

  GROQ_API_KEY: z.string().min(1, "GROQ_API_KEY est requise"),
  GROQ_MODEL: z.string().default("openai/gpt-oss-120b"),
  GROQ_BASE_URL: z.url().default("https://api.groq.com/openai/v1"),
  LLM_TIMEOUT_MS: z.coerce.number().int().positive().default(30_000),

  // auto : Upstash si configuré, sinon Redis si REDIS_URL et runtime compatible, sinon mémoire.
  STORE: z.enum(["auto", "memory", "redis", "upstash"]).default("auto"),
  REDIS_URL: z.string().optional(),
  UPSTASH_REDIS_REST_URL: z.url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

  // Si défini, chaque appel à /interview/* doit envoyer l'en-tête x-api-key.
  API_KEY: z.string().optional(),
  // Serveur Node derrière un proxy : nombre de proxys de confiance (0 = aucun).
  TRUST_PROXY_HOPS: z.coerce.number().int().min(0).default(0),

  TOTAL_QUESTIONS: z.coerce.number().int().min(1).max(30).default(10),
  SESSION_TTL_SECONDS: z.coerce.number().int().positive().default(7200),
  RATE_LIMIT_PER_MINUTE: z.coerce.number().int().positive().default(20),
});

export type Config = z.infer<typeof schema>;

export class ConfigError extends Error {}

export function loadConfig(env: Record<string, unknown>): Config {
  // Les variables vides ("") sont traitées comme absentes.
  const cleaned = Object.fromEntries(
    Object.entries(env).filter(([, v]) => v !== "" && v !== undefined),
  );
  const parsed = schema.safeParse(cleaned);
  if (!parsed.success) {
    const details = parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
    throw new ConfigError(`Configuration invalide :\n${details}`);
  }
  return parsed.data;
}
