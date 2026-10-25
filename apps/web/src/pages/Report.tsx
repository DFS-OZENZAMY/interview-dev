import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Check, Download, Lightbulb, RotateCcw, Sparkles, Target } from "lucide-react";
import { ScoreGauge } from "../components/ScoreGauge";
import { QuestionReview } from "../components/QuestionReview";
import { api } from "../lib/api";
import { CRITERIA, TYPES, formatDuration } from "../lib/labels";
import { historyStore } from "../lib/storage";
import { isReport, type HistoryEntry, type Report } from "../lib/types";

const FOCUS: Record<string, { name: string; detail: string }> = {
  clarte: { name: "Gagner en clarté", detail: "Commencez par votre idée principale en une phrase, puis illustrez-la. Évitez les détours avant d’arriver au fait." },
  pertinence: { name: "Répondre au plus juste", detail: "Reformulez mentalement la question avant de répondre, et reliez chaque réponse aux attentes du poste." },
  exemples_concrets: { name: "Renforcer vos exemples", detail: "Préparez trois réalisations précises : votre rôle, vos actions et un résultat chiffré si possible." },
  structure: { name: "Structurer vos réponses", detail: "Utilisez la méthode STAR : situation, tâche, action, résultat. Elle donne un fil conducteur à vos réponses." },
  motivation: { name: "Exprimer votre motivation", detail: "Expliquez ce qui vous attire dans ce poste et cette entreprise, avec des raisons personnelles et concrètes." },
};

function weakestKey(r: Report) {
  return Object.entries(r.scores).sort((a, b) => a[1] - b[1])[0]![0];
}

export default function ReportPage() {
  const { id = "" } = useParams();
  const [entry, setEntry] = useState<HistoryEntry | null | undefined>(() => historyStore.get(id) ?? undefined);

  // Bilan absent de ce navigateur : on le récupère sur le serveur tant que la session existe.
  useEffect(() => {
    if (entry !== undefined) return;
    api
      .get(id)
      .then((s) => {
        const e: HistoryEntry = { sessionId: s.sessionId, poste: s.poste, type: s.type, locale: s.locale, date: s.createdAt, elapsed: 0, interrupted: s.interrupted, report: s.report };
        if (s.done) historyStore.save(e);
        setEntry(e);
      })
      .catch(() => setEntry(null));
  }, [entry, id]);

  if (entry === undefined) {
    return <main role="status" className="flex min-h-dvh items-center justify-center bg-night text-sm font-semibold text-[#B8C8E8]">Chargement du bilan…</main>;
  }

  const report = entry && isReport(entry.report) ? entry.report : null;
  const focus = report ? FOCUS[weakestKey(report)] : null;

  return (
    <main className="report-page on-dark relative min-h-dvh overflow-hidden bg-night px-4 pb-16 pt-8 text-white sm:px-8 sm:pt-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_52%_8%,#2D3C82_0%,#17204B_34%,#0A1028_74%)]" />
      <div aria-hidden="true" className="blob -right-32 top-12 size-96 bg-[#A453FA]/15 blur-[100px]" />
      <div aria-hidden="true" className="blob -left-36 top-80 size-96 bg-[#32CCC8]/10 blur-[100px]" />
      <div className="relative mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link to="/tableau-de-bord" className="no-print glass-dark inline-flex min-h-11 items-center gap-2 rounded-2xl px-4 text-sm font-semibold">
            <ArrowLeft size={17} /> Tableau de bord
          </Link>
          {report ? (
            <button type="button" onClick={() => window.print()} className="no-print glass-dark inline-flex min-h-11 items-center gap-2 rounded-2xl px-4 text-sm font-semibold">
              <Download size={17} /> Télécharger en PDF
            </button>
          ) : (
            <p className="text-sm font-extrabold tracking-[-.03em] text-[#BFC7F7]">
              Interview<span className="text-[#DEACFB]">Lab</span>
            </p>
          )}
        </div>

        {!entry ? (
          <section className="stage mx-auto mt-16 max-w-xl rounded-[28px] p-8 text-center">
            <h1 className="text-2xl font-bold">Ce bilan n’est plus disponible.</h1>
            <p className="mt-3 text-sm leading-6 text-[#C7D2EE]">Les séances sont conservées deux heures sur le serveur et dans l’historique de ce navigateur. Lancez une nouvelle simulation pour obtenir un bilan.</p>
            <Link to="/preparation" className="btn-gradient mt-6 inline-flex min-h-12 items-center gap-2 rounded-2xl px-6 text-sm font-bold">
              Nouvelle simulation <RotateCcw size={17} />
            </Link>
          </section>
        ) : (
          <>
            <header className="rise mx-auto mt-12 max-w-3xl text-center sm:mt-16">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-[22px] border border-[#88E6DB]/35 bg-[#31C5B8]/15 shadow-[0_0_52px_#31C5B822]">
                <Check aria-hidden size={29} className="text-[#75EEE0]" />
              </div>
              <p className="text-sm font-bold text-[#BFA7FF]">{entry.interrupted ? "Séance interrompue" : "Séance terminée"}</p>
              <h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-.045em] sm:text-5xl">
                {report ? "Chaque entretien vous fait progresser." : "Votre séance est terminée."}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#C7D2EE] sm:text-base">
                {report
                  ? "Voici le bilan de Lina : ce qui a fonctionné, ce qui reste à travailler et comment préparer votre prochain entretien."
                  : entry.report && "error" in entry.report
                    ? "Le bilan n’a pas pu être généré pour cette séance. Vos réponses ont bien été reçues : relancez une simulation pour obtenir un bilan."
                    : "La séance s’est arrêtée avant votre première réponse : il n’y a rien à évaluer cette fois."}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-[#DCE3FD]">
                <span className="pill-dark rounded-full px-4 py-2">{TYPES[entry.type].label}</span>
                <span className="pill-dark rounded-full px-4 py-2">{entry.poste}</span>
                {entry.elapsed > 0 && <span className="pill-dark rounded-full px-4 py-2">{formatDuration(entry.elapsed)}</span>}
              </div>
            </header>

            {report && (
              <>
                <section aria-labelledby="synthese" className="rise mt-10 grid gap-6 rounded-[30px] border border-white/15 bg-white/[.075] p-6 shadow-[0_28px_85px_#05091b55] backdrop-blur-xl sm:p-9 md:grid-cols-[230px_1fr]" style={{ animationDelay: ".1s" }}>
                  <ScoreGauge score={report.score_global} title="Score global" dark />
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex size-11 items-center justify-center rounded-2xl bg-[#BCA1FF]/15 text-[#D2BEFF]"><Sparkles size={21} /></span>
                      <h2 id="synthese" className="text-xl font-semibold">L’essentiel de votre séance</h2>
                    </div>
                    <p className="mt-4 text-[15px] leading-8 text-[#E5EAFE]">{report.resume}</p>
                    <dl className="mt-6 space-y-3">
                      {Object.entries(report.scores).map(([key, value]) => (
                        <div key={key} className="grid grid-cols-[130px_1fr_40px] items-center gap-3 text-sm">
                          <dt className="text-[#C7D2EE]">{CRITERIA[key] ?? key}</dt>
                          <dd className="print-track h-2 overflow-hidden rounded-full bg-white/10">
                            <span className="print-bar block h-full rounded-full bg-gradient-to-r from-[#38BDA6] via-[#4D77E8] to-[#8C79EE] transition-[width] duration-1000" style={{ width: `${value * 10}%` }} />
                          </dd>
                          <dd className="text-right font-semibold tabular-nums">{value}/10</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </section>

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <section className="rise rounded-[28px] border border-[#76E5D1]/20 bg-[#2F847A]/[.12] p-6 sm:p-7" style={{ animationDelay: ".2s" }}>
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-2xl bg-[#64DCC6]/15 text-[#80EDD9]"><Check size={21} /></span>
                      <h2 className="text-lg font-semibold">Vos points forts</h2>
                    </div>
                    <ul className="mt-5 space-y-3 text-sm leading-7 text-[#DFEEE9]">
                      {report.points_forts.map((p) => <li key={p} className="flex gap-3"><Check size={16} className="mt-1.5 shrink-0 text-[#80EDD9]" />{p}</li>)}
                    </ul>
                  </section>
                  <section className="rise rounded-[28px] border border-[#DBB0FF]/20 bg-[#7B4FA6]/[.13] p-6 sm:p-7" style={{ animationDelay: ".28s" }}>
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-2xl bg-[#D4ACFF]/15 text-[#E1C1FF]"><Target size={21} /></span>
                      <h2 className="text-lg font-semibold">À améliorer</h2>
                    </div>
                    <ul className="mt-5 space-y-3 text-sm leading-7 text-[#E8E2F2]">
                      {report.points_faibles.map((p) => <li key={p} className="flex gap-3"><Target size={16} className="mt-1.5 shrink-0 text-[#E1C1FF]" />{p}</li>)}
                    </ul>
                  </section>
                </div>

                <section className="rise mt-5 flex flex-col gap-4 rounded-[28px] border border-white/15 bg-white/[.06] p-6 sm:flex-row sm:items-start sm:p-7" style={{ animationDelay: ".35s" }}>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#8BAFFF]/15 text-[#B9CCFF]"><Lightbulb size={22} /></span>
                  <div>
                    <h2 className="text-lg font-semibold">Les conseils de Lina</h2>
                    <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-[#D5DDF5]">
                      {report.conseils.map((c) => <li key={c}>{c}</li>)}
                    </ol>
                  </div>
                </section>

                <QuestionReview report={report} />

                {focus && (
                  <section aria-labelledby="suite" className="rise relative mt-7 overflow-hidden rounded-[30px] border border-[#BAA6FE]/25 bg-gradient-to-br from-[#252657]/90 via-[#1B2751]/95 to-[#14354D]/90 p-6 shadow-[0_24px_70px_#060B2966] sm:p-9" style={{ animationDelay: ".4s" }}>
                    <div aria-hidden="true" className="blob -right-20 -top-28 size-72 bg-[#BA82FF]/15 blur-[85px]" />
                    <div className="relative">
                      <h2 id="suite" className="text-balance text-2xl font-semibold tracking-[-.035em] sm:text-3xl">Votre priorité pour la prochaine séance</h2>
                      <div className="mt-6 rounded-[25px] border border-[#9BD9EC]/25 bg-white/[.09] p-5 sm:p-7">
                        <h3 className="text-xl font-semibold">{focus.name}</h3>
                        <p className="mt-2 max-w-2xl text-sm leading-7 text-[#D8E6F7]">{focus.detail}</p>
                      </div>
                    </div>
                  </section>
                )}
              </>
            )}

            <nav aria-label="Après l’entretien" className="no-print rise mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center" style={{ animationDelay: ".45s" }}>
              <Link to="/preparation" className="btn-gradient inline-flex min-h-13 items-center justify-center gap-3 rounded-2xl px-7 py-4 text-sm font-bold">
                Refaire un entretien <RotateCcw size={17} />
              </Link>
              <Link to="/tableau-de-bord" className="glass-dark inline-flex min-h-13 items-center justify-center gap-3 rounded-2xl px-7 py-4 text-sm font-semibold">
                Retour au tableau de bord
              </Link>
            </nav>
            <p className="mx-auto mt-9 max-w-xl text-center text-xs leading-6 text-[#ABB8D9]">Bilan indicatif d’entraînement, pas une décision de recrutement.</p>
          </>
        )}
      </div>
    </main>
  );
}
