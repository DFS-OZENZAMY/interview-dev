import { useState } from "react";
import { useNavigate } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Languages } from "lucide-react";
import { Logo } from "../components/Logo";
import { EXPERIENCES, OBJECTIVES, SITUATIONS, cn } from "../lib/labels";
import { profileStore } from "../lib/storage";
import type { Experience, Locale, Objective, Situation } from "../lib/types";

const card = "panel panel-strong rounded-[28px] p-6 sm:p-9";

/** Profil candidat : trois questions, enregistrées dans ce navigateur. */
export default function ProfilePage() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const saved = profileStore.get();
  const [step, setStep] = useState(0);
  const [prenom, setPrenom] = useState(saved?.prenom ?? "");
  const [situation, setSituation] = useState<Situation | "">(saved?.situation ?? "");
  const [experience, setExperience] = useState<Experience | "">(saved?.experience ?? "");
  const [locale, setLocale] = useState<Locale>(saved?.locale ?? "fr");
  const [objectifs, setObjectifs] = useState<Objective[]>(saved?.objectifs ?? []);

  const valid = step === 0 ? prenom.trim().length >= 2 : step === 1 ? Boolean(situation && experience) : objectifs.length >= 1;

  function next() {
    if (!valid) return;
    if (step < 2) return setStep(step + 1);
    profileStore.set({
      prenom: prenom.trim(),
      situation: situation as Situation,
      experience: experience as Experience,
      locale,
      objectifs,
      createdAt: saved?.createdAt ?? Date.now(),
    });
    navigate("/tableau-de-bord");
  }

  const toggle = (o: Objective) =>
    setObjectifs((prev) => (prev.includes(o) ? prev.filter((x) => x !== o) : prev.length < 3 ? [...prev, o] : prev));

  return (
    <main className="relative min-h-dvh overflow-x-clip bg-[#F5F8FF] text-ink">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob -left-[10%] -top-44 h-[min(46vw,650px)] w-[min(46vw,650px)] bg-[#b1c7fa]/50 blur-[65px]" />
        <div className="blob -right-[12%] top-[12%] h-[min(52vw,720px)] w-[min(52vw,720px)] bg-[#dbd3fa]/50 blur-[65px]" />
        <div className="blob -bottom-52 left-[26%] h-[min(42vw,550px)] w-[min(42vw,550px)] bg-[#c3e8ed]/50 blur-[65px]" />
      </div>
      <div className="relative mx-auto max-w-[760px] px-5 pb-16 pt-8 sm:px-8">
        <Logo />
        <div className="mb-8 mt-12">
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-.055em]">
            {saved ? "Votre profil" : "Faisons connaissance."}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-ink-soft">
            Lina s’en sert pour adapter ses questions à votre situation. Vos informations restent dans ce navigateur.
          </p>
          <div className="mt-6 flex items-center gap-2" role="progressbar" aria-valuemin={1} aria-valuemax={3} aria-valuenow={step + 1} aria-label="Progression du profil">
            {[0, 1, 2].map((i) => (
              <div key={i} className={cn("h-1.5 flex-1 rounded-full", i <= step ? "bg-gradient-to-r from-[#5365FF] via-[#8855EF] to-[#E054CA]" : "bg-[#E4E0F1]")} />
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.section
            key={step}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: reduced ? 0 : 0.32 }}
            className={card}
          >
            <p className="text-sm font-bold text-[#8256E9]">Question {step + 1} sur 3</p>
            {step === 0 && (
              <>
                <h2 className="mt-2 text-2xl font-bold">Comment Lina doit-elle vous appeler ?</h2>
                <label className="mt-6 block text-sm font-semibold">
                  Prénom
                  <input
                    autoFocus
                    value={prenom}
                    maxLength={40}
                    onChange={(e) => setPrenom(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && next()}
                    placeholder="Ex. Othmane"
                    className="mt-2 block w-full rounded-xl border border-[#CBD7EE] bg-white px-4 py-3 text-base outline-none focus:border-[#8855EF]"
                  />
                </label>
              </>
            )}
            {step === 1 && (
              <>
                <h2 className="mt-2 text-2xl font-bold">Où en êtes-vous ?</h2>
                <p className="mt-6 text-sm font-semibold">Votre situation</p>
                <div role="radiogroup" aria-label="Situation" className="mt-2 grid gap-2 sm:grid-cols-2">
                  {(Object.entries(SITUATIONS) as [Situation, string][]).map(([key, label]) => (
                    <button key={key} type="button" role="radio" aria-checked={situation === key} onClick={() => setSituation(key)}
                      className={cn("choice flex items-center justify-between gap-2 rounded-xl border p-3.5 text-left text-sm", situation === key ? "border-[#8E67EF] bg-[#F1EBFF] font-semibold" : "border-[#DFE3F1] bg-white/80 hover:border-[#AA8EF0]")}>
                      {label} {situation === key && <Check size={16} className="text-[#8458E7]" />}
                    </button>
                  ))}
                </div>
                <p className="mt-6 text-sm font-semibold">Votre expérience professionnelle</p>
                <div role="radiogroup" aria-label="Expérience" className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(Object.entries(EXPERIENCES) as [Experience, string][]).map(([key, label]) => (
                    <button key={key} type="button" role="radio" aria-checked={experience === key} onClick={() => setExperience(key)}
                      className={cn("choice rounded-xl border px-3 py-3 text-sm", experience === key ? "border-[#8E67EF] bg-[#F1EBFF] font-semibold text-[#744BD3]" : "border-[#DFE3F1] bg-white/80 hover:border-[#AA8EF0]")}>
                      {label}
                    </button>
                  ))}
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <h2 className="mt-2 text-2xl font-bold">Sur quoi voulez-vous progresser ?</h2>
                <p className="mt-2 text-sm text-ink-soft">Jusqu’à trois objectifs. Ils seront proposés par défaut dans vos simulations.</p>
                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  {(Object.entries(OBJECTIVES) as [Objective, { label: string; detail: string }][]).map(([key, o]) => {
                    const on = objectifs.includes(key);
                    return (
                      <button key={key} type="button" aria-pressed={on} disabled={!on && objectifs.length >= 3} onClick={() => toggle(key)}
                        className={cn("choice flex items-start justify-between gap-3 rounded-2xl border p-4 text-left disabled:opacity-40", on ? "border-[#B5E9E1] bg-[#EAFBF8]" : "border-[#DAE2F0] bg-white/85 hover:border-[#A88BF0]")}>
                        <span>
                          <strong className="block text-sm">{o.label}</strong>
                          <span className="mt-1 block text-xs leading-5 text-[#687896]">{o.detail}</span>
                        </span>
                        {on && <Check size={17} className="mt-0.5 shrink-0 text-[#18816A]" />}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-6 flex items-center gap-2 text-sm font-semibold">
                  <Languages size={17} /> Langue préférée pour vos entretiens
                </p>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {([["fr", "Français"], ["en", "English"]] as [Locale, string][]).map(([v, label]) => (
                    <button key={v} type="button" aria-pressed={locale === v} onClick={() => setLocale(v)}
                      className={cn("choice rounded-xl border px-4 py-3 text-sm font-semibold", locale === v ? "border-[#8755ED] bg-[#F1EBFF] text-[#744BD3]" : "border-[#D8E2F3] bg-white")}>
                      {label}
                    </button>
                  ))}
                </div>
              </>
            )}
            <div className="mt-9 flex flex-wrap items-center justify-between gap-3 border-t border-[#E1E7F3] pt-6">
              <button type="button" onClick={() => (step === 0 ? navigate(saved ? "/tableau-de-bord" : "/") : setStep(step - 1))}
                className="btn-soft inline-flex min-h-12 items-center gap-2 rounded-2xl px-5 text-sm font-semibold">
                <ArrowLeft size={17} /> Retour
              </button>
              <button type="button" onClick={next} disabled={!valid} className="btn-gradient inline-flex min-h-12 items-center gap-2 rounded-2xl px-6 text-sm font-bold">
                {step === 2 ? "Enregistrer mon profil" : "Continuer"} <ArrowRight size={17} />
              </button>
            </div>
          </motion.section>
        </AnimatePresence>
      </div>
    </main>
  );
}
