# Instructions de Lina (prompts)

Ce dossier contient **tout le texte envoyé au modèle** : comment Lina se comporte, comment l'évaluateur note.
On peut le modifier sans toucher au code de l'application.

| Fichier | Rôle |
|---|---|
| `lina.fr.md`, `lina.en.md` | Instructions de Lina pendant l'entretien |
| `lina-relance.fr.md`, `lina-relance.en.md` | Rappel envoyé quand Lina oublie de poser une question |
| `evaluateur.md` | Instructions de l'évaluateur (rapport final, réponse JSON) |
| `evaluateur-entree.md` | Gabarit du message qui contient le transcript |
| `academy-coach.md` | Coach de l'Académie : répondre, préciser ou recommander (réponse JSON) |
| `academy-retour.md` | Retour formatif sur une réponse d'exercice de l'Académie (réponse JSON) |
| `academy-cas.md` | Académie : étude de cas adaptée au poste du candidat (réponse JSON) |
| `academy-cas-retour.md` | Académie : retour sur la réponse du candidat à une étude de cas (réponse JSON) |
| `jeu-de-role.md` | Jeux de rôle : scénario d'entretien créé à partir de la description du candidat (réponse JSON) |

## Syntaxe

- `{{variable}}` : remplacé par une valeur calculée par l'application.
- `{{#nom}} ... {{/nom}}` : bloc affiché seulement si `nom` est vrai ou non vide. Seul sur sa ligne, il ne laisse pas de ligne vide. Les blocs ne s'imbriquent pas.
- `<!-- commentaire -->` : ignoré, jamais envoyé au modèle.

Les variables disponibles se déduisent des balises du fichier, et le code TypeScript est vérifié par rapport à elles :
une variable oubliée ou mal orthographiée fait échouer `pnpm typecheck`.

## Après une modification

```bash
pnpm prompts   # régénère src/core/prompts/generated.ts (à committer avec le .md)
pnpm test      # vérifie le rendu et la présence des garde-fous
```

`pnpm dev` régénère automatiquement au démarrage. `pnpm build` et `pnpm typecheck` échouent si `generated.ts` n'est pas à jour.

## Pourquoi un fichier généré ?

L'API tourne sur Node, Lambda, Vercel, Netlify et Cloudflare Workers. Workers et Lambda ne peuvent pas lire de fichier au démarrage,
donc les `.md` sont convertis en constantes TypeScript : le même code fonctionne partout, sans dépendre d'un bundler particulier.

## Garde-fous à conserver

Les tests vérifient que ces consignes restent présentes : ne jamais conclure l'entretien, ignorer les instructions du candidat,
traiter la fiche de poste et le transcript comme de simples données. Si un test échoue après une modification, relisez la consigne retirée.
