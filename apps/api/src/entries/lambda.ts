/**
 * AWS Lambda (Function URL ou API Gateway HTTP/REST).
 * Construire avec `pnpm build:lambda`, puis déployer dist/lambda.zip avec le handler `index.handler`.
 */
import { handle } from "hono/aws-lambda";
import type { Context } from "hono";
import { createNodeApp } from "../node/bootstrap";

const getClientIp = (c: Context) => {
  const rc = (c.env as any)?.requestContext;
  return rc?.http?.sourceIp ?? rc?.identity?.sourceIp;
};

const { app } = createNodeApp(getClientIp);

export const handler = handle(app);
