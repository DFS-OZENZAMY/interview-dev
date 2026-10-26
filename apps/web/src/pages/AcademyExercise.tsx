import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, GraduationCap, Lightbulb, RotateCcw, Sparkles, Target } from "lucide-react";
import { CandidateShell } from "../components/CandidateShell";
import { AcademyTabs } from "../components/AcademyTabs";
import { ApiError } from "../lib/api";
import { academyApi, academyStore, LEVELS, type Exercise, type Feedback, type Guide } from "../lib/academy";
import { cn } from "../lib/labels";

export default function AcademyExercise() {
  const { id = "" } = useParams();
  const [data, setData] = useState<{ exercise: Exercise; guide: Guide | null } | null>(null);
  const [error, setError] = useState("");
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState<number[]>([]);
  const [showGuide, setShowGuide] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [reviewed, setReviewed] = useState("");
  const [busy, setBusy] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");
  const [saved, setSaved] = useState("");
  const attempts = useMemo(() => academyStore.attempts().filter((a) => a.exerciseId === id), [id, saved]);

  useEffect(() => {
    setData(null);
    setError("");
    setAnswer("");
    setChecked([]);
    setFeedback(null);
    setSaved("");
    academyApi.exercise(id).then(setData, (e) => setError(e instanceof ApiError && e.status === 404 ? "Cet exercice n’existe pas." : "L’exercice est indisponible."));
  }, [id]);

  const plan = academyStore.plan();
  const planIndex = plan?.steps.findIndex((s) => s.exerciseId === id) ?? -1;
  const nextInPlan = plan && planIndex >= 0 ? plan.steps[planIndex + 1] : undefined;

  async function review() {
    if (!data || busy || answer.trim().length < 50) return;
    setBusy(true);
    setFeedbackError("");
    setFeedback(null);
    try {
      setFeedback(await academyApi.feedback(data.exercise.id, answer.trim()));
      setReviewed(answer.trim());
    } catch (e) {
      setFeedbackError(e instanceof ApiError ? e.message : "Analyse indisponible.");
    } finally {
      setBusy(false);
    }
  }

  function save() {
    if (!data || answer.trim().length < 20) return;
    academyStore.addAttempt({
      exerciseId: data.exercise.id,
      completedAt: Date.now(),
      answer: answer.trim(),
      checked,
      feedback: feedback && reviewed === answer.trim() ? feedback : null,
    });
    setSaved("Tentative enregistrée. Compétence travaillée, maîtrise non certifiée : vous pouvez refaire cet exercice quand vous voulez.");
  }

  const criteria = data ? (data.guide?.evidence?.length ? data.guide.evidence : data.exercise.steps) : [];

  return (
    <CandidateShell section="Académie" title="Atelier d’exercice" icon={GraduationCap} actions={<AcademyTabs />}>
      <Link to="/academie" className="inline-flex items-center gap-2 text-sm font-semibold text-[#405AB7] hover:underline">
        <ArrowLeft size={16} /> Tous les exercices
      </Link>
      {!data ? (
        <p role="status" className="mt-8 text-sm text-[#61718E]">{error || "Chargement de l’exercice…"}</p>
      ) : (
        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,.9fr)]">
          <div className="space-y-5">
            <section className="panel panel-strong rounded-[28px] p-6 sm:p-8">
              <div className="flex flex-wrap gap-2 text-[11px] font-bold">
                <span className="rounded-full bg-[#EEE8FF] px-3 py-1 text-[#7A52D9]">{data.exercise.categoryLabel}</span>
                <span className="rounded-full bg-[#EEF3FC] px-3 py-1 text-[#4E5E86]">{LEVELS[data.exercise.level] ?? data.exercise.levelLabel}</span>
                <span className="rounded-full bg-[#EEF3FC] px-3 py-1 text-[#4E5E86]">{data.exercise.duration}</span>
                {attempts.length > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#E4F6F1] px-3 py-1 text-[#18816A]">
                    <CheckCircle2 size={12} /> Déjà réalisé · refaire possible
                  </span>
                )}
              </div>
              <h1 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">{data.exercise.name}</h1>
              {data.guide?.objective && <p className="mt-2 text-sm font-semibold text-[#5B6887]">{data.guide.objective}</p>}
              {data.guide?.context && <p className="mt-4 text-sm leading-7 text-[#4F5E7C]">{data.guide.context}</p>}
              <div className="mt-5 rounded-2xl border border-[#E1D8FA] bg-[#F7F3FF] p-5">
                <p className="text-xs font-bold text-[#7253C7]">Consigne</p>
                <p className="mt-2 text-[15px] leading-7 text-[#26334E]">{data.exercise.prompt}</p>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#4F5E7C]">
                <span className="font-bold text-[#26334E]">Méthode : </span>
                {data.guide?.methodology ?? data.exercise.tip}
              </p>
              <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-6 text-[#4F5E7C]">
                {data.exercise.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </section>

            <section className="panel rounded-[28px] p-6 sm:p-8">
              <label htmlFor="reponse-exercice" className="text-base font-bold">Votre réponse d’entraînement</label>
              <textarea
                id="reponse-exercice"
                value={answer}
                onChange={(e) => setAnswer(e.target.value.slice(0, 8000))}
                rows={8}
                placeholder="Rédigez votre réponse comme vous la diriez en entretien, à partir de votre expérience réelle."
                className="mt-3 w-full resize-y rounded-2xl border border-[#CBD7EE] bg-white p-4 text-sm leading-7 outline-none focus:border-[#8855EF]"
              />
              <p className="mt-1 text-right text-xs text-[#7887A1]">{answer.trim().length} caractères{answer.trim().length < 50 ? " · 50 minimum pour un retour" : ""}</p>
              <div className="mt-3 flex flex-wrap gap-3">
                <button type="button" onClick={() => void review()} disabled={busy || answer.trim().length < 50} className="btn-gradient inline-flex min-h-11 items-center gap-2 rounded-2xl px-5 text-sm font-bold">
                  <Sparkles size={16} /> {busy ? "Analyse en cours…" : "Obtenir un retour du coach"}
                </button>
                <button type="button" onClick={save} disabled={answer.trim().length < 20} className="btn-soft inline-flex min-h-11 items-center gap-2 rounded-2xl px-5 text-sm font-semibold">
                  <Check size={16} /> Valider ma tentative
                </button>
                {answer && (
                  <button type="button" onClick={() => { setAnswer(""); setFeedback(null); setChecked([]); setSaved(""); }} className="inline-flex min-h-11 items-center gap-2 px-2 text-sm font-semibold text-[#5A6A88]">
                    <RotateCcw size={15} /> Recommencer
                  </button>
                )}
              </div>
              {feedbackError && <p role="alert" className="mt-3 text-sm text-[#A64040]">{feedbackError}</p>}
              {saved && (
                <p role="status" className="mt-3 rounded-xl bg-[#E4F6F1] p-3 text-sm text-[#17614F]">
                  {saved}
                  {nextInPlan && (
                    <Link to={`/academie/exercices/${nextInPlan.exerciseId}`} className="mt-2 flex items-center gap-1 font-bold text-[#17614F] underline">
                      Étape suivante de votre programme : {nextInPlan.exerciseName} <ArrowRight size={14} />
                    </Link>
                  )}
                </p>
              )}
              {feedback && (
                <div className="mt-5 space-y-3 rounded-2xl border border-[#C6EEE5] bg-[#F2FCFA] p-5" aria-live="polite">
                  <p className="text-sm font-bold">Votre retour pédagogique</p>
                  <p className="text-sm leading-7"><span className="font-bold text-[#18816A]">Ce qui fonctionne : </span>{feedback.strength}</p>
                  <p className="text-sm leading-7"><span className="font-bold text-[#7253C7]">À renforcer : </span>{feedback.improvement}</p>
                  <p className="text-sm leading-7"><span className="font-bold text-[#315EC0]">Prochaine tentative : </span>{feedback.nextAction}</p>
                  <p className="text-xs text-[#6D7D98]">Analyse indicative, sans score ni jugement de recrutement.</p>
                </div>
              )}
            </section>
          </div>

          <aside className="space-y-5">
            <section className="panel rounded-[26px] p-6">
              <div className="flex items-center gap-2">
                <Target size={18} className="text-[#6E60C9]" />
                <h2 className="text-base font-bold">Vérifiez votre réponse</h2>
              </div>
              <ul className="mt-4 space-y-2">
                {criteria.map((c, i) => {
                  const on = checked.includes(i);
                  return (
                    <li key={c}>
                      <label className={cn("flex cursor-pointer gap-3 rounded-xl border p-3 text-sm leading-6", on ? "border-[#B5E9E1] bg-[#EAFBF8]" : "border-[#E3E8F3] bg-white")}>
                        <input type="checkbox" checked={on} onChange={() => setChecked((list) => (on ? list.filter((x) => x !== i) : [...list, i]))} className="mt-1.5 accent-[#18816A]" />
                        {c}
                      </label>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-3 text-xs leading-5 text-[#8593AF]">Auto-évaluation pédagogique uniquement : aucune maîtrise certifiée.</p>
            </section>

            {data.guide && (
              <section className="panel rounded-[26px] p-6">
                <button type="button" aria-expanded={showGuide} onClick={() => setShowGuide((v) => !v)} className="flex w-full items-center justify-between gap-2 text-left">
                  <span className="flex items-center gap-2 text-base font-bold">
                    <BookOpen size={18} className="text-[#315EC0]" /> Guide de l’exercice
                  </span>
                  <span className="text-xs font-semibold text-[#405AB7]">{showGuide ? "Masquer" : "Afficher"}</span>
                </button>
                {showGuide && (
                  <div className="mt-4 space-y-4 text-sm leading-7 text-[#4F5E7C]">
                    <div>
                      <p className="font-bold text-[#26334E]">Exemple de formulation</p>
                      <p className="mt-1 italic">{data.guide.example}</p>
                    </div>
                    <div>
                      <p className="font-bold text-[#26334E]">Erreurs fréquentes</p>
                      <ul className="mt-1 list-disc space-y-1 pl-5">
                        {data.guide.pitfalls.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                    <p className="flex gap-2 rounded-xl bg-[#F4F6FC] p-3">
                      <Lightbulb size={16} className="mt-1 shrink-0 text-[#C08A1E]" />
                      {data.guide.reflection}
                    </p>
                  </div>
                )}
              </section>
            )}
            <p className="px-2 text-[11px] leading-5 text-[#8A97B0]">Contenu pédagogique en revue, conçu pour l’entraînement. Les tentatives restent dans ce navigateur.</p>
          </aside>
        </div>
      )}
    </CandidateShell>
  );
}
