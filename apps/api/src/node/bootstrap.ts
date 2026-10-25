import type { Context } from "hono";
import { createApp, type AppDeps } from "../core/app";
import { loadConfig, type Config } from "../core/config";
import { MemoryKV, selectKV, type KV } from "../core/kv";
import { IoredisKV, maskRedisUrl } from "./redis-kv";

/**
 * Construit l'app pour les runtimes Node (serveur local, Docker, Vercel, Lambda, Netlify) :
 * config depuis process.env, et Redis TCP disponible en plus d'Upstash et de la mémoire.
 */
export function createNodeApp(getClientIp: AppDeps["getClientIp"], kvOverride?: KV) {
  const config = loadConfig(process.env);
  const kv = kvOverride ?? selectKV(config, (url) => new IoredisKV(url));
  return { app: createApp({ config, kv, getClientIp }), config, kv };
}

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
  ].join("\n");

  kv.close();
  if (process.env.NODE_ENV === "production" || config.STORE === "redis") return { kv, fatal: help };
  console.warn(`[interview] ${help}\n[interview] En attendant, l'API continue avec un stockage EN MÉMOIRE (sessions perdues au redémarrage).`);
  return { kv: new MemoryKV() };
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
