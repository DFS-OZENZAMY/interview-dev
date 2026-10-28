# La voix de Lina

Lina parle au candidat grâce à la **synthèse vocale** (TTS), et l'écoute grâce à la **transcription** (STT). Les deux se configurent dans le `.env`, sans toucher au code.

## Choisir la voix

La variable `TTS_PROVIDER` choisit le moteur de synthèse :

| Valeur | Moteur | Coût | Remarques |
|---|---|---|---|
| `piper` | [Piper](https://github.com/OHF-Voice/piper1-gpl), voix du catalogue [PiperHub](https://piperhub.org) | Gratuit | Tourne en local dans le service `apps/piper`. Valeur par défaut du `.env.example`. |
| `kokoro` | [Kokoro](https://github.com/remsky/Kokoro-FastAPI) via Kokoro-FastAPI | Gratuit | Voix française `ff_siwis`, comparée par Achraf dans son laboratoire vocal. Tourne en local (profil Docker `kokoro`). |
| `pocket` | [Pocket TTS](https://github.com/kyutai-labs/pocket-tts) de Kyutai | Gratuit | Voix plus naturelles que Piper, en streaming. Tourne en local dans `apps/pocket-tts` (plus lourd). |
| `elevenlabs` | [ElevenLabs](https://elevenlabs.io) | Payant | Voix les plus naturelles, diffusées en streaming. |
| `openai` | OpenAI, ou tout service compatible (`OPENAI_BASE_URL`) | Payant | Le modèle `gpt-4o-mini-tts` reçoit des consignes de ton. |
| `browser` | Voix intégrée au navigateur | Gratuit | Qualité variable selon le système. |
| `none` | Aucune voix | Gratuit | Les questions s'affichent seulement à l'écran. |
| `auto` | Le premier disponible : ElevenLabs, puis OpenAI, puis Piper, puis navigateur | | Pratique quand on change souvent de configuration. Ne choisit jamais Pocket TTS, qui doit être demandé explicitement. |

Si le moteur choisi échoue pendant un entretien (service arrêté, quota dépassé), Lina bascule automatiquement sur la voix du navigateur pour ne pas interrompre la conversation.

Le texte prononcé par Lina vient toujours du serveur (la question en cours ou une phrase fixe), jamais du navigateur : personne ne peut utiliser votre fournisseur de voix pour lui faire lire autre chose. Les phrases fixes (introduction et conclusion) sont mises en cache et ne sont générées qu'une fois.

## Piper (par défaut)

Piper est un moteur de synthèse vocale libre qui fonctionne sans connexion à un service payant. Le service `apps/piper` utilise le serveur HTTP officiel du paquet `piper-tts`.

### Voix par défaut

| Langue | Voix | Variable | Licence |
|---|---|---|---|
| Français | [Siwis](https://piperhub.org/model/siwis-french-fr-medium/), voix féminine, modèle officiel Piper | `PIPER_VOICE_FR=fr_FR-siwis-medium` | MIT |
| Anglais | [HFC Female](https://piperhub.org/model/hfc-female-english-us-medium/), voix féminine, modèle officiel Piper | `PIPER_VOICE_EN=en_US-hfc_female-medium` | Voir sa fiche PiperHub |

### Démarrer Piper

```bash
docker compose up -d piper
```

La première construction télécharge les voix (quelques dizaines de Mo par voix) : elle demande un accès à Internet. Le service écoute ensuite sur `http://localhost:5000`. Pour tester une voix directement : ouvrez cette adresse dans le navigateur, le serveur Piper fournit une page d'essai.

Dans le `.env` :

```
TTS_PROVIDER=piper
PIPER_URL=http://localhost:5000
```

Avec `docker compose up -d --build` (API comprise), l'API trouve Piper toute seule à l'adresse `http://piper:5000`.

### Changer de voix

**Une voix officielle Piper** (badge « Official Piper model » sur PiperHub) : ajoutez son identifiant à `PIPER_VOICES`, choisissez-la dans `PIPER_VOICE_FR` ou `PIPER_VOICE_EN`, puis reconstruisez :

```
PIPER_VOICES=fr_FR-siwis-medium fr_FR-upmc-medium en_US-hfc_female-medium
PIPER_VOICE_FR=fr_FR-upmc-medium
```

```bash
docker compose up -d --build piper api
```

L'identifiant se lit dans l'adresse du fichier `model.onnx` de la fiche PiperHub, par exemple `fr_FR-siwis-medium`.

**Une autre voix du catalogue PiperHub** : téléchargez les deux fichiers de sa fiche (`model.onnx` et `model.onnx.json`), renommez-les avec le même nom (par exemple `ma-voix.onnx` et `ma-voix.onnx.json`), placez-les dans `apps/piper/voices/`, puis :

```
PIPER_VOICE_FR=ma-voix
```

```bash
docker compose restart piper api
```

Vérifiez la licence de chaque voix sur sa fiche PiperHub avant un usage commercial : elles varient d'un modèle à l'autre.

**Le débit** : `PIPER_LENGTH_SCALE=1.1` ralentit légèrement Lina pour un ton plus posé (1 = débit normal).

### Héberger Piper en production

Le service Piper est une image Docker : il se déploie sur toute plateforme à conteneurs (Cloud Run, Fly.io, Render, Railway, ECS, un VPS…). Indiquez ensuite son adresse dans `PIPER_URL` côté API. Le serveur Piper n'a pas d'authentification : gardez-le sur un réseau privé (même réseau Docker, VPC) plutôt que de l'exposer publiquement. Comptez environ 1 Go de mémoire.

## Pocket TTS (Kyutai)

[Pocket TTS](https://github.com/kyutai-labs/pocket-tts) est un modèle de synthèse vocale de Kyutai, sous licence MIT, conçu pour tourner sur un simple processeur.

### Ce qu'il apporte

- **Des voix plus naturelles** que Piper, avec des intonations proches de la parole réelle.
- **Le streaming** : le premier son arrive en environ 200 ms, avant même que la phrase soit entièrement générée. Lina enchaîne donc plus vite après votre réponse.
- **Un fonctionnement local et gratuit**, sans clé d'API : un petit modèle (100 millions de paramètres) qui utilise 2 cœurs de processeur et va plus vite que le temps réel.
- **Le clonage de voix** : quelques secondes d'enregistrement suffisent pour donner à Lina la voix de votre choix (voir plus bas).
- **Plusieurs langues** : anglais, français, allemand, italien, espagnol, portugais. La plateforme utilise le français et l'anglais.

En contrepartie, il est plus lourd que Piper : l'image contient PyTorch (environ 1 Go), et chaque langue tourne dans son propre conteneur. C'est pourquoi il est en option.

### Voix par défaut

| Langue | Voix | Conteneur | Adresse locale |
|---|---|---|---|
| Français | **Estelle**, voix féminine (voix par défaut du modèle français) | `pocket-fr` | `http://127.0.0.1:8001` |
| Anglais | **Alba**, voix féminine (voix par défaut du modèle anglais) | `pocket-en` | `http://127.0.0.1:8002` |

### L'activer

1. Dans le `.env` :

   ```
   TTS_PROVIDER=pocket
   ```

2. Construire et lancer les deux conteneurs (profil `pocket`, non lancé par défaut) :

   ```bash
   docker compose --profile pocket up -d --build
   ```

   La première construction télécharge PyTorch et les modèles : comptez plusieurs minutes. Attendez que `pocket-fr` et `pocket-en` soient « healthy » (`docker compose ps`).

3. Redémarrer l'API pour qu'elle prenne en compte le changement de voix :
   - tout en Docker : `docker compose up -d api` ;
   - avec `pnpm dev` : relancez la commande. Le `.env.example` contient déjà les adresses locales (`POCKET_TTS_URL_FR`, `POCKET_TTS_URL_EN`).

L'écran de préparation affiche alors « Voix Pocket TTS : Estelle ». Pour revenir à Piper : `TTS_PROVIDER=piper`, puis redémarrez l'API. Vous pouvez arrêter les conteneurs Pocket avec `docker compose --profile pocket stop pocket-fr pocket-en`.

Une seule langue suffit si vous n'utilisez que le français : laissez `POCKET_TTS_URL_EN` vide et lancez seulement `docker compose --profile pocket up -d pocket-fr`. Les entretiens en anglais utiliseront alors la voix du navigateur.

### Changer de voix

**Une autre voix du catalogue** : le [catalogue Pocket TTS](https://github.com/kyutai-labs/pocket-tts#the-generate-command) propose surtout des voix anglaises (par exemple `anna`, `eve`, `jane`, `mary`, `vera`, `fantine` pour des voix féminines). Indiquez son nom :

```
POCKET_TTS_VOICE_EN=jane
```

puis `docker compose --profile pocket up -d` et redémarrez l'API. Les licences de chaque voix sont détaillées sur [huggingface.co/kyutai/tts-voices](https://huggingface.co/kyutai/tts-voices).

**Cloner une voix** à partir d'un enregistrement (fichier `.wav`, quelques secondes de parole claire) :

1. Le modèle avec clonage nécessite d'accepter ses conditions sur [huggingface.co/kyutai/pocket-tts](https://huggingface.co/kyutai/pocket-tts), puis de créer un jeton d'accès Hugging Face et de l'indiquer dans `HF_TOKEN`.
2. Indiquez l'adresse de l'enregistrement, par exemple une voix du dépôt public de Kyutai :

   ```
   POCKET_TTS_VOICE_FR=hf://kyutai/tts-voices/unmute-prod-website/developpeuse-3.wav
   ```

3. Recréez les conteneurs Pocket (`docker compose --profile pocket up -d`) : au démarrage, ils téléchargent le modèle avec clonage grâce à `HF_TOKEN` (accès Internet nécessaire). Redémarrez ensuite l'API.

Kyutai interdit de cloner la voix d'une personne sans son accord explicite. N'utilisez que votre propre voix, une voix dont vous avez l'autorisation ou une voix du dépôt public.

### Héberger Pocket TTS en production

Comme Piper, chaque conteneur se déploie sur une plateforme à conteneurs (Cloud Run, Fly.io, Render, ECS, un VPS…). Prévoyez 2 cœurs et environ 1 Go de mémoire par langue. Indiquez les adresses dans `POCKET_TTS_URL_FR` et `POCKET_TTS_URL_EN`, et gardez ces services sur un réseau privé : ils n'ont pas d'authentification.

## Kokoro

Achraf a comparé, dans son laboratoire vocal, la voix du navigateur et la voix française **`ff_siwis`** de Kokoro (un modèle de 82 millions de paramètres, licence Apache 2.0). Il a retenu le réglage « naturel » : vitesse **0,98**. La plateforme reprend ces choix par défaut.

Kokoro est servi par [Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI), qui expose une API compatible OpenAI. L'image utilisée est figée en version `v0.9.0`.

1. Dans le `.env` :

   ```
   TTS_PROVIDER=kokoro
   KOKORO_URL=http://127.0.0.1:8880
   ```

2. Lancer le service (profil `kokoro`, non lancé par défaut) : `docker compose --profile kokoro up -d`. Au premier démarrage, le modèle se télécharge.
3. Redémarrer l'API (`docker compose up -d api`, ou relancer `pnpm dev`).

Réglages : `KOKORO_VOICE_FR` (défaut `ff_siwis`), `KOKORO_VOICE_EN` (défaut `af_heart`), `KOKORO_SPEED` (défaut `0.98`). Comme pour Pocket TTS, Kokoro n'est jamais choisi en mode `auto`.

Achraf a aussi testé une prononciation « manageur » pour le mot « manager ». Il la signale comme non validée : elle n'est pas appliquée.

## ElevenLabs

```
TTS_PROVIDER=elevenlabs
ELEVENLABS_API_KEY=votre_clé
ELEVENLABS_VOICE_ID=identifiant_de_la_voix
ELEVENLABS_MODEL=eleven_flash_v2_5
```

L'identifiant de voix se trouve dans votre bibliothèque ElevenLabs. Le modèle `eleven_flash_v2_5` est le plus rapide, ce qui rend la conversation plus fluide.

## OpenAI ou service compatible

```
TTS_PROVIDER=openai
OPENAI_API_KEY=votre_clé
OPENAI_TTS_VOICE=coral
```

`OPENAI_BASE_URL` permet de pointer vers tout service qui expose la même API (`/audio/speech`).

## Écouter le candidat

La variable `STT_PROVIDER` choisit la transcription :

| Valeur | Moteur |
|---|---|
| `auto` (par défaut) | Whisper via Groq, avec la même clé que le LLM |
| `groq` | Idem, explicitement |
| `openai` | Whisper via OpenAI (`OPENAI_API_KEY`) |
| `browser` | Dictée intégrée au navigateur (Chrome, Edge, Safari) |

En mode **mains libres**, la réponse est envoyée automatiquement quand le candidat marque une pause d'environ deux secondes. En **mode manuel**, il clique sur « J'ai terminé ».

## Sans micro

Le candidat peut passer un entretien sur un poste sans micro. L'application le détecte et bascule automatiquement en réponses écrites :

- dès la préparation, un bandeau indique « Aucun micro détecté : réponses par écrit » ;
- pendant l'entretien, Lina continue de poser ses questions à voix haute, et le candidat répond dans une zone de texte (Ctrl + Entrée pour envoyer) ;
- si le micro est refusé ou utilisé par une autre application, un bouton « Répondre à l’oral » permet de réessayer ;
- si un micro est branché pendant l'entretien, il est détecté et le candidat peut repasser à l'oral ;
- si le micro est débranché ou cesse de fonctionner, l'entretien bascule à l'écrit sans perdre la question en cours.
