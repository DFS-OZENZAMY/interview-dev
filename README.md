# interview-dev

API d'entretien d'embauche simulé : « Lina », une recruteuse IA, pose les questions une par une, puis un évaluateur génère un rapport noté à la fin.

Stack : Node.js, Hono, Groq (LLM), Redis (sessions), Postgres (prévu pour l'historique).

## Démarrage

```bash
cp .env.example .env        # puis renseigner GROQ_API_KEY
docker compose up -d        # Postgres + Redis
cd apps/api
pnpm install
pnpm dev                    # http://localhost:3000
```

## Endpoints

Si `API_KEY` est définie, ajouter l'en-tête `x-api-key` à chaque appel sur `/interview/*`.

`GET /health` vérifie que l'API et Redis répondent.

`POST /interview/start` avec `{ "poste": "Développeur backend" }` crée une session et renvoie `{ sessionId, question, index, total }`.

`POST /interview/answer` avec `{ "sessionId": "...", "answer": "..." }` renvoie la question suivante, ou à la fin `{ done: true, closing, report }`. Les réponses sont tronquées à 200 mots (`truncated: true` le signale).

`GET /interview/:id` renvoie l'état d'une session et son rapport s'il existe.

Codes d'erreur : 400 (entrée invalide), 401 (clé d'API), 404 (session introuvable ou expirée), 409 (une réponse est déjà en cours pour cette session), 429 (trop de requêtes).

## Configuration

Voir `.env.example`. Les sessions expirent après `SESSION_TTL_SECONDS` (2 h par défaut).
