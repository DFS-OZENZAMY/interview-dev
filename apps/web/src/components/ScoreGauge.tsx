import { motion, useReducedMotion } from "motion/react";

/** Jauge de score sur 100, reprise du tableau de bord de référence. */
export function ScoreGauge({ score, title = "Score de préparation", dark = false }: { score: number | null; title?: string; dark?: boolean }) {
  const reduced = useReducedMotion();
  const valid = score !== null && Number.isFinite(score);
  const safe = valid ? Math.min(100, Math.max(0, score)) : 0;
  const arc = Math.PI * 78;
  const id = dark ? "gauge-dark" : "gauge-light";
  return (
    <div className="flex flex-col items-center" role="img" aria-label={valid ? `${title} : ${Math.round(safe)} sur 100` : `${title} : disponible après votre premier entretien`}>
      <svg viewBox="0 0 220 132" className="w-full max-w-[225px]" aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDA6" />
            <stop offset="52%" stopColor="#4D77E8" />
            <stop offset="100%" stopColor="#8C79EE" />
          </linearGradient>
        </defs>
        <path d="M32 110 A78 78 0 0 1 188 110" stroke={dark ? "rgba(255,255,255,.12)" : "#E3E8F3"} strokeWidth="13" fill="none" strokeLinecap="round" />
        <motion.path
          d="M32 110 A78 78 0 0 1 188 110"
          stroke={`url(#${id})`}
          strokeWidth="13"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={arc}
          initial={reduced ? false : { strokeDashoffset: arc }}
          animate={{ strokeDashoffset: valid ? arc * (1 - safe / 100) : arc }}
          transition={{ duration: reduced ? 0 : 1.3, ease: "easeOut" }}
        />
        <text x="110" y="91" fill={dark ? "#FFFFFF" : "#172033"} fontSize="34" textAnchor="middle" fontWeight="700">
          {valid ? Math.round(safe) : "—"}
        </text>
        <text x="110" y="110" fill={dark ? "#B9C4E4" : "#61718E"} fontSize="12" textAnchor="middle">
          {valid ? "sur 100" : "Pas encore évalué"}
        </text>
      </svg>
      <p className={`mt-1 text-center text-xs leading-5 ${dark ? "text-[#B9C4E4]" : "text-[#697993]"}`}>
        {valid ? title : "Votre premier score apparaîtra après une simulation."}
      </p>
    </div>
  );
}
