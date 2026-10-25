import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AlertTriangle, ArrowLeft, Keyboard, Mic, MicOff, Pause, Play, RotateCcw, Send, Volume2, VolumeX } from "lucide-react";
import { VoiceOrb, type OrbState } from "../components/VoiceOrb";
import { Countdown } from "../components/Countdown";
import { AnalysisLoader } from "../components/AnalysisLoader";
import { ApiError, api, type Turn } from "../lib/api";
import { TYPES, cn } from "../lib/labels";
import { configStore, historyStore } from "../lib/storage";
import { SpeechRecognitionImpl, hasAudioInput, type MicStatus } from "../lib/voice";
import { listener, speaker } from "../lib/voice-instance";
import type { VoiceConfig } from "../lib/types";

type Phase = "intro" | "countdown" | "live" | "analyzing" | "failed";
type Live = "thinking" | "speaking" | "listening" | "transcribing" | "paused";

const FALLBACK_VOICE: VoiceConfig = {
  tts: { mode: "browser", provider: null },
  stt: { mode: "browser", provider: null },
  phrases: {
    intro: {
      fr: ["Bonjour, je suis Lina, votre recruteuse.", "Votre entretien commencera dans cinq secondes.", "Bonne chance !"],
      en: ["Hello, I'm Lina, your recruiter.", "Your interview will begin in five seconds.", "Good luck!"],
    },
    closing: { fr: ["Merci pour cet échange, l'entretien est terminé."], en: ["Thank you for this conversation, the interview is now over."] },
  },
  maxQuestions: 10,
};

/** Découpe la question en segments courts, révélés en douceur quand Lina commence à parler. */
function segments(text: string) {
  const sentences = text.match(/[^.!?…]+(?:[.!?…]+|$)/g)?.map((s) => s.trim()).filter(Boolean) ?? [];
  return sentences.flatMap((s) => {
    const words = s.split(/\s+/);
    if (words.length <= 14) return [s];
    const out: string[] = [];
    for (let i = 0; i < words.length; i += 11) out.push(words.slice(i, i + 11).join(" "));
    return out;
  });
}

/** Message affiché quand le candidat doit répondre par écrit, selon la raison. */
const WRITTEN_REASON: Record<Exclude<MicStatus, "granted">, string> = {
  "no-device": "Aucun micro détecté sur cet appareil : répondez par écrit. Lina continue de vous poser ses questions à voix haute.",
  denied: "Le micro n’est pas autorisé : répondez par écrit, ou autorisez le micro dans les réglages du navigateur puis cliquez sur « Répondre à l’oral ».",
  busy: "Le micro est utilisé par une autre application : répondez par écrit, ou fermez l’autre application puis cliquez sur « Répondre à l’oral ».",
  unsupported: "Le micro n’est pas disponible sur cette page (navigateur non compatible ou connexion non sécurisée) : répondez par écrit.",
  unknown: "Le micro n’est pas disponible : répondez par écrit.",
};

const STATUS: Record<Live, string> = {
  thinking: "Lina prépare sa question",
  speaking: "Lina vous parle",
  listening: "À vous de répondre",
  transcribing: "Lina a bien entendu votre réponse",
  paused: "Entretien en pause",
};

export default function Interview() {
  const navigate = useNavigate();
  const [config] = useState(() => configStore.get());
  const [voice, setVoice] = useState<VoiceConfig | null>(null);
  const [phase, setPhase] = useState<Phase>("intro");
  const [live, setLive] = useState<Live>("thinking");
  const [introReveal, setIntroReveal] = useState(0);
  const [introBlocked, setIntroBlocked] = useState(false);
  const [session, setSession] = useState<{ id: string; index: number; total: number } | null>(null);
  const [question, setQuestion] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [partial, setPartial] = useState("");
  const [answer, setAnswer] = useState("");
  const [textMode, setTextMode] = useState(false);
  const [handsFree, setHandsFree] = useState(true);
  const [muted, setMuted] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [stopOpen, setStopOpen] = useState(false);
  const [micStatus, setMicStatus] = useState<MicStatus>(listener.status);
  const micCheck = useRef<Promise<MicStatus> | null>(null);

  const alive = useRef(true);
  const turn = useRef(0);
  const started = useRef(false);
  const finishing = useRef(false);
  const submitting = useRef(false);
  const interrupting = useRef(false);
  const pausedFrom = useRef<Live>("listening");
  const startPromise = useRef<Promise<{ sessionId: string; question: string; index: number; total: number }> | null>(null);
  const sessionRef = useRef(session);
  const liveRef = useRef(live);
  const prefs = useRef({ handsFree, muted, textMode });
  const elapsedRef = useRef(0);
  sessionRef.current = session;
  liveRef.current = live;
  elapsedRef.current = elapsed;
  prefs.current = { handsFree, muted, textMode };
  // Les étapes de la conversation s'appellent entre elles : on passe par cette référence
  // pour toujours utiliser leur version la plus récente.
  const flow = useRef({ say: (_t: string, _n: number) => {}, listen: () => {}, submit: (_t: string) => {} });

  const locale = config?.locale ?? "fr";
  const v = voice ?? FALLBACK_VOICE;
  // Fournisseur de voix momentanément injoignable (ex. Piper arrêté) : voix du navigateur directement.
  const serverTts = v.tts.mode === "server" && v.tts.available !== false;
  // Sans micro utilisable, aucune écoute possible : ni l'enregistrement, ni la dictée du navigateur.
  const listenMode: "server" | "browser" | null =
    micStatus !== "granted" ? null : v.stt.mode === "server" ? "server" : SpeechRecognitionImpl ? "browser" : null;

  const orbLevel = useCallback(() => {
    const l = liveRef.current;
    return l === "speaking" ? speaker.level() : l === "listening" ? listener.level() : 0;
  }, []);

  // Chronomètre de séance (hors pause)
  useEffect(() => {
    if (phase !== "live" || live === "paused") return;
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [phase, live]);

  // Fermer ou recharger l'onglet en plein entretien ferait perdre la séance : le navigateur demande confirmation.
  useEffect(() => {
    if (phase !== "live" && phase !== "countdown") return;
    const warn = (e: BeforeUnloadEvent) => {
      if (finishing.current) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [phase]);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      listener.cancel();
      if (!finishing.current) {
        speaker.stop();
        listener.release();
      }
    };
  }, []);

  // Un micro branché ou débranché pendant l'entretien est pris en compte.
  useEffect(() => {
    const devices = navigator.mediaDevices;
    if (!devices?.addEventListener) return;
    const onChange = async () => {
      if (listener.status === "granted" && listener.ready) return;
      if ((await hasAudioInput()) === false) return;
      const st = await listener.prepare();
      if (!alive.current) return;
      setMicStatus(st);
      if (st === "granted" && prefs.current.textMode) setNotice("Un micro vient d’être détecté : vous pouvez répondre à l’oral.");
    };
    devices.addEventListener("devicechange", onChange);
    return () => devices.removeEventListener("devicechange", onChange);
  }, []);

  /** Passe en mode écrit en expliquant pourquoi. */
  function fallBackToWriting(status: MicStatus) {
    setMicStatus(status);
    setTextMode(true);
    prefs.current.textMode = true;
    setNotice(WRITTEN_REASON[status === "granted" ? "unknown" : status]);
  }

  // ---------------------------------------------------------------- intro

  const playIntro = useCallback(
    async (cfg: VoiceConfig) => {
      const phrases = cfg.phrases.intro[locale];
      setIntroBlocked(false);
      let timer: ReturnType<typeof setInterval> | null = null;
      const reveal = () => {
        setIntroReveal(1);
        timer = setInterval(() => setIntroReveal((n) => Math.min(phrases.length, n + 1)), 1500);
      };
      if (cfg.tts.mode === "none") {
        reveal();
        await new Promise((r) => setTimeout(r, phrases.length * 1500));
      } else {
        const r = await speaker.speak({
          url: cfg.tts.mode === "server" && cfg.tts.available !== false ? api.phraseUrl("intro", locale) : null,
          text: phrases.join(" "),
          locale,
          onStart: reveal,
        });
        if (r === "blocked") {
          if (timer) clearInterval(timer);
          if (alive.current) setIntroBlocked(true);
          return;
        }
      }
      if (timer) clearInterval(timer);
      if (!alive.current) return;
      setIntroReveal(phrases.length);
      setTimeout(() => alive.current && setPhase("countdown"), 600);
    },
    [locale],
  );

  useEffect(() => {
    if (!config || started.current) return;
    started.current = true;
    // L'entretien est créé pendant l'intro : la première question est prête à la fin du compte à rebours.
    startPromise.current = api.start(config);
    startPromise.current.catch(() => {});
    // Vérifie le micro pendant l'intro : la première écoute attend ce résultat.
    micCheck.current = listener.prepare();
    void micCheck.current.then((st) => alive.current && setMicStatus(st));
    api
      .voiceConfig()
      .catch(() => FALLBACK_VOICE)
      .then((cfg) => {
        if (!alive.current) return;
        setVoice(cfg);
        void playIntro(cfg);
      });
  }, [config, playIntro]);

  // ---------------------------------------------------------------- boucle de conversation

  function saveAndShowReport(id: string, res: Extract<Turn, { done: true }>, interrupted: boolean) {
      if (!config) return;
      historyStore.save({
        sessionId: id,
        poste: config.poste,
        type: config.type,
        locale: config.locale,
        date: Date.now(),
        elapsed: elapsedRef.current,
        interrupted,
        report: res.report,
      });
      finishing.current = true;
      listener.release();
      navigate(`/rapport/${id}`, { replace: true });
  }

  async function submit(text: string) {
      const s = sessionRef.current;
      const value = text.trim();
      if (!s || !value || submitting.current) return;
      submitting.current = true;
      listener.cancel();
      speaker.stop();
      setNotice("");
      setError("");
      const isLast = s.index >= s.total;
      const myTurn = ++turn.current;
      if (isLast) {
        setPhase("analyzing");
        // Lina conclut pendant que le bilan se prépare.
        if (!prefs.current.muted && v.tts.mode !== "none") {
          void speaker.speak({ url: serverTts ? api.phraseUrl("closing", locale) : null, text: v.phrases.closing[locale].join(" "), locale });
        }
      } else {
        setLive("thinking");
      }
      try {
        const res = await api.answer(s.id, value);
        if (!alive.current || myTurn !== turn.current) return;
        setAnswer("");
        setPartial("");
        if (res.done) return saveAndShowReport(s.id, res, false);
        if (res.truncated) setNotice("Votre réponse était très longue : seuls les 250 premiers mots ont été transmis.");
        setSession({ id: s.id, index: res.index, total: res.total });
        sessionRef.current = { id: s.id, index: res.index, total: res.total };
        flow.current.say(res.question, myTurn);
      } catch (e) {
        if (!alive.current) return;
        setPhase("live");
        setLive("listening");
        setError(e instanceof ApiError ? e.message : "Votre réponse n’a pas pu être envoyée.");
        setAnswer((a) => a || value);
        setTextMode(true);
      } finally {
        submitting.current = false;
      }
  }

  async function listen() {
    const s = sessionRef.current;
    if (!s || !alive.current) return;
    setLive("listening");
    setPartial("");
    if (prefs.current.textMode) return;
    const status = micCheck.current ? await micCheck.current : listener.status;
    if (!alive.current) return;
    const mode =
      status !== "granted" ? null : v.stt.mode === "server" ? "server" : SpeechRecognitionImpl ? "browser" : null;
    if (!mode) return fallBackToWriting(status === "granted" ? "unsupported" : status);
    const myTurn = turn.current;
    const res = await listener.listen({ mode, locale, autoStop: prefs.current.handsFree, onPartial: setPartial });
    if (!alive.current || myTurn !== turn.current) return;
    if (res.micError) {
      micCheck.current = null;
      return fallBackToWriting(listener.status === "granted" ? "no-device" : listener.status);
    }
    if (res.cancelled) return;
    if (res.text) return flow.current.submit(res.text);
    if (!res.audio) {
      setNotice("Je n’ai rien entendu. Reprenez quand vous voulez.");
      return flow.current.listen();
    }
    setLive("transcribing");
    try {
      const { text } = await api.transcribe(s.id, res.audio);
      if (!alive.current || myTurn !== turn.current) return;
      if (!text.trim()) {
        setNotice("Je n’ai pas compris votre réponse. Pouvez-vous la reformuler ?");
        return flow.current.listen();
      }
      flow.current.submit(text);
    } catch (e) {
      if (!alive.current) return;
      setError(e instanceof ApiError ? e.message : "La transcription a échoué.");
      setNotice("Vous pouvez réessayer à l’oral ou répondre par écrit.");
      setLive("listening");
    }
  }

  async function say(text: string, myTurn: number) {
      const s = sessionRef.current;
      if (!s) return;
      listener.cancel();
      setQuestion(text);
      setRevealed(false);
      setLive("speaking");
      if (prefs.current.muted || v.tts.mode === "none") {
        setRevealed(true);
        return flow.current.listen();
      }
      interrupting.current = false;
      const r = await speaker.speak({
        url: serverTts ? api.speechUrl(s.id, s.index) : null,
        text,
        locale,
        onStart: () => setRevealed(true),
      });
      if (!alive.current || myTurn !== turn.current) return;
      setRevealed(true);
      if (r === "stopped" && !interrupting.current) return;
      if (r === "blocked") setNotice("Le navigateur a bloqué le son : cliquez sur « Réécouter » pour entendre Lina.");
      flow.current.listen();
  }

  flow.current = {
    say: (t, n) => void say(t, n),
    listen: () => void listen(),
    submit: (t) => void submit(t),
  };

  async function beginInterview() {
    setPhase("live");
    setLive("thinking");
    try {
      const s = await startPromise.current!;
      if (!alive.current) return;
      setSession({ id: s.sessionId, index: s.index, total: s.total });
      sessionRef.current = { id: s.sessionId, index: s.index, total: s.total };
      if (serverTts) speaker.preload(api.speechUrl(s.sessionId, s.index));
      flow.current.say(s.question, turn.current);
    } catch (e) {
      if (!alive.current) return;
      setPhase("failed");
      setError(e instanceof ApiError ? e.message : "Impossible de démarrer l’entretien.");
    }
  }

  function retryStart() {
    if (!config) return;
    setError("");
    startPromise.current = api.start(config);
    void beginInterview();
  }

  // ---------------------------------------------------------------- commandes

  function interrupt() {
    interrupting.current = true;
    speaker.stop();
  }

  function replay() {
    if (!session || !question) return;
    turn.current++;
    void say(question, turn.current);
  }

  function togglePause() {
    if (live === "paused") {
      if (pausedFrom.current === "speaking") {
        speaker.resume();
        setLive("speaking");
      } else void listen();
      return;
    }
    if (live !== "speaking" && live !== "listening") return;
    pausedFrom.current = live;
    if (live === "speaking") speaker.pause();
    else {
      turn.current++;
      listener.cancel();
    }
    setLive("paused");
  }

  function toggleMute() {
    const next = !muted;
    setMuted(next);
    prefs.current.muted = next;
    if (next && live === "speaking") interrupt();
  }

  function toggleHandsFree() {
    const next = !handsFree;
    setHandsFree(next);
    prefs.current.handsFree = next;
    // Relance l'écoute avec le nouveau réglage si le candidat n'a encore rien dit.
    if (live === "listening" && !textMode && !partial) {
      turn.current++;
      listener.cancel();
      void listen();
    }
  }

  function switchToText() {
    if (textMode) return;
    turn.current++;
    listener.cancel();
    setTextMode(true);
    prefs.current.textMode = true;
  }

  async function switchToVoice() {
    const st = await listener.prepare();
    if (!alive.current) return;
    setMicStatus(st);
    if (st !== "granted") return fallBackToWriting(st);
    micCheck.current = Promise.resolve(st);
    setTextMode(false);
    prefs.current.textMode = false;
    setNotice("");
    turn.current++;
    void listen();
  }

  async function endEarly() {
    setStopOpen(false);
    turn.current++;
    speaker.stop();
    listener.cancel();
    const s = sessionRef.current;
    if (!s) return navigate("/preparation");
    setPhase("analyzing");
    try {
      const res = await api.finish(s.id);
      saveAndShowReport(s.id, res, true);
    } catch (e) {
      setPhase("live");
      setLive("listening");
      setError(e instanceof ApiError ? e.message : "Impossible de terminer l’entretien.");
    }
  }

  // ---------------------------------------------------------------- rendu

  if (!config) {
    return (
      <main className="on-dark flex min-h-dvh items-center justify-center bg-night px-5 text-white">
        <div className="stage max-w-md rounded-[28px] p-8 text-center">
          <h1 className="text-2xl font-bold">Aucun entretien n’est configuré.</h1>
          <p className="mt-3 text-sm leading-6 text-[#B9C7E8]">Choisissez votre type d’entretien et votre poste : Lina s’en servira pour préparer ses questions.</p>
          <Link to="/preparation" className="btn-gradient mt-6 inline-flex min-h-12 items-center rounded-2xl px-6 text-sm font-bold">
            Configurer mon entretien
          </Link>
        </div>
      </main>
    );
  }

  if (phase === "analyzing") return <AnalysisLoader />;

  if (phase === "intro" || phase === "countdown") {
    const phrases = v.phrases.intro[locale];
    return (
      <main className="on-dark relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#0A1028] px-5 py-14 text-white sm:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_39%,#2C3B82_0%,#172450_33%,#0A1028_75%)]" />
        <div aria-hidden="true" className="blob -left-28 top-12 size-80 bg-[#A453FA]/25 blur-[95px]" />
        <div aria-hidden="true" className="blob -right-20 bottom-8 size-80 bg-[#33D5D1]/18 blur-[95px]" />
        <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold text-[#D6D9FF]">
            <span className="pill-dark inline-flex items-center gap-2 rounded-full px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#33D5D1] shadow-[0_0_8px_#33D5D1]" /> {TYPES[config.type].label}
            </span>
            <span className="pill-dark rounded-full px-3 py-2">{config.poste}</span>
          </div>
          <div className="breathe orb-glow relative my-7 size-60 sm:size-80">
            <VoiceOrb state={phase === "intro" ? "speaking" : "thinking"} level={() => speaker.level()} />
          </div>
          <div className="relative flex min-h-40 w-full items-center justify-center">
            {phase === "intro" ? (
              <h1 aria-label={phrases.join(" ")} className="flex max-w-3xl flex-col items-center gap-3 text-balance text-[clamp(1.65rem,4.2vw,2.7rem)] font-semibold leading-[1.24] tracking-[-.04em]">
                {phrases.map((p, i) => (
                  <span key={i} aria-hidden="true"
                    className={cn("block transform-gpu transition-[opacity,transform,filter] duration-700 ease-out", introReveal > i ? "translate-y-0 opacity-100 blur-none" : "translate-y-3 opacity-0 blur-[6px]", i === phrases.length - 1 && "intro-highlight")}>
                    {p}
                  </span>
                ))}
              </h1>
            ) : (
              <Countdown onComplete={() => void beginInterview()} />
            )}
          </div>
          {phase === "intro" && introBlocked && (
            <div className="mt-5 flex flex-col items-center gap-3">
              <p role="status" className="max-w-sm text-sm leading-6 text-[#CFDAF9]">Le navigateur attend votre accord pour lancer le son.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <button type="button" onClick={() => { speaker.unlock(); void playIntro(v); }} className="glass-dark inline-flex min-h-12 items-center gap-2 rounded-2xl px-6 text-sm font-semibold">
                  <Volume2 size={17} /> Écouter Lina
                </button>
                <button type="button" onClick={() => { setMuted(true); prefs.current.muted = true; setPhase("countdown"); }} className="btn-gradient inline-flex min-h-12 items-center rounded-2xl px-5 text-sm font-bold">
                  Continuer sans le son
                </button>
              </div>
            </div>
          )}
          <p className="mt-8 max-w-sm text-xs font-semibold leading-5 tracking-[.08em] text-[#B5C3E8]">
            {phase === "intro" ? "Un instant pour vous mettre à l’aise" : "Lina prend la parole dans quelques secondes"}
          </p>
        </div>
      </main>
    );
  }

  const orbState: OrbState = phase === "failed" ? "error" : live === "transcribing" ? "thinking" : live;
  const parts = segments(question);
  const canAnswer = live === "listening" || live === "paused";
  const minutes = `${String(Math.floor(elapsed / 60)).padStart(2, "0")}:${String(elapsed % 60).padStart(2, "0")}`;

  return (
    <main className="on-dark relative min-h-dvh overflow-x-clip bg-[#0A1028] px-4 py-7 text-white sm:px-8 sm:py-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(ellipse_at_50%_20%,#26376F_0%,#131E45_46%,transparent_82%)]" />
        <div className="blob -right-36 top-40 size-[430px] bg-[#BA58EE]/15 blur-[110px]" />
        <div className="blob -left-36 top-[36%] size-[440px] bg-[#5365FF]/15 blur-[110px]" />
      </div>
      <div className="relative mx-auto max-w-5xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <button type="button" onClick={() => setStopOpen(true)} className="glass-dark inline-flex min-h-11 items-center gap-2 rounded-2xl px-4 text-sm font-bold">
            <ArrowLeft size={17} /> Quitter
          </button>
          <span className="pill-dark rounded-full px-4 py-2 text-xs font-bold">
            {session ? `Question ${session.index} sur ${session.total}` : "Démarrage"}
          </span>
        </header>
        <div className="mt-9 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-[#BCA7FF]">{TYPES[config.type].label} avec Lina</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">{config.poste}</h1>
          </div>
          <span className="text-sm font-semibold tabular-nums text-[#CBD3FF]" aria-label="Durée de la séance">{minutes}</span>
        </div>
        {session && (
          <div className="mt-5 flex gap-1.5" aria-hidden="true">
            {Array.from({ length: session.total }, (_, i) => (
              <span key={i} className={cn("h-1 flex-1 rounded-full transition-colors duration-500", i < session.index ? "bg-gradient-to-r from-[#5365FF] to-[#DB4CCA]" : "bg-white/12")} />
            ))}
          </div>
        )}

        <section className="stage mt-6 rounded-[32px] p-5 sm:p-10">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <div className="orb-glow relative size-48 sm:size-60">
              <VoiceOrb state={orbState} level={orbLevel} />
            </div>
            <p className="mt-5 text-sm font-bold text-[#BCA7FF]" aria-live="polite">
              {phase === "failed" ? "Connexion impossible" : STATUS[live]}
            </p>

            <div className="mt-5 flex min-h-28 w-full items-center justify-center">
              {question && phase !== "failed" ? (
                <h2 aria-label={question} className="flex max-w-2xl flex-col items-center gap-2 text-balance text-xl font-semibold leading-relaxed tracking-tight text-[#F3F4FF] sm:text-[26px]">
                  {parts.map((p, i) => (
                    <span key={`${session?.index}-${i}`} aria-hidden="true" style={{ transitionDelay: `${revealed ? i * 160 : 0}ms` }}
                      className={cn("block transform-gpu transition-[opacity,transform,filter] duration-700 ease-out", revealed ? "translate-y-0 opacity-100 blur-none" : "translate-y-3 opacity-0 blur-[6px]")}>
                      {p}
                    </span>
                  ))}
                </h2>
              ) : (
                <p className="text-lg text-[#C9D3F2]">{phase === "failed" ? error : "Lina prépare sa première question…"}</p>
              )}
            </div>

            {phase === "failed" && (
              <button type="button" onClick={retryStart} className="btn-gradient mt-6 inline-flex min-h-12 items-center gap-2 rounded-2xl px-6 text-sm font-bold">
                <RotateCcw size={17} /> Réessayer
              </button>
            )}

            {live === "speaking" && phase === "live" && (
              <button type="button" onClick={interrupt} className="glass-dark mt-6 inline-flex min-h-12 items-center gap-2 rounded-2xl px-5 text-sm font-semibold">
                <Mic size={17} /> Prendre la parole
              </button>
            )}

            {canAnswer && phase === "live" && (
              <div className="mt-6 w-full text-left">
                {!textMode ? (
                  <div className="rounded-2xl border border-white/15 bg-white/8 p-4">
                    <p className="min-h-12 text-[15px] leading-7 text-[#E7EBFF]" aria-live="polite">
                      {partial || (
                        <span className="text-[#AEB9DA]">
                          {live === "paused" ? "L’écoute reprendra à la fin de la pause." : handsFree ? "Je vous écoute. Faites une pause de deux secondes quand vous avez terminé." : "Je vous écoute. Cliquez sur « J’ai terminé » à la fin de votre réponse."}
                        </span>
                      )}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <button type="button" onClick={switchToText} className="inline-flex items-center gap-2 text-xs font-semibold text-[#C9D3F2] underline underline-offset-4">
                        <Keyboard size={15} /> Répondre par écrit
                      </button>
                      <button type="button" onClick={() => listener.finish()} disabled={live === "paused"} className="btn-gradient inline-flex min-h-12 items-center gap-2 rounded-2xl px-6 text-sm font-bold">
                        J’ai terminé <Send size={17} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {micStatus !== "granted" && (
                      <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs font-semibold text-[#C9D3F2]">
                        <MicOff size={14} /> Mode écrit : {micStatus === "denied" ? "micro non autorisé" : micStatus === "no-device" ? "aucun micro détecté" : micStatus === "busy" ? "micro occupé" : "micro indisponible"}
                      </p>
                    )}
                    <label htmlFor="reponse" className="mb-2 block text-sm font-semibold">Votre réponse</label>
                    <textarea id="reponse" autoFocus value={answer} onChange={(e) => setAnswer(e.target.value)} rows={4} maxLength={8000}
                      onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) void submit(answer); }}
                      placeholder="Écrivez votre réponse comme vous la diriez à l’oral…"
                      className="w-full resize-y rounded-2xl border border-white/20 bg-white/95 p-4 text-sm leading-7 text-[#172041] outline-none focus:border-[#BA92FF] focus:ring-2 focus:ring-[#BA92FF]/30" />
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      {listenMode || micStatus === "denied" || micStatus === "busy" ? (
                        <button type="button" onClick={() => void switchToVoice()} className="glass-dark inline-flex min-h-12 items-center gap-2 rounded-2xl px-5 text-sm font-semibold">
                          <Mic size={17} /> Répondre à l’oral
                        </button>
                      ) : (
                        <span className="text-xs text-[#AEB9DA]">Ctrl + Entrée pour envoyer</span>
                      )}
                      <button type="button" onClick={() => void submit(answer)} disabled={!answer.trim()} className="btn-gradient inline-flex min-h-12 items-center gap-2 rounded-2xl px-6 text-sm font-bold">
                        Envoyer ma réponse <Send size={17} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {notice && <p role="status" className="mt-4 max-w-xl text-sm leading-6 text-[#F2C9A0]">{notice}</p>}
            {error && phase === "live" && (
              <p role="alert" className="mt-4 rounded-xl bg-[#FFF0ED] p-3 text-sm text-[#A64040]">
                <AlertTriangle size={16} className="mr-2 inline" />
                {error}
              </p>
            )}
          </div>
        </section>

        {phase === "live" && session && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button type="button" onClick={replay} disabled={live === "thinking" || live === "transcribing"} className="glass-dark inline-flex min-h-12 items-center gap-2 rounded-2xl px-5 text-sm">
              <Volume2 size={18} /> Réécouter
            </button>
            <button type="button" onClick={toggleMute} aria-pressed={muted} className="glass-dark inline-flex min-h-12 items-center gap-2 rounded-2xl px-5 text-sm">
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />} {muted ? "Son coupé" : "Son activé"}
            </button>
            {listenMode && (
              <button type="button" onClick={toggleHandsFree} aria-pressed={handsFree} className="glass-dark inline-flex min-h-12 items-center gap-2 rounded-2xl px-5 text-sm">
                {handsFree ? <Mic size={18} /> : <MicOff size={18} />} {handsFree ? "Mains libres" : "Mode manuel"}
              </button>
            )}
            <button type="button" onClick={togglePause} disabled={live === "thinking" || live === "transcribing"} className="glass-dark inline-flex min-h-12 items-center gap-2 rounded-2xl px-5 text-sm">
              {live === "paused" ? <Play size={18} /> : <Pause size={18} />} {live === "paused" ? "Reprendre" : "Pause"}
            </button>
            <button type="button" onClick={() => setStopOpen(true)} className="glass-danger min-h-12 rounded-2xl px-5 text-sm font-semibold">
              Terminer
            </button>
          </div>
        )}

        {stopOpen && (
          <div role="dialog" aria-modal="true" aria-labelledby="stop-title" className="mx-auto mt-5 max-w-md rounded-[24px] border border-[#CEB2DC]/40 bg-[#1C2548] p-6 shadow-2xl">
            <h3 id="stop-title" className="font-bold">Terminer l’entretien maintenant ?</h3>
            <p className="mt-2 text-sm leading-6 text-[#CFD6EA]">
              {session && session.index > 1
                ? "Lina préparera un bilan à partir des réponses déjà données."
                : "Vous n’avez pas encore répondu : aucun bilan ne sera produit."}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" autoFocus onClick={() => setStopOpen(false)} className="glass-dark min-h-11 rounded-2xl px-5">
                Continuer l’entretien
              </button>
              <button type="button" onClick={() => void endEarly()} className="glass-danger min-h-11 rounded-2xl px-5 font-bold">
                Terminer
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
