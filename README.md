# interview-dev

API d'entretien d'embauche simulé : « Lina », une recruteuse IA, pose les questions une par une, puis un évaluateur génère un rapport noté à la fin.

Stack : TypeScript, Hono, Groq (ou toute API compatible OpenAI), Redis / Upstash pour les sessions.

L'API est **sans état** : toutes les sessions sont dans le stockage externe. Elle peut donc tourner sur plusieurs instances, en serverless, ou sur un seul serveur.

## Démarrage local

Le plus rapide, sans Redis (sessions en mémoire, perdues au redémarrage) :

```bash
cd apps/api
pnpm install
GROQ_API_KEY=gsk_... pnpm dev        # http://localhost:3000
```

Avec Redis, comme en production :

```bash
cp .env.example .env                 # renseigner GROQ_API_KEY
docker compose up -d redis
cd apps/api && pnpm install && pnpm dev
```

Tout en conteneurs (API + Redis + Postgres) : `docker compose up -d --build`.

## Où déployer

| Plateforme | Comment | Stockage conseillé |
|---|---|---|
| VPS, Docker, Render, Railway, Fly.io, Koyeb | `Dockerfile` (ou `pnpm build` puis `pnpm start`) | Redis ou Upstash |
| Google Cloud Run | `gcloud run deploy --source apps/api` (utilise le Dockerfile) | Upstash, ou Memorystore via VPC |
| AWS ECS / Fargate, App Runner, Beanstalk | image du `Dockerfile` | ElastiCache (même VPC) ou Upstash |
| AWS Lambda | `pnpm build:lambda`, zipper `dist/lambda`, handler `index.handler` | Upstash, ou ElastiCache (Lambda dans le VPC) |
| Vercel | importer le repo avec *Root Directory* = `apps/api` (détection Hono automatique via `src/index.ts`) | Upstash |
| Netlify | *Base directory* = `apps/api` (lit `netlify.toml`) | Upstash |
| Cloudflare Workers | `pnpm deploy:worker` (lit `wrangler.toml`) | **Upstash obligatoire** (pas de Redis TCP) |
| Azure Container Apps, Kubernetes, etc. | image du `Dockerfile` | Redis ou Upstash |

Sur chaque plateforme, définir au minimum `GROQ_API_KEY` et le stockage (`REDIS_URL` ou `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`). Voir `.env.example` pour toutes les variables.

Points d'attention :

- **Serveur Node derrière un proxy** (load balancer, Nginx, Cloud Run, Render…) : définir `TRUST_PROXY_HOPS` (souvent `1`), sinon tous les clients partagent la même limite de requêtes. Sur Vercel, Netlify, Lambda et Workers, l'IP réelle est lue automatiquement.
- **Durée d'exécution** : la génération du rapport peut prendre plusieurs dizaines de secondes. Sur Lambda, régler le timeout à 60 s minimum ; derrière API Gateway (limite 30 s), préférer une Function URL ou baisser `LLM_TIMEOUT_MS`.
- **Stockage en mémoire** : uniquement pour le développement local, un avertissement s'affiche au démarrage.

## Structure

```
apps/api/
  prompts/        instructions de Lina et de l'évaluateur, en Markdown (voir prompts/README.md)
  scripts/        build-prompts.mjs : convertit prompts/*.md en code TypeScript typé
  src/core/       logique portable (Hono, zod, fetch) : aucun accès Node
  src/core/prompts/  moteur de gabarits, tests et fichier généré
  src/node/       Redis TCP (ioredis) et démarrage pour les runtimes Node
  src/entries/    node.ts (serveur), lambda.ts, worker.ts
  src/index.ts    point d'entrée Vercel
  netlify/        point d'entrée Netlify
```

## Endpoints

Si `API_KEY` est définie, ajouter l'en-tête `x-api-key` à chaque appel sur `/interview/*`.

`GET /health` vérifie que l'API et le stockage répondent.

`POST /interview/start` avec `{ "poste": "Développeur backend" }` crée une session et renvoie `{ sessionId, question, index, total }`.

`POST /interview/answer` avec `{ "sessionId": "...", "answer": "..." }` renvoie la question suivante, ou à la fin `{ done: true, closing, report }`. Les réponses sont tronquées à 200 mots (`truncated: true` le signale).

`GET /interview/:id` renvoie l'état d'une session et son rapport s'il existe.

Codes d'erreur : 400 (entrée invalide), 401 (clé d'API), 404 (session introuvable ou expirée), 409 (une réponse est déjà en cours pour cette session), 429 (trop de requêtes).
