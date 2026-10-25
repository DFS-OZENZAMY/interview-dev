/**
 * Serveur Node autonome : développement local, Docker, VPS, Render, Railway, Fly.io,
 * Koyeb, Google Cloud Run, AWS ECS/Fargate, App Runner, Elastic Beanstalk, Azure…
 */
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import { serve } from "@hono/node-server";
import { getConnInfo } from "@hono/node-server/conninfo";
import type { Context } from "hono";
import { ConfigError } from "../core/config";
import { createNodeApp, ipFromForwardedFor } from "../node/bootstrap";

// Charge le .env le plus proche en remontant depuis le dossier courant et depuis ce fichier
// (fonctionne en dev avec tsx comme depuis le build dist/). Ne remplace pas les variables déjà définies.
function loadDotenv() {
  for (const start of [process.cwd(), __dirname]) {
    let dir = start;
    for (let i = 0; i < 5; i++) {
      const file = path.join(dir, ".env");
      if (fs.existsSync(file)) return void dotenv.config({ path: file, quiet: true });
      dir = path.dirname(dir);
    }
  }
}
loadDotenv();

try {
  let hops = 0;
  const getClientIp = (c: Context) =>
    (hops > 0 ? ipFromForwardedFor(c, hops) : undefined) ?? getConnInfo(c).remote.address;

  const { app, config } = createNodeApp(getClientIp);
  hops = config.TRUST_PROXY_HOPS;

  const server = serve({ fetch: app.fetch, port: config.PORT, hostname: "0.0.0.0" }, (info) => {
    console.log(`API prête sur http://localhost:${info.port}`);
  });

  // Arrêt propre (Docker, Kubernetes, Cloud Run… envoient SIGTERM).
  for (const sig of ["SIGTERM", "SIGINT"] as const) {
    process.on(sig, () => {
      server.close(() => process.exit(0));
      setTimeout(() => process.exit(0), 10_000).unref();
    });
  }
} catch (e) {
  console.error(e instanceof ConfigError ? e.message : e);
  process.exit(1);
}
