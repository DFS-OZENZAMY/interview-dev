import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, ArrowUp, BookOpen, Bookmark, Check, MessageSquareText, RotateCcw, Target } from "lucide-react";
import { ApiError } from "../lib/api";
import { academyApi, academyStore, type CoachRecommend, type CoachResponse, type Reference, type Turn } from "../lib/academy";
import { cn } from "../lib/labels";

type View = "explanation" | "question" | "case" | "feedback" | "recommendation" | "resources";
type SuggestedPath = { pathId: string; pathTitle: string; exerciseId: string; exerciseName: string };

/** Étiquette de chaque type de réponse (contrat de présentation V5.1 d'ai-interview-platform). */
const VIEWS: Record<View, { label: string; style: string }> = {
  explanation: { label: "Éclairage du coach", style: "bg-[#F2F0FD] text-[#6151AB]" },
  question: { label: "Question du coach", style: "bg-[#E8F5F2] text-[#237E72]" },
  case: { label: "Étude de cas · en cours", style: "bg-[#ECE9FF] text-[#5C4BB2]" },
  feedback: { label: "Retour personnalisé", style: "bg-[#E8F5F2] text-[#237E72]" },
  recommendation: { label: "Parcours recommandé", style: "bg-[#F2F0FD] text-[#6151AB]" },
  resources: { label: "Ressources pédagogiques", style: "bg-[#EDF3FC] text-[#3A6899]" },
};

/** Mascotte du coach (design d'ai-interview-platform). */
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

function InlineRich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((piece, i) =>
        piece.startsWith("**") && piece.endsWith("**") ? (
          <strong key={i} className="font-semibold text-[#222B4B]">{piece.slice(2, -2)}</strong>
        ) : piece.startsWith("*") && piece.endsWith("*") && piece.length > 2 ? (
          <em key={i}>{piece.slice(1, -1)}</em>
        ) : (
          <Fragment key={i}>{piece}</Fragment>
        ),
      )}
    </>
  );
}

/** Rendu structuré d'une réponse du coach : intertitres, listes, étapes et question finale mise en avant. */
function CoachReply({ content }: { content: string }) {
  type Block = { type: "heading" | "paragraph" | "list" | "steps" | "question"; text: string; items?: string[] };
  const blocks: Block[] = [];
  let items: string[] = [];
  let para: string[] = [];
  let listType: "list" | "steps" = "list";
  const flush = () => {
    if (para.length) blocks.push({ type: "paragraph", text: para.join(" ") });
    para = [];
    if (items.length) blocks.push({ type: listType, text: "", items });
    items = [];
    listType = "list";
  };
  for (const raw of content.replace(/\r/g, "").trim().split("\n")) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    const heading = line.match(/^#{1,3}\s+(.+)$/);
    const list = line.match(/^(?:[-*•]\s+|[0-9]+[.)]\s+)(.+)$/);
    if (heading) {
      flush();
      blocks.push({ type: "heading", text: heading[1]! });
      continue;
    }
    if (list) {
      const nextType = /^[0-9]+[.)]\s+/.test(line) ? "steps" : "list";
      if (items.length && nextType !== listType) flush();
      if (para.length) {
        blocks.push({ type: "paragraph", text: para.join(" ") });
        para = [];
      }
      listType = nextType;
      items.push(list[1]!);
      continue;
    }
    if (items.length) flush();
    para.push(line);
  }
  flush();
  const last = blocks.at(-1);
  if (last?.type === "paragraph" && /\?\s*$/.test(last.text)) last.type = "question";

  return (
    <div className="space-y-3">
      {blocks.map((b, i) =>
        b.type === "heading" ? (
          <h3 key={i} className="pt-1 text-[15px] font-bold tracking-tight text-[#252D4D]">
            <InlineRich text={b.text} />
          </h3>
        ) : b.type === "question" ? (
          <div key={i} className="rounded-2xl border border-[#D8CFF3] bg-gradient-to-r from-[#F6F3FF] to-[#FCFBFF] p-4">
            <p className="mb-1.5 flex items-center gap-2 text-[11px] font-bold text-[#7156B8]"><Target size={14} /> À vous de jouer</p>
            <p className="text-[14px] font-semibold leading-7 text-[#293052]"><InlineRich text={b.text} /></p>
          </div>
        ) : b.type === "list" || b.type === "steps" ? (
          <ol key={i} className="space-y-2">
            {b.items!.map((item, j) => (
              <li key={j} className="flex items-start gap-3 rounded-xl border border-[#ECEAF3] bg-[#FBFAFE] px-3.5 py-2.5 text-sm leading-6 text-[#3B4769]">
                {b.type === "steps" ? (
                  <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center rounded-lg bg-[#EEE9FD] text-xs font-bold text-[#6C4FCB]">{j + 1}</span>
                ) : (
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#8B6FE0]" />
                )}
                <span><InlineRich text={item} /></span>
              </li>
            ))}
          </ol>
        ) : (
          <p key={i} className="text-sm leading-7 text-[#3B4769]"><InlineRich text={b.text} /></p>
        ),
      )}
    </div>
  );
}

/** Scénarios proposés par le coach dans son dernier message : deviennent des choix cliquables. */
function findScenarios(message: string) {
  const text = message.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  if (!/(scenario|cas pratique|mise en situation|choisir un sujet|choisissez un sujet)/.test(text)) return [];
  const lines = message
    .split("\n")
    .filter((l) => /^\s*(?:[-*•]|\d+[.)])\s+/.test(l))
    .map((l) => l.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, "").replace(/[*_]/g, "").trim())
    .filter((l) => l.length >= 12 && l.length <= 105 && !/\?$/.test(l));
  return lines.length >= 2 ? lines.slice(0, 4) : [];
}

const STARTERS = [
  "Je veux un exercice pour structurer mes réponses",
  "Comment parler de mes prétentions salariales ?",
  "cas pratique",
];

export function AcademyCoach({ onSaved }: { onSaved?: () => void }) {
  const [history, setHistory] = useState<Turn[]>(() => academyStore.conversation());
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [last, setLast] = useState<(CoachResponse & { presentation?: { view: View }; suggestedPath?: SuggestedPath | null; practiceFeedback?: boolean }) | null>(null);
  const [references, setReferences] = useState<Reference[]>([]);
  const [saved, setSaved] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Suivre le dernier échange (amélioration d'ai-interview-platform)
    endRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [history.length, busy]);

  async function ask(override?: string) {
    const text = (override ?? prompt).trim();
    if (text.length < 3 || busy) return;
    const next = [...history, { role: "user" as const, content: text.slice(0, 5000) }].slice(-20);
    setHistory(next);
    setPrompt("");
    setBusy(true);
    setError("");
    setLast(null);
    setSaved(null);
    try {
      const plan = academyStore.plan();
      const body = (await academyApi.coach({
        messages: next.slice(-9).map((t) => ({ ...t, content: t.role === "assistant" ? t.content.slice(0, 2500) : t.content })),
        history: next.map((t) => ({ ...t, content: t.content.slice(0, 5000) })),
        previousPlan: plan ? { needs: plan.needs.map((n) => n.key), context: plan.context } : undefined,
      })) as NonNullable<typeof last>;
      setReferences(body.references ?? []);
      setLast(body);
      const content =
        body.kind === "answer"
          ? `${body.reply}${body.question ? `\n\n${body.question}` : ""}`
          : body.kind === "clarify"
            ? `${body.understanding ? `${body.understanding}\n\n` : ""}${body.question}`
            : `${body.understanding ? `${body.understanding}\n\n` : ""}${body.reason}`;
      const stored = [...next, { role: "assistant" as const, content }].slice(-20);
      setHistory(stored);
      academyStore.saveConversation(stored);
    } catch (e) {
      setHistory((items) => items.slice(0, -1));
      setPrompt(text);
      setError(e instanceof ApiError ? e.message : "Le coach n’est pas disponible.");
    } finally {
      setBusy(false);
    }
  }

  /** Enregistrement à la demande : le plan n'est plus écrit automatiquement (V5). */
  function savePlan(r: CoachRecommend) {
    // Ajoute au parcours existant au lieu de le remplacer (correctif d'ai-interview-platform).
    const plan = academyStore.plan();
    const steps = [...(plan?.steps ?? [])];
    for (const step of r.steps ?? []) if (!steps.some((s) => s.exerciseId === step.exerciseId)) steps.push(step);
    const needs = [...(plan?.needs ?? [])];
    for (const need of r.needs ?? []) if (!needs.some((n) => n.key === need.key)) needs.push(need);
    academyStore.savePlan({ needs, steps: steps.slice(-20), pathId: plan?.pathId ?? r.pathId, context: r.context ?? plan?.context, savedAt: Date.now() });
    setSaved("plan");
    onSaved?.();
  }
  function saveForLater(p: SuggestedPath) {
    const plan = academyStore.plan();
    const steps = plan?.steps ?? [];
    if (!steps.some((s) => s.exerciseId === p.exerciseId)) {
      steps.push({ exerciseId: p.exerciseId, exerciseName: p.exerciseName, pathId: p.pathId, pathTitle: p.pathTitle, goal: "Compétence à travailler après votre étude de cas" });
    }
    academyStore.savePlan({
      needs: plan?.needs ?? [],
      steps: steps.slice(-20),
      pathId: plan?.pathId ?? p.pathId,
      context: plan?.context ?? "Exercices enregistrés depuis le coach de l’Académie",
      savedAt: Date.now(),
    });
    setSaved("later");
    onSaved?.();
  }

  function reset() {
    academyStore.clearConversation();
    setHistory([]);
    setLast(null);
    setReferences([]);
    setError("");
    setSaved(null);
  }

  const lastAssistant = [...history].reverse().find((t) => t.role === "assistant")?.content ?? "";
  const scenarios = !busy && last?.kind !== "recommend" ? findScenarios(lastAssistant) : [];
  const view = last?.presentation?.view;
  const lastIndex = history.length - 1;

  return (
    <section aria-label="Votre coach Académie" className="panel panel-strong rounded-[28px] p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <CoachMascot thinking={busy} />
          <div>
            <p className="text-xs font-bold text-[#7253C7]">Votre coach Académie</p>
            <h2 className="mt-1 text-xl font-bold tracking-tight">Dites-moi ce que vous voulez travailler.</h2>
            <p className="mt-1 text-sm text-ink-soft">Conseils, études de cas interactives et exercices quand le besoin est clair.</p>
          </div>
        </div>
        {history.length > 0 && (
          <button type="button" onClick={reset} className="btn-soft inline-flex min-h-10 items-center gap-2 rounded-xl px-3.5 text-xs font-semibold">
            <RotateCcw size={14} /> Nouvelle discussion
          </button>
        )}
      </div>

      {history.length > 0 && (
        <div className="mt-5 max-h-[560px] space-y-3 overflow-y-auto pr-1" aria-live="polite">
          {history.map((t, i) =>
            t.role === "user" ? (
              <div key={i} className="flex justify-end">
                <p className="max-w-[85%] whitespace-pre-line rounded-2xl bg-gradient-to-r from-[#6658E8] to-[#8753DA] px-4 py-3 text-sm leading-7 text-white">{t.content}</p>
              </div>
            ) : (
              <div key={i} className="max-w-[92%] rounded-2xl border border-[#E3E1F5] bg-white px-4 py-4">
                <div className="mb-3 flex flex-wrap items-center gap-2 border-b border-[#EEEAF5] pb-2.5 text-[11px] font-bold text-[#6A56A9]">
                  <span className="grid size-7 place-items-center rounded-lg bg-[#F0EDFF]"><MessageSquareText size={14} /></span> Coach Académie
                  {i === lastIndex && view && <span className={cn("rounded-full px-2.5 py-0.5 text-[10px]", VIEWS[view].style)}>{VIEWS[view].label}</span>}
                </div>
                <CoachReply content={t.content} />
              </div>
            ),
          )}
          {busy && <p className="text-sm font-semibold text-[#7253C7]">Le coach réfléchit…</p>}
          <div ref={endRef} />
        </div>
      )}

      {last?.kind === "clarify" && last.options.length > 0 && !busy && (
        <div className="mt-4 flex flex-wrap gap-2">
          {last.options.map((o) => (
            <button key={o} type="button" onClick={() => void ask(o)} className="rounded-xl border border-[#D6CCF6] bg-[#F5F1FF] px-3.5 py-2 text-left text-sm font-semibold text-[#5B3FB8] hover:bg-[#ECE4FF]">
              {o}
            </button>
          ))}
        </div>
      )}
      {scenarios.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-bold text-[#5A6A88]">Choisissez un scénario :</p>
          <div className="flex flex-wrap gap-2">
            {scenarios.map((s) => (
              <button key={s} type="button" onClick={() => void ask(`Je choisis ce scénario : ${s}`)} className="rounded-xl border border-[#D6CCF6] bg-[#F5F1FF] px-3.5 py-2 text-left text-sm font-semibold text-[#5B3FB8] hover:bg-[#ECE4FF]">
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {last?.kind === "recommend" && (
        <div className="mt-5 rounded-2xl border border-[#C6EEE5] bg-[#EDFCF9] p-5">
          <p className="text-xs font-bold text-[#18816A]">Programme proposé par le coach</p>
          <ol className="mt-3 space-y-2">
            {(last.steps?.length ? last.steps : [{ exerciseId: last.exerciseId, exerciseName: last.exerciseName, goal: last.need, pathId: last.pathId, pathTitle: last.pathTitle }]).map((s, i) => (
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
          <button type="button" onClick={() => savePlan(last)} disabled={saved === "plan"} className="btn-gradient mt-4 inline-flex min-h-10 items-center gap-2 rounded-xl px-4 text-sm font-bold">
            {saved === "plan" ? <><Check size={15} /> Enregistré dans votre parcours</> : <><Bookmark size={15} /> Enregistrer dans mon parcours</>}
          </button>
        </div>
      )}
      {last && "suggestedPath" in last && last.suggestedPath && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#D6CCF6] bg-[#F7F4FF] p-4">
          <div>
            <p className="text-xs font-bold text-[#7253C7]">Pour aller plus loin</p>
            <Link to={`/academie/exercices/${last.suggestedPath.exerciseId}`} className="mt-1 block text-sm font-semibold text-[#26334E] hover:underline">{last.suggestedPath.exerciseName}</Link>
          </div>
          <button type="button" onClick={() => saveForLater(last.suggestedPath!)} disabled={saved === "later"} className="btn-soft inline-flex min-h-10 items-center gap-2 rounded-xl px-4 text-xs font-semibold">
            {saved === "later" ? <><Check size={14} /> Enregistré</> : <><Bookmark size={14} /> Enregistrer pour plus tard</>}
          </button>
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
              {s === "cas pratique" ? "Faire une étude de cas" : s}
            </button>
          ))}
        </div>
      )}

      <form
        className="mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          void ask();
        }}
      >
        <label htmlFor="coach-input" className="sr-only">Votre message au coach</label>
        <div className="flex items-end gap-2">
          <textarea
            id="coach-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value.slice(0, 5000))}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                void ask();
              }
            }}
            rows={view === "case" || view === "feedback" ? 6 : 3}
            placeholder={view === "case" || view === "feedback" ? "Rédigez votre réponse au cas, comme devant un recruteur…" : "Ex. Je prépare un entretien RH et j’ai du mal à parler de mes défauts…"}
            className="min-h-24 flex-1 resize-y rounded-2xl border border-[#D6DDEE] bg-white px-4 py-3 text-sm leading-7 outline-none focus:border-[#8855EF]"
          />
          <button type="submit" disabled={busy || prompt.trim().length < 3} aria-label="Envoyer" className="btn-gradient grid size-14 shrink-0 place-items-center rounded-2xl">
            <ArrowUp size={20} />
          </button>
        </div>
        <p className="mt-1.5 text-[11px] text-[#8A97B0]">Ctrl + Entrée pour envoyer · {prompt.length} / 5000</p>
      </form>
      {error && <p role="alert" className="mt-3 text-sm text-[#A64040]">{error}</p>}
      <p className="mt-2 text-[11px] leading-5 text-[#8A97B0]">Conseils indicatifs d’entraînement. Ne partagez pas d’informations sensibles (santé, vie privée).</p>
    </section>
  );
}
