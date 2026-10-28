# L'Académie

L'Académie est l'espace d'entraînement entre deux entretiens : un coach conversationnel, 288 exercices guidés et 48 parcours. Elle est reprise du travail d'Achraf SILA sur [ai-interview-platform](https://github.com/Achrafsila/ai-interview-platform) et adaptée à l'architecture de la plateforme, sans compte ni base de données.

## Ce que voit le candidat

- **Le coach** (`/academie`) : le candidat explique ce qu'il veut travailler. Le coach répond à une question de conseil, demande une précision quand le besoin est flou, ou propose un programme d'exercices quand le besoin est clair.
- **Le catalogue** : 288 exercices classés par domaine (pitch, structure, communication, confiance, leadership, négociation…) et par niveau (découverte, approfondissement, mise en situation), avec recherche et filtres.
- **L'atelier d'exercice** (`/academie/exercices/:id`) : consigne, méthode, étapes, réponse écrite, retour du coach (ce qui fonctionne, à renforcer, prochaine tentative), auto-évaluation selon les critères du guide, exemple de formulation et erreurs fréquentes.
- **Les parcours** (`/academie/parcours`) : le programme élaboré avec le coach, trois parcours conseillés selon le profil et le dernier bilan d'entretien (avec leurs raisons), et la bibliothèque des 48 parcours.

L'Académie est reliée au reste de la plateforme : entrée dans la barre latérale, lien depuis le conseil de Lina sur le tableau de bord, et depuis la priorité du bilan d'entretien. Le dernier bilan oriente les recommandations : son critère le plus faible devient le module à travailler en priorité.

## Comment le coach décide

Le coach reprend la logique d'Achraf, avec ses garde-fous :

1. **Demande d'exercice explicite** (« je veux un exercice pour structurer mes réponses ») avec un besoin identifié : le programme est construit par des règles, sans appel au modèle.
2. **Réponses incertaines** (« je ne sais pas ») ou **demandes vagues** (« une difficulté d'expert ») : une question de relance rassurante, sans appel au modèle.
3. **Sinon**, le modèle décide entre `answer`, `clarify` et `recommend`, avec en contexte les guides internes pertinents, les objectifs encore actifs du candidat et ses déclarations précédentes.
4. **Un diagnostic contrôle la recommandation** : un intitulé de poste seul ne prouve aucune lacune, une preuve n'est retenue que si elle cite mot pour mot le candidat, et le modèle ne peut pas ajouter un besoin informatique à un entretien qui n'en relève pas.

Les déclarations sensibles (santé, religion, opinions politiques…) ne sont jamais mémorisées, et le coach ne demande jamais de motif médical pour une interruption de carrière.

## Académie V5 : études de cas et retours

La version 5.1 d'Achraf ajoute une couche qui s'exécute **avant** la conversation habituelle :

- **Routage déterministe** du dernier message (`orchestrator.ts`) : démarrer un cas, répondre à un cas, demander des ressources, demander un entraînement, changer de sujet, ou converser.
- **Études de cas** : « cas pratique », « use case » ou « mise en situation » lancent un cas. Pour un HR Business Partner, le cas (turnover de 18 %) et le premier retour sont rédigés à l'avance, sans appel au modèle. Pour les autres métiers, le modèle construit un cas court adapté au poste (`prompts/academy-cas.md`) ; sans poste connu, le coach le demande.
- **Retour sur chaque réponse** (`prompts/academy-cas-retour.md`) : ce qui fonctionne, ce qu'il faut renforcer, un exemple amélioré et une question de suite. Si une lacune le justifie, un exercice est suggéré, avec un bouton « Enregistrer pour plus tard ».
- **Ressources** : le coach propose de construire des fiches avec le candidat, et n'invente jamais de PDF, de livre ou de lien.
- **Plan enregistré à la demande** : une recommandation affiche « Enregistrer dans mon parcours » et s'ajoute au parcours existant sans le remplacer.
- **Contrat de présentation** (`response-contract.ts`) : chaque réponse indique son type (éclairage, question, étude de cas, retour, parcours, ressources), affiché sous forme d'étiquette ; les réponses sont mises en forme (intertitres, listes, question finale « À vous de jouer »).

Un seul écart avec le code d'origine : le routage reconnaît désormais « exercice » et « exercices » comme une demande d'entraînement. L'expression d'origine (`exercic\b`) ne les acceptait pas.

## Ce qui a été adapté

| Élément | Version d'Achraf | Ici |
|---|---|---|
| Comptes et données | Supabase (conversation, plan, tentatives par compte) | Navigateur du candidat, comme l'historique des entretiens |
| Mémoire du coach | Lue en base à chaque message | Envoyée par le navigateur avec la conversation (20 tours au plus) |
| Base de connaissances | Table Postgres | `apps/api/src/core/academy/content/knowledge.ts` (10 fiches validées ; le brouillon est exclu) |
| Recherche | SQL : plein texte + trigrammes + embeddings optionnels | TypeScript : BM25 + trigrammes, mêmes poids (65 / 35), plus un dictionnaire de synonymes du vocabulaire de l'entretien |
| Embeddings sémantiques | Service Python + pgvector | Non repris : ils demanderaient une base vectorielle. Les synonymes couvrent les cas courants (« trou dans le CV » → interruption de carrière) |
| Limite de requêtes | Quota Postgres par compte | Limite par client de l'API (`RATE_LIMIT_PER_MINUTE`) |

La recherche fonctionne ainsi sur toutes les plateformes de l'API, y compris Cloudflare Workers.

## Où modifier quoi

| Pour changer… | Fichier |
|---|---|
| Le comportement du coach | `apps/api/prompts/academy-coach.md` puis `pnpm prompts` |
| Le retour sur exercice | `apps/api/prompts/academy-retour.md` puis `pnpm prompts` |
| Les exercices, guides, parcours | `apps/api/src/core/academy/content/` (`catalog.ts`, `guides.ts`, `paths.ts`) |
| Les fiches de connaissances | `apps/api/src/core/academy/content/knowledge.ts` |
| Les besoins reconnus et leurs exercices | `apps/api/src/core/academy/synthesis.ts` |
| Les règles du diagnostic, des objectifs, de la mémoire | `diagnostic.ts`, `goals.ts`, `memory.ts` dans le même dossier |
| Les synonymes de la recherche | `apps/api/src/core/academy/retrieval.ts` |

Après une modification : `pnpm test` dans `apps/api`. Les tests reprennent ceux d'Achraf (diagnostic, objectifs, mémoire, recherche) et vérifient les garde-fous du coach avec un modèle simulé.

## API

`GET /academy/catalog` : exercices, parcours et besoins reconnus (mis en cache une heure).

`GET /academy/exercises/:id` : un exercice et son guide.

`POST /academy/coach` avec `{ messages, history?, previousPlan? }` : `messages` = les derniers échanges (11 au plus, le dernier venant du candidat, 5 000 caractères au plus), `history` = la conversation enregistrée (20 au plus), `previousPlan` = les besoins du plan précédent pour une demande de continuation. Réponse : `answer`, `clarify` ou `recommend`.

`POST /academy/feedback` avec `{ exerciseId, answer }` (50 caractères au moins) : `{ strength, improvement, nextAction }`.

Ces routes suivent les mêmes règles que les autres : limite de requêtes, clé d'API si `API_KEY` est définie.
