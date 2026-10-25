/**
 * Cloudflare Workers (voir wrangler.toml). Pas de Node ni de TCP ici :
 * stockage via Upstash REST (ou mémoire pour un essai), config depuis `env`.
 */
import type { Hono } from "hono";
import { createApp, ipFromHeader } from "../core/app";
import { ConfigError, loadConfig } from "../core/config";
import { selectKV } from "../core/kv";

let app: Hono | undefined;

export default {
  async fetch(request: Request, env: Record<string, unknown>, ctx: unknown) {
    if (!app) {
      try {
        const config = loadConfig(env);
        app = createApp({ config, kv: selectKV(config), getClientIp: ipFromHeader("cf-connecting-ip") });
      } catch (e) {
        console.error(e instanceof ConfigError ? e.message : e);
        return Response.json({ error: "Configuration du serveur invalide" }, { status: 500 });
      }
    }
    return app.fetch(request, env, ctx as any);
  },
};
