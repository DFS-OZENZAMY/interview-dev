import { CRITERIA } from "../lib/labels";
import { isReport, type HistoryEntry, type Report } from "../lib/types";

/** Courbe des scores globaux (du plus ancien au plus récent) et moyenne par critère. */
export function ProgressChart({ history }: { history: HistoryEntry[] }) {
  const scored = history
    .filter((h): h is HistoryEntry & { report: Report } => isReport(h.report))
    .slice(0, 12)
    .reverse();
  if (scored.length < 2) {
    return (
      <p className="rounded-2xl bg-[#F4F6FC] p-5 text-sm leading-6 text-[#61718E]">
        Votre courbe de progression apparaîtra après deux bilans. Chaque séance compte !
      </p>
    );
  }

  const W = 560;
  const H = 180;
  const pad = { x: 28, top: 18, bottom: 30 };
  const step = (W - pad.x * 2) / (scored.length - 1);
  const y = (v: number) => pad.top + (1 - v / 100) * (H - pad.top - pad.bottom);
  const points = scored.map((h, i) => ({ x: pad.x + i * step, y: y(h.report.score_global), h }));
  const line = points.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `${line} L${points.at(-1)!.x.toFixed(1)},${H - pad.bottom} L${points[0]!.x.toFixed(1)},${H - pad.bottom} Z`;

  const keys = Object.keys(CRITERIA) as (keyof Report["scores"])[];
  const averages = keys.map((k) => ({
    key: k,
    label: CRITERIA[k]!,
    value: scored.reduce((sum, h) => sum + (h.report.scores[k] ?? 0), 0) / scored.length,
  }));
  const first = scored[0]!.report.score_global;
  const last = scored.at(-1)!.report.score_global;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      <figure>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`Score global sur vos ${scored.length} derniers bilans : de ${first} à ${last} sur 100`}>
          <defs>
            {/* Coordonnées absolues : une ligne horizontale (scores égaux) n'a pas de hauteur et masquerait un dégradé relatif. */}
            <linearGradient id="progress-line" gradientUnits="userSpaceOnUse" x1={pad.x} y1="0" x2={W - pad.x} y2="0">
              <stop offset="0" stopColor="#5365FF" />
              <stop offset=".55" stopColor="#8755F4" />
              <stop offset="1" stopColor="#DF4DC5" />
            </linearGradient>
            <linearGradient id="progress-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8755F4" stopOpacity=".18" />
              <stop offset="1" stopColor="#8755F4" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 50, 100].map((v) => (
            <g key={v}>
              <line x1={pad.x} x2={W - pad.x} y1={y(v)} y2={y(v)} stroke="#E3E8F3" strokeDasharray={v === 0 ? "" : "4 6"} />
              <text x={4} y={y(v) + 4} fontSize="10" fill="#8A97B0">{v}</text>
            </g>
          ))}
          <path d={area} fill="url(#progress-area)" />
          <path d={line} fill="none" stroke="url(#progress-line)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {points.map((p) => (
            <g key={p.h.sessionId}>
              <circle cx={p.x} cy={p.y} r="5" fill="#fff" stroke="#8755F4" strokeWidth="2.5" />
              <text x={p.x} y={p.y - 11} fontSize="11" fontWeight="700" textAnchor="middle" fill="#2B3556">{p.h.report.score_global}</text>
              <text x={p.x} y={H - 10} fontSize="10" textAnchor="middle" fill="#8A97B0">
                {new Date(p.h.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
              </text>
            </g>
          ))}
        </svg>
        <figcaption className="mt-2 text-xs text-[#6D7D98]">
          Score global de vos {scored.length} derniers bilans ({last - first >= 0 ? "+" : ""}{last - first} points depuis le premier).
        </figcaption>
      </figure>
      <div>
        <p className="text-xs font-bold text-[#5A6A88]">Moyenne par critère</p>
        <dl className="mt-3 space-y-3">
          {averages.map((a) => (
            <div key={a.key} className="grid grid-cols-[120px_1fr_36px] items-center gap-3 text-sm">
              <dt className="text-[#4F5E7C]">{a.label}</dt>
              <dd className="h-2 overflow-hidden rounded-full bg-[#E9ECF6]">
                <span className="block h-full rounded-full bg-gradient-to-r from-[#38BDA6] via-[#4D77E8] to-[#8C79EE]" style={{ width: `${a.value * 10}%` }} />
              </dd>
              <dd className="text-right font-semibold tabular-nums text-[#26334E]">{a.value.toFixed(1)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
