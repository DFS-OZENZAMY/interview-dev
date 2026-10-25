# interview-dev

Simulateur d'entretien d'embauche à l'oral. **Lina**, une recruteuse IA, pose ses questions à voix haute, écoute les réponses du candidat, puis un évaluateur rédige un bilan noté avec des conseils concrets.

Le parcours candidat et le design reprennent ceux d'[ai-interview-platform](https://github.com/Achrafsila/ai-interview-platform) : accueil, profil, tableau de bord, préparation en trois étapes, entretien vocal immersif, analyse et bilan.

## Ce que fait l'application

- Entretiens **RH ou techniques**, en **français ou en anglais**, adaptés au poste visé, à la fiche de poste (facultative) et aux objectifs du candidat.
- Séances de **10, 20 ou 35 minutes** (4, 7 ou 10 questions).
- Conversation **mains libres** : Lina parle, le candidat répond à voix haute, et sa réponse part automatiquement après une pause de deux secondes. Il peut aussi l'interrompre, réécouter une question, mettre en pause ou répondre par écrit.
- **Sans micro** (poste de bureau par exemple), l'entretien bascule automatiquement en réponses écrites, et Lina continue de parler.
- **Bilan** : score sur 100, note par critère (clarté, pertinence, exemples, structure, motivation), points forts, axes de progrès, conseils et priorité pour la séance suivante.
- **Historique** et progression dans le tableau de bord (enregistrés dans le navigateur, sans compte).

## Structure

```
apps/
  api/      API Hono portable (Node, Docker, Vercel, Lambda, Netlify, Cloudflare Workers)
    prompts/        instructions de Lina et de l'évaluateur, en Markdown (voir prompts/README.md)
    scripts/        build-prompts.mjs : convertit prompts/*.md en code TypeScript typé
    src/core/       logique commune : entretien, voix, stockage (uniquement fetch)
    src/core/prompts/  moteur de gabarits, tests et fichier généré
    src/node/       Redis TCP et démarrage pour les runtimes Node
    src/entries/    node.ts (serveur), lambda.ts, worker.ts
    src/index.ts    point d'entrée Vercel
  web/      front React + Vite + Tailwind (site statique)
  piper/    service de synthèse vocale Piper (voix gratuites et locales)
docs/
  VOIX.md              guide complet de la voix et du micro
  CONFIGURER-LINA.md   personnaliser le comportement et les questions de Lina
```

## Démarrage local

Prérequis : Node.js 20 ou plus, pnpm, Docker (pour Redis et Piper), et une clé [Groq](https://console.groq.com).

```bash
cp .env.example .env          # renseigner GROQ_API_KEY
docker compose up -d redis piper
```

La première construction de Piper télécharge les voix de Lina : comptez quelques minutes.

Puis, dans deux terminaux :

```bash
cd apps/api && pnpm install && pnpm dev     # API sur http://localhost:3000
```

```bash
cd apps/web && pnpm install && pnpm dev     # application sur http://localhost:5173
```

En local, le front transmet les appels `/api` à l'API : rien d'autre à configurer.

Pour un essai rapide sans Docker ni fichier `.env` : lancez seulement l’API avec `GROQ_API_KEY=gsk_... pnpm dev` (sessions en mémoire, voix du navigateur), puis le front.

Tout en conteneurs (API, Piper, Redis, Postgres) : `docker compose up -d --build`, puis lancez le front avec `pnpm dev`.

## La voix de Lina

Par défaut, Lina parle avec **Piper**, un moteur de synthèse vocale libre et gratuit, et une voix féminine du catalogue [PiperHub](https://piperhub.org) :

- **Siwis** en français (`fr_FR-siwis-medium`) ;
- **HFC Female** en anglais (`en_US-hfc_female-medium`).

Le fournisseur se change dans le `.env`, sans toucher au code :

```
TTS_PROVIDER=piper          # piper, elevenlabs, openai, browser, none ou auto
PIPER_VOICE_FR=fr_FR-siwis-medium
```

Pour ElevenLabs :

```
TTS_PROVIDER=elevenlabs
ELEVENLABS_API_KEY=votre_clé
ELEVENLABS_VOICE_ID=identifiant_de_la_voix
```

Les réponses du candidat sont transcrites par Whisper via Groq (même clé que le LLM), ou par la dictée du navigateur.

Ajouter une voix PiperHub, régler le débit, héberger Piper, comportement sans micro : tout est détaillé dans **[docs/VOIX.md](docs/VOIX.md)**. Pour modifier la façon dont Lina mène l'entretien (ton, relances, questions), voir **[docs/CONFIGURER-LINA.md](docs/CONFIGURER-LINA.md)**.

## Déployer

### L'API

L'API est **sans état** : les sessions vivent dans Redis ou Upstash. Elle tourne donc sur une ou plusieurs instances, ou en serverless.

| Plateforme | Comment | Stockage conseillé |
|---|---|---|
| VPS, Docker, Render, Railway, Fly.io, Koyeb | `apps/api/Dockerfile` (ou `pnpm build` puis `pnpm start`) | Redis ou Upstash |
| Google Cloud Run | `gcloud run deploy --source apps/api` | Upstash, ou Memorystore via VPC |
| AWS ECS / Fargate, App Runner, Beanstalk | image du `Dockerfile` | ElastiCache (même VPC) ou Upstash |
| AWS Lambda | `pnpm build:lambda`, zipper `dist/lambda`, handler `index.handler` | Upstash, ou ElastiCache (Lambda dans le VPC) |
| Vercel | *Root Directory* = `apps/api` (Hono détecté via `src/index.ts`) | Upstash |
| Netlify | *Base directory* = `apps/api` (lit `netlify.toml`) | Upstash |
| Cloudflare Workers | `pnpm deploy:worker` (lit `wrangler.toml`) | **Upstash obligatoire** |
| Azure Container Apps, Kubernetes… | image du `Dockerfile` | Redis ou Upstash |

À définir au minimum : `GROQ_API_KEY` et le stockage (`REDIS_URL`, ou `UPSTASH_REDIS_REST_URL` et `UPSTASH_REDIS_REST_TOKEN`). Toutes les variables sont décrites dans `.env.example`.

Points d'attention :

- **Derrière un proxy** (load balancer, Nginx, Cloud Run, Render…), définir `TRUST_PROXY_HOPS` (souvent `1`), sinon tous les candidats partagent la même limite de requêtes. Sur Vercel, Netlify, Lambda et Workers, l'adresse réelle est lue automatiquement.
- **Durée d'exécution** : la génération du bilan peut prendre plusieurs dizaines de secondes. Sur Lambda, régler le timeout à 60 s minimum.
- **Stockage en mémoire** : réservé au développement local, un avertissement s'affiche au démarrage.

### Piper

Piper est une image Docker (`apps/piper`) : il se déploie sur toute plateforme à conteneurs. Indiquez son adresse dans `PIPER_URL` côté API, et gardez-le sur un réseau privé (il n'a pas d'authentification). Sur une plateforme sans conteneurs, utilisez plutôt ElevenLabs, OpenAI ou la voix du navigateur.

### Le front

`apps/web` produit un site statique (`pnpm build`, dossier `dist`), hébergeable sur Vercel, Netlify, Cloudflare Pages, S3, Nginx… Les fichiers `vercel.json` et `public/_redirects` gèrent le rechargement des pages.

Si l'API est sur un autre domaine que le front :

- côté front, à la construction : `VITE_API_URL=https://api.mon-domaine.com` ;
- côté API : `CORS_ORIGINS=https://mon-front.com`.

## Dépannage

**`[redis] … injoignable (ETIMEDOUT)` ou `(ECONNREFUSED)` au démarrage.** L'API n'arrive pas à joindre Redis. En local, elle l'explique et continue avec un stockage en mémoire, ce qui suffit pour développer. Pour utiliser Redis :

1. Lancez-le : `docker compose up -d redis`, puis vérifiez qu'il apparaît comme « healthy » avec `docker compose ps`. Si la commande échoue, regardez si un autre service n'a pas bloqué le démarrage (par exemple la construction de Piper : lancez alors `docker compose up -d redis` seul).
2. Dans le `.env`, utilisez `REDIS_URL=redis://127.0.0.1:6379`. L'adresse `redis://redis:6379` ne fonctionne qu'entre conteneurs docker compose.
3. **Sous WSL avec Docker Desktop**, si `docker compose ps` montre les conteneurs « healthy » sur `127.0.0.1:PORT` mais que l'API reçoit `ETIMEDOUT` : les ports publiés sur `127.0.0.1` sont ouverts côté Windows et injoignables depuis WSL. Ajoutez `DOCKER_BIND_ADDRESS=0.0.0.0` dans le `.env`, puis recréez les conteneurs : `docker compose up -d redis piper`. Les ports deviennent alors visibles depuis votre réseau local : le pare-feu Windows les bloque normalement, mais n'utilisez pas ce réglage sur un serveur exposé.

**`[voix] Piper ne répond pas`.** Même diagnostic que pour Redis (`docker compose ps`, `docker compose logs piper`, réglage WSL ci-dessus). En attendant, Lina parle avec la voix du navigateur, et l'API reprend Piper toute seule dès qu'il répond (vérification toutes les 15 secondes).

En production (`NODE_ENV=production`), l'API refuse de démarrer sans Redis plutôt que de perdre les sessions en silence.

**L'API refuse de démarrer avec `TTS_PROVIDER=openai nécessite OPENAI_API_KEY`.** Votre `.env` vient d'une ancienne version : remplacez cette ligne par `TTS_PROVIDER=piper` (ou supprimez-la).

## Endpoints de l'API

`GET /health` : état de l'API et du stockage.

`GET /voice/config` : fournisseurs de voix et de transcription actifs, phrases fixes de Lina.

`GET /voice/phrase/:name?locale=fr` : audio de l'introduction (`intro`) ou de la conclusion (`closing`).

`POST /interview/start` : crée un entretien. Corps : `{ poste, type: "rh" | "technique", locale: "fr" | "en", description?, objectifs?, experience?, questions? }`. Renvoie `{ sessionId, question, index, total }`.

`POST /interview/answer` avec `{ sessionId, answer }` : renvoie la question suivante, ou à la fin `{ done: true, closing, report }`. Les réponses sont limitées à 250 mots (`truncated: true` le signale).

`GET /interview/:id/speech` : audio de la question en cours, prononcée par Lina.

`POST /interview/:id/transcribe` (formulaire avec un champ `audio`, 8 Mo maximum) : transcription d'une réponse orale.

`POST /interview/:id/finish` : termine l'entretien avant la fin, avec un bilan sur les réponses déjà données.

`GET /interview/:id` : état de l'entretien et bilan s'il existe.

Si `API_KEY` est définie, chaque appel à `/interview/*` et `/voice/phrase/*` doit envoyer l'en-tête `x-api-key` : à réserver aux appels serveur à serveur, le front web ne l'envoie pas.

Codes d'erreur : 400 (entrée invalide), 401 (clé d'API), 404 (session introuvable ou expirée), 409 (réponse déjà en cours, ou entretien terminé), 413 (audio trop volumineux), 429 (trop de requêtes), 502 (service vocal indisponible).
