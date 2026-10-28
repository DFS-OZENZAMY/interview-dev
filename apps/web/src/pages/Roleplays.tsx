import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Drama, MessageSquareQuote, Search, Sparkles, UserRound, WandSparkles } from "lucide-react";
import { CandidateShell } from "../components/CandidateShell";
import { ApiError } from "../lib/api";
import { OBJECTIVES, TYPES, cn } from "../lib/labels";
import { createScenario, DOMAINS, ROLE_CATALOG, roleplayDraft, scenarioForRole, TEMPLATES, type Scenario } from "../lib/roleplay";

/** Roleplay Studio (design et contenu repris d'ai-interview-platform). */
export default function Roleplays() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Scenario | null>(null);
  const [domaine, setDomaine] = useState("all");
  const [query, setQuery] = useState("");
  const [brief, setBrief] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const roles = ROLE_CATALOG.filter((r) => (domaine === "all" || r.domaine === domaine) && r.name.toLocaleLowerCase("fr").includes(query.toLocaleLowerCase("fr")));

  function pick(s: Scenario) {
    setSelected(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function prepare() {
    if (!selected) return;
    roleplayDraft.set(selected);
    navigate("/preparation");
  }

  async function generate() {
    if (brief.trim().length < 20 || busy) return;
    setBusy(true);
    setError("");
    try {
      pick(await createScenario(brief.trim()));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "La génération n'a pas abouti. Réessayez.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <CandidateShell section="Espace candidat" title="Jeux de rôle" icon={Drama}>
      <section className="relative mb-7 overflow-hidden rounded-[30px] border border-white/90 bg-[linear-gradient(115deg,#ECEDFF_0%,#EDE7FF_55%,#FCE6F5_100%)] p-7 shadow-[0_20px_60px_rgba(112,86,206,.14)] sm:p-9">
        <div aria-hidden="true" className="blob -right-24 -top-32 size-80 bg-[#BD88FA]/35 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)] lg:items-center">
          <div>
            <p className="text-xs font-bold text-[#7A52D9]">Roleplay Studio · votre espace d’entraînement</p>
            <h1 className="mt-3 text-[clamp(2rem,3.4vw,3rem)] font-extrabold leading-[1.1] tracking-[-.05em]">
              Un entretien plus réaliste.
              <br />
              <span className="gradient-text">Une préparation plus efficace.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#5B6887]">
              Choisissez une simulation prête à l’emploi ou créez votre propre entretien avec l’IA, puis entraînez-vous à répondre à Lina.
            </p>
            <a href="#creer" className="btn-gradient mt-6 inline-flex min-h-12 items-center gap-2 rounded-2xl px-5 text-sm font-bold">
              <WandSparkles size={17} /> Créer mon scénario
            </a>
          </div>
          <div className="rounded-[24px] border border-white bg-white/85 p-5 shadow-[0_14px_40px_rgba(96,83,164,.1)]" aria-hidden="true">
            <p className="flex items-center gap-2 text-xs font-bold text-[#506082]">
              <span className="grid size-8 place-items-center rounded-xl bg-[#EDE7FF] text-[#8157E7]"><UserRound size={16} /></span> Votre intervieweuse IA · entretien contextualisé
            </p>
            <p className="mt-4 rounded-2xl bg-[#F6F3FF] p-3 text-sm font-semibold text-[#283458]">Parlez-moi d’une situation où vous avez dû prendre une décision difficile.</p>
            <p className="mt-2 ml-8 rounded-2xl bg-[#EEF3FC] p-3 text-sm text-[#4F5E7C]">Je commencerais par expliquer le contexte et les enjeux…</p>
            <p className="mt-2 text-[10px] font-bold text-[#8A78C8]">Relance</p>
            <p className="rounded-2xl bg-[#F6F3FF] p-3 text-sm font-semibold text-[#283458]">Qu’avez-vous appris de cette expérience ?</p>
          </div>
        </div>
      </section>

      {selected && (
        <section className="panel panel-strong mb-7 rounded-[28px] p-6 sm:p-8" aria-labelledby="scenario-choisi">
          <p className="text-xs font-bold text-[#21856A]">Scénario sélectionné</p>
          <h2 id="scenario-choisi" className="mt-2 text-2xl font-bold">{selected.title}</h2>
          <p className="mt-1 text-sm text-[#5B6887]">
            {TYPES[selected.type].label} · {selected.persona}
            {selected.poste ? ` · ${selected.poste}` : " · poste à préciser à l’étape suivante"}
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#4F5E7C]">{selected.contexte}</p>
          {selected.objectifs.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selected.objectifs.map((o) => (
                <span key={o} className="rounded-full bg-[#EAFBF8] px-3 py-1 text-xs font-semibold text-[#18816A]">{OBJECTIVES[o].label}</span>
              ))}
            </div>
          )}
          {selected.questions.length > 0 && (
            <div className="mt-5">
              <p className="flex items-center gap-2 text-xs font-bold text-[#5A6A88]"><MessageSquareQuote size={14} /> Aperçu des questions possibles</p>
              <ul className="mt-2 space-y-1.5 text-sm text-[#4F5E7C]">
                {selected.questions.map((q) => (
                  <li key={q}>• {q}</li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-[#8593AF]">Questions illustratives : Lina adapte les siennes au poste et à vos réponses.</p>
            </div>
          )}
          <button type="button" onClick={prepare} className="btn-gradient mt-6 inline-flex min-h-12 items-center gap-2 rounded-2xl px-6 text-sm font-bold">
            Préparer cet entretien <ArrowRight size={17} />
          </button>
        </section>
      )}

      <section className="mb-7" aria-labelledby="prets">
        <h2 id="prets" className="text-lg font-bold">Démarrer facilement</h2>
        <p className="mt-1 text-xs text-[#6D7D98]">Des entretiens prêts pour vous : quatre expériences pour commencer en quelques clics.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {TEMPLATES.map((t) => (
            <button key={t.title} type="button" onClick={() => pick(t)} className={cn("panel flex flex-col rounded-[22px] p-5 text-left transition hover:-translate-y-0.5", selected?.title === t.title && "ring-2 ring-[#8E67EF]")}>
              <span className="text-[11px] font-bold text-[#7A52D9]">{TYPES[t.type].label}</span>
              <span className="mt-2 text-base font-bold">{t.title}</span>
              <span className="mt-2 text-xs leading-5 text-[#61718E]">{t.contexte}</span>
              <span className="mt-auto pt-4 text-sm font-bold text-[#405AB7]">Découvrir</span>
            </button>
          ))}
        </div>
      </section>

      <section className="panel mb-7 rounded-[26px] p-6 sm:p-7" aria-labelledby="metiers">
        <h2 id="metiers" className="text-lg font-bold">Catalogue métiers</h2>
        <p className="mt-1 text-xs text-[#6D7D98]">Choisissez d’abord un univers, puis le métier qui vous correspond.</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {["all", ...DOMAINS].map((d) => (
            <button key={d} type="button" aria-pressed={domaine === d} onClick={() => setDomaine(d)} className={cn("rounded-full px-3.5 py-1.5 text-xs font-semibold", domaine === d ? "bg-[#EDE7FF] text-[#784DD6]" : "bg-[#F4F6FC] text-[#5A6A88]")}>
              {d === "all" ? "Tous" : d}
            </button>
          ))}
          <label className="relative ml-auto">
            <span className="sr-only">Rechercher un métier</span>
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A97B0]" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher un métier…" className="min-h-10 rounded-xl border border-[#D6DDEE] bg-white pl-9 pr-3 text-sm outline-none focus:border-[#8855EF]" />
          </label>
        </div>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((r) => (
            <li key={r.name}>
              <button type="button" onClick={() => pick(scenarioForRole(r.name, r.domaine))} className="flex w-full items-center justify-between gap-3 rounded-xl border border-[#E3E8F3] bg-white/85 px-4 py-3 text-left hover:border-[#B9A6F3]">
                <span>
                  <span className="block text-sm font-semibold">{r.name}</span>
                  <span className="text-[11px] text-[#8593AF]">{r.domaine}</span>
                </span>
                <ArrowRight size={15} className="shrink-0 text-[#7A52D9]" />
              </button>
            </li>
          ))}
        </ul>
        {roles.length === 0 && <p className="mt-4 text-sm text-[#61718E]">Aucun métier ne correspond. Décrivez-le plutôt ci-dessous : l’IA créera le scénario.</p>}
      </section>

      <section id="creer" className="panel panel-strong scroll-mt-24 rounded-[26px] p-6 sm:p-7" aria-labelledby="creer-titre">
        <p className="flex items-center gap-2 text-xs font-bold text-[#7A52D9]"><Sparkles size={14} /> Créé par l’IA</p>
        <h2 id="creer-titre" className="mt-2 text-lg font-bold">Créer mon scénario</h2>
        <p className="mt-1 text-sm text-[#61718E]">Décrivez l’entretien que vous préparez : le poste, l’entreprise, l’interlocuteur, ce qui vous inquiète.</p>
        <label htmlFor="brief" className="sr-only">Description du scénario</label>
        <textarea
          id="brief"
          value={brief}
          onChange={(e) => setBrief(e.target.value.slice(0, 2000))}
          rows={4}
          placeholder="Ex. Je passe un entretien final avec le directeur commercial d’une PME industrielle pour un poste d’Account Manager. Il est réputé direct et pose des questions sur les chiffres."
          className="mt-4 w-full resize-y rounded-2xl border border-[#CBD7EE] bg-white p-4 text-sm leading-7 outline-none focus:border-[#8855EF]"
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-[#7887A1]">{brief.trim().length} / 2000 · 20 caractères minimum</span>
          <button type="button" onClick={() => void generate()} disabled={busy || brief.trim().length < 20} className="btn-gradient inline-flex min-h-11 items-center gap-2 rounded-2xl px-5 text-sm font-bold">
            <WandSparkles size={16} /> {busy ? "Création en cours…" : "Créer le scénario"}
          </button>
        </div>
        {error && <p role="alert" className="mt-3 text-sm text-[#A64040]">{error}</p>}
      </section>
    </CandidateShell>
  );
}
