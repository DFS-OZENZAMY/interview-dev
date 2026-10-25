import { Sparkles } from "lucide-react";
import { Link } from "react-router";

export function Logo({ subtitle = "Votre coach d’entretien IA", to = "/" }: { subtitle?: string | null; to?: string }) {
  return (
    <Link to={to} aria-label="InterviewLab, accueil" className="flex min-w-0 items-center gap-2.5">
      <span className="grid size-10 shrink-0 place-items-center rounded-[14px] bg-gradient-to-br from-[#5268FF] via-[#8A57FF] to-[#E454D5] text-white shadow-[0_8px_24px_rgba(128,92,255,.2)]">
        <Sparkles size={20} strokeWidth={2.1} />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[16px] font-extrabold tracking-[-.05em] text-[#172041]">
          Interview<span className="text-[#8250EF]">Lab</span>
        </span>
        {subtitle && <span className="mt-0.5 text-[10px] font-semibold tracking-[.06em] text-[#7984A2]">{subtitle}</span>}
      </span>
    </Link>
  );
}
