# Serveur de synthèse vocale Piper pour la voix de Lina (gratuit, local, sans clé d'API).
# Catalogue des voix : https://piperhub.org
FROM python:3.12-slim

# piper-tts 1.8.0 (OHF-Voice/piper1-gpl) avec son serveur HTTP (Flask)
RUN pip install --no-cache-dir "piper-tts[http]==1.8.0"

# Voix officielles téléchargées à la construction de l'image.
# Par défaut : Siwis (française) et HFC Female (anglaise), deux voix féminines sous licence libre.
ARG PIPER_VOICES="fr_FR-siwis-medium en_US-hfc_female-medium"
RUN mkdir -p /voices/custom \
 && python3 -m piper.download_voices --data-dir /voices ${PIPER_VOICES}

# Voix par défaut chargée au démarrage ; les autres sont chargées à la première demande.
ENV PIPER_DEFAULT_VOICE=fr_FR-siwis-medium
EXPOSE 5000
RUN useradd --create-home piper
USER piper
WORKDIR /home/piper

# /voices/custom : dossier monté pour ajouter des voix du catalogue PiperHub (.onnx + .onnx.json)
CMD python3 -m piper.http_server --host 0.0.0.0 --port 5000 \
    --data-dir /voices --data-dir /voices/custom -m "$PIPER_DEFAULT_VOICE"
