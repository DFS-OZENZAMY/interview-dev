import { randomUUID } from "node:crypto";
import Redis from "ioredis";
import type { Msg } from "./ai/llm";
import { config } from "./config";

export type Session = {
  id: string;
  poste: string;
  messages: Msg[];
  asked: number;
  done: boolean;
  report?: unknown;
};

export const redis = new Redis(config.REDIS_URL, { maxRetriesPerRequest: 2 });

const key = (id: string) => `session:${id}`;
const lockKey = (id: string) => `lock:session:${id}`;
const LOCK_TTL_MS = 120_000;

export async function saveSession(s: Session) {
  await redis.set(key(s.id), JSON.stringify(s), "EX", config.SESSION_TTL_SECONDS);
}

export async function getSession(id: string): Promise<Session | null> {
  const raw = await redis.get(key(id));
  return raw ? (JSON.parse(raw) as Session) : null;
}

export class SessionBusyError extends Error {}

/**
 * Exécute fn en tenant un verrou sur la session, pour éviter que deux
 * réponses envoyées en même temps ne mélangent l'historique.
 */
export async function withSessionLock<T>(id: string, fn: () => Promise<T>): Promise<T> {
  const token = randomUUID();
  const ok = await redis.set(lockKey(id), token, "PX", LOCK_TTL_MS, "NX");
  if (ok !== "OK") throw new SessionBusyError();
  try {
    return await fn();
  } finally {
    // Ne libère le verrou que s'il nous appartient encore.
    await redis.eval(
      `if redis.call("get", KEYS[1]) == ARGV[1] then return redis.call("del", KEYS[1]) else return 0 end`,
      1,
      lockKey(id),
      token,
    );
  }
}
