import Redis from "ioredis";
import { DEL_IF_EQUALS_LUA, INCR_EXPIRE_LUA, redisSetArgs, type KV, type SetOpts } from "../core/kv";

/** Redis classique via TCP (ioredis). Réservé aux runtimes Node : serveur, Docker, Vercel, Lambda, Netlify. */
export class IoredisKV implements KV {
  readonly kind = "redis";
  private client: Redis;

  constructor(url: string) {
    this.client = new Redis(url, { maxRetriesPerRequest: 2, lazyConnect: false });
    this.client.on("error", (e) => console.error("[redis]", e.message));
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
}
