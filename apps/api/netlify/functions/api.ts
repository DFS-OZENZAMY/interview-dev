/**
 * Netlify Functions. Netlify pose x-nf-client-connection-ip, non falsifiable par le client.
 */
import { ipFromHeader } from "../../src/core/app";
import { createNodeApp } from "../../src/node/bootstrap";

const { app } = createNodeApp(ipFromHeader("x-nf-client-connection-ip"));

export default (req: Request) => app.fetch(req);

// Toutes les routes passent par cette fonction.
export const config = { path: "/*" };
