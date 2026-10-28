/**
 * Voix de Lina : synthèse vocale (TTS) et transcription du candidat (STT).
 * Uniquement fetch, donc compatible avec tous les runtimes (Node, Workers, Lambda…).
 *
 * Pour ajouter un fournisseur : implémenter `TTS` (ou `STT`) et l'ajouter dans selectTTS / selectSTT.
 */
import { ConfigError, type Config } from "./config";
import type { KV } from "./kv";

export type Locale = "fr" | "en";

/** Phrases fixes prononcées par Lina, partagées avec le front via GET /voice/config. */
export const PHRASES = {
  intro: {
    fr: ["Bonjour, je suis Lina, votre recruteuse.", "Votre entretien commencera dans cinq secondes.", "Bonne chance !"],
    en: ["Hello, I'm Lina, your recruiter.", "Your interview will begin in five seconds.", "Good luck!"],
  },
  closing: {
    fr: ["Merci pour cet échange, l'entretien est terminé.", "Je prépare votre bilan."],
    en: ["Thank you for this conversation, the interview is now over.", "I'm preparing your feedback."],
  },
} satisfies Record<string, Record<Locale, string[]>>;
export type PhraseName = keyof typeof PHRASES;

export type Audio = { body: ReadableStream<Uint8Array>; contentType: string };

export interface TTS {
  readonly name: "kokoro" | "pocket" | "piper" | "elevenlabs" | "openai";
  readonly cacheKey: string;
  /** Voix utilisées par langue, quand le fournisseur les expose (Piper). */
  readonly voices?: Record<Locale, string>;
  synthesize(text: string, locale: Locale): Promise<Audio>;
  /** Vérifie rapidement que le service répond (utilisé au démarrage). */
  probe?(): Promise<boolean>;
  /** Adresse(s) du service, pour les messages de diagnostic. */
  readonly endpoint?: string;
}

/** Nom lisible d'un fournisseur, pour les messages. */
export const PROVIDER_LABEL: Record<TTS["name"], string> = {
  kokoro: "Kokoro",
  pocket: "Pocket TTS",
  piper: "Piper",
  elevenlabs: "ElevenLabs",
  openai: "OpenAI",
};

export interface STT {
  readonly name: "groq" | "openai";
  transcribe(audio: Blob, locale: Locale): Promise<string>;
}

export class VoiceProviderError extends Error {
  /** true : le service ne répond pas du tout (adresse, réseau, conteneur arrêté). */
  unreachable = false;
}

const TIMEOUT_MS = 20_000;

/** Transforme une erreur réseau de fetch en message d'une ligne, sans trace. */
function unreachable(provider: string, url: string, e: unknown) {
  const cause = (e as { cause?: { code?: string } })?.cause?.code;
  const reason = cause ?? (e instanceof Error && e.name === "TimeoutError" ? "délai dépassé" : e instanceof Error ? e.message : String(e));
  const err = new VoiceProviderError(`${provider} injoignable à ${url} (${reason})`);
  err.unreachable = true;
  return err;
}

/** fetch qui convertit les erreurs réseau en VoiceProviderError. */
async function providerFetch(provider: string, base: string, url: string, init: RequestInit) {
  try {
    return await fetch(url, init);
  } catch (e) {
    throw unreachable(provider, base, e);
  }
}

async function upstreamError(provider: string, r: Response) {
  const detail = (await r.text().catch(() => "")).slice(0, 300);
  return new VoiceProviderError(`${provider} ${r.status}: ${detail}`);
}

export class ElevenLabsTTS implements TTS {
  readonly name = "elevenlabs" as const;
  readonly cacheKey: string;
  constructor(
    private apiKey: string,
    private voiceId: string,
    private model: string,
    private baseUrl: string,
  ) {
    this.cacheKey = `elevenlabs:${voiceId}:${model}`;
  }

  async synthesize(text: string, locale: Locale): Promise<Audio> {
    const url = `${this.baseUrl.replace(/\/$/, "")}/v1/text-to-speech/${encodeURIComponent(this.voiceId)}/stream?output_format=mp3_44100_128`;
    const r = await providerFetch("ElevenLabs", this.baseUrl, url, {
      method: "POST",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { "xi-api-key": this.apiKey, "Content-Type": "application/json", Accept: "audio/mpeg" },
      body: JSON.stringify({
        text,
        model_id: this.model,
        // Seuls les modèles v2.5 (flash, turbo) acceptent de forcer la langue.
        ...(/_v2_5$/.test(this.model) ? { language_code: locale } : {}),
        voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.15, use_speaker_boost: true },
      }),
    });
    if (!r.ok || !r.body) throw await upstreamError("ElevenLabs", r);
    return { body: r.body, contentType: "audio/mpeg" };
  }
}

export class OpenAITTS implements TTS {
  readonly name = "openai" as const;
  readonly cacheKey: string;
  constructor(
    private apiKey: string,
    private model: string,
    private voice: string,
    private baseUrl: string,
  ) {
    this.cacheKey = `openai:${model}:${voice}`;
  }

  async synthesize(text: string, locale: Locale): Promise<Audio> {
    const r = await providerFetch("OpenAI TTS", this.baseUrl, `${this.baseUrl.replace(/\/$/, "")}/audio/speech`, {
      method: "POST",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { Authorization: `Bearer ${this.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: this.model,
        voice: this.voice,
        input: text,
        response_format: "mp3",
        // Les modèles gpt-4o-*-tts acceptent des consignes de ton.
        ...(this.model.startsWith("gpt-4o")
          ? {
              instructions:
                locale === "fr"
                  ? "Recruteuse francophone chaleureuse et professionnelle. Débit naturel et posé, ton bienveillant et encourageant."
                  : "Warm, professional recruiter. Natural, calm pace with a kind and encouraging tone.",
            }
          : {}),
      }),
    });
    if (!r.ok || !r.body) throw await upstreamError("OpenAI TTS", r);
    return { body: r.body, contentType: r.headers.get("content-type") ?? "audio/mpeg" };
  }
}

/**
 * Piper : synthèse locale et gratuite via le serveur HTTP officiel (piper-tts, POST /synthesize).
 * Une voix par langue ; toute voix du catalogue PiperHub peut être ajoutée au serveur.
 */
export class PiperTTS implements TTS {
  readonly name = "piper" as const;
  readonly cacheKey: string;
  constructor(
    private baseUrl: string,
    readonly voices: Record<Locale, string>,
    private lengthScale?: number,
  ) {
    this.cacheKey = `piper:${voices.fr}:${voices.en}:${lengthScale ?? "defaut"}`;
  }

  voiceFor(locale: Locale) {
    return this.voices[locale];
  }

  get url() {
    return this.baseUrl;
  }

  get endpoint() {
    return this.baseUrl;
  }

  async probe() {
    try {
      const r = await fetch(`${this.baseUrl.replace(/\/$/, "")}/voices`, { signal: AbortSignal.timeout(3_000) });
      return r.ok;
    } catch {
      return false;
    }
  }

  async synthesize(text: string, locale: Locale): Promise<Audio> {
    const r = await providerFetch("Piper", this.baseUrl, `${this.baseUrl.replace(/\/$/, "")}/synthesize`, {
      method: "POST",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        voice: this.voices[locale],
        ...(this.lengthScale ? { length_scale: this.lengthScale } : {}),
      }),
    });
    if (!r.ok || !r.body) throw await upstreamError("Piper", r);
    return { body: r.body, contentType: "audio/wav" };
  }
}

/**
 * Pocket TTS (Kyutai, licence MIT) : synthèse locale sur processeur, audio en streaming
 * (premier son en ~200 ms). Le serveur officiel (`pocket-tts serve`) ne charge qu'une langue :
 * une adresse par langue, chacune avec sa voix (catalogue ou clonage de voix).
 * Contrat : POST /tts, formulaire `text` + `voice_url`, réponse audio/wav en streaming.
 */
export class PocketTTS implements TTS {
  readonly name = "pocket" as const;
  readonly cacheKey: string;
  private urls: Partial<Record<Locale, string>>;

  constructor(
    urls: Partial<Record<Locale, string | undefined>>,
    readonly voices: Record<Locale, string>,
  ) {
    // Seules les langues réellement configurées sont gardées.
    this.urls = Object.fromEntries(Object.entries(urls).filter(([, u]) => Boolean(u))) as Partial<Record<Locale, string>>;
    this.cacheKey = `pocket:${voices.fr}:${voices.en}`;
  }

  get endpoint() {
    return Object.entries(this.urls)
      .map(([l, u]) => `${u} (${l})`)
      .join(", ");
  }

  async synthesize(text: string, locale: Locale): Promise<Audio> {
    const base = this.urls[locale];
    // Langue sans serveur : erreur simple (le navigateur prend le relais pour cette langue).
    if (!base) throw new VoiceProviderError(`Pocket TTS : aucun serveur configuré pour la langue « ${locale} » (POCKET_TTS_URL_${locale.toUpperCase()})`);
    const form = new FormData();
    form.append("text", text);
    form.append("voice_url", this.voices[locale]);
    const r = await providerFetch("Pocket TTS", base, `${base.replace(/\/$/, "")}/tts`, {
      method: "POST",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      body: form,
    });
    if (!r.ok || !r.body) throw await upstreamError("Pocket TTS", r);
    return { body: r.body, contentType: "audio/wav" };
  }

  async probe() {
    const checks = Object.values(this.urls).map(async (u) => {
      try {
        const r = await fetch(`${u!.replace(/\/$/, "")}/health`, { signal: AbortSignal.timeout(3_000) });
        return r.ok;
      } catch {
        return false;
      }
    });
    return (await Promise.all(checks)).every(Boolean);
  }
}

/**
 * Kokoro (82M paramètres, licence Apache 2.0) servi par Kokoro-FastAPI : API compatible OpenAI,
 * audio en streaming. Voix française par défaut : ff_siwis, réglage « naturel » à 0,98.
 */
export class KokoroTTS implements TTS {
  readonly name = "kokoro" as const;
  readonly cacheKey: string;
  constructor(
    private baseUrl: string,
    readonly voices: Record<Locale, string>,
    private speed: number,
  ) {
    this.cacheKey = `kokoro:${voices.fr}:${voices.en}:${speed}`;
  }

  get endpoint() {
    return this.baseUrl;
  }

  async synthesize(text: string, locale: Locale): Promise<Audio> {
    const r = await providerFetch("Kokoro", this.baseUrl, `${this.baseUrl.replace(/\/$/, "")}/v1/audio/speech`, {
      method: "POST",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "kokoro", input: text, voice: this.voices[locale], response_format: "mp3", speed: this.speed }),
    });
    if (!r.ok || !r.body) throw await upstreamError("Kokoro", r);
    return { body: r.body, contentType: "audio/mpeg" };
  }

  async probe() {
    try {
      const r = await fetch(`${this.baseUrl.replace(/\/$/, "")}/v1/audio/voices`, { signal: AbortSignal.timeout(3_000) });
      return r.ok;
    } catch {
      return false;
    }
  }
}

/**
 * Enveloppe un fournisseur de voix : après une panne réseau, il est mis de côté 30 secondes.
 * Pendant ce temps, l'API répond tout de suite par une erreur et le navigateur prend le relais
 * avec sa propre voix, au lieu d'attendre un délai de connexion à chaque phrase.
 */
export class GuardedTTS implements TTS {
  private downUntil = 0;
  constructor(
    readonly inner: TTS,
    private pauseMs = 30_000,
  ) {}

  get name() {
    return this.inner.name;
  }
  get cacheKey() {
    return this.inner.cacheKey;
  }
  get voices() {
    return this.inner.voices;
  }
  get endpoint() {
    return this.inner.endpoint;
  }
  get isDown() {
    return Date.now() < this.downUntil;
  }

  markDown() {
    this.downUntil = Date.now() + this.pauseMs;
  }
  markUp() {
    this.downUntil = 0;
  }

  probe() {
    return this.inner.probe?.() ?? Promise.resolve(true);
  }

  async synthesize(text: string, locale: Locale) {
    if (this.isDown) {
      const err = new VoiceProviderError(`${PROVIDER_LABEL[this.inner.name]} indisponible, voix du navigateur utilisée en attendant`);
      err.unreachable = true;
      throw err;
    }
    try {
      return await this.inner.synthesize(text, locale);
    } catch (e) {
      if (e instanceof VoiceProviderError && e.unreachable) this.markDown();
      throw e;
    }
  }
}

/** Transcription compatible OpenAI (Groq et OpenAI exposent la même API). */
export class WhisperSTT implements STT {
  constructor(
    readonly name: "groq" | "openai",
    private apiKey: string,
    private baseUrl: string,
    private model: string,
  ) {}

  async transcribe(audio: Blob, locale: Locale): Promise<string> {
    const form = new FormData();
    const ext = audio.type.includes("mp4") ? "m4a" : audio.type.includes("ogg") ? "ogg" : "webm";
    form.append("file", audio, `reponse.${ext}`);
    form.append("model", this.model);
    form.append("language", locale);
    form.append("response_format", "json");
    const r = await providerFetch(`Transcription ${this.name}`, this.baseUrl, `${this.baseUrl.replace(/\/$/, "")}/audio/transcriptions`, {
      method: "POST",
      signal: AbortSignal.timeout(30_000),
      headers: { Authorization: `Bearer ${this.apiKey}` },
      body: form,
    });
    if (!r.ok) throw await upstreamError(`Transcription ${this.name}`, r);
    const data: any = await r.json();
    return typeof data?.text === "string" ? data.text.trim() : "";
  }
}

export type VoiceSetup = {
  tts: GuardedTTS | null;
  /** Ce que le front doit faire : lire l'audio du serveur, utiliser la voix du navigateur, ou rester muet. */
  ttsMode: "server" | "browser" | "none";
  stt: STT | null;
  sttMode: "server" | "browser";
};

export function selectVoice(c: Config): VoiceSetup {
  // ---- Synthèse ----
  let tts: TTS | null = null;
  let ttsMode: VoiceSetup["ttsMode"] = "browser";
  const want = c.TTS_PROVIDER;

  if (want === "kokoro") {
    if (!c.KOKORO_URL) throw new ConfigError("TTS_PROVIDER=kokoro nécessite KOKORO_URL (ex. http://127.0.0.1:8880)");
    tts = new KokoroTTS(c.KOKORO_URL, { fr: c.KOKORO_VOICE_FR, en: c.KOKORO_VOICE_EN }, c.KOKORO_SPEED);
  } else if (want === "pocket") {
    if (!c.POCKET_TTS_URL_FR && !c.POCKET_TTS_URL_EN) {
      throw new ConfigError(
        "TTS_PROVIDER=pocket nécessite POCKET_TTS_URL_FR et/ou POCKET_TTS_URL_EN (ex. http://127.0.0.1:8001)",
      );
    }
    tts = new PocketTTS(
      { fr: c.POCKET_TTS_URL_FR, en: c.POCKET_TTS_URL_EN },
      { fr: c.POCKET_TTS_VOICE_FR, en: c.POCKET_TTS_VOICE_EN },
    );
  } else if (want === "piper") {
    if (!c.PIPER_URL) throw new ConfigError("TTS_PROVIDER=piper nécessite PIPER_URL (ex. http://localhost:5000)");
    tts = new PiperTTS(c.PIPER_URL, { fr: c.PIPER_VOICE_FR, en: c.PIPER_VOICE_EN }, c.PIPER_LENGTH_SCALE);
  } else if (want === "elevenlabs" || (want === "auto" && c.ELEVENLABS_API_KEY)) {
    if (!c.ELEVENLABS_API_KEY) throw new ConfigError("TTS_PROVIDER=elevenlabs nécessite ELEVENLABS_API_KEY");
    tts = new ElevenLabsTTS(c.ELEVENLABS_API_KEY, c.ELEVENLABS_VOICE_ID, c.ELEVENLABS_MODEL, c.ELEVENLABS_BASE_URL);
  } else if (want === "openai" || (want === "auto" && c.OPENAI_API_KEY)) {
    if (!c.OPENAI_API_KEY) throw new ConfigError("TTS_PROVIDER=openai nécessite OPENAI_API_KEY");
    tts = new OpenAITTS(c.OPENAI_API_KEY, c.OPENAI_TTS_MODEL, c.OPENAI_TTS_VOICE, c.OPENAI_BASE_URL);
  } else if (want === "auto" && c.PIPER_URL) {
    tts = new PiperTTS(c.PIPER_URL, { fr: c.PIPER_VOICE_FR, en: c.PIPER_VOICE_EN }, c.PIPER_LENGTH_SCALE);
  } else if (want === "none") {
    ttsMode = "none";
  }
  if (tts) ttsMode = "server";

  // ---- Transcription ----
  let stt: STT | null = null;
  if (c.STT_PROVIDER === "openai") {
    if (!c.OPENAI_API_KEY) throw new ConfigError("STT_PROVIDER=openai nécessite OPENAI_API_KEY");
    stt = new WhisperSTT("openai", c.OPENAI_API_KEY, c.OPENAI_BASE_URL, c.STT_MODEL ?? "whisper-1");
  } else if (c.STT_PROVIDER === "groq" || c.STT_PROVIDER === "auto") {
    stt = new WhisperSTT("groq", c.GROQ_API_KEY, c.GROQ_BASE_URL, c.STT_MODEL ?? "whisper-large-v3-turbo");
  }

  return { tts: tts ? new GuardedTTS(tts) : null, ttsMode, stt, sttMode: stt ? "server" : "browser" };
}

// ---- Cache des phrases fixes (intro, conclusion) : on ne les paie qu'une fois ----

async function sha256(text: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
}

function toBase64(bytes: Uint8Array) {
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

function fromBase64(b64: string) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

// Le WAV de Piper pèse plus lourd que le MP3 : environ 45 Ko par seconde de parole.
const MAX_CACHED_BYTES = 900_000;

export type CachedAudio = { bytes: Uint8Array<ArrayBuffer>; contentType: string };

export async function synthesizeCached(tts: TTS, kv: KV, text: string, locale: Locale): Promise<CachedAudio> {
  const key = `tts:${await sha256(`${tts.cacheKey}|${locale}|${text}`)}`;
  const hit = await kv.get(key).catch(() => null);
  // Format stocké : "<type mime>|<base64>"
  if (hit) {
    const sep = hit.indexOf("|");
    return { contentType: hit.slice(0, sep), bytes: fromBase64(hit.slice(sep + 1)) };
  }

  const audio = await tts.synthesize(text, locale);
  const bytes = new Uint8Array(await new Response(audio.body).arrayBuffer());
  if (bytes.length <= MAX_CACHED_BYTES) {
    await kv.set(key, `${audio.contentType}|${toBase64(bytes)}`, { exSeconds: 30 * 24 * 3600 }).catch(() => {});
  }
  return { bytes, contentType: audio.contentType };
}
