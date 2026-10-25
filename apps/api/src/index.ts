/**
 * Point d'entrée Vercel : Vercel détecte Hono et sert l'app exportée par défaut
 * depuis src/index.ts (Root Directory du projet Vercel : apps/api).
 * Vercel pose lui-même x-real-ip / x-forwarded-for, le client ne peut pas les falsifier.
 */
import { ipFromHeader } from "./core/app";
import { createNodeApp } from "./node/bootstrap";

const { app } = createNodeApp(ipFromHeader("x-real-ip", "x-vercel-forwarded-for", "x-forwarded-for"));

export default app;
