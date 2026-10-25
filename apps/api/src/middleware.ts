import { timingSafeEqual } from "node:crypto";
import type { MiddlewareHandler } from "hono";
import { getConnInfo } from "@hono/node-server/conninfo";
import { config } from "./config";
import { redis } from "./store";

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

/** Clé d'API optionnelle : active seulement si API_KEY est définie. */
export const apiKeyAuth: MiddlewareHandler = async (c, next) => {
  if (!config.API_KEY) return next();
  const provided = c.req.header("x-api-key") ?? "";
  if (!safeEqual(provided, config.API_KEY)) {
    return c.json({ error: "Non autorisé" }, 401);
  }
  return next();
};

/** Limite à RATE_LIMIT_PER_MINUTE requêtes par minute et par IP (fenêtre fixe). */
export const rateLimit: MiddlewareHandler = async (c, next) => {
  const ip = getConnInfo(c).remote.address ?? "unknown";
  const window = Math.floor(Date.now() / 60_000);
  const k = `rl:${ip}:${window}`;
  const count = await redis.incr(k);
  if (count === 1) await redis.expire(k, 60);
  if (count > config.RATE_LIMIT_PER_MINUTE) {
    return c.json({ error: "Trop de requêtes, réessayez dans une minute" }, 429);
  }
  return next();
};
