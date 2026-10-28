import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AlertTriangle, ArrowLeft, CirclePlay, Keyboard, Mic, MicOff, Pause, Play, RotateCcw, Send, Target, UserRound, Volume2, VolumeX } from "lucide-react";
import { CandidateShell } from "../components/CandidateShell";
import { VoiceOrb, type OrbState } from "../components/VoiceOrb";
import { Countdown } from "../components/Countdown";
import { AnalysisLoader } from "../components/AnalysisLoader";
import { ApiError, api, type Turn } from "../lib/api";
import { TYPES, cn } from "../lib/labels";
import { configStore, historyStore } from "../lib/storage";
import { SpeechRecognitionImpl, hasAudioInput, type MicStatus } from "../lib/voice";
import { listener, speaker } from "../lib/voice-instance";
import type { VoiceConfig } from "../lib/types";

/** preflight : la session se crée pendant que le candidat s'installe ; il démarre quand il est prêt (V4 d'ai-interview-platform). */
type Phase = "preflight" | "intro" | "countdown" | "live" | "analyzing" | "failed";
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
  const [phase, setPhase] = useState<Phase>("preflight");
  const [ready, setReady] = useState(false);
  const [preflightError, setPreflightError] = useState("");
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
    startPromise.current.then(
      () => alive.current && setReady(true),
      (e) => alive.current && setPreflightError(e instanceof ApiError ? e.message : "Impossible de préparer l’entretien."),
    );
    // Vérifie le micro pendant l'intro : la première écoute attend ce résultat.
    micCheck.current = listener.prepare();
    void micCheck.current.then((st) => alive.current && setMicStatus(st));
    api
      .voiceConfig()
      .catch(() => FALLBACK_VOICE)
      .then((cfg) => {
        if (!alive.current) return;
        setVoice(cfg);
      });
  }, [config]);

  /** Le clic du candidat lance l'intro : il débloque aussi la lecture audio du navigateur. */
  function startIntro() {
    speaker.unlock();
    setPhase("intro");
    void playIntro(v);
  }

  function retryPreflight() {
    if (!config) return;
    setPreflightError("");
    startPromise.current = api.start(config);
    startPromise.current.then(
      () => alive.current && setReady(true),
      (e) => alive.current && setPreflightError(e instanceof ApiError ? e.message : "Impossible de préparer l’entretien."),
    );
  }

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
      // La question s'affiche immédiatement ; la voix est une amélioration progressive.
      requestAnimationFrame(() => alive.current && setRevealed(true));
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
      });
      if (!alive.current || myTurn !== turn.current) return;
      setRevealed(true);
      if (r === "stopped" && !interrupting.current) return;
      if (r === "blocked") setNotice("Le navigateur a bloqué le son : cliquez sur « Réécouter » pour entendre Lina.");
      if (r === "silent") setNotice("La voix ne répond pas. La question est affichée : vous pouvez répondre directement.");
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

  if (phase === "preflight" || phase === "intro" || phase === "countdown") {
    const phrases = v.phrases.intro[locale];
    // Intro claire (V4 d'ai-interview-platform) : préparation, accueil de Lina, puis compte à rebours.
    return (
      <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#FAFAFF] px-5 py-12 text-[#1C2850]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_22%_25%,#EBEBFF_0%,transparent_53%),radial-gradient(ellipse_at_85%_75%,#F9EAF9_0%,transparent_55%)]" />
        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          {phase === "countdown" ? (
            <div className="flex min-h-[65vh] flex-col items-center justify-center">
              <p className="mb-8 text-xs font-bold tracking-[.2em] text-[#7C73AB]">Votre entretien commence</p>
              <Countdown light onComplete={() => void beginInterview()} />
            </div>
          ) : (
            <>
              <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#E4E0FA] bg-white/80 px-4 py-2 text-xs font-semibold text-[#7663C4] shadow-sm">
                <span className="size-2 rounded-full bg-[#7ADCC9]" /> {TYPES[config.type].label} · {config.poste}
              </span>
              <p className="text-xs font-extrabold tracking-[.26em] text-[#8671DD]">INTERVIEWLAB</p>
              <h1 className="mt-4 text-3xl font-extrabold tracking-[-.04em] sm:text-5xl">
                {phase === "intro" ? "Bienvenue dans votre entretien" : preflightError ? "La connexion n’a pas abouti" : ready ? "Vous êtes prêt." : "Préparons votre connexion"}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#6B7898]">
                {phase === "intro"
                  ? "Lina, votre intervieweuse IA, vous accueille. Écoutez son message avant de commencer."
                  : preflightError
                    ? preflightError
                    : ready
                      ? "Votre préparation est terminée. Démarrez lorsque vous êtes prêt."
                      : "Lina prépare votre entretien. Installez-vous confortablement."}
              </p>
              <div className="relative my-8 size-48 sm:size-60">
                <VoiceOrb light state={phase === "intro" ? "speaking" : "ready"} level={() => speaker.level()} />
              </div>
              {phase === "intro" ? (
                <div className="flex min-h-28 w-full flex-col items-center gap-2 text-balance text-[clamp(1.25rem,3vw,1.9rem)] font-semibold leading-snug tracking-[-.03em]" aria-label={phrases.join(" ")}>
                  {phrases.map((p, i) => (
                    <span key={i} aria-hidden="true" className={cn("block transition-[opacity,transform,filter] duration-700 ease-out", introReveal > i ? "translate-y-0 opacity-100 blur-none" : "translate-y-3 opacity-0 blur-[6px]", i === phrases.length - 1 && "gradient-text")}>
                      {p}
                    </span>
                  ))}
                </div>
              ) : preflightError ? (
                <button type="button" onClick={retryPreflight} className="btn-gradient inline-flex min-h-12 items-center gap-2 rounded-2xl px-6 text-sm font-bold">
                  <RotateCcw size={17} /> Réessayer
                </button>
              ) : (
                <button type="button" onClick={startIntro} disabled={!ready} className="btn-gradient inline-flex min-h-13 items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-bold">
                  <Play size={17} /> {ready ? "Démarrer l’entretien" : "Préparation…"}
                </button>
              )}
              {phase === "intro" && introBlocked && (
                <div className="mt-5 flex flex-col items-center gap-3">
                  <p role="status" className="max-w-sm text-sm leading-6 text-[#5B6887]">Le navigateur attend votre accord pour lancer le son.</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <button type="button" onClick={() => { speaker.unlock(); void playIntro(v); }} className="btn-soft inline-flex min-h-12 items-center gap-2 rounded-2xl px-6 text-sm font-semibold">
                      <Volume2 size={17} /> Écouter Lina
                    </button>
                    <button type="button" onClick={() => { setMuted(true); prefs.current.muted = true; setPhase("countdown"); }} className="btn-gradient inline-flex min-h-12 items-center rounded-2xl px-5 text-sm font-bold">
                      Continuer sans le son
                    </button>
                  </div>
                </div>
              )}
              <Link to="/preparation" className="mt-8 text-sm font-medium text-[#71809D] underline underline-offset-4">Retour à la configuration</Link>
            </>
          )}
        </div>
      </main>
    );
  }

  const orbState: OrbState = phase === "failed" ? "error" : live === "transcribing" ? "thinking" : live;
  const parts = segments(question);
  const canAnswer = live === "listening" || live === "paused";
  const minutes = `${String(Math.floor(elapsed / 60)).padStart(2, "0")}:${String(elapsed % 60).padStart(2, "0")}`;
  const soft = "btn-soft inline-flex min-h-12 items-center gap-2 rounded-2xl px-5 text-sm font-semibold text-[#5747AB]";

  // Salle d'entretien claire (V4 d'ai-interview-platform) : carte « Votre séance » à gauche, scène à droite.
  return (
    <CandidateShell
      section="Simulation"
      title="Votre entretien IA"
      icon={CirclePlay}
      actions={
        <>
          <span className="rounded-full border border-[#DAD0FD] bg-[#EDE7FF] px-4 py-2 text-xs font-bold text-[#7353CC]">
            {session ? `Question ${session.index} sur ${session.total}` : "Entretien d’entraînement"}
          </span>
          <span className="text-sm font-semibold tabular-nums text-[#566382]" aria-label="Durée de la séance">{minutes}</span>
        </>
      }
    >
      <div className="grid items-start gap-5 xl:grid-cols-[minmax(300px,.8fr)_minmax(0,1.2fr)]">
        <section className="rounded-[26px] border border-[#E3E5F5] bg-white p-6 shadow-[0_15px_45px_rgba(66,70,137,.06)] sm:p-8">
          <p className="text-xs font-extrabold tracking-[.12em] text-[#8657E4]">VOTRE SÉANCE</p>
          <h2 className="mt-3 text-xl font-extrabold tracking-tight text-[#1B2850]">{TYPES[config.type].label}</h2>
          <div className="mt-5 rounded-2xl border border-[#E6E8F8] bg-[#FAFAFF] p-4">
            <p className="text-xs font-semibold text-[#8290AD]">Poste préparé</p>
            <p className="mt-1 font-bold text-[#26365D]">{config.poste}</p>
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[#E6E8F8] p-4">
            <span className="grid size-11 place-items-center rounded-2xl bg-[#EDE7FF] text-[#8057DD]"><UserRound size={21} /></span>
            <div>
              <p className="text-sm font-bold text-[#25345C]">Lina, intervieweuse IA</p>
              <p className="text-xs text-[#75839F]">Simulation conversationnelle · {locale === "en" ? "Anglais" : "Français"}</p>
            </div>
          </div>
          {session && (
            <div className="mt-5 flex gap-1.5" aria-hidden="true">
              {Array.from({ length: session.total }, (_, i) => (
                <span key={i} className={cn("h-1.5 flex-1 rounded-full transition-colors duration-500", i < session.index ? "bg-gradient-to-r from-[#665CF1] to-[#B750CC]" : "bg-[#ECE9F8]")} />
              ))}
            </div>
          )}
          <h3 className="mt-7 text-sm font-bold text-[#26365D]">Votre objectif</h3>
          <p className="mt-2 text-sm leading-7 text-[#697794]">Répondez naturellement aux questions. Prenez le temps de structurer vos idées et illustrez-les par des exemples concrets.</p>
          <div className="mt-6 rounded-2xl bg-[#F0EDFF] p-5">
            <p className="flex items-center gap-2 text-sm font-bold text-[#7751D4]"><Target size={17} /> Conseils pour la séance</p>
            <p className="mt-2 text-sm leading-7 text-[#4F5E87]">Écoutez la question, expliquez votre action personnelle et terminez par le résultat obtenu.</p>
          </div>
          <button type="button" onClick={() => setStopOpen(true)} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#7457CA] hover:underline">
            <ArrowLeft size={16} /> Quitter l’entretien
          </button>
        </section>

        <div className="min-w-0">
          <section className="rounded-[28px] border border-[#E6E2F5] bg-[linear-gradient(145deg,#FFFFFF_0%,#FCFAFF_62%,#F7F3FF_100%)] p-6 text-[#1F2A44] shadow-[0_16px_50px_rgba(74,61,130,.08)] sm:p-8">
            <div className="mx-auto flex w-full max-w-[920px] flex-col items-center text-center">
              <div className="relative size-28 sm:size-36">
                <VoiceOrb light state={orbState} level={orbLevel} />
              </div>
              <p className="mt-5 text-sm font-bold text-[#7655D1]" aria-live="polite">
                {phase === "failed" ? "Connexion impossible" : STATUS[live]}
              </p>

              <div className="mt-5 flex min-h-28 w-full items-center justify-center">
                {question && phase !== "failed" ? (
                  <h2 aria-label={question} className="flex max-w-[640px] flex-col items-center gap-2 text-balance text-lg font-semibold leading-[1.55] tracking-tight text-[#1F2A44] sm:text-[23px]">
                    {parts.map((p, i) => (
                      <span key={`${session?.index}-${i}`} aria-hidden="true" style={{ transitionDelay: `${revealed ? i * 120 : 0}ms` }}
                        className={cn("block transform-gpu transition-[opacity,transform,filter] duration-500 ease-out", revealed ? "translate-y-0 opacity-100 blur-none" : "translate-y-2 opacity-0 blur-[4px]")}>
                        {p}
                      </span>
                    ))}
                  </h2>
                ) : (
                  <p className="text-lg text-[#5E6D92]">{phase === "failed" ? error : "Lina prépare sa première question…"}</p>
                )}
              </div>

              {phase === "failed" && (
                <button type="button" onClick={retryStart} className="btn-gradient mt-6 inline-flex min-h-12 items-center gap-2 rounded-2xl px-6 text-sm font-bold">
                  <RotateCcw size={17} /> Réessayer
                </button>
              )}

              {live === "speaking" && phase === "live" && (
                <button type="button" onClick={interrupt} className={cn(soft, "mt-6")}>
                  <Mic size={17} /> Prendre la parole
                </button>
              )}

              {canAnswer && phase === "live" && (
                <div className="mt-6 w-full text-left">
                  {!textMode ? (
                    <div className="rounded-2xl border border-[#DED9F1] bg-white p-4 shadow-[0_5px_25px_rgba(54,68,139,.05)]">
                      <p className="min-h-12 text-[15px] leading-7 text-[#26334E]" aria-live="polite">
                        {partial || (
                          <span className="text-[#65718D]">
                            {live === "paused" ? "L’écoute reprendra à la fin de la pause." : handsFree ? "Je vous écoute. Faites une pause de deux secondes quand vous avez terminé." : "Je vous écoute. Cliquez sur « J’ai terminé » à la fin de votre réponse."}
                          </span>
                        )}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <button type="button" onClick={switchToText} className="inline-flex items-center gap-2 text-xs font-semibold text-[#5747AB] underline underline-offset-4">
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
                        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#DED9F1] bg-white px-3 py-1.5 text-xs font-semibold text-[#5E6D92]">
                          <MicOff size={14} /> Mode écrit : {micStatus === "denied" ? "micro non autorisé" : micStatus === "no-device" ? "aucun micro détecté" : micStatus === "busy" ? "micro occupé" : "micro indisponible"}
                        </p>
                      )}
                      <label htmlFor="reponse" className="mb-2 block text-sm font-semibold text-[#1F2A44]">Votre réponse</label>
                      <textarea id="reponse" autoFocus value={answer} onChange={(e) => setAnswer(e.target.value)} rows={5} maxLength={8000}
                        onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) void submit(answer); }}
                        placeholder="Écrivez votre réponse comme vous la diriez à l’oral…"
                        className="w-full resize-y rounded-2xl border border-[#DED9F1] bg-white p-4 text-sm leading-7 text-[#172041] outline-none focus:border-[#9F86E8] focus:ring-2 focus:ring-[#9F86E8]/25" />
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        {listenMode || micStatus === "denied" || micStatus === "busy" ? (
                          <button type="button" onClick={() => void switchToVoice()} className={soft}>
                            <Mic size={17} /> Répondre à l’oral
                          </button>
                        ) : (
                          <span className="text-xs text-[#65718D]">Ctrl + Entrée pour envoyer</span>
                        )}
                        <button type="button" onClick={() => void submit(answer)} disabled={!answer.trim()} className="btn-gradient inline-flex min-h-12 items-center gap-2 rounded-2xl px-6 text-sm font-bold">
                          Envoyer ma réponse <Send size={17} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {notice && <p role="status" className="mt-4 max-w-xl rounded-xl bg-[#FFF6EA] px-4 py-2.5 text-sm leading-6 text-[#8A5A1F]">{notice}</p>}
              {error && phase === "live" && (
                <p role="alert" className="mt-4 rounded-xl bg-[#FFF0ED] p-3 text-sm text-[#A64040]">
                  <AlertTriangle size={16} className="mr-2 inline" />
                  {error}
                </p>
              )}
            </div>
          </section>

          {phase === "live" && session && (
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button type="button" onClick={replay} disabled={live === "thinking" || live === "transcribing"} className={soft}>
                <Volume2 size={18} /> Réécouter
              </button>
              <button type="button" onClick={toggleMute} aria-pressed={muted} className={soft}>
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />} {muted ? "Son coupé" : "Son activé"}
              </button>
              {listenMode && (
                <button type="button" onClick={toggleHandsFree} aria-pressed={handsFree} className={soft}>
                  {handsFree ? <Mic size={18} /> : <MicOff size={18} />} {handsFree ? "Mains libres" : "Mode manuel"}
                </button>
              )}
              <button type="button" onClick={togglePause} disabled={live === "thinking" || live === "transcribing"} className={soft}>
                {live === "paused" ? <Play size={18} /> : <Pause size={18} />} {live === "paused" ? "Reprendre" : "Pause"}
              </button>
              <button type="button" onClick={() => setStopOpen(true)} className="min-h-12 rounded-2xl border border-[#F0D8E1] bg-[#FFF2F5] px-5 text-sm font-semibold text-[#A44261] hover:bg-[#FFE7EE]">
                Terminer
              </button>
            </div>
          )}

          {stopOpen && (
            <div role="dialog" aria-modal="true" aria-labelledby="stop-title" className="mx-auto mt-5 max-w-md rounded-[24px] border border-[#E6E2F5] bg-white p-6 shadow-[0_20px_60px_rgba(66,70,137,.16)]">
              <h3 id="stop-title" className="font-bold text-[#1F2A44]">Terminer l’entretien maintenant ?</h3>
              <p className="mt-2 text-sm leading-6 text-[#5E6D92]">
                {session && session.index > 1 ? "Lina préparera un bilan à partir des réponses déjà données." : "Vous n’avez pas encore répondu : aucun bilan ne sera produit."}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button type="button" autoFocus onClick={() => setStopOpen(false)} className="btn-soft min-h-11 rounded-2xl px-5 text-sm font-semibold">
                  Continuer l’entretien
                </button>
                <button type="button" onClick={() => void endEarly()} className="min-h-11 rounded-2xl border border-[#F0D8E1] bg-[#FFF2F5] px-5 text-sm font-bold text-[#A44261]">
                  Terminer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </CandidateShell>
  );
}
