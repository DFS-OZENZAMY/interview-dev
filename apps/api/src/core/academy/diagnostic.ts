// Repris d'ai-interview-platform (Achraf SILA), logique inchangée.
/** Academy V4 diagnostic gate: a role is context, never evidence of a learning gap. */
export type DiagnosticEvidence={need:string;statement:string;source:"candidate"};
export type DiagnosticState={phase:"exploration"|"coaching"|"training";role:string|null;goal:string|null;evidence:DiagnosticEvidence[];missing:string[];explicitExerciseRequest:boolean};
export type Extraction={role?:unknown;goal?:unknown;evidence?:unknown;missing?:unknown};
type Turn={role:"user"|"assistant";content:string};
const trim=(v:unknown,max=160)=>typeof v==="string"?v.trim().slice(0,max):"";
const normalize=(v:string)=>v.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
export function buildDiagnostic(history:Turn[],extraction:Extraction|undefined,needs:string[],requestTraining:boolean):DiagnosticState{
 const userTurns=history.filter(t=>t.role==="user").map(t=>t.content);
 const words=userTurns.join(" ");const normalized=normalize(words);
 const role=trim(extraction?.role)||null;
 const goal=trim(extraction?.goal)||null;
 const candidates=Array.isArray(extraction?.evidence)?extraction.evidence:[];
 const evidence:DiagnosticEvidence[]=[];
 for(const raw of candidates.slice(0,6)){
  if(!raw||typeof raw!=="object")continue;
  const item=raw as {need?:unknown;statement?:unknown};
  const statement=trim(item.statement,200);const need=trim(item.need,50);
  // Do not accept facts invented or inferred by the model.
  if(statement.length>=8&&need&&userTurns.some(t=>normalize(t).includes(normalize(statement))))evidence.push({need,statement,source:"candidate"});
 }
 const missing=Array.isArray(extraction?.missing)?extraction.missing.map(v=>trim(v)).filter(Boolean).slice(0,3):[];
 const hasSpecificNeed=needs.length>0&&/(stress|confiance|salaire|negoci|structur|star|communi|defaut|qualite|soft.skill|projet|pitch|conflit|presentation|stage pfe|premier emploi)/i.test(normalized);
 const explicitExerciseRequest=/(exercic|entrain|simulation|programme|parcours|atelier)/i.test(normalize(userTurns.at(-1)||""));
 const explicitTraining=explicitExerciseRequest||/prepar/i.test(normalized);
 const phase=hasSpecificNeed&&(explicitTraining||requestTraining)?"training":hasSpecificNeed||evidence.length>0?"coaching":"exploration";
 return {phase,role,goal,evidence,missing,explicitExerciseRequest};
}
export function allowRecommendation(state:DiagnosticState,decisionAction:string|undefined){return state.phase==="training"&&(decisionAction==="recommend"||state.explicitExerciseRequest);}
