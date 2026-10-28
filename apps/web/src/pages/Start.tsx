import { Link, Navigate } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CheckCircle2, Drama, FileText, ListChecks, Sparkles } from "lucide-react";
import { Logo } from "../components/Logo";
import { LightAmbient } from "../components/LightAmbient";
import { OBJECTIVES } from "../lib/labels";
import { profileStore } from "../lib/storage";

/** « Passons à la pratique » : transition entre le profil et le premier entretien (repris d'ai-interview-platform). */
export default function Start() {
  const reduced = useReducedMotion();
  const profile = profileStore.get();
  if (!profile) return <Navigate to="/profil" replace />;
  const enter = (delay: number) => ({ initial: reduced ? (false as const) : { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay } });

  return (
    <main className="relative min-h-dvh overflow-x-clip bg-[#F8F9FF] text-ink">
      <LightAmbient />
      <div className="relative mx-auto max-w-[1100px] px-5 pb-16 pt-8 sm:px-8">
        <Logo subtitle="Votre espace de préparation" />
        <motion.section {...enter(0)} className="mt-12">
          <p className="text-sm font-bold text-[#8256E9]">Un parcours conçu pour vous</p>
          <h1 className="mt-2 text-[clamp(2.2rem,4.5vw,3.6rem)] font-extrabold leading-[1.08] tracking-[-.055em]">Passons à la pratique, {profile.prenom}.</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">
            Votre profil est prêt. Nous allons maintenant préparer un entretien adapté à votre objectif, puis vous accompagner avec des retours concrets.
          </p>
        </motion.section>

        <div className="mt-9 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)]">
          <motion.section {...enter(0.1)} className="panel panel-strong rounded-[28px] p-7">
            <p className="text-xs font-bold text-[#7A52D9]">Votre premier entretien</p>
            <h2 className="mt-2 text-2xl font-bold">Choisissez un entretien RH ou technique, le poste préparé et votre rythme.</h2>
            <p className="mt-3 text-sm leading-7 text-[#5B6887]">Votre séance démarre uniquement après confirmation.</p>
            <ul className="mt-5 space-y-3 text-sm text-[#3E4C6E]">
              {[
                { icon: FileText, text: "Pas besoin de CV pour commencer." },
                { icon: ListChecks, text: "Vous choisissez votre entretien et vos priorités." },
                { icon: CheckCircle2, text: "À la fin, un bilan vous aide à progresser." },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="grid size-8 place-items-center rounded-xl bg-[#EEE8FF] text-[#8455E7]"><Icon size={16} /></span>
                  {text}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/preparation" className="btn-gradient inline-flex min-h-12 items-center gap-2 rounded-2xl px-6 text-sm font-bold">
                Préparer mon entretien <ArrowRight size={17} />
              </Link>
              <Link to="/jeux-de-role" className="btn-soft inline-flex min-h-12 items-center gap-2 rounded-2xl px-5 text-sm font-semibold">
                <Drama size={17} /> Choisir un scénario prêt à l’emploi
              </Link>
            </div>
          </motion.section>
          <motion.section {...enter(0.18)} className="panel rounded-[28px] p-7">
            <p className="flex items-center gap-2 text-xs font-bold text-[#7253C7]"><Sparkles size={14} /> Votre objectif</p>
            <ul className="mt-4 space-y-2">
              {profile.objectifs.map((o) => (
                <li key={o} className="rounded-xl bg-[#F4F6FC] px-4 py-3 text-sm">
                  <span className="font-bold text-[#26334E]">{OBJECTIVES[o].label}</span>
                  <span className="mt-0.5 block text-xs text-[#6D7D98]">{OBJECTIVES[o].detail}</span>
                </li>
              ))}
            </ul>
            <Link to="/tableau-de-bord" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#405AB7] hover:underline">
              Accéder à mon espace <ArrowRight size={15} />
            </Link>
          </motion.section>
        </div>
        <p className="mt-8 text-center text-xs text-[#8A97B0]">Votre séance est un entraînement, pas une décision de recrutement.</p>
      </div>
    </main>
  );
}
