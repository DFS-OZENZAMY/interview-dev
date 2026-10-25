import path from "node:path";
import dotenv from "dotenv";
import { z } from "zod";

// Chemin résolu depuis ce fichier : fonctionne quel que soit le dossier de lancement.
dotenv.config({ path: path.resolve(__dirname, "../../../.env"), quiet: true });

const schema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  GROQ_API_KEY: z.string().min(1, "GROQ_API_KEY est requise"),
  GROQ_MODEL: z.string().default("openai/gpt-oss-120b"),
  REDIS_URL: z.string().default("redis://localhost:6379"),
  // Si défini, chaque requête doit envoyer l'en-tête x-api-key.
  API_KEY: z.string().optional(),
  TOTAL_QUESTIONS: z.coerce.number().int().min(1).max(30).default(10),
  SESSION_TTL_SECONDS: z.coerce.number().int().positive().default(7200),
  RATE_LIMIT_PER_MINUTE: z.coerce.number().int().positive().default(20),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  console.error("Configuration invalide :");
  for (const issue of parsed.error.issues) {
    console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
  }
  process.exit(1);
}

export const config = parsed.data;
