import type { Context } from "hono";
import { createApp, type AppDeps } from "../core/app";
import { loadConfig, type Config } from "../core/config";
import { MemoryKV, selectKV, type KV } from "../core/kv";
import { PROVIDER_LABEL, selectVoice, type VoiceSetup } from "../core/voice";
import { IoredisKV, maskRedisUrl } from "./redis-kv";

/**
 * Construit l'app pour les runtimes Node (serveur local, Docker, Vercel, Lambda, Netlify) :
 * config depuis process.env, et Redis TCP disponible en plus d'Upstash et de la mémoire.
 */
export function createNodeApp(getClientIp: AppDeps["getClientIp"], kvOverride?: KV) {
  const config = loadConfig(process.env);
  const kv = kvOverride ?? selectKV(config, (url) => new IoredisKV(url));
  const voice = selectVoice(config);
  return { app: createApp({ config, kv, getClientIp, voice }), config, kv, voice };
}

const WSL_HINT =
  "  - Sous WSL avec Docker Desktop, si « docker compose ps » affiche 127.0.0.1:PORT et que rien ne répond :\n" +
  "    ajoutez DOCKER_BIND_ADDRESS=0.0.0.0 dans le .env, puis recréez les conteneurs (docker compose up -d)";

/**
 * Vérifie au démarrage que Redis répond. En local, bascule sur la mémoire avec une explication ;
 * en production, renvoie un message d'erreur (le serveur ne doit pas démarrer à moitié).
 */
export async function checkStore(kv: KV, config: Config): Promise<{ kv: KV; fatal?: string }> {
  if (!(kv instanceof IoredisKV)) return { kv };
  const ok = await Promise.race([kv.ping(), new Promise<boolean>((r) => setTimeout(() => r(false), 4_000))]);
  if (ok) return { kv };

  const url = maskRedisUrl(config.REDIS_URL ?? "");
  const help = [
    `Redis ne répond pas à l'adresse ${url}.`,
    "  - Redis tourne-t-il ? Lancez : docker compose up -d redis   (puis vérifiez avec : docker compose ps)",
    "  - En local, préférez REDIS_URL=redis://127.0.0.1:6379 dans le .env.",
    "    « redis://redis:6379 » ne fonctionne qu'à l'intérieur de docker compose.",
    "  - Pour développer sans Redis : supprimez REDIS_URL du .env (sessions en mémoire).",
    WSL_HINT,
  ].join("\n");

  kv.close();
  if (process.env.NODE_ENV === "production" || config.STORE === "redis") return { kv, fatal: help };
  console.warn(`[interview] ${help}\n[interview] En attendant, l'API continue avec un stockage EN MÉMOIRE (sessions perdues au redémarrage).`);
  return { kv: new MemoryKV() };
}

/**
 * Vérifie au démarrage que le service de voix répond (Piper). Sinon : message clair,
 * voix du navigateur en attendant, et nouvelle vérification toutes les 15 secondes.
 */
export async function checkVoice(voice: VoiceSetup, _config: Config) {
  const tts = voice.tts;
  if (!tts?.inner.probe) return;
  if (await tts.probe()) return;
  tts.markDown();
  const label = PROVIDER_LABEL[tts.name];
  const service = tts.name === "pocket" ? "pocket-fr pocket-en" : tts.name;
  const up = tts.name === "pocket" ? "docker compose --profile pocket up -d" : `docker compose up -d ${service}`;
  console.warn(
    [
      `[voix] ${label} ne répond pas (${tts.endpoint ?? "adresse inconnue"}).`,
      `  - ${label} tourne-t-il ? Lancez : ${up}   (puis : docker compose ps, docker compose logs ${service})`,
      "  - Au premier lancement, la construction de l'image télécharge les modèles : patientez qu'il soit « healthy ».",
      WSL_HINT,
      "[voix] En attendant, Lina utilise la voix du navigateur. L'API réessaie toutes les 15 secondes.",
    ].join("\n"),
  );
  const timer = setInterval(async () => {
    if (await tts.probe()) {
      tts.markUp();
      clearInterval(timer);
      console.log(`[voix] ${label} répond de nouveau : Lina retrouve sa voix.`);
    } else tts.markDown();
  }, 15_000);
  timer.unref();
}

/**
 * IP du client derrière `hops` proxys de confiance : on lit X-Forwarded-For en partant
 * de la droite, car seules les dernières entrées sont ajoutées par nos proxys.
 */
export function ipFromForwardedFor(c: Context, hops: number): string | undefined {
  const list = (c.req.header("x-forwarded-for") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!list.length) return undefined;
  return list[Math.max(0, list.length - hops)];
}
