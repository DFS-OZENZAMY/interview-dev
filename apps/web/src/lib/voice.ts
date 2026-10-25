/**
 * Voix côté navigateur.
 *
 * Speaker : fait parler Lina. Audio du serveur (ElevenLabs, OpenAI…) lu en streaming,
 * ou voix du navigateur (speechSynthesis) si le serveur n'a pas de fournisseur ou échoue.
 *
 * Listener : écoute le candidat en mode mains libres. Détecte la fin de la réponse
 * après un silence, puis renvoie soit l'audio (transcrit par le serveur), soit le texte
 * reconnu par le navigateur.
 */
import type { Locale } from "./types";

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
};
type RecognitionCtor = new () => SpeechRecognitionLike;

export const SpeechRecognitionImpl: RecognitionCtor | undefined =
  typeof window === "undefined"
    ? undefined
    : ((window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor }).SpeechRecognition ??
      (window as unknown as { webkitSpeechRecognition?: RecognitionCtor }).webkitSpeechRecognition);

let sharedCtx: AudioContext | null = null;
function audioContext() {
  if (!sharedCtx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    sharedCtx = Ctor ? new Ctor() : null;
  }
  return sharedCtx;
}

function rms(analyser: AnalyserNode, buf: Float32Array<ArrayBuffer>) {
  analyser.getFloatTimeDomainData(buf);
  let sum = 0;
  for (let i = 0; i < buf.length; i++) sum += buf[i]! * buf[i]!;
  return Math.sqrt(sum / buf.length);
}

const SILENT_MP3 =
  "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQxAADB8AhSmxhIIEVCSiJrDCQBTcu3UrAIwUdkRgQbFAZC1CQEwTJ9mjRvBA4UOLD8nKVOWfh+UlK3z/177OXrfOdKl7pyn3Xf//WreyTRUoAWgBgkOAGbZHBgG1OF6zM82DWbZaUmMBptgQhGjsyYqc9ae9XFz280948NMBWInljyzsNRFLPWdnZGWrddDsjK1unuSrVN9jJsK8KuQtQCtMBjCEtImISdNKJOopIpBFpNSMbIHCSRpRR5iakjTiyzLhchUUBwCgyKiweBv/7UsQbg8isVNoMPMjAAAA0gAAABEVFGmgqK////9bP/6XCykxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq";

export type SpeakResult = "ended" | "stopped" | "blocked";

export class Speaker {
  private audio: HTMLAudioElement | null = null;
  private analyser: AnalyserNode | null = null;
  private buf: Float32Array<ArrayBuffer> | null = null;
  private graphConnected = false;
  private synthPulse = 0;
  private active: "audio" | "synth" | null = null;
  private settle: ((r: SpeakResult) => void) | null = null;

  /** Analyse du niveau seulement si l'audio vient de la même origine (sinon le son serait coupé). */
  constructor(private sameOrigin: boolean) {}

  private el() {
    if (!this.audio) {
      this.audio = new Audio();
      this.audio.preload = "auto";
    }
    return this.audio;
  }

  /** À appeler pendant un clic : débloque la lecture automatique (Safari, iOS, Chrome). */
  unlock() {
    const ctx = audioContext();
    void ctx?.resume().catch(() => {});
    const a = this.el();
    if (!a.src || a.src.startsWith("data:")) {
      a.src = SILENT_MP3;
      void a.play().catch(() => {});
    }
    try {
      window.speechSynthesis?.resume();
    } catch {
      /* rien */
    }
  }

  private connectGraph() {
    if (this.graphConnected || !this.sameOrigin) return;
    const ctx = audioContext();
    // Une source branchée sur un contexte suspendu serait muette : on attend qu'il tourne.
    if (!ctx || ctx.state !== "running") return;
    try {
      const source = ctx.createMediaElementSource(this.el());
      this.analyser = ctx.createAnalyser();
      this.analyser.fftSize = 512;
      source.connect(this.analyser);
      this.analyser.connect(ctx.destination);
      this.buf = new Float32Array(this.analyser.fftSize);
      this.graphConnected = true;
    } catch {
      /* l'orbe utilisera un niveau simulé */
    }
  }

  /** Commence à télécharger l'audio avant qu'on en ait besoin. */
  preload(url: string) {
    const a = this.el();
    const abs = new URL(url, window.location.href).href;
    if (a.src !== abs && !this.active) {
      a.src = abs;
      a.load();
    }
  }

  level() {
    if (this.active === "audio") {
      if (this.analyser && this.buf) return Math.min(1, rms(this.analyser, this.buf) * 4);
      return 0.35 + 0.15 * Math.sin(performance.now() / 140);
    }
    if (this.active === "synth") {
      this.synthPulse *= 0.92;
      return 0.25 + this.synthPulse;
    }
    return 0;
  }

  get speaking() {
    return this.active !== null;
  }

  /** Lit l'audio du serveur ; en cas d'échec, bascule sur la voix du navigateur. */
  async speak(opts: { url?: string | null; text: string; locale: Locale; onStart?: () => void }): Promise<SpeakResult> {
    this.stop();
    if (opts.url) {
      const r = await this.playUrl(opts.url, opts.onStart);
      if (r !== "error") return r;
    }
    return this.speakSynth(opts.text, opts.locale, opts.onStart);
  }

  private playUrl(url: string, onStart?: () => void) {
    return new Promise<SpeakResult | "error">((resolve) => {
      const a = this.el();
      const abs = new URL(url, window.location.href).href;
      if (a.src !== abs) a.src = abs;
      a.currentTime = 0;
      this.connectGraph();
      this.active = "audio";
      let done = false;
      const finish = (r: SpeakResult | "error") => {
        if (done) return;
        done = true;
        a.onended = a.onerror = a.onplaying = null;
        this.active = null;
        this.settle = null;
        resolve(r);
      };
      this.settle = finish;
      a.onplaying = () => onStart?.();
      a.onended = () => finish("ended");
      a.onerror = () => finish("error");
      a.play().catch((e: unknown) => finish(e instanceof DOMException && e.name === "NotAllowedError" ? "blocked" : "error"));
    });
  }

  private pickVoice(locale: Locale) {
    const voices = window.speechSynthesis?.getVoices() ?? [];
    const lang = voices.filter((v) => v.lang.toLowerCase().startsWith(locale));
    const preferred = /(amélie|amelie|audrey|marie|denise|julie|céline|google français|samantha|ava|allison|jenny|aria|google us english|female)/i;
    return lang.find((v) => preferred.test(v.name)) ?? lang.find((v) => v.localService) ?? lang[0] ?? null;
  }

  private speakSynth(text: string, locale: Locale, onStart?: () => void) {
    return new Promise<SpeakResult>((resolve) => {
      const synth = window.speechSynthesis;
      if (!synth || !text.trim()) return resolve("ended");
      const u = new SpeechSynthesisUtterance(text);
      u.lang = locale === "en" ? "en-US" : "fr-FR";
      const voice = this.pickVoice(locale);
      if (voice) u.voice = voice;
      u.rate = 1;
      u.pitch = 1.05;
      this.active = "synth";
      let done = false;
      const finish = (r: SpeakResult) => {
        if (done) return;
        done = true;
        this.active = null;
        this.settle = null;
        resolve(r);
      };
      this.settle = finish;
      u.onstart = () => onStart?.();
      u.onboundary = () => (this.synthPulse = 0.35);
      u.onend = () => finish("ended");
      u.onerror = (e) => finish(e.error === "not-allowed" ? "blocked" : "ended");
      synth.cancel();
      synth.speak(u);
    });
  }

  pause() {
    this.audio?.pause();
    window.speechSynthesis?.pause();
  }

  resume() {
    if (this.active === "audio") void this.audio?.play().catch(() => {});
    if (this.active === "synth") window.speechSynthesis?.resume();
  }

  stop() {
    this.audio?.pause();
    try {
      window.speechSynthesis?.cancel();
    } catch {
      /* rien */
    }
    this.settle?.("stopped");
    this.active = null;
  }
}

// ---------------------------------------------------------------------------

export type ListenResult = { audio?: Blob; text?: string; cancelled?: boolean };

export type ListenOptions = {
  mode: "server" | "browser";
  locale: Locale;
  /** Mains libres : arrêt automatique après un silence. Sinon, le candidat clique sur « J'ai terminé ». */
  autoStop: boolean;
  onPartial?: (text: string) => void;
  onSpeech?: () => void;
};

const SILENCE_MS = 1900;
const MIN_SPEECH_MS = 600;
const MAX_TURN_MS = 3 * 60_000;

export type MicIssue = "unsupported" | "no-device" | "denied" | "busy" | "error";

export function micIssueFrom(e: unknown): MicIssue {
  switch ((e as { name?: string } | null)?.name) {
    case "NotFoundError":
      return "no-device";
    case "NotAllowedError":
    case "SecurityError":
      return "denied";
    case "NotReadableError":
    case "AbortError":
      return "busy";
    default:
      return "error";
  }
}

export function micIssueMessage(issue: MicIssue | null): string {
  switch (issue) {
    case "unsupported":
      return "Le micro n’est pas disponible sur cette page (navigateur ou connexion non sécurisée).";
    case "no-device":
      return "Aucun micro n’a été détecté sur cet appareil.";
    case "denied":
      return "L’accès au micro est refusé.";
    case "busy":
      return "Le micro est utilisé par une autre application.";
    default:
      return "Le micro est inaccessible.";
  }
}

export class Listener {
  /** Dernier problème rencontré en demandant le micro (null si tout va bien). */
  issue: MicIssue | null = null;
  private stream: MediaStream | null = null;
  private analyser: AnalyserNode | null = null;
  private buf: Float32Array<ArrayBuffer> | null = null;
  private current: { stop: (submit: boolean) => void } | null = null;
  private lastLevel = 0;

  get ready() {
    return Boolean(this.stream);
  }

  /** Demande l'accès au micro une seule fois pour toute la séance. */
  async prepare(): Promise<boolean> {
    if (this.stream) return true;
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      this.issue = "unsupported";
      return false;
    }
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      const ctx = audioContext();
      if (ctx) {
        void ctx.resume().catch(() => {});
        const src = ctx.createMediaStreamSource(this.stream);
        this.analyser = ctx.createAnalyser();
        this.analyser.fftSize = 1024;
        src.connect(this.analyser); // pas de sortie : on n'entend pas son propre micro
        this.buf = new Float32Array(this.analyser.fftSize);
      }
      this.issue = null;
      return true;
    } catch (e) {
      this.issue = micIssueFrom(e);
      return false;
    }
  }

  level() {
    return this.current ? this.lastLevel : 0;
  }

  get listening() {
    return this.current !== null;
  }

  /** Démarre un tour de parole. La promesse se résout quand le candidat a fini (ou à l'annulation). */
  listen(opts: ListenOptions): Promise<ListenResult> {
    this.cancel();
    return opts.mode === "server" && this.stream && typeof MediaRecorder !== "undefined"
      ? this.listenRecorder(opts)
      : this.listenBrowser(opts);
  }

  /** Termine le tour et envoie ce qui a été dit. */
  finish() {
    this.current?.stop(true);
  }

  /** Abandonne le tour en cours sans rien envoyer. */
  cancel() {
    this.current?.stop(false);
  }

  release() {
    this.cancel();
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
    this.analyser = null;
  }

  /**
   * Détection de voix basée sur le volume du micro. Le bruit de fond est suivi en continu :
   * il descend tout de suite quand la pièce est calme et ne remonte que très lentement,
   * si bien que la voix du candidat se détache toujours, même s'il parle dès le départ.
   */
  private vad(opts: ListenOptions, onDone: () => void) {
    let raf = 0;
    let floor = 0.01;
    let speechMs = 0;
    let silenceMs = 0;
    let started = false;
    let last = performance.now();
    const begin = last;
    const tick = () => {
      const now = performance.now();
      const dt = Math.min(now - last, 100);
      last = now;
      const level = this.analyser && this.buf ? rms(this.analyser, this.buf) : 0;
      this.lastLevel = Math.min(1, level * 9);
      floor = level < floor ? Math.max(level, 0.002) : floor + (level - floor) * 0.0015;
      const threshold = Math.max(0.015, floor * 3);
      if (level > threshold) {
        speechMs += dt;
        silenceMs = 0;
        if (!started && speechMs > 150) {
          started = true;
          opts.onSpeech?.();
        }
      } else if (started) {
        silenceMs += dt;
      }
      if (opts.autoStop && started && speechMs > MIN_SPEECH_MS && silenceMs > SILENCE_MS) return onDone();
      if (now - begin > MAX_TURN_MS) return onDone();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return {
      stop: () => cancelAnimationFrame(raf),
      hasSpeech: () => speechMs > MIN_SPEECH_MS,
    };
  }

  private listenRecorder(opts: ListenOptions) {
    return new Promise<ListenResult>((resolve) => {
      const mime = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"].find((t) => MediaRecorder.isTypeSupported(t));
      const recorder = new MediaRecorder(this.stream!, mime ? { mimeType: mime } : undefined);
      const chunks: Blob[] = [];
      let submit = false;
      recorder.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      const detector = this.vad(opts, () => this.current?.stop(true));
      recorder.onstop = () => {
        detector.stop();
        this.current = null;
        this.lastLevel = 0;
        if (!submit || !detector.hasSpeech() || !chunks.length) return resolve({ cancelled: !submit });
        resolve({ audio: new Blob(chunks, { type: recorder.mimeType || mime || "audio/webm" }) });
      };
      this.current = {
        stop: (s) => {
          submit = s;
          if (recorder.state !== "inactive") recorder.stop();
        },
      };
      recorder.start(250);
    });
  }

  private listenBrowser(opts: ListenOptions) {
    return new Promise<ListenResult>((resolve) => {
      if (!SpeechRecognitionImpl) return resolve({ cancelled: true });
      const rec = new SpeechRecognitionImpl();
      rec.lang = opts.locale === "en" ? "en-US" : "fr-FR";
      rec.continuous = true;
      rec.interimResults = true;
      let finalText = "";
      let interim = "";
      let stopped = false;
      let submit = false;
      let silenceTimer: ReturnType<typeof setTimeout> | null = null;
      const detector = this.stream ? this.vad({ ...opts, autoStop: false }, () => {}) : null;
      const text = () => `${finalText} ${interim}`.replace(/\s+/g, " ").trim();
      const end = () => {
        if (silenceTimer) clearTimeout(silenceTimer);
        detector?.stop();
        this.current = null;
        this.lastLevel = 0;
        resolve(submit && text() ? { text: text() } : { cancelled: !submit });
      };
      rec.onresult = (e) => {
        interim = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const r = e.results[i]!;
          if (r.isFinal) finalText += ` ${r[0]!.transcript}`;
          else interim += ` ${r[0]!.transcript}`;
        }
        opts.onSpeech?.();
        opts.onPartial?.(text());
        if (silenceTimer) clearTimeout(silenceTimer);
        if (opts.autoStop && text().split(/\s+/).length >= 3) {
          silenceTimer = setTimeout(() => this.current?.stop(true), SILENCE_MS + 400);
        }
      };
      // Chrome coupe parfois la reconnaissance continue : on la relance tant que le tour n'est pas fini.
      rec.onend = () => {
        if (!stopped) {
          try {
            rec.start();
            return;
          } catch {
            /* on termine ci-dessous */
          }
        }
        end();
      };
      rec.onerror = (e) => {
        if (e.error === "no-speech" || e.error === "aborted") return;
        stopped = true;
      };
      this.current = {
        stop: (s) => {
          submit = s;
          stopped = true;
          try {
            rec.stop();
          } catch {
            end();
          }
        },
      };
      try {
        rec.start();
      } catch {
        stopped = true;
        end();
      }
    });
  }
}

export const canRecord = () => typeof navigator !== "undefined" && Boolean(navigator.mediaDevices?.getUserMedia);
