import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, CheckCircle2, GraduationCap, Search, Sparkles, Target } from "lucide-react";
import { CandidateShell } from "../components/CandidateShell";
import { AcademyTabs } from "../components/AcademyTabs";
import { AcademyCoach } from "../components/AcademyCoach";
import { ApiError } from "../lib/api";
import { academyStore, LEVELS, loadCatalog, nextExercise, type Catalog } from "../lib/academy";
import { profileStore } from "../lib/storage";
import { cn } from "../lib/labels";

const PAGE = 9;
/** Priorité du bilan d'entretien → domaine d'exercices (passerelle reprise d'ai-interview-platform). */
const FOCUS_CATEGORY: Record<string, { category: string; label: string }> = {
  clarte: { category: "communication", label: "gagner en clarté" },
  pertinence: { category: "structure", label: "répondre au plus juste" },
  exemples_concrets: { category: "behavior", label: "renforcer vos exemples" },
  structure: { category: "structure", label: "structurer vos réponses" },
  motivation: { category: "motivation", label: "exprimer votre motivation" },
};
const SOURCE_LABEL = { coach: "Proposé par votre coach", parcours: "Tiré de votre parcours conseillé", depart: "Un exercice pour commencer" };

export default function Academy() {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");
  const [status, setStatus] = useState("all");
  const [visible, setVisible] = useState(PAGE);
  const [planVersion, setPlanVersion] = useState(0);
  const completed = useMemo(() => new Set(academyStore.completedIds()), []);
  const profile = profileStore.get();
  const [bridge] = useState(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("source") !== "entretien") return null;
    return { focus: FOCUS_CATEGORY[p.get("focus") ?? ""] ?? FOCUS_CATEGORY.structure!, poste: (p.get("poste") ?? "").slice(0, 100) };
  });

  useEffect(() => {
    loadCatalog().then(setCatalog, (e) => setError(e instanceof ApiError ? e.message : "Le catalogue est indisponible."));
  }, []);
  useEffect(() => setVisible(PAGE), [query, category, level, status]);

  const next = useMemo(() => (catalog ? nextExercise(catalog, profile) : null), [catalog, profile, planVersion]);
  const nextEx = next && catalog?.exercises.find((e) => e.id === next.exerciseId);
  const bridgeEx = bridge && catalog ? (catalog.exercises.find((e) => e.category === bridge.focus.category && e.level === "practice") ?? catalog.exercises.find((e) => e.category === bridge.focus.category)) : undefined;
  const categories = useMemo(
    () => (catalog ? Array.from(new Map(catalog.exercises.map((e) => [e.category, e.categoryLabel])).entries()) : []),
    [catalog],
  );
  const domainCounts = useMemo(() => {
    if (!catalog) return [];
    const counts = new Map<string, number>();
    for (const a of academyStore.attempts()) {
      const ex = catalog.exercises.find((e) => e.id === a.exerciseId);
      if (ex) counts.set(ex.categoryLabel, (counts.get(ex.categoryLabel) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [catalog]);

  const q = query.toLocaleLowerCase("fr");
  const filtered = (catalog?.exercises ?? []).filter(
    (e) =>
      (category === "all" || e.category === category) &&
      (level === "all" || e.level === level) &&
      (status === "all" || (status === "done" ? completed.has(e.id) : !completed.has(e.id))) &&
      [e.name, e.prompt, e.skill, e.categoryLabel].join(" ").toLocaleLowerCase("fr").includes(q),
  );
  const select = "min-h-11 rounded-xl border border-[#D6DDEE] bg-white px-3 text-sm outline-none focus:border-[#8855EF]";

  return (
    <CandidateShell section="Espace candidat" title="Académie" icon={GraduationCap} actions={<AcademyTabs />}>
      <section className="mb-7">
        <h1 className="text-[clamp(2.1rem,3.6vw,3.2rem)] font-extrabold leading-[1.09] tracking-[-.055em]">Entraînez-vous sur ce qui compte.</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#60718F]">
          Des exercices guidés pour transformer votre bilan en réponses plus convaincantes, avec un coach pour choisir par où commencer. Sans score automatique ni diagnostic fictif.
        </p>
      </section>

      {bridge && (
        <section aria-label="Continuité après entretien" className="mb-5 rounded-2xl border border-[#CFC5EF] bg-[#F4F0FF] p-5">
          <p className="text-xs font-bold text-[#7051B8]">Depuis votre simulation</p>
          <h2 className="mt-2 text-xl font-bold text-[#26345C]">Poursuivre votre préparation{bridge.poste ? ` · ${bridge.poste}` : ""}</h2>
          <p className="mt-2 text-sm leading-6 text-[#586987]">
            Piste pédagogique issue de votre bilan : {bridge.focus.label}. Vous pouvez la modifier librement ; elle ne constitue pas un diagnostic de compétence.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {bridgeEx && (
              <Link to={`/academie/exercices/${bridgeEx.id}`} className="btn-gradient inline-flex min-h-11 items-center gap-2 rounded-2xl px-5 text-sm font-bold">
                {bridgeEx.name} <ArrowRight size={16} />
              </Link>
            )}
            <Link to={`/preparation${bridge.poste ? `?poste=${encodeURIComponent(bridge.poste)}` : ""}`} className="btn-soft inline-flex min-h-11 items-center rounded-2xl px-5 text-sm font-semibold">
              Refaire un entretien sur ce poste
            </Link>
          </div>
        </section>
      )}

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,.8fr)]">
        <AcademyCoach onSaved={() => setPlanVersion((v) => v + 1)} />
        <div className="space-y-4">
          <section className="relative overflow-hidden rounded-[26px] border border-white/90 bg-[linear-gradient(115deg,#ECEDFF_0%,#EDE7FF_55%,#FCE6F5_100%)] p-6 shadow-[0_20px_60px_rgba(112,86,206,.14)]">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-[#7A52D9]">
              <Sparkles size={14} /> Votre prochaine étape
            </p>
            {nextEx && next ? (
              <>
                <p className="mt-4 text-xs font-semibold text-[#5B6887]">{SOURCE_LABEL[next.source]}</p>
                <h2 className="mt-1 text-lg font-bold leading-snug">{nextEx.name}</h2>
                <p className="mt-2 text-xs text-[#5B6887]">
                  {nextEx.categoryLabel} · {LEVELS[nextEx.level] ?? nextEx.levelLabel} · {nextEx.duration}
                </p>
                <Link to={`/academie/exercices/${nextEx.id}`} className="btn-gradient mt-5 inline-flex min-h-11 items-center gap-2 rounded-2xl px-5 text-sm font-bold">
                  Commencer l’exercice <ArrowRight size={16} />
                </Link>
              </>
            ) : (
              <p className="mt-4 text-sm text-[#5B6887]">{error || "Chargement…"}</p>
            )}
          </section>
          <section className="panel rounded-[26px] p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold">Domaines travaillés</h2>
              <Target size={18} className="text-[#6E60C9]" />
            </div>
            {domainCounts.length ? (
              <ul className="mt-4 space-y-2">
                {domainCounts.map(([label, count]) => (
                  <li key={label} className="flex items-center justify-between rounded-xl bg-[#F4F6FC] px-3 py-2 text-sm">
                    <span>{label}</span>
                    <span className="font-bold text-[#5267A0]">{count}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-[#6D7D98]">Aucune tentative enregistrée pour l’instant.</p>
            )}
            <p className="mt-3 text-xs leading-5 text-[#8593AF]">Ces indicateurs décrivent l’activité, pas la maîtrise des compétences.</p>
          </section>
        </div>
      </div>

      <section className="panel mt-6 rounded-[26px] p-6 sm:p-7" aria-labelledby="catalogue">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="catalogue" className="text-lg font-bold">Catalogue d’exercices</h2>
            <p className="mt-1 text-xs text-[#6D7D98]">{catalog ? `${filtered.length} exercice${filtered.length > 1 ? "s" : ""} sur ${catalog.exercises.length}` : "Chargement…"}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
              setLevel("all");
              setStatus("all");
            }}
            className="text-xs font-semibold text-[#405AB7] hover:underline"
          >
            Réinitialiser les filtres
          </button>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <label className="relative sm:col-span-2 lg:col-span-1">
            <span className="sr-only">Rechercher un exercice</span>
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A97B0]" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher…" className={cn(select, "w-full pl-9")} />
          </label>
          <select aria-label="Domaine" value={category} onChange={(e) => setCategory(e.target.value)} className={select}>
            <option value="all">Tous les domaines</option>
            {categories.map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <select aria-label="Niveau" value={level} onChange={(e) => setLevel(e.target.value)} className={select}>
            <option value="all">Tous les niveaux</option>
            {Object.entries(LEVELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <select aria-label="Statut" value={status} onChange={(e) => setStatus(e.target.value)} className={select}>
            <option value="all">Tous les statuts</option>
            <option value="done">Déjà pratiqués</option>
            <option value="todo">À découvrir</option>
          </select>
        </div>

        {filtered.length === 0 && catalog && (
          <p className="mt-6 rounded-xl bg-[#F4F6FC] p-4 text-sm text-[#61718E]">Aucun exercice ne correspond à ces filtres. Essayez un autre mot-clé ou un autre domaine.</p>
        )}
        <ul className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.slice(0, visible).map((e) => (
            <li key={e.id}>
              <Link to={`/academie/exercices/${e.id}`} className="flex h-full flex-col rounded-2xl border border-[#E3E8F3] bg-white/85 p-4 transition hover:-translate-y-0.5 hover:border-[#B9A6F3]">
                <span className="flex items-center justify-between gap-2 text-[11px] font-bold text-[#7A52D9]">
                  {e.categoryLabel}
                  {completed.has(e.id) && (
                    <span className="inline-flex items-center gap-1 text-[#18816A]">
                      <CheckCircle2 size={13} /> Déjà réalisé
                    </span>
                  )}
                </span>
                <span className="mt-2 text-sm font-bold leading-snug text-[#172041]">{e.name}</span>
                <span className="mt-2 line-clamp-2 text-xs leading-5 text-[#61718E]">{e.prompt}</span>
                <span className="mt-auto pt-3 text-[11px] font-semibold text-[#8593AF]">
                  {LEVELS[e.level] ?? e.levelLabel} · {e.duration} · {e.skill}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {filtered.length > visible && (
          <button type="button" onClick={() => setVisible((v) => v + PAGE)} className="btn-soft mx-auto mt-5 flex min-h-11 items-center rounded-2xl px-5 text-sm font-semibold">
            Voir {Math.min(PAGE, filtered.length - visible)} exercices supplémentaires
          </button>
        )}
        <p className="mt-5 text-[11px] text-[#8A97B0]">Catalogue pédagogique d’exercices de pratique, pas des évaluations de recrutement validées. Votre progression reste dans ce navigateur.</p>
      </section>
    </CandidateShell>
  );
}
