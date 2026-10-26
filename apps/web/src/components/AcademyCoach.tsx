import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, ArrowUp, BookOpen, RotateCcw } from "lucide-react";
import { ApiError } from "../lib/api";
import { academyApi, academyStore, type CoachClarify, type CoachRecommend, type Reference, type Turn } from "../lib/academy";
import { cn } from "../lib/labels";

/** Mascotte du coach (design repris d'ai-interview-platform). */
function CoachMascot({ thinking }: { thinking: boolean }) {
  const eye = cn("h-7 w-3 rounded-[3px] bg-[#26E3C4] shadow-[0_0_15px_rgba(37,235,198,.8)]", thinking && "animate-pulse");
  return (
    <div aria-hidden="true" className="relative flex h-[80px] w-[92px] shrink-0 items-center justify-center">
      <span className="absolute -left-1 top-[38%] h-7 w-2 rounded-l-md bg-[#17BDAF] shadow-[0_0_14px_#36D9C3]" />
      <span className="absolute -right-1 top-[38%] h-7 w-2 rounded-r-md bg-[#17BDAF] shadow-[0_0_14px_#36D9C3]" />
      <div className="absolute inset-x-2 inset-y-1 rounded-[25px] border-[3px] border-[#535E82] bg-gradient-to-br from-[#58648E] to-[#293451] p-[5px] shadow-[0_9px_20px_rgba(30,32,73,.2)]">
        <div className="flex h-full items-center justify-center gap-3 overflow-hidden rounded-[18px] border border-[#28334B] bg-[#101A2D] shadow-[inset_0_2px_12px_rgba(0,0,0,.65)]">
          <span className={eye} />
          <span className={eye} />
        </div>
      </div>
    </div>
  );
}

const STARTERS = [
  "Je veux un exercice pour structurer mes réponses",
  "Comment parler de mes prétentions salariales ?",
  "Mon plus grand défaut est que je suis perfectionniste",
];

export function AcademyCoach({ onRecommendation }: { onRecommendation?: (exerciseId: string) => void }) {
  const [history, setHistory] = useState<Turn[]>(() => academyStore.conversation());
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [clarification, setClarification] = useState<CoachClarify | null>(null);
  const [suggestion, setSuggestion] = useState<CoachRecommend | null>(null);
  const [references, setReferences] = useState<Reference[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [history.length, busy]);

  async function ask(override?: string) {
    const text = (override ?? prompt).trim();
    if (text.length < 3 || busy) return;
    const next = [...history, { role: "user" as const, content: text.slice(0, 700) }].slice(-20);
    setHistory(next);
    setPrompt("");
    setBusy(true);
    setError("");
    setClarification(null);
    setSuggestion(null);
    try {
      const plan = academyStore.plan();
      const body = await academyApi.coach({
        messages: next.slice(-9).map((t) => ({ ...t, content: t.role === "assistant" ? t.content.slice(0, 2500) : t.content })),
        history: next.map((t) => ({ ...t, content: t.content.slice(0, 2500) })),
        previousPlan: plan ? { needs: plan.needs.map((n) => n.key), context: plan.context } : undefined,
      });
      setReferences(body.references ?? []);
      let content: string;
      if (body.kind === "answer") content = `${body.reply}${body.question ? `\n\n${body.question}` : ""}`;
      else if (body.kind === "clarify") {
        setClarification(body);
        content = `${body.understanding ? `${body.understanding}\n\n` : ""}${body.question}`;
      } else {
        setSuggestion(body);
        content = `${body.understanding ? `${body.understanding}\n\n` : ""}${body.reason}`;
        academyStore.savePlan({ needs: body.needs ?? [], steps: body.steps ?? [], pathId: body.pathId, context: body.context, savedAt: Date.now() });
        onRecommendation?.(body.exerciseId);
      }
      const saved = [...next, { role: "assistant" as const, content }].slice(-20);
      setHistory(saved);
      academyStore.saveConversation(saved);
    } catch (e) {
      setHistory((items) => items.slice(0, -1));
      setPrompt(text);
      setError(e instanceof ApiError ? e.message : "Le coach n’est pas disponible.");
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    academyStore.clearConversation();
    setHistory([]);
    setSuggestion(null);
    setClarification(null);
    setReferences([]);
    setError("");
  }

  return (
    <section aria-label="Votre coach Académie" className="panel panel-strong rounded-[28px] p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <CoachMascot thinking={busy} />
          <div>
            <p className="text-xs font-bold text-[#7253C7]">Votre coach Académie</p>
            <h2 className="mt-1 text-xl font-bold tracking-tight">Dites-moi ce que vous voulez travailler.</h2>
            <p className="mt-1 text-sm text-ink-soft">Je pose des questions, je conseille, et je propose des exercices quand le besoin est clair.</p>
          </div>
        </div>
        {history.length > 0 && (
          <button type="button" onClick={reset} className="btn-soft inline-flex min-h-10 items-center gap-2 rounded-xl px-3.5 text-xs font-semibold">
            <RotateCcw size={14} /> Nouvelle discussion
          </button>
        )}
      </div>

      {history.length > 0 && (
        <div className="mt-5 max-h-[420px] space-y-3 overflow-y-auto pr-1" aria-live="polite">
          {history.map((t, i) => (
            <div key={i} className={cn("flex", t.role === "user" ? "justify-end" : "justify-start")}>
              <p
                className={cn(
                  "max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-7",
                  t.role === "user" ? "bg-gradient-to-r from-[#6658E8] to-[#8753DA] text-white" : "border border-[#E3E1F5] bg-white text-[#26334E]",
                )}
              >
                {t.content}
              </p>
            </div>
          ))}
          {busy && <p className="text-sm font-semibold text-[#7253C7]">Le coach réfléchit…</p>}
          <div ref={endRef} />
        </div>
      )}

      {clarification && clarification.options.length > 0 && !busy && (
        <div className="mt-4 flex flex-wrap gap-2">
          {clarification.options.map((o) => (
            <button key={o} type="button" onClick={() => void ask(o)} className="rounded-xl border border-[#D6CCF6] bg-[#F5F1FF] px-3.5 py-2 text-left text-sm font-semibold text-[#5B3FB8] hover:bg-[#ECE4FF]">
              {o}
            </button>
          ))}
        </div>
      )}

      {suggestion && (
        <div className="mt-5 rounded-2xl border border-[#C6EEE5] bg-[#EDFCF9] p-5">
          <p className="text-xs font-bold text-[#18816A]">Votre programme élaboré avec le coach</p>
          <ol className="mt-3 space-y-2">
            {(suggestion.steps?.length ? suggestion.steps : [{ exerciseId: suggestion.exerciseId, exerciseName: suggestion.exerciseName, goal: suggestion.need, pathId: suggestion.pathId, pathTitle: suggestion.pathTitle }]).map((s, i) => (
              <li key={s.exerciseId}>
                <Link to={`/academie/exercices/${s.exerciseId}`} className="flex items-start justify-between gap-3 rounded-xl bg-white/80 p-3 hover:bg-white">
                  <span>
                    <span className="text-xs font-bold text-[#5A6A88]">Étape {i + 1} · {s.goal}</span>
                    <span className="mt-0.5 block text-sm font-semibold text-[#172041]">{s.exerciseName}</span>
                  </span>
                  <ArrowRight size={16} className="mt-1 shrink-0 text-[#18816A]" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      )}

      {references.length > 0 && (
        <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#6D7D98]">
          <BookOpen size={13} /> Appuyé sur nos guides internes : {references.map((r) => r.title).join(" · ")}
        </p>
      )}

      {history.length === 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {STARTERS.map((s) => (
            <button key={s} type="button" onClick={() => void ask(s)} className="rounded-xl border border-[#E1E5F2] bg-white/80 px-3.5 py-2 text-sm text-[#45547A] hover:border-[#B9A6F3]">
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        className="mt-4 flex items-end gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          void ask();
        }}
      >
        <label htmlFor="coach-input" className="sr-only">Votre message au coach</label>
        <textarea
          id="coach-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value.slice(0, 700))}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void ask();
            }
          }}
          rows={2}
          placeholder="Ex. Je prépare un entretien RH et j’ai du mal à parler de mes défauts…"
          className="min-h-14 flex-1 resize-none rounded-2xl border border-[#D6DDEE] bg-white px-4 py-3 text-sm leading-6 outline-none focus:border-[#8855EF]"
        />
        <button type="submit" disabled={busy || prompt.trim().length < 3} aria-label="Envoyer" className="btn-gradient grid size-14 shrink-0 place-items-center rounded-2xl">
          <ArrowUp size={20} />
        </button>
      </form>
      {error && <p role="alert" className="mt-3 text-sm text-[#A64040]">{error}</p>}
      <p className="mt-3 text-[11px] leading-5 text-[#8A97B0]">Conseils indicatifs d’entraînement. Ne partagez pas d’informations sensibles (santé, vie privée).</p>
    </section>
  );
}
