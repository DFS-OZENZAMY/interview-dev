// Repris d'ai-interview-platform (Achraf SILA), logique inchangée.
import {paths,stepsForPath} from "./content/paths";

export type NeedKey="stress"|"structure"|"communication"|"technical"|"leadership"|"motivation"|"first_interview"|"internship"|"negotiation"|"softskills"|"hr_final"|"unknown";
type NeedRule={key:NeedKey;label:string;terms:RegExp;pathIds:string[];module:string};
const rules:NeedRule[]=[
 {key:"softskills",label:"Valoriser ses soft skills et répondre aux questions qualités/défauts",terms:/soft.?skills?|savoir.?etre|qualit.{0,12}defaut|defaut|point.{0,12}faible|point.{0,12}fort|force.{0,12}faiblesse|competenc.{0,12}comportement/i,pathIds:["behavioral","star","stress"],module:"behavior"},
 {key:"hr_final",label:"Réussir un entretien final avec les ressources humaines",terms:/entretien.{0,25}(rh|drh|ressources humaines)|(?:rh|drh).{0,25}entretien|final.{0,25}(rh|drh)/i,pathIds:["behavioral","hard-questions","star"],module:"behavior"},
 {key:"first_interview",label:"Préparer un premier entretien d’embauche",terms:/premier.{0,35}entretien|premiere.{0,35}entrevue|premier.{0,35}embauche|premier emploi|premier job|debuter.{0,20}entretien/i,pathIds:["first-job","graduate-tech","stress"],module:"pitch"},
 {key:"internship",label:"Préparer un entretien de stage ou PFE",terms:/entretien.{0,30}(stage|pfe|alternance)|stage.{0,30}entretien|pfe|alternance/i,pathIds:["internship","first-job","graduate-tech"],module:"graduates"},
 {key:"negotiation",label:"Négocier mon salaire",terms:/salaire|remuneration|negoci|pretention salariale/i,pathIds:["salary","hard-questions","promotion"],module:"negotiation"},
 {key:"stress",label:"Gérer le stress en entretien",terms:/stress|angoiss|anxi|pression|panique|trac|peur|perd.{0,12}moyen|confiance|intimid|nerveu/i,pathIds:["stress","hard-questions","eloquence"],module:"confidence"},
 {key:"structure",label:"Structurer mes réponses",terms:/structur|star|réponse.{0,12}longue|synthès|organis.{0,12}idée/i,pathIds:["star","eloquence","behavioral"],module:"structure"},
 {key:"communication",label:"Mieux communiquer à l’oral",terms:/communi|oral|éloquen|articul|fluidit|exprimer|parler|clarté/i,pathIds:["eloquence","stress","behavioral"],module:"communication"},
 {key:"technical",label:"Renforcer l’argumentation métier",terms:/techni|data|développeur|code|cyber|devops|métier|expertis/i,pathIds:["data","engineering","graduate-tech"],module:"technical"},
 {key:"leadership",label:"Défendre mon leadership",terms:/leadership|manage|manager|équipe|délég|encadr/i,pathIds:["lead-first","promotion","senior-leader"],module:"leadership"},
 {key:"motivation",label:"Expliquer mes motivations",terms:/motivat|pourquoi ce poste|reconversion|changement de carriere/i,pathIds:["career-switch","first-job","internal-mobility"],module:"motivation"}
];
export function interpretNeed(text:string){
 const normalized=text.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
 const matched=rules.find(r=>r.terms.test(normalized));
 return matched||null;
}
export function pedagogicalMatch(text:string,focus?:string){
 const need=interpretNeed(focus||text)||interpretNeed(text);
 if(!need){
  const normalized=text.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
  if(/entretien|embauche|recrutement|preparer|preparation/.test(normalized))return {kind:"clarify" as const,question:"Pour mieux vous orienter, quel est votre objectif principal pour cet entretien ?",options:["Préparer mon premier entretien","Gérer mon stress","Structurer mes réponses","Répondre aux questions difficiles"]};
  return {kind:"clarify" as const,question:"Quel résultat souhaitez-vous obtenir grâce à votre entraînement ?",options:["Préparer mon premier entretien","Mieux communiquer à l’oral","Négocier mon salaire","Défendre mon leadership"]};
 }
 const candidates=need.pathIds.map(id=>paths.find(p=>p.id===id)).filter((p):p is (typeof paths)[number]=>Boolean(p));
 const path=candidates[0];
 if(!path)return {kind:"clarify" as const,question:"Pouvez-vous préciser la difficulté rencontrée ?",options:["Questions imprévues","Présentation personnelle","Questions métier"]};
 const step=stepsForPath(path).find(s=>s.category===need.module)||stepsForPath(path)[0];
 return {kind:"recommend" as const,need:need.label,pathId:path.id,pathTitle:path.title,reason:`Pour ${need.label.toLowerCase()}, ce parcours vous aide à illustrer vos réponses avec des situations réelles, des actions précises et des résultats vérifiables. Les exercices sont sélectionnés dans le curriculum L&D.`,exerciseId:step.exercise.id,exerciseName:step.exercise.name};
}
