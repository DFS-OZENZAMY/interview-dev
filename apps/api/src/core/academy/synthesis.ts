// Repris d'ai-interview-platform (Achraf SILA), logique inchangée.
import {interpretNeed} from "./matching";
import {paths,stepsForPath} from "./content/paths";
import {exercises} from "./content/catalog";

export const themes=[
 {key:"softskills",label:"Valoriser vos soft skills",pathId:"behavioral",module:"behavior"},
 {key:"hr_final",label:"Réussir les questions RH et DRH",pathId:"behavioral",module:"behavior"},
 {key:"structure",label:"Structurer vos réponses",pathId:"star",module:"structure"},
 {key:"stress",label:"Gérer votre stress",pathId:"stress",module:"confidence"},
 {key:"communication",label:"Renforcer votre communication",pathId:"eloquence",module:"communication"},
 {key:"motivation",label:"Exprimer votre motivation",pathId:"first-job",module:"motivation"},
 {key:"first_interview",label:"Préparer votre premier entretien",pathId:"first-job",module:"pitch"},
 {key:"sales",label:"Préparer un entretien pour un poste commercial",pathId:"sales",module:"pitch"},
 {key:"technical",label:"Défendre vos compétences techniques",pathId:"graduate-tech",module:"technical"},
 {key:"leadership",label:"Illustrer votre leadership",pathId:"lead-first",module:"leadership"},
 {key:"negotiation",label:"Préparer une négociation",pathId:"salary",module:"negotiation"},
 {key:"internship",label:"Préparer votre stage ou PFE",pathId:"internship",module:"graduates"},
] as const;
const methods:Record<string,string>={
 softskills:"Préparer un exemple précis de collaboration ou d’adaptation, puis une qualité et un axe de progrès illustrés par des faits.",
 hr_final:"Relier une expérience concrète aux attentes RH, en distinguant votre contribution et vos apprentissages.",
 structure:"Organiser une réponse avec la situation, la tâche, votre action personnelle et le résultat, sans réciter une formule.",
 stress:"Formuler une réponse à une question déstabilisante, puis identifier une stratégie pour retrouver le fil.",
 communication:"Travailler un message oral bref, intelligible et illustré par un exemple.",
 motivation:"Relier vos motivations au poste avec deux preuves issues de votre parcours.",
 first_interview:"Construire une présentation claire du parcours et une preuve adaptée à un premier entretien.",
 sales:"Présenter une réalisation commerciale en précisant le contexte client, l’action conduite et la valeur apportée.",
 technical:"Expliquer une décision technique, ses alternatives et ses compromis, sans inventer de résultats.",
 leadership:"Illustrer une décision d’équipe, votre rôle, les arbitrages et ce que vous avez appris.",
 negotiation:"Argumenter une attente de rémunération avec des critères professionnels et une posture ouverte.",
 internship:"Valoriser un projet académique ou de stage en mettant l’accent sur votre contribution réelle."
};
type Step={exerciseId:string;exerciseName:string;pathId:string;pathTitle:string;goal:string;method:string};
export function synthesizeLearningNeeds(userMessages:string[],semanticKeys?:string[]){
 const resetAt=userMessages.findLastIndex((message,index)=>index>0&&/\b(finalement|uniquement|seulement|desormais|plutot|je change d.avis)\b/i.test(message.normalize("NFD").replace(/[\u0300-\u036f]/g,"")));
 if(resetAt>0)userMessages=userMessages.slice(resetAt);
 const found:Array<(typeof themes)[number]["key"]>=[];
 for(const message of userMessages){
  const normalized=message.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
  // Identify several topics within a single message rather than only the first regex match.
  for(const t of themes){
   const expressions:Record<string,RegExp>={
    softskills:/soft.?skills?|savoir.?etre|qualit.{0,12}defaut|qualites?|defauts?|point.{0,12}(fort|faible)|competenc.{0,12}comportement/,
    hr_final:/\bdrh\b|entretien.{0,20}\brh\b|final.{0,25}(rh|ressources humaines)|questions? rh/,
    structure:/structur|methode star|reponses? organis|reponses? constru/,
    stress:/stress|pression|trac|angoiss|confiance/,
    communication:/communi|expression orale|prise de parole|eloquen|parl.{0,18}oral|\ba l.oral\b/,
    motivation:/motivation|pourquoi ce poste|pourquoi vous/,
    first_interview:/premier.{0,30}entretien|premier emploi/,
    sales:/responsable commercial|directeur commercial|poste commercial|role de commercial|fonction commerciale|business development|vente|commercial/,
    technical:/competences? techniques? (?:en informatique|en data)|data analyst|devops|cyber|developpement logiciel|programmation/,
    leadership:/leadership|management|manager|gestion d.equipe/,
    negotiation:/negoci|salaire|remuneration/,
    internship:/stage|\bpfe\b|alternance/
   };
   if(expressions[t.key].test(normalized)&&!found.includes(t.key))found.push(t.key);
  }
  const fallback=interpretNeed(message)?.key;
  if(fallback&&fallback!=="unknown"&&!(fallback==="technical"&&/entretien technique/.test(normalized))&&!found.includes(fallback))found.push(fallback);
 }
 const recent= userMessages.at(-1)||"";
 const recentNeeds=themes.filter(t=>{
  const one=synthesizeSingle(recent);
  return one.includes(t.key);
 }).map(t=>t.key);
 const validated=(semanticKeys||[]).filter(k=>themes.some(t=>t.key===k));
 const ordered=[...validated,...recentNeeds.filter(k=>!validated.includes(k)),...found.filter(k=>!validated.includes(k)&&!recentNeeds.includes(k))];
 const selected=ordered.slice(0,4).map(key=>themes.find(t=>t.key===key)!).filter(Boolean);
 const steps:Step[]=[];
 for(const theme of selected){
  const path=paths.find(p=>p.id===theme.pathId);
  if(!path)continue;
  const preferred=stepsForPath(path).find(s=>s.category===theme.module)?.exercise;
  const alternatives=exercises.filter(e=>e.category===theme.module&&e.level===path.level);
  const exercise=[preferred,...alternatives].find(e=>e&&!steps.some(s=>s.exerciseId===e.id));
  if(exercise)steps.push({exerciseId:exercise.id,exerciseName:exercise.name,pathId:path.id,pathTitle:path.title,goal:theme.label,method:methods[theme.key]});
 }
 return {needs:selected.map(t=>({key:t.key,label:t.label})),steps};
}
function synthesizeSingle(text:string){
 const normalized=text.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
 const out:string[]=[];
 if(/soft.?skills?|savoir.?etre|qualit|defaut|point.{0,12}(fort|faible)/.test(normalized))out.push("softskills");
 if(/\bdrh\b|entretien.{0,20}\brh\b|questions? rh/.test(normalized))out.push("hr_final");
 if(/structur|\bstar\b/.test(normalized))out.push("structure");
 if(/stress|pression|trac/.test(normalized))out.push("stress");
 if(/communi|expression orale|prise de parole|parl.{0,18}oral|\ba l.oral\b/.test(normalized))out.push("communication");
 if(/motivation|pourquoi ce poste/.test(normalized))out.push("motivation");
 if(/responsable commercial|poste commercial|commercial|vente|business development/.test(normalized))out.push("sales");
 return out;
}
