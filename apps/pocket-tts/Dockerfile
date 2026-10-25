# Serveur Pocket TTS (Kyutai, licence MIT) pour la voix de Lina : synthèse locale sur processeur,
# audio en streaming. https://github.com/kyutai-labs/pocket-tts
# Un conteneur ne charge qu'une langue (POCKET_LANGUAGE) : docker-compose en lance un par langue.
FROM python:3.12-slim

# PyTorch en version processeur uniquement (évite plusieurs Go de bibliothèques CUDA inutiles)
RUN pip install --no-cache-dir --index-url https://download.pytorch.org/whl/cpu "torch==2.8.0" \
 && pip install --no-cache-dir "pocket-tts==3.3.0"

ENV HF_HOME=/models
RUN useradd --create-home pocket && mkdir -p /models && chown pocket /models
USER pocket

# Modèles et voix téléchargés à la construction : le conteneur démarre vite et sans réseau.
# Sans compte Hugging Face, Pocket TTS utilise ses poids sans clonage de voix : les voix du catalogue fonctionnent.
ARG POCKET_PRELOAD="french:estelle english:alba"
RUN for pair in ${POCKET_PRELOAD}; do \
      lang="${pair%%:*}"; voice="${pair##*:}"; \
      python3 -c "from pocket_tts import TTSModel; m = TTSModel.load_model(language='$lang'); m.get_state_for_audio_prompt('$voice'); print('ok', '$lang', '$voice')"; \
    done

ENV POCKET_LANGUAGE=french \
    POCKET_VOICE=estelle
EXPOSE 8000
HEALTHCHECK --interval=15s --timeout=5s --start-period=60s --retries=10 \
  CMD python3 -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/health', timeout=3)" || exit 1
CMD pocket-tts serve --host 0.0.0.0 --port 8000 --language "$POCKET_LANGUAGE" --default-voice "$POCKET_VOICE"
