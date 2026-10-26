import { NavLink } from "react-router";
import { cn } from "../lib/labels";

/** Onglets Exercices / Parcours de l'Académie (en-tête de l'espace candidat). */
export function AcademyTabs() {
  const tabs = [
    { to: "/academie", label: "Exercices", end: true },
    { to: "/academie/parcours", label: "Parcours", end: false },
  ];
  return (
    <nav aria-label="Navigation Académie" className="flex items-center gap-1 rounded-2xl border border-[#DDD9F4] bg-[#F2F0FC] p-1.5">
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end={t.end}
          className={({ isActive }) =>
            cn(
              "inline-flex min-h-10 items-center rounded-xl px-4 text-sm transition",
              isActive ? "bg-gradient-to-r from-[#6658E8] to-[#8753DA] font-bold text-white shadow-[0_5px_14px_rgba(102,72,203,.28)]" : "font-semibold text-[#57618D] hover:bg-white/85",
            )
          }
        >
          {t.label}
        </NavLink>
      ))}
    </nav>
  );
}
