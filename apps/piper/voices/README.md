# Voix personnalisées

Déposez ici les voix trouvées sur [PiperHub](https://piperhub.org) : pour chaque voix, les deux fichiers `model.onnx` et `model.onnx.json` de sa page « Downloads », renommés avec le même nom (par exemple `ma-voix.onnx` et `ma-voix.onnx.json`).

Ce dossier est monté dans le conteneur Piper (`/voices/custom`). Choisissez ensuite la voix dans le `.env` :

```
PIPER_VOICE_FR=ma-voix
```

puis redémarrez : `docker compose restart piper api`.

Les fichiers `.onnx` ne sont pas versionnés (voir `.gitignore`) : ils pèsent plusieurs dizaines de Mo.
