# La voix de Lina

Lina parle au candidat grâce à la **synthèse vocale** (TTS), et l'écoute grâce à la **transcription** (STT). Les deux se configurent dans le `.env`, sans toucher au code.

## Choisir la voix

La variable `TTS_PROVIDER` choisit le moteur de synthèse :

| Valeur | Moteur | Coût | Remarques |
|---|---|---|---|
| `piper` | [Piper](https://github.com/OHF-Voice/piper1-gpl), voix du catalogue [PiperHub](https://piperhub.org) | Gratuit | Tourne en local dans le service `apps/piper`. Valeur par défaut du `.env.example`. |
| `elevenlabs` | [ElevenLabs](https://elevenlabs.io) | Payant | Voix les plus naturelles, diffusées en streaming. |
| `openai` | OpenAI, ou tout service compatible (`OPENAI_BASE_URL`) | Payant | Le modèle `gpt-4o-mini-tts` reçoit des consignes de ton. |
| `browser` | Voix intégrée au navigateur | Gratuit | Qualité variable selon le système. |
| `none` | Aucune voix | Gratuit | Les questions s'affichent seulement à l'écran. |
| `auto` | Le premier disponible : ElevenLabs, puis OpenAI, puis Piper, puis navigateur | | Pratique quand on change souvent de configuration. |

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
