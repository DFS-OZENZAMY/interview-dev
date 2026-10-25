import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, Check, CirclePlay, Clock3, Code2, Languages, Mic, Pencil, Play, Target, Volume2 } from "lucide-react";
import { CandidateShell } from "../components/CandidateShell";
import { api } from "../lib/api";
import { DURATIONS, OBJECTIVES, QUESTIONS_BY_DURATION, TYPES, cn } from "../lib/labels";
import { configStore, profileStore } from "../lib/storage";
import { listener, speaker } from "../lib/voice-instance";
import type { Duration, InterviewType, Locale, Objective, VoiceConfig } from "../lib/types";

const card = "panel panel-strong rounded-[28px] p-6 sm:p-9";
const PROVIDERS: Record<string, string> = { elevenlabs: "ElevenLabs", openai: "OpenAI", groq: "Whisper (Groq)" };

export default function Preparation() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const profile = profileStore.get();
  const previous = configStore.get();
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const [type, setType] = useState<InterviewType | null>(previous?.type ?? null);
  const [poste, setPoste] = useState(previous?.poste ?? "");
  const [description, setDescription] = useState(previous?.description ?? "");
  const [locale, setLocale] = useState<Locale>(previous?.locale ?? profile?.locale ?? "fr");
  const [objectifs, setObjectifs] = useState<Objective[]>(previous?.objectifs ?? profile?.objectifs ?? []);
  const [duree, setDuree] = useState<Duration>(previous?.duree ?? 20);
  const [voice, setVoice] = useState<VoiceConfig | null>(null);
  const [launching, setLaunching] = useState(false);
  const [micNotice, setMicNotice] = useState("");
  const currentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.voiceConfig().then(setVoice).catch(() => setVoice(null));
  }, []);
  useEffect(() => {
    if (step > 0 && !reduced) currentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, reduced]);

  if (!profile) return <Navigate to="/profil" replace />;

  const valid = step === 0 ? type !== null : step === 1 ? poste.trim().length >= 2 && poste.length <= 100 && description.length <= 3000 : objectifs.length >= 1;
  const summary = [
    type ? TYPES[type].label : "",
    poste.trim(),
    `${locale === "fr" ? "Français" : "Anglais"}, ${duree} minutes, ${objectifs.length} objectif${objectifs.length > 1 ? "s" : ""}`,
  ];

  function advance() {
    if (!valid) return;
    if (step < 2) setStep(step + 1);
    else setComplete(true);
  }

  const toggle = (o: Objective) =>
    setObjectifs((prev) => (prev.includes(o) ? prev.filter((x) => x !== o) : prev.length < 3 ? [...prev, o] : prev));

  async function launch() {
    if (!type) return;
    setLaunching(true);
    // Ce clic débloque la lecture audio et demande le micro une seule fois, avant l'entretien.
    speaker.unlock();
    const micOk = await listener.prepare();
    configStore.set({ type, poste: poste.trim(), description: description.trim(), locale, objectifs, experience: profile!.experience, duree });
    if (!micOk) {
      setMicNotice("Le micro n’est pas autorisé : vous pourrez répondre par écrit, ou l’autoriser dans les réglages du navigateur.");
      setTimeout(() => navigate("/entretien"), 2200);
      return;
    }
    navigate("/entretien");
  }

  const voiceLabel =
    voice?.tts.mode === "server" ? `Voix ${PROVIDERS[voice.tts.provider ?? ""] ?? voice.tts.provider}` : voice?.tts.mode === "none" ? "Sans voix (texte uniquement)" : "Voix du navigateur";
  const earLabel = voice?.stt.mode === "server" ? `Écoute par ${PROVIDERS[voice.stt.provider ?? ""] ?? voice.stt.provider}` : "Reconnaissance vocale du navigateur";

  return (
    <CandidateShell
      section="Simulation"
      title="Préparer mon entretien"
      icon={CirclePlay}
      actions={
        <Link to="/tableau-de-bord" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-[#405AB7] hover:bg-white">
          <ArrowLeft size={16} /> Mon espace
        </Link>
      }
    >
      <div className="mx-auto w-full max-w-[1100px]">
        <div className="mb-9">
          <h1 className="text-[clamp(2.1rem,4vw,3.4rem)] font-extrabold leading-[1.1] tracking-[-.055em]">Votre entretien, vos objectifs.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#677792]">Trois étapes pour que Lina prépare un entretien qui vous ressemble. Chaque choix reste modifiable.</p>
          <div className="mt-7 flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className={cn("h-1.5 flex-1 rounded-full", i <= step ? "bg-gradient-to-r from-[#5365FF] via-[#8855EF] to-[#E054CA]" : "bg-[#E4E0F1]")} />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {Array.from({ length: complete ? 3 : step }, (_, i) => (
            <motion.div layout key={i} initial={reduced ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between gap-4 rounded-2xl border border-[#C6EEE5] bg-[#EDFCF9]/85 px-5 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#CDF5EB] text-[#15897C]">
                  <Check size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#1C8B83]">Étape {i + 1} validée</p>
                  <p className="truncate text-sm font-semibold">{summary[i]}</p>
                </div>
              </div>
              <button type="button" onClick={() => { setComplete(false); setStep(i); }}
                className="flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-[#315F7C] hover:bg-white">
                <Pencil size={14} /> Modifier
              </button>
            </motion.div>
          ))}
        </div>

        <div ref={currentRef} className="scroll-mt-28">
          <AnimatePresence mode="wait">
            {!complete ? (
              <motion.section key={step} initial={reduced ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -15 }}
                transition={{ duration: reduced ? 0 : 0.36 }} className={card + " mt-4"}>
                <p className="text-sm font-bold text-[#8256E9]">Étape {step + 1} sur 3</p>
                {step === 0 && (
                  <>
                    <h2 className="mt-2 text-2xl font-bold">Quel entretien souhaitez-vous préparer ?</h2>
                    <div role="radiogroup" aria-label="Type d’entretien" className="mt-7 grid gap-4 sm:grid-cols-2">
                      {([["rh", BriefcaseBusiness], ["technique", Code2]] as const).map(([key, Icon]) => (
                        <button key={key} type="button" role="radio" aria-checked={type === key} onClick={() => setType(key)}
                          className={cn("choice rounded-2xl border p-6 text-left transition hover:-translate-y-1", type === key ? "border-[#8E67EF] bg-[#F1EBFF]" : "border-[#DFE3F1] bg-white/80 hover:border-[#AA8EF0]")}>
                          <span className="flex items-center justify-between">
                            <Icon size={24} className="text-[#8458E7]" />
                            {type === key && <Check size={18} className="text-[#8458E7]" />}
                          </span>
                          <strong className="mt-5 block text-lg">{TYPES[key].label}</strong>
                          <span className="mt-2 block text-sm leading-6 text-[#63738E]">{TYPES[key].detail}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
                {step === 1 && (
                  <>
                    <h2 className="mt-2 text-2xl font-bold">Parlons du poste visé.</h2>
                    <label className="mt-7 block text-sm font-semibold">
                      Poste ciblé
                      <input required value={poste} maxLength={100} onChange={(e) => setPoste(e.target.value.replace(/[<>{}`\n\r]/g, ""))}
                        placeholder="Ex. Data Analyst, Chargé de recrutement…"
                        className="mt-2 block w-full rounded-xl border border-[#CBD7EE] bg-white px-4 py-3 text-base outline-none focus:border-[#8855EF]" />
                    </label>
                    <label className="mt-6 block text-sm font-semibold" htmlFor="fiche">
                      Fiche de poste <span className="font-normal text-[#7B8AA2]">(facultative)</span>
                    </label>
                    <textarea id="fiche" value={description} onChange={(e) => setDescription(e.target.value.slice(0, 3000))} rows={6}
                      placeholder="Collez les missions et compétences recherchées : Lina s’en servira pour cibler ses questions."
                      className="mt-2 block w-full resize-y rounded-2xl border border-[#CBD7EE] bg-white px-4 py-4 text-sm leading-7 outline-none placeholder:text-[#8793AA] focus:border-[#8855EF]" />
                    <p className="mt-2 text-right text-xs text-[#7887A1]">{description.length} / 3000</p>
                  </>
                )}
                {step === 2 && (
                  <>
                    <h2 className="mt-2 text-2xl font-bold">Personnalisons votre séance.</h2>
                    <div className="mt-7">
                      <p className="mb-3 flex items-center gap-2 text-sm font-semibold"><Languages size={17} /> Langue de l’entretien</p>
                      <div className="grid grid-cols-2 gap-3">
                        {([["fr", "Français"], ["en", "English"]] as [Locale, string][]).map(([v, label]) => (
                          <button key={v} type="button" aria-pressed={locale === v} onClick={() => setLocale(v)}
                            className={cn("choice rounded-xl border px-4 py-3 text-sm font-semibold", locale === v ? "border-[#8755ED] bg-[#F1EBFF] text-[#744BD3]" : "border-[#D8E2F3] bg-white")}>
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-7">
                      <p className="mb-3 flex items-center justify-between text-sm font-semibold">
                        <span className="flex items-center gap-2"><Target size={17} /> Objectifs de la séance</span>
                        <span className="text-xs text-[#687896]">{objectifs.length} sur 3</span>
                      </p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {(Object.keys(OBJECTIVES) as Objective[]).map((key) => {
                          const on = objectifs.includes(key);
                          return (
                            <button key={key} type="button" aria-pressed={on} disabled={!on && objectifs.length >= 3} onClick={() => toggle(key)}
                              className={cn("choice flex items-center justify-between gap-2 rounded-xl border p-3.5 text-left text-sm disabled:opacity-40", on ? "border-[#B5E9E1] bg-[#EAFBF8]" : "border-[#DAE2F0] bg-white")}>
                              {OBJECTIVES[key].label} {on && <Check size={16} className="text-[#18816A]" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="mt-7">
                      <p className="mb-3 flex items-center gap-2 text-sm font-semibold"><Clock3 size={17} /> Durée</p>
                      <div className="grid grid-cols-3 gap-3">
                        {DURATIONS.map((min) => (
                          <button key={min} type="button" aria-pressed={duree === min} onClick={() => setDuree(min)}
                            className={cn("choice rounded-xl border px-2 py-4 text-sm font-bold", duree === min ? "border-[#9565ED] bg-[#F2EAFE] text-[#754BCC]" : "border-[#DAE2F0] bg-white")}>
                            {min} min
                            <span className="mt-1 block text-[11px] font-medium">{QUESTIONS_BY_DURATION[min]} questions</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                <div className="mt-9 flex flex-wrap items-center justify-between gap-3 border-t border-[#E1E7F3] pt-6">
                  <button type="button" onClick={() => (step === 0 ? navigate("/tableau-de-bord") : setStep(step - 1))}
                    className="btn-soft inline-flex min-h-12 items-center gap-2 rounded-2xl px-5 text-sm font-semibold">
                    <ArrowLeft size={17} /> Retour
                  </button>
                  <button type="button" onClick={advance} disabled={!valid} className="btn-gradient inline-flex min-h-12 items-center gap-2 rounded-2xl px-6 text-sm font-bold">
                    {step === 2 ? "Vérifier ma configuration" : "Valider et continuer"} <ArrowRight size={17} />
                  </button>
                </div>
              </motion.section>
            ) : (
              <motion.section key="recap" initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={card + " mt-4"}>
                <p className="flex items-center gap-2 text-sm font-bold text-[#21856A]"><Check size={17} /> Configuration terminée</p>
                <h2 className="mt-3 text-2xl font-bold">Tout est prêt pour votre entretien avec Lina.</h2>
                <dl className="mt-6 grid gap-3 rounded-2xl bg-[#F2F5FD] p-5 text-sm sm:grid-cols-2">
                  <div><dt className="font-semibold text-[#5A6A88]">Format</dt><dd className="mt-1 font-bold">{summary[0]}</dd></div>
                  <div><dt className="font-semibold text-[#5A6A88]">Poste</dt><dd className="mt-1 font-bold">{summary[1]}</dd></div>
                  <div><dt className="font-semibold text-[#5A6A88]">Langue et durée</dt><dd className="mt-1 font-bold">{locale === "fr" ? "Français" : "English"}, {duree} minutes ({QUESTIONS_BY_DURATION[duree]} questions)</dd></div>
                  <div><dt className="font-semibold text-[#5A6A88]">Objectifs</dt><dd className="mt-1 font-bold">{objectifs.map((o) => OBJECTIVES[o].label).join(", ")}</dd></div>
                  {description.trim() && <div className="sm:col-span-2"><dt className="font-semibold text-[#5A6A88]">Fiche de poste</dt><dd className="mt-1">{description.trim().length} caractères transmis à Lina</dd></div>}
                </dl>
                <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-[#4E5E86]">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#EEF1FF] px-3 py-2"><Volume2 size={14} /> {voice ? voiceLabel : "Vérification de la voix…"}</span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#EEF1FF] px-3 py-2"><Mic size={14} /> {voice ? earLabel : "Vérification du micro…"}</span>
                </div>
                <p className="mt-5 rounded-xl border border-[#DBE3F1] bg-[#F6F8FC] p-4 text-sm leading-6 text-[#586A88]">
                  Lina parle, puis vous répondez à voix haute. Quand vous marquez une pause d’environ deux secondes, votre réponse est envoyée automatiquement. Vous pouvez aussi répondre par écrit à tout moment.
                </p>
                {micNotice && <p role="status" className="mt-4 rounded-xl bg-[#FFF5E8] p-3 text-sm text-[#8A5A1F]">{micNotice}</p>}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <button type="button" onClick={() => { setComplete(false); setStep(2); }} className="btn-soft inline-flex min-h-12 items-center gap-2 rounded-2xl px-5 text-sm font-semibold">
                    <Pencil size={16} /> Modifier mes choix
                  </button>
                  <button type="button" onClick={() => void launch()} disabled={launching} className="btn-gradient inline-flex min-h-12 items-center gap-3 rounded-2xl px-6 text-sm font-bold">
                    <Play size={17} /> {launching ? "Accès au micro…" : "Lancer mon entretien"}
                  </button>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>
    </CandidateShell>
  );
}
