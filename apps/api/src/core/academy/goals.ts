// Repris d'ai-interview-platform (Achraf SILA), logique inchangée.
/** Candidate-grounded goal timeline: intention is not evidence of acquired skill. */
export type Goal={label:string;status:"active"|"superseded";source:string;turn:number};
export type GoalTimeline={goals:Goal[];confirmedFacts:string[];hypotheses:string[]};
type Turn={role:"user"|"assistant";content:string};
const norm=(s:string)=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
const sensitive=/(sante|maladie|medical|diagnostic|religion|politique|sexualite|grossesse|handicap)/i;
const replaces=/\b(finalement|uniquement|seulement|desormais|plutot|je change d.objectif)\b/i;
const topicPatterns:[string,RegExp][]=[
 ["communication orale",/(communication orale|prise de parole|eloquence)/i],
 ["structuration des réponses",/(structur|methode star|argumentation)/i],
 ["soft skills",/(soft.skills|qualites et defauts|qualites|defauts)/i],
 ["présentation des projets",/(presenter mon projet|expliquer mes projets|parler de mon projet)/i],
 ["négociation salariale",/(pretentions salariales|negociat|salaire)/i],
 ["gestion du stress",/(stress|trac|anxiete)/i]
];
export function trackGoals(turns:unknown):GoalTimeline{
 if(!Array.isArray(turns))return {goals:[],confirmedFacts:[],hypotheses:[]};
 const goals:Goal[]=[];const confirmedFacts:string[]=[];
 for(let i=0;i<turns.length;i++){
  const turn=turns[i] as Turn|null;
  if(!turn||turn.role!=="user"||typeof turn.content!=="string")continue;
  const raw=turn.content.trim().slice(0,500);const text=norm(raw);
  if(sensitive.test(text))continue;
  const intent=/(je (veux|souhaite|dois)|j.ai du mal|je prepare|m.entrain|ameliorer|travailler)/i.test(text);
  const switchIntent=replaces.test(text);
  const topics=intent?topicPatterns.filter(([,pattern])=>pattern.test(text)).map(([label])=>label):[];
  if(switchIntent&&topics.length)for(const goal of goals)goal.status="superseded";
  for(const topic of topics){if(!goals.some(g=>g.label===topic&&g.status==="active"))goals.push({label:topic,status:"active",source:raw.slice(0,180),turn:i});}
  if(/\b(je suis|je travaille|j.ai deja|je n.ai jamais|mon poste est)\b/.test(text)&&raw.length>=15&&!confirmedFacts.includes(raw))confirmedFacts.push(raw.slice(0,180));
 }
 return {goals:goals.slice(-10),confirmedFacts:confirmedFacts.slice(-5),hypotheses:[]};
}
export function goalContext(timeline:GoalTimeline){const active=timeline.goals.filter(g=>g.status==="active");return active.length?"Objectifs encore actifs déclarés par le candidat (ne signifient pas que les compétences sont acquises) : "+active.map(g=>g.label).join(", ")+". Les anciens objectifs abandonnés ne doivent pas guider les recommandations.":"";}
