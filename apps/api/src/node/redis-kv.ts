import Redis from "ioredis";
import { DEL_IF_EQUALS_LUA, INCR_EXPIRE_LUA, redisSetArgs, type KV, type SetOpts } from "../core/kv";

/** Masque le mot de passe d'une URL Redis avant de l'afficher. */
export function maskRedisUrl(url: string) {
  try {
    const u = new URL(url);
    if (u.password) u.password = "****";
    return u.toString();
  } catch {
    return "(URL invalide)";
  }
}

/** Redis classique via TCP (ioredis). Réservé aux runtimes Node : serveur, Docker, Vercel, Lambda, Netlify. */
export class IoredisKV implements KV {
  readonly kind = "redis";
  private client: Redis;
  private lastErrorLog = 0;

  constructor(private url: string) {
    this.client = new Redis(url, {
      // Échoue vite plutôt que de bloquer chaque requête 10 secondes.
      connectTimeout: 3_000,
      maxRetriesPerRequest: 1,
    });
    // Une ligne de log toutes les 30 secondes au plus, au lieu d'une par tentative.
    this.client.on("error", (e: Error & { code?: string }) => {
      const now = Date.now();
      if (now - this.lastErrorLog < 30_000) return;
      this.lastErrorLog = now;
      console.error(`[redis] ${maskRedisUrl(this.url)} injoignable (${e.code ?? e.message}). Nouvelle tentative en arrière-plan…`);
    });
  }

  async get(key: string) {
    return this.client.get(key);
  }

  async set(key: string, value: string, opts?: SetOpts) {
    const res = await (this.client as any).set(key, value, ...redisSetArgs(opts));
    return res === "OK";
  }

  async delIfEquals(key: string, value: string) {
    await this.client.eval(DEL_IF_EQUALS_LUA, 1, key, value);
  }

  async incrWithExpiry(key: string, seconds: number) {
    return Number(await this.client.eval(INCR_EXPIRE_LUA, 1, key, String(seconds)));
  }

  async ping() {
    return this.client.ping().then(
      (r) => r === "PONG",
      () => false,
    );
  }

  /** Ferme la connexion (abandon de Redis au démarrage). */
  close() {
    this.client.disconnect();
  }
}
