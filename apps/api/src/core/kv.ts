import { ConfigError } from "./config";
/**
 * Stockage clé-valeur minimal dont l'API a besoin.
 * Trois implémentations : mémoire (local), Upstash REST (partout, y compris Workers)
 * et ioredis (runtimes Node uniquement, voir src/node/redis-kv.ts).
 */
export type SetOpts = { exSeconds?: number; pxMs?: number; nx?: boolean };

export interface KV {
  readonly kind: string;
  get(key: string): Promise<string | null>;
  /** Renvoie false si nx est demandé et que la clé existe déjà. */
  set(key: string, value: string, opts?: SetOpts): Promise<boolean>;
  /** Supprime la clé seulement si sa valeur est encore `value` (libération de verrou). */
  delIfEquals(key: string, value: string): Promise<void>;
  /** Incrémente un compteur et lui donne une durée de vie à sa création. */
  incrWithExpiry(key: string, seconds: number): Promise<number>;
  ping(): Promise<boolean>;
}

export const DEL_IF_EQUALS_LUA = `if redis.call("get", KEYS[1]) == ARGV[1] then return redis.call("del", KEYS[1]) else return 0 end`;
export const INCR_EXPIRE_LUA = `local n = redis.call("incr", KEYS[1]) if n == 1 then redis.call("expire", KEYS[1], ARGV[1]) end return n`;

export function redisSetArgs(opts: SetOpts = {}): string[] {
  const args: string[] = [];
  if (opts.exSeconds) args.push("EX", String(opts.exSeconds));
  if (opts.pxMs) args.push("PX", String(opts.pxMs));
  if (opts.nx) args.push("NX");
  return args;
}

/** Stockage en mémoire : pratique en local, mais perdu au redémarrage et non partagé entre instances. */
export class MemoryKV implements KV {
  readonly kind = "memory";
  private data = new Map<string, { value: string; expiresAt: number }>();
  private writes = 0;

  private alive(key: string) {
    const entry = this.data.get(key);
    if (!entry) return undefined;
    if (entry.expiresAt <= Date.now()) {
      this.data.delete(key);
      return undefined;
    }
    return entry;
  }

  private sweep() {
    if (++this.writes % 500 !== 0) return;
    const now = Date.now();
    for (const [k, e] of this.data) if (e.expiresAt <= now) this.data.delete(k);
  }

  async get(key: string) {
    return this.alive(key)?.value ?? null;
  }

  async set(key: string, value: string, opts: SetOpts = {}) {
    if (opts.nx && this.alive(key)) return false;
    const ttlMs = opts.pxMs ?? (opts.exSeconds ? opts.exSeconds * 1000 : Infinity);
    this.data.set(key, { value, expiresAt: Date.now() + ttlMs });
    this.sweep();
    return true;
  }

  async delIfEquals(key: string, value: string) {
    if (this.alive(key)?.value === value) this.data.delete(key);
  }

  async incrWithExpiry(key: string, seconds: number) {
    const entry = this.alive(key);
    if (entry) {
      entry.value = String(Number(entry.value) + 1);
      return Number(entry.value);
    }
    await this.set(key, "1", { exSeconds: seconds });
    return 1;
  }

  async ping() {
    return true;
  }
}

/** Redis via l'API REST d'Upstash : uniquement fetch, donc compatible avec tous les runtimes. */
export class UpstashKV implements KV {
  readonly kind = "upstash";
  constructor(
    private url: string,
    private token: string,
  ) {}

  private async cmd(...args: string[]): Promise<unknown> {
    const r = await fetch(this.url.replace(/\/$/, ""), {
      method: "POST",
      signal: AbortSignal.timeout(5_000),
      headers: { Authorization: `Bearer ${this.token}`, "Content-Type": "application/json" },
      body: JSON.stringify(args),
    });
    const data: any = await r.json().catch(() => ({}));
    if (!r.ok || data.error) throw new Error(`Upstash ${r.status}: ${data.error ?? "erreur"}`);
    return data.result;
  }

  async get(key: string) {
    const v = await this.cmd("GET", key);
    return typeof v === "string" ? v : null;
  }

  async set(key: string, value: string, opts?: SetOpts) {
    return (await this.cmd("SET", key, value, ...redisSetArgs(opts))) === "OK";
  }

  async delIfEquals(key: string, value: string) {
    await this.cmd("EVAL", DEL_IF_EQUALS_LUA, "1", key, value);
  }

  async incrWithExpiry(key: string, seconds: number) {
    return Number(await this.cmd("EVAL", INCR_EXPIRE_LUA, "1", key, String(seconds)));
  }

  async ping() {
    return this.cmd("PING").then(
      (r) => r === "PONG",
      () => false,
    );
  }
}

/**
 * Choisit le stockage selon la config. `redisFactory` n'est fourni que par les
 * runtimes Node (TCP disponible) ; sur Workers il est absent.
 */
export function selectKV(
  cfg: {
    STORE: "auto" | "memory" | "redis" | "upstash";
    REDIS_URL?: string;
    UPSTASH_REDIS_REST_URL?: string;
    UPSTASH_REDIS_REST_TOKEN?: string;
  },
  redisFactory?: (url: string) => KV,
): KV {
  const hasUpstash = Boolean(cfg.UPSTASH_REDIS_REST_URL && cfg.UPSTASH_REDIS_REST_TOKEN);
  const store = cfg.STORE;

  if (store === "upstash" || (store === "auto" && hasUpstash)) {
    if (!hasUpstash) throw new ConfigError("STORE=upstash nécessite UPSTASH_REDIS_REST_URL et UPSTASH_REDIS_REST_TOKEN");
    return new UpstashKV(cfg.UPSTASH_REDIS_REST_URL!, cfg.UPSTASH_REDIS_REST_TOKEN!);
  }

  if (store === "redis" || (store === "auto" && cfg.REDIS_URL)) {
    if (!cfg.REDIS_URL) throw new ConfigError("STORE=redis nécessite REDIS_URL");
    if (!redisFactory) {
      throw new ConfigError(
        "Ce runtime ne permet pas de connexion Redis TCP (REDIS_URL). Utilisez Upstash (UPSTASH_REDIS_REST_URL/TOKEN) ou STORE=memory.",
      );
    }
    return redisFactory(cfg.REDIS_URL);
  }

  console.warn(
    "[interview] Stockage EN MÉMOIRE : sessions perdues au redémarrage et non partagées entre instances. À réserver au développement local.",
  );
  return new MemoryKV();
}
