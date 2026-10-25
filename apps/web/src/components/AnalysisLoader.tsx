import { motion, useReducedMotion } from "motion/react";
import { AudioLines, BrainCircuit, Check, Sparkles } from "lucide-react";

/** Écran d'attente pendant que l'évaluateur rédige le bilan (repris du parcours de référence). */
export function AnalysisLoader() {
  const reduced = useReducedMotion();
  return (
    <main className="relative isolate flex min-h-dvh flex-col items-center justify-center overflow-x-clip bg-[#F8F9FF] px-4 py-12 text-ink sm:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob -left-56 -top-60 size-[740px] bg-[#DCE5FF]/70 blur-[115px]" />
        <div className="blob -right-48 -top-32 size-[700px] bg-[#F9CEEF]/65 blur-[110px]" />
        <div className="blob bottom-[-300px] left-[22%] size-[650px] bg-[#DCD2FF]/65 blur-[120px]" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[760px]">
        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-[#5365FF] via-[#8755F4] to-[#E054C9] text-white shadow-[0_9px_24px_rgba(117,86,236,.22)]">
            <Sparkles size={19} />
          </span>
          <span className="text-sm font-extrabold tracking-[-.04em] text-[#273050]">
            Interview<span className="text-[#8755E8]">Lab</span>
          </span>
        </div>
        <motion.section
          initial={reduced ? false : { opacity: 0, y: 20, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative overflow-hidden rounded-[32px] border border-white/95 bg-white/80 px-6 pb-9 pt-10 text-center shadow-[0_30px_105px_rgba(109,91,190,.15)] backdrop-blur-2xl sm:px-12 sm:pb-12 sm:pt-12"
          role="status"
          aria-live="polite"
          aria-label="Analyse de votre entretien en cours"
        >
          <div className="relative mx-auto mb-8 grid size-28 place-items-center sm:size-32" aria-hidden="true">
            <div className="ring absolute inset-0 rounded-full border border-[#BDA4FD]/45" />
            <div className="ring-alt absolute inset-3 rounded-full border border-[#DA9CEB]/45" />
            <div className="float-y grid size-[76px] place-items-center rounded-[26px] bg-gradient-to-br from-[#667CFF] via-[#9161F7] to-[#E56ACD] text-white shadow-[0_18px_36px_rgba(137,89,230,.27),inset_0_1px_0_rgba(255,255,255,.6)] sm:size-[86px]">
              <BrainCircuit size={38} strokeWidth={1.7} />
            </div>
          </div>
          <h1 className="mx-auto max-w-[570px] text-balance text-[clamp(1.8rem,4.4vw,2.9rem)] font-extrabold leading-[1.14] tracking-[-.055em] text-[#192344]">
            Votre entretien se termine.
            <br />
            <span className="gradient-text">Votre progression commence.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[470px] text-[15px] leading-7 text-[#65728F]">
            Lina relit vos réponses et prépare votre bilan : points forts, axes de progrès et conseils concrets.
          </p>
          <div className="mx-auto mt-9 max-w-[480px] rounded-[22px] border border-[#E7E6F7] bg-[#FCFBFF]/90 p-5 text-left">
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="text-xs font-bold text-[#344366]">Préparation du bilan</span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#8B60E9]">
                <span className="live-dot size-2 rounded-full bg-[#986CF2]" /> En cours
              </span>
            </div>
            <div className="relative h-2 overflow-hidden rounded-full bg-[#E9E5FC]">
              <div className="indeterminate absolute inset-y-0 w-[36%] rounded-full bg-gradient-to-r from-[#5365FF] via-[#925AF4] to-[#EC72CF]" />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#55617E]">
                <AudioLines size={16} className="text-[#6C79E9]" /> Relecture des réponses
              </span>
              <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#55617E]">
                <Check size={16} className="text-[#9A66DF]" /> Rédaction des conseils
              </span>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
