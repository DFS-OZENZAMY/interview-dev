import type { ReactNode } from "react";
import { NavLink } from "react-router";
import { ChevronRight, CirclePlay, LayoutDashboard, Mic, UserRound } from "lucide-react";
import { Logo } from "./Logo";
import { LightAmbient } from "./LightAmbient";
import { cn } from "../lib/labels";

const NAV = [
  { to: "/tableau-de-bord", label: "Vue d’ensemble", icon: LayoutDashboard },
  { to: "/preparation", label: "Simulation", icon: CirclePlay },
  { to: "/profil", label: "Mon profil", icon: UserRound },
];

/** Mise en page de l'espace candidat : barre latérale + en-tête, comme dans le parcours de référence. */
export function CandidateShell({ section, title, icon: Icon, actions, children }: {
  section: string;
  title: string;
  icon: typeof LayoutDashboard;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="relative min-h-dvh overflow-x-clip bg-[#F8F9FF] text-ink">
      <LightAmbient />
      <div className="relative mx-auto flex min-h-dvh max-w-[1720px]">
        <aside className="sticky top-0 hidden h-dvh w-[240px] shrink-0 flex-col border-r border-white/75 bg-white/65 px-5 py-7 backdrop-blur-2xl lg:flex">
          <Logo subtitle={null} />
          <p className="mb-3 mt-12 px-3 text-[11px] font-bold text-[#8593AF]">Espace candidat</p>
          <nav aria-label="Navigation candidat" className="space-y-1.5">
            {NAV.map(({ to, label, icon: NavIcon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    "flex min-h-12 items-center gap-3 rounded-2xl px-3.5 text-sm transition",
                    isActive ? "bg-[#EDE7FF] font-bold text-[#784DD6]" : "font-medium text-[#62718D] hover:bg-[#F2ECFF] hover:text-[#784DD6]",
                  )
                }
              >
                <NavIcon size={18} /> {label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto rounded-2xl border border-[#E9DCFF] bg-gradient-to-br from-[#F4EEFF] to-[#E9F7FF] p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#7055B3]">
              <Mic size={16} /> Lina, votre recruteuse IA
            </div>
            <p className="mt-2 text-xs leading-6 text-[#695F83]">Entretiens à l’oral, en français ou en anglais, avec un bilan à la fin.</p>
          </div>
        </aside>
        <div className="min-w-0 flex-1">
          <header className="flex min-h-[78px] flex-wrap items-center justify-between gap-3 border-b border-white/80 bg-white/60 px-5 py-3 backdrop-blur-xl sm:px-8 lg:px-10">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-[#EDE7FF] text-[#7A52DA]">
                <Icon size={21} />
              </span>
              <div>
                <p className="flex items-center gap-1 text-xs font-semibold text-[#6A7A97]">
                  {section} <ChevronRight size={13} />
                </p>
                <p className="mt-0.5 text-base font-bold tracking-tight text-[#172033]">{title}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">{actions}</div>
          </header>
          {/* Navigation compacte sur mobile */}
          <nav aria-label="Navigation candidat" className="flex gap-1 overflow-x-auto border-b border-white/80 bg-white/50 px-4 py-2 lg:hidden">
            {NAV.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn("shrink-0 rounded-xl px-3 py-2 text-xs", isActive ? "bg-[#EDE7FF] font-bold text-[#784DD6]" : "font-semibold text-[#62718D]")
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="w-full px-5 pb-16 pt-9 sm:px-8 lg:px-10">{children}</div>
        </div>
      </div>
    </main>
  );
}
