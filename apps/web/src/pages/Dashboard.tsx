import { Link, Navigate } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, BrainCircuit, Check, CirclePlay, GraduationCap, LayoutDashboard, MessageSquareText, Play, Sparkles, Target, TrendingUp, UserRound, WandSparkles } from "lucide-react";
import { CandidateShell } from "../components/CandidateShell";
import { ScoreGauge } from "../components/ScoreGauge";
import { CRITERIA, EXPERIENCES, OBJECTIVES, SITUATIONS, TYPES, cn } from "../lib/labels";
import { historyStore, profileStore } from "../lib/storage";
import { isReport, type HistoryEntry, type Report } from "../lib/types";

const TONES = [
  { bg: "bg-[#E4F6F1]", ink: "text-[#17836C]", border: "border-[#C4E9DD]" },
  { bg: "bg-[#F2EAFE]", ink: "text-[#7153B9]", border: "border-[#DED1F7]" },
  { bg: "bg-[#E8F2FF]", ink: "text-[#315EC0]", border: "border-[#CFE0FA]" },
];

/** Critère le plus faible du dernier bilan : c'est la priorité proposée par Lina. */
function weakest(report: Report) {
  const [key] = Object.entries(report.scores).sort((a, b) => a[1] - b[1])[0]!;
  return CRITERIA[key] ?? key;
}

function progress(history: HistoryEntry[]) {
  const scored = history.filter((h) => isReport(h.report));
  const last = scored[0];
  if (!last || !isReport(last.report)) return { score: null, delta: null };
  const previous = scored.slice(1).find((h) => h.type === last.type);
  return {
    score: last.report.score_global,
    delta: previous && isReport(previous.report) ? last.report.score_global - previous.report.score_global : null,
  };
}

export default function Dashboard() {
  const reduced = useReducedMotion();
  const profile = profileStore.get();
  if (!profile) return <Navigate to="/profil" replace />;

  const history = historyStore.list();
  const { score, delta } = progress(history);
  const lastReport = history.find((h) => isReport(h.report))?.report as Report | undefined;
  const hasHistory = history.length > 0;
  const enter = (delay: number) => ({
    initial: reduced ? (false as const) : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.56, delay, ease: "easeOut" as const },
  });

  return (
    <CandidateShell section="Espace candidat" title="Vue d’ensemble" icon={LayoutDashboard}>
      <motion.section {...enter(0)} className="mb-7">
        <h1 className="text-[clamp(2.2rem,3.6vw,3.4rem)] font-extrabold leading-[1.09] tracking-[-.055em]">Bonjour, {profile.prenom}.</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#60718F]">Une étape à la fois : entraînez-vous avec Lina et suivez votre progression d’une séance à l’autre.</p>
      </motion.section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(285px,.85fr)]">
        <div className="space-y-4">
          <motion.section {...enter(0.08)} className="relative overflow-hidden rounded-[28px] border border-white/90 bg-[linear-gradient(115deg,#ECEDFF_0%,#EDE7FF_55%,#FCE6F5_100%)] p-7 shadow-[0_20px_60px_rgba(112,86,206,.14)] sm:p-8">
            <div aria-hidden="true" className="blob -right-24 -top-32 size-80 bg-[#BD88FA]/35 blur-3xl" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/75 px-3 py-1.5 text-xs font-bold text-[#7A52D9]">
                <WandSparkles size={15} /> Votre prochaine étape
              </span>
              <h2 className="mt-5 max-w-xl text-[clamp(1.7rem,2.5vw,2.4rem)] font-bold leading-[1.13] tracking-[-.04em]">
                {hasHistory ? "Continuez votre préparation." : "Votre premier entretien commence ici."}
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-[#5B6887]">
                {lastReport
                  ? `Lors de votre dernière séance, votre priorité était : ${weakest(lastReport).toLowerCase()}. Mettez-la en pratique dans une nouvelle simulation.`
                  : "Choisissez un entretien RH ou technique : Lina adapte ses questions à votre poste et à vos objectifs."}
              </p>
              <Link to="/preparation" className="btn-gradient mt-7 inline-flex min-h-12 items-center gap-2 rounded-2xl px-5 text-sm font-bold">
                <Play size={17} fill="currentColor" /> {hasHistory ? "Configurer ma prochaine simulation" : "Configurer ma première simulation"}
              </Link>
            </div>
          </motion.section>

          <motion.section {...enter(0.15)} aria-label="Votre progression" className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Simulations", value: String(history.length), note: hasHistory ? "Séances réalisées" : "Aucune séance pour l’instant", icon: MessageSquareText, tone: "border-[#D3D5FF] bg-[#F0F0FF] text-[#6654D5]" },
              { label: "Dernier score", value: score === null ? "—" : String(score), note: score === null ? "Après votre premier bilan" : "Sur 100", icon: Target, tone: "border-[#BCECE8] bg-[#E9FBF9] text-[#188D90]" },
              { label: "Progression", value: delta === null ? "—" : `${delta > 0 ? "+" : ""}${delta} pt`, note: delta === null ? "Après deux bilans du même type" : "Par rapport à la séance précédente", icon: TrendingUp, tone: "border-[#FFD5E8] bg-[#FFF0F7] text-[#C53F94]" },
            ].map(({ label, value, note, icon: Icon, tone }) => (
              <div key={label} className={cn("rounded-[22px] border p-5", tone)}>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold">{label}</p>
                  <Icon size={20} />
                </div>
                <div className="mt-5 text-4xl font-bold leading-none text-[#172033]">{value}</div>
                <p className="mt-3 text-xs leading-5 text-[#66748E]">{note}</p>
              </div>
            ))}
          </motion.section>

          <motion.section {...enter(0.22)} className="panel rounded-[26px] p-6 sm:p-7">
            <h2 className="text-lg font-bold">Votre parcours</h2>
            <ol className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                { label: "Profil créé", detail: "Vos objectifs sont enregistrés.", icon: Check, state: "done" },
                { label: "Première simulation", detail: hasHistory ? "Vous avez passé votre premier entretien." : "Choisissez votre type d’entretien.", icon: CirclePlay, state: hasHistory ? "done" : "next" },
                { label: "Bilan et conseils", detail: lastReport ? "Votre bilan est disponible." : "Disponible après une séance.", icon: BrainCircuit, state: lastReport ? "done" : hasHistory ? "next" : "later" },
              ].map(({ label, detail, icon: Icon, state }, i) => (
                <li key={label} className={cn("rounded-2xl border p-4", state === "done" ? "border-[#BFE3D5] bg-[#EEF9F3]" : state === "next" ? "border-[#C3D0FC] bg-[#F1F4FF]" : "border-[#E4E8F0] bg-[#F8F9FC]")}>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#8898B2]">Étape {i + 1}</span>
                    <Icon size={19} className={state === "done" ? "text-[#229676]" : state === "next" ? "text-[#3C5BCA]" : "text-[#A2ADC1]"} />
                  </div>
                  <h3 className="text-sm font-bold">{label}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#6A7992]">{detail}</p>
                </li>
              ))}
            </ol>
          </motion.section>

          <motion.section {...enter(0.29)} className="panel rounded-[26px] p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Vos axes de progression</h2>
              <GraduationCap size={21} className="text-[#6E60C9]" />
            </div>
            <p className="mt-2 text-xs leading-6 text-[#687993]">Choisis dans votre profil, ils sont proposés par défaut dans vos simulations.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {profile.objectifs.map((key, i) => {
                const tone = TONES[i % TONES.length]!;
                return (
                  <div key={key} className={cn("flex items-center gap-3 rounded-xl border px-4 py-3.5", tone.border, tone.bg)}>
                    <span className={cn("grid size-9 place-items-center rounded-xl bg-white/75", tone.ink)}>
                      <Target size={17} />
                    </span>
                    <span className="flex-1 text-sm font-semibold text-[#26334E]">{OBJECTIVES[key].label}</span>
                  </div>
                );
              })}
            </div>
          </motion.section>
        </div>

        <div className="space-y-4">
          <motion.section {...enter(0.12)} className="panel rounded-[26px] p-6">
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl bg-[#E5DFFF] text-[#7258C4]">
                <BrainCircuit size={19} />
              </span>
              <h2 className="text-base font-bold">Le conseil de Lina</h2>
            </div>
            <div className="mt-5 rounded-2xl bg-[linear-gradient(135deg,#F4EDFF,#FDE8F5)] p-5">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-bold text-[#7456BA]">
                <Sparkles size={14} /> {lastReport ? "Tiré de votre dernier bilan" : "Pour bien démarrer"}
              </div>
              <h3 className="text-base font-bold leading-6">{lastReport ? `Travaillez : ${weakest(lastReport).toLowerCase()}` : "Commencez par une simulation."}</h3>
              <p className="mt-3 text-xs leading-6 text-[#626D8A]">
                {lastReport?.conseils[0] ?? "Lina analysera vos réponses pour identifier vos points forts et les compétences à développer."}
              </p>
            </div>
          </motion.section>
          <motion.section {...enter(0.2)} className="panel rounded-[26px] p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold">Score de préparation</h2>
              <Target size={19} className="text-[#3C68C9]" />
            </div>
            <div className="mt-5">
              <ScoreGauge score={score} />
            </div>
          </motion.section>
          <motion.section {...enter(0.27)} className="panel rounded-[26px] p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold">Votre profil</h2>
              <UserRound size={19} className="text-[#5971C7]" />
            </div>
            <p className="mt-4 text-lg font-bold">{profile.prenom}</p>
            <p className="mt-1 text-xs leading-5 text-[#76849C]">
              {SITUATIONS[profile.situation]}, expérience : {EXPERIENCES[profile.experience].toLowerCase()}
            </p>
            <Link to="/profil" className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-[#3656C3] hover:underline">
              Modifier mon profil <ArrowRight size={16} />
            </Link>
          </motion.section>
        </div>
      </div>

      {hasHistory && (
        <motion.section {...enter(0.34)} className="panel mt-5 rounded-[26px] p-6 sm:p-7">
          <h2 className="text-lg font-bold">Historique des entretiens</h2>
          <ul className="mt-4 divide-y divide-[#E5EAF4]">
            {history.slice(0, 8).map((h) => (
              <li key={h.sessionId}>
                <Link to={`/rapport/${h.sessionId}`} className="flex flex-wrap items-center justify-between gap-3 rounded-xl px-2 py-4 transition hover:bg-white/70">
                  <div>
                    <p className="text-sm font-bold">
                      {TYPES[h.type].label}, {h.poste}
                    </p>
                    <p className="mt-1 text-xs text-[#6D7D98]">
                      {new Date(h.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}
                      {h.interrupted ? ", séance interrompue" : ""}
                    </p>
                  </div>
                  <span className="rounded-xl bg-[#EFF3FC] px-3 py-2 text-xs font-semibold text-[#5267A0]">
                    {isReport(h.report) ? `${h.report.score_global}/100` : "Sans bilan"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.section>
      )}
    </CandidateShell>
  );
}
