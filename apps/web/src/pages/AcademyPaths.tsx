import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, CheckCircle2, Circle, GraduationCap, Route, Sparkles } from "lucide-react";
import { CandidateShell } from "../components/CandidateShell";
import { AcademyTabs } from "../components/AcademyTabs";
import { ApiError } from "../lib/api";
import { academyStore, LEVELS, loadCatalog, orderedSteps, recommendPaths, type AcademyPath, type Catalog } from "../lib/academy";
import { profileStore } from "../lib/storage";
import { cn } from "../lib/labels";

const PAGE = 6;

export default function AcademyPaths() {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [error, setError] = useState("");
  const [activeId, setActiveId] = useState<string | null>(() => academyStore.activePath());
  const [category, setCategory] = useState("Tous");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE);
  const profile = profileStore.get();
  const plan = academyStore.plan();
  const done = useMemo(() => new Set(academyStore.completedIds()), []);

  useEffect(() => {
    loadCatalog().then(setCatalog, (e) => setError(e instanceof ApiError ? e.message : "Les parcours sont indisponibles."));
  }, []);
  useEffect(() => setVisible(PAGE), [category, query]);

  const recommendations = useMemo(() => (catalog ? recommendPaths(catalog, profile) : []), [catalog, profile]);
  const active = catalog?.paths.find((p) => p.id === activeId) ?? null;
  const activePriority = recommendations.find((r) => r.path.id === activeId)?.priorityModule ?? null;
  const exerciseName = (id: string | null) => catalog?.exercises.find((e) => e.id === id)?.name ?? "Exercice";
  const categories = useMemo(() => ["Tous", ...new Set(catalog?.paths.map((p) => p.category) ?? [])], [catalog]);
  const q = query.toLocaleLowerCase("fr");
  const filtered = (catalog?.paths ?? []).filter(
    (p) => (category === "Tous" || p.category === category) && [p.title, p.goal, p.audience, p.category].join(" ").toLocaleLowerCase("fr").includes(q),
  );

  function choose(path: AcademyPath) {
    academyStore.setActivePath(path.id);
    setActiveId(path.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const progress = (p: AcademyPath) => p.steps.filter((s) => s.exerciseId && done.has(s.exerciseId)).length;

  return (
    <CandidateShell section="Académie" title="Curriculum" icon={GraduationCap} actions={<AcademyTabs />}>
      <section className="mb-7">
        <h1 className="text-[clamp(2.1rem,3.6vw,3.2rem)] font-extrabold leading-[1.09] tracking-[-.055em]">Un parcours pour chaque ambition.</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#60718F]">
          Choisissez un itinéraire d’apprentissage, explorez ses étapes et entraînez-vous à votre rythme. Les parcours conseillent : ils ne verrouillent jamais votre progression.
        </p>
      </section>
      {error && <p role="alert" className="mb-5 text-sm text-[#A64040]">{error}</p>}

      {plan && plan.steps.length > 0 && (
        <section className="mb-5 rounded-[26px] border border-[#C6EEE5] bg-[#EDFCF9] p-6">
          <p className="inline-flex items-center gap-2 text-xs font-bold text-[#18816A]"><Sparkles size={14} /> Votre programme élaboré avec le coach</p>
          <ol className="mt-4 grid gap-2 md:grid-cols-2">
            {plan.steps.map((s, i) => (
              <li key={s.exerciseId}>
                <Link to={`/academie/exercices/${s.exerciseId}`} className="flex items-start gap-3 rounded-xl bg-white/85 p-3 hover:bg-white">
                  {done.has(s.exerciseId) ? <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#18816A]" /> : <Circle size={18} className="mt-0.5 shrink-0 text-[#A2ADC1]" />}
                  <span>
                    <span className="text-xs font-bold text-[#5A6A88]">Étape {i + 1} · {s.goal}</span>
                    <span className="mt-0.5 block text-sm font-semibold">{s.exerciseName}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}

      {active && (
        <section className="panel panel-strong mb-5 rounded-[26px] p-6 sm:p-7" aria-labelledby="parcours-actif">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-[#7253C7]">Votre parcours actif</p>
              <h2 id="parcours-actif" className="mt-1 text-xl font-bold">{active.title}</h2>
              <p className="mt-1 text-sm text-[#5B6887]">{active.goal} · {LEVELS[active.level]} · {progress(active)} / {active.steps.length} étapes pratiquées</p>
            </div>
            <button type="button" onClick={() => { academyStore.setActivePath(null); setActiveId(null); }} className="text-xs font-semibold text-[#5A6A88] hover:underline">
              Quitter ce parcours
            </button>
          </div>
          <ol className="mt-5 grid gap-2 md:grid-cols-2">
            {orderedSteps(active, activePriority).map((s, i) => (
              <li key={`${s.category}-${i}`}>
                {s.exerciseId ? (
                  <Link to={`/academie/exercices/${s.exerciseId}`} className="flex items-center justify-between gap-3 rounded-xl border border-[#E3E8F3] bg-white p-3 hover:border-[#B9A6F3]">
                    <span className="flex items-start gap-3">
                      {done.has(s.exerciseId) ? <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#18816A]" /> : <Circle size={18} className="mt-0.5 shrink-0 text-[#A2ADC1]" />}
                      <span className="text-sm font-semibold">{exerciseName(s.exerciseId)}</span>
                    </span>
                    <ArrowRight size={15} className="shrink-0 text-[#7A52D9]" />
                  </Link>
                ) : null}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-xs text-[#8593AF]">Les étapes pratiquées viennent de vos tentatives enregistrées ; elles ne certifient pas une maîtrise.</p>
        </section>
      )}

      <section className="mb-5" aria-labelledby="conseilles">
        <h2 id="conseilles" className="text-lg font-bold">Mon parcours conseillé</h2>
        <p className="mt-1 text-xs text-[#6D7D98]">Recommandations explicables selon votre profil et votre dernier bilan.</p>
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {recommendations.map(({ path, reasons }, i) => (
            <article key={path.id} className={cn("flex flex-col rounded-[22px] border p-5", i === 0 ? "border-[#D3C6FA] bg-[linear-gradient(135deg,#F4EDFF,#FDE8F5)]" : "border-[#E3E8F3] bg-white/85")}>
              {i === 0 && <span className="mb-2 text-[11px] font-bold text-[#7A52D9]">Recommandation prioritaire</span>}
              <h3 className="text-base font-bold">{path.title}</h3>
              <p className="mt-1 text-xs text-[#5B6887]">{path.audience} · {path.duration}</p>
              <ul className="mt-3 space-y-1 text-xs leading-5 text-[#4F5E7C]">
                {reasons.map((r) => (
                  <li key={r}>• {r}</li>
                ))}
              </ul>
              <button type="button" onClick={() => choose(path)} className={cn("mt-auto inline-flex min-h-10 items-center gap-2 self-start rounded-xl px-4 text-sm font-bold", i === 0 ? "btn-gradient mt-4" : "btn-soft mt-4")}>
                <Route size={15} /> {activeId === path.id ? "Parcours actif" : "Suivre ce parcours"}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="panel rounded-[26px] p-6 sm:p-7" aria-labelledby="tous-parcours">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="tous-parcours" className="text-lg font-bold">Tous les parcours</h2>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher un parcours…" aria-label="Rechercher un parcours" className="min-h-10 rounded-xl border border-[#D6DDEE] bg-white px-3 text-sm outline-none focus:border-[#8855EF]" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} type="button" aria-pressed={category === c} onClick={() => setCategory(c)} className={cn("rounded-full px-3.5 py-1.5 text-xs font-semibold", category === c ? "bg-[#EDE7FF] text-[#784DD6]" : "bg-[#F4F6FC] text-[#5A6A88]")}>
              {c}
            </button>
          ))}
        </div>
        {catalog && filtered.length === 0 && <p className="mt-5 text-sm text-[#61718E]">Aucun parcours ne correspond à votre recherche.</p>}
        <ul className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.slice(0, visible).map((p) => (
            <li key={p.id} className="flex flex-col rounded-2xl border border-[#E3E8F3] bg-white/85 p-4">
              <span className="text-[11px] font-bold text-[#7A52D9]">{p.category} · {LEVELS[p.level]}</span>
              <span className="mt-2 text-sm font-bold">{p.title}</span>
              <span className="mt-1 text-xs leading-5 text-[#61718E]">{p.goal}</span>
              <span className="mt-2 text-[11px] text-[#8593AF]">{p.audience} · {progress(p)} / {p.steps.length} étapes pratiquées</span>
              <button type="button" onClick={() => choose(p)} className="mt-3 self-start text-sm font-bold text-[#405AB7] hover:underline">
                Découvrir ce parcours
              </button>
            </li>
          ))}
        </ul>
        {filtered.length > visible && (
          <button type="button" onClick={() => setVisible((v) => v + PAGE)} className="btn-soft mx-auto mt-5 flex min-h-11 items-center rounded-2xl px-5 text-sm font-semibold">
            Voir {Math.min(PAGE, filtered.length - visible)} parcours supplémentaires
          </button>
        )}
        <p className="mt-5 text-[11px] text-[#8A97B0]">Itinéraires pédagogiques conseillés, sans blocage, score ni certification.</p>
      </section>
    </CandidateShell>
  );
}
