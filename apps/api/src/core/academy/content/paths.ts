import { exercises } from "./catalog";

export type AcademyPath = {
 id:string; title:string; audience:string; category:string; level:"foundation"|"practice"|"challenge";
 goal:string; modules:string[]; description:string; duration:string;
};
type PathSeed = [string,string,string,string,"foundation"|"practice"|"challenge",string,string[]];
const seeds:PathSeed[]=[
["first-job","Réussir son premier entretien","Étudiants & juniors","Début de carrière","foundation","Décrocher sa première opportunité",["pitch","graduates","motivation","structure","confidence"]],
["internship","Obtenir son stage ou PFE","Étudiants & juniors","Début de carrière","foundation","Valoriser projets et potentiel",["graduates","pitch","communication","motivation","behavior"]],
["graduate-tech","Premier poste Tech","Étudiants & juniors","Tech & Data","foundation","Défendre projets et raisonnement technique",["graduates","technical","structure","communication","problem"]],
["graduate-business","Premier poste Business","Étudiants & juniors","Business","foundation","Convaincre sans longue expérience",["graduates","pitch","motivation","behavior","negotiation"]],
["career-switch","Réussir sa reconversion","Candidats en mobilité","Transition","practice","Transformer son parcours en atout",["pitch","motivation","structure","confidence","technical"]],
["internal-mobility","Mobilité interne réussie","Candidats en mobilité","Transition","practice","Présenter sa valeur dans un nouvel environnement",["motivation","behavior","pitch","leadership","negotiation"]],
["career-gap","Expliquer une interruption de carrière","Candidats en mobilité","Transition","practice","Parler de sa trajectoire avec assurance",["pitch","confidence","motivation","communication","negotiation"]],
["promotion","Préparer une promotion","Confirmés & managers","Leadership","challenge","Démontrer son impact et son potentiel",["leadership","behavior","structure","negotiation","pitch"]],
["senior-leader","Entretien de management senior","Confirmés & managers","Leadership","challenge","Convaincre sur la vision et l'exécution",["leadership","problem","behavior","negotiation","motivation"]],
["lead-first","Devenir manager","Confirmés & managers","Leadership","practice","Passer d'expert à responsable d'équipe",["leadership","behavior","communication","problem","confidence"]],
["executive","Comité de direction & executive","Dirigeants","Leadership","challenge","Rendre sa valeur stratégique explicite",["leadership","problem","pitch","negotiation","communication"]],
["data","Entretiens Data & Analytics","Tech & Data","Tech & Data","practice","Relier expertise analytique et impact métier",["technical","problem","structure","communication","behavior"]],
["engineering","Software Engineering","Tech & Data","Tech & Data","practice","Défendre conception, qualité et collaboration",["technical","problem","behavior","structure","communication"]],
["devops","Cloud, DevOps & Infrastructure","Tech & Data","Tech & Data","practice","Argumenter fiabilité, arbitrages et incidents",["technical","problem","structure","behavior","communication"]],
["cyber","Cybersécurité","Tech & Data","Tech & Data","practice","Expliquer risques, incidents et décisions",["technical","problem","behavior","communication","confidence"]],
["qa","Testing & QA","Tech & Data","Tech & Data","practice","Défendre stratégie de test et démarche qualité",["technical","problem","structure","communication","behavior"]],
["ai","IA & automatisation","Tech & Data","Tech & Data","practice","Expliquer impact, limites et gouvernance de l'IA",["technical","problem","communication","behavior","motivation"]],
["product","Product & Business Analysis","Business","Business","practice","Montrer capacité de cadrage et priorisation",["problem","communication","technical","behavior","structure"]],
["project","Gestion de projet & Agile","Business","Business","practice","Illustrer pilotage, influence et arbitrages",["problem","leadership","behavior","structure","communication"]],
["sales","Commercial & développement","Business","Business","practice","Défendre valeur, relation client et négociation",["pitch","negotiation","behavior","motivation","communication"]],
["marketing","Marketing & communication","Business","Business","practice","Argumenter stratégie, ciblage et résultats",["pitch","problem","communication","behavior","motivation"]],
["finance","Finance & contrôle de gestion","Fonctions support","Fonctions support","practice","Relier rigueur, analyse et prise de décision",["problem","technical","behavior","structure","communication"]],
["hr","RH & Talent Acquisition","Fonctions support","Fonctions support","practice","Prouver posture conseil et pilotage RH",["behavior","communication","problem","leadership","motivation"]],
["legal","Juridique & conformité","Fonctions support","Fonctions support","practice","Présenter raisonnement, éthique et maîtrise du risque",["technical","behavior","problem","communication","structure"]],
["operations","Opérations & supply chain","Fonctions support","Fonctions support","practice","Démontrer efficacité, priorisation et amélioration",["problem","leadership","technical","behavior","structure"]],
["consulting","Conseil & études de cas","Confirmés & managers","Business","challenge","Structurer un cas ambigu et convaincre",["problem","structure","communication","behavior","pitch"]],
["english","Interview in English","International","International","practice","Renforcer les réponses en anglais",["international","pitch","communication","behavior","motivation"]],
["international","Carrière internationale","International","International","practice","Défendre sa mobilité et sa collaboration à distance",["international","motivation","communication","behavior","negotiation"]],
["remote","Entretien pour un poste remote","International","International","practice","Prouver autonomie et collaboration distribuée",["international","behavior","communication","structure","confidence"]],
["pitch","Pitch & personal branding","Tous profils","Communication","foundation","Construire une présentation convaincante",["pitch","communication","motivation","structure"]],
["star","Maîtriser la méthode STAR","Tous profils","Communication","foundation","Illustrer ses réponses par des preuves",["structure","behavior","pitch","communication"]],
["eloquence","Prendre la parole avec impact","Tous profils","Communication","practice","Gagner en clarté et persuasion",["communication","pitch","structure","confidence"]],
["stress","Confiance face au recruteur","Tous profils","Confiance","foundation","Gérer imprévus et objections avec sérénité",["confidence","communication","structure","behavior"]],
["hard-questions","Questions difficiles & pièges","Tous profils","Confiance","challenge","Répondre sans se justifier excessivement",["negotiation","confidence","structure","motivation"]],
["salary","Négocier son salaire","Confirmés & managers","Négociation","practice","Défendre ses attentes avec méthode",["negotiation","motivation","communication","confidence"]],
["behavioral","Entretien comportemental intensif","Tous profils","Communication","practice","Développer des histoires professionnelles fiables",["behavior","structure","communication","confidence"]],
["case","Résolution de problèmes","Tous profils","Business","practice","Exposer hypothèses, décisions et compromis",["problem","structure","communication","technical"]],
["48h","Préparation express 48 heures","Tous profils","Préparation express","practice","Prioriser les fondamentaux avant l'entretien",["pitch","motivation","structure","confidence"]],
["week","Préparation structurée sur 7 jours","Tous profils","Préparation express","practice","Travailler un objectif différent chaque jour",["pitch","structure","behavior","communication","confidence","negotiation","motivation"]],
["two-weeks","Préparation complète sur 14 jours","Tous profils","Préparation express","practice","Consolider et diversifier l'apprentissage",["pitch","motivation","structure","communication","behavior","problem","confidence","negotiation","technical","international"]],
["return-work","Retour à l'emploi","Candidats en mobilité","Transition","foundation","Mettre en valeur acquis et disponibilité",["pitch","motivation","confidence","behavior","negotiation"]],
["interview-panel","Réussir un entretien devant un panel","Confirmés & managers","Leadership","challenge","Répondre à des interlocuteurs aux attentes différentes",["communication","leadership","structure","confidence","problem"]],
["stakeholders","Influencer les parties prenantes","Confirmés & managers","Leadership","challenge","Prouver négociation et leadership transversal",["leadership","behavior","communication","negotiation","problem"]],
["customer","Relation client & service","Business","Business","foundation","Illustrer écoute, résolution et posture client",["communication","behavior","problem","confidence","motivation"]],
["public","Secteur public & institutionnel","Fonctions support","Fonctions support","practice","Faire preuve de rigueur et de sens du service",["motivation","behavior","communication","problem","structure"]],
["entrepreneur","Du freelance à l'entreprise","Candidats en mobilité","Transition","practice","Valoriser autonomie et collaboration structurée",["pitch","motivation","behavior","negotiation","structure"]],
["technical-lead","Expert vers Tech Lead","Tech & Data","Tech & Data","challenge","Faire le lien entre excellence technique et encadrement",["technical","leadership","communication","problem","behavior"]]
];
export const paths:AcademyPath[]=seeds.map(([id,title,audience,category,level,goal,modules])=>({
 id,title,audience,category,level,goal,modules,
 description:"Parcours de "+modules.length+" modules : "+modules.map(id=>exercises.find(e=>e.category===id)?.categoryLabel||id).join(" · ")+".",
 duration:`${modules.length} étapes`
}));
export const pathCategories=["Tous",...new Set(paths.map(p=>p.category))];
export function stepsForPath(path:AcademyPath){
 return path.modules.map((cat,index)=>{
  const candidates=exercises.filter(e=>e.category===cat&&e.level===path.level);
  return {index,category:cat,exercise:candidates[(index+path.title.length)%candidates.length]};
 });
}
export function recommendPaths(input:{seniority?:string;goal?:string;job?:string;focus?:string}):AcademyPath[]{
 const val=Object.values(input).join(" ").toLocaleLowerCase("fr");
 const score=(p:AcademyPath)=>{
  let n=0;
  const title=(p.title+" "+p.goal+" "+p.category+" "+p.audience).toLocaleLowerCase("fr");
  if(/stage|pfe|junior|premier|début/.test(val)&&/premier|stage|junior/.test(title))n+=5;
  if(/senior|lead|manager|direction/.test(val)&&/manager|lead|direction|senior/.test(title))n+=5;
  if(/data|analytics|bi/.test(val)&&/data|analytics/.test(title))n+=7;
  if(/devops|cloud|infra/.test(val)&&/cloud|devops/.test(title))n+=7;
  if(/cyber/.test(val)&&/cyber/.test(title))n+=7;
  if(/engineering|développ|software/.test(val)&&/software|tech/.test(title))n+=6;
  if(/recrut|talent|rh|ressources humaines/.test(val)&&/rh|talent/.test(title))n+=7;
  if(/finance|comptab/.test(val)&&/finance/.test(title))n+=7;
  if(/anglais|english|international/.test(val)&&/international|english/.test(title))n+=6;
  if(/reconversion|changement|mobilit/.test(val)&&/reconversion|mobilité/.test(title))n+=5;
  if(/stress|confiance/.test(val)&&/confiance|stress/.test(title))n+=5;
  if(/structur|star/.test(val)&&/star|structur/.test(title))n+=5;
  if(/communic|oral|éloquence/.test(val)&&/communication|éloquence|parole/.test(title))n+=5;
  if(/techni|connaissance/.test(val)&&/tech|data|finance/.test(title))n+=2;
  if(p.id==="week")n+=1;
  return n;
 };
 return [...paths].sort((a,b)=>score(b)-score(a)||a.title.localeCompare(b.title,"fr")).slice(0,3);
}
