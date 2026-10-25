import type { Context } from "hono";
import { createApp, type AppDeps } from "../core/app";
import { loadConfig } from "../core/config";
import { selectKV } from "../core/kv";
import { IoredisKV } from "./redis-kv";

/**
 * Construit l'app pour les runtimes Node (serveur local, Docker, Vercel, Lambda, Netlify) :
 * config depuis process.env, et Redis TCP disponible en plus d'Upstash et de la mémoire.
 */
export function createNodeApp(getClientIp: AppDeps["getClientIp"]) {
  const config = loadConfig(process.env);
  const kv = selectKV(config, (url) => new IoredisKV(url));
  return { app: createApp({ config, kv, getClientIp }), config };
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
