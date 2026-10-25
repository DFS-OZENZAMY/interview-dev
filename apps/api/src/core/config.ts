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

  // Nombre maximal de questions par entretien (le front choisit selon la durée, plafonné ici).
  TOTAL_QUESTIONS: z.coerce.number().int().min(1).max(30).default(10),
  SESSION_TTL_SECONDS: z.coerce.number().int().positive().default(7200),
  RATE_LIMIT_PER_MINUTE: z.coerce.number().int().positive().default(30),
  // Front hébergé sur un autre domaine : liste séparée par des virgules, ou "*".
  CORS_ORIGINS: z.string().optional(),

  // ---- Voix de Lina (synthèse vocale) ----
  // auto : ElevenLabs si ELEVENLABS_API_KEY, sinon OpenAI si OPENAI_API_KEY, sinon voix du navigateur.
  TTS_PROVIDER: z.enum(["auto", "elevenlabs", "openai", "browser", "none"]).default("auto"),
  ELEVENLABS_API_KEY: z.string().optional(),
  ELEVENLABS_VOICE_ID: z.string().default("21m00Tcm4TlvDq8ikWAM"),
  ELEVENLABS_MODEL: z.string().default("eleven_flash_v2_5"),
  ELEVENLABS_BASE_URL: z.url().default("https://api.elevenlabs.io"),
  OPENAI_API_KEY: z.string().optional(),
  // Toute API compatible OpenAI pour la voix (OpenAI, serveur auto-hébergé…).
  OPENAI_BASE_URL: z.url().default("https://api.openai.com/v1"),
  OPENAI_TTS_MODEL: z.string().default("gpt-4o-mini-tts"),
  OPENAI_TTS_VOICE: z.string().default("coral"),

  // ---- Écoute du candidat (transcription) ----
  // auto : Whisper via Groq (même clé que le LLM). browser : reconnaissance vocale du navigateur uniquement.
  STT_PROVIDER: z.enum(["auto", "groq", "openai", "browser"]).default("auto"),
  STT_MODEL: z.string().optional(),
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
