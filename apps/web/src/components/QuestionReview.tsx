import { useState } from "react";
import { Check, ChevronDown, MessageSquareQuote, Sparkles, Target } from "lucide-react";
import type { Report } from "../lib/types";
import { cn } from "../lib/labels";

/** Bilan question par question : la question, la réponse donnée, le retour de Lina et une meilleure formulation. */
export function QuestionReview({ report }: { report: Report }) {
  const echanges = report.echanges ?? [];
  const retours = report.par_question ?? [];
  const count = Math.max(echanges.length, retours.length);
  const [open, setOpen] = useState<number | null>(0);
  if (!count) return null;

  return (
    <section aria-labelledby="par-question" className="print-card rise mt-5 rounded-[28px] border border-white/15 bg-white/[.06] p-6 sm:p-7" style={{ animationDelay: ".38s" }}>
      <div className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#BCA1FF]/15 text-[#D2BEFF]"><MessageSquareQuote size={21} /></span>
        <div>
          <h2 id="par-question" className="text-lg font-semibold">Question par question</h2>
          <p className="text-xs text-[#AEB9DA]">Relisez vos réponses et la façon de les renforcer.</p>
        </div>
      </div>
      <ol className="mt-5 space-y-3">
        {Array.from({ length: count }, (_, i) => {
          const ex = echanges[i];
          const fb = retours[i];
          const isOpen = open === i;
          return (
            <li key={i} className="print-card overflow-hidden rounded-2xl border border-white/12 bg-white/[.04]">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-4 p-4 text-left sm:p-5"
              >
                <span className="flex gap-3">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-bold text-[#D6D2FF]">{i + 1}</span>
                  <span className="text-[15px] font-semibold leading-6 text-[#F1F3FF]">{fb?.question || ex?.question}</span>
                </span>
                <ChevronDown size={18} className={cn("no-print mt-1 shrink-0 text-[#AEB9DA] transition-transform", isOpen && "rotate-180")} />
              </button>
              <div className={cn("print-open space-y-4 px-4 pb-5 sm:px-5", !isOpen && "hidden")}>
                {ex && fb?.question && fb.question !== ex.question && (
                  <p className="text-sm leading-6 text-[#C9D3F2]"><span className="font-semibold text-[#DCE3FD]">Question posée : </span>{ex.question}</p>
                )}
                <div className="rounded-xl bg-white/[.06] p-4">
                  <p className="text-xs font-bold text-[#AEB9DA]">Votre réponse</p>
                  <p className="mt-1.5 text-sm leading-7 text-[#E5EAFE]">{ex?.reponse ?? <em className="text-[#AEB9DA]">Pas de réponse</em>}</p>
                </div>
                {fb && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {fb.ce_qui_va && (
                      <p className="flex gap-2.5 text-sm leading-6 text-[#DFEEE9]"><Check size={16} className="mt-1 shrink-0 text-[#80EDD9]" />{fb.ce_qui_va}</p>
                    )}
                    {fb.a_ameliorer && (
                      <p className="flex gap-2.5 text-sm leading-6 text-[#E8E2F2]"><Target size={16} className="mt-1 shrink-0 text-[#E1C1FF]" />{fb.a_ameliorer}</p>
                    )}
                  </div>
                )}
                {fb?.exemple && (
                  <div className="rounded-xl border border-[#9BD9EC]/25 bg-[#14354D]/40 p-4">
                    <p className="flex items-center gap-2 text-xs font-bold text-[#9EDCF0]"><Sparkles size={14} /> Une formulation possible</p>
                    <p className="mt-1.5 text-sm italic leading-7 text-[#E3F1FA]">« {fb.exemple} »</p>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
