import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Clock3 } from "lucide-react";

export function Countdown({ seconds = 5, onComplete }: { seconds?: number; onComplete: () => void }) {
  const [left, setLeft] = useState(seconds);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (left <= 0) {
      onComplete();
      return;
    }
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // onComplete est stable pour la durée du compte à rebours
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left]);
  return (
    <div className="flex flex-col items-center gap-3" role="timer" aria-label="Compte à rebours avant l’entretien">
      <div className="flex items-center gap-2 text-xs font-semibold tracking-[.12em] text-[#B5C6EF]">
        <Clock3 size={16} /> Démarrage dans
      </div>
      <div className="relative grid h-[clamp(5rem,15vw,8rem)] min-w-[2ch] place-items-center overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={left}
            initial={reduced ? false : { y: 40, opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={reduced ? undefined : { y: -40, opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="font-bold leading-none tracking-[-.07em] text-white tabular-nums text-[clamp(5rem,15vw,8rem)]"
          >
            {Math.max(left, 0)}
          </motion.span>
        </AnimatePresence>
      </div>
      <p className="text-sm text-[#B7C7EA]">Installez-vous confortablement, Lina arrive.</p>
    </div>
  );
}
