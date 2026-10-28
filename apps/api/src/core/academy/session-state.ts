// Repris d'ai-interview-platform (Achraf SILA), Académie V5.1, logique inchangée.
import type {ConversationTurn} from "./orchestrator";
const normalizeText=(text:string)=>text.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
export type AcademySessionState={version:1;mode:"conversation"|"case";step:number;lastQuestion:string|null;role:string|null};
export function deriveSessionState(turns:ConversationTurn[]):AcademySessionState{
 let mode:AcademySessionState["mode"]="conversation";
 let step=0;let lastQuestion:string|null=null;
 const roles=turns.filter(t=>t.role==="user").map(t=>normalizeText(t.content)).join(" ");
 const role=/\bhrbp\b|hr business partner/.test(roles)?"HRBP":/data scientist|datascientist/.test(roles)?"Data Scientist":/responsable (du )?recrutement/.test(roles)?"Responsable recrutement":null;
 for(const turn of turns){const value=normalizeText(turn.content);
  if(turn.role==="user"&&/^(arretons|arrete|stop|changeons de sujet|nouveau sujet|autre sujet|quitter le cas|terminer le cas|je veux changer|passons a autre chose)/.test(value)){mode="conversation";lastQuestion=null;step=0;continue;}
  if(turn.role==="assistant"&&/cas pratique\s*[·:]|case study\s*[·:]|mise en situation\s*[·:]/i.test(turn.content)){mode="case";step=1;}
  if(mode==="case"&&turn.role==="assistant"&&/\?\s*$/.test(turn.content.trim())){lastQuestion=turn.content.split(/\n\s*\n/).at(-1)?.trim().slice(0,500)||null;}
  if(mode==="case"&&turn.role==="user"&&lastQuestion&&turn.content.trim().length>=25)step=Math.min(step+1,50);
 }
 return {version:1,mode,step,lastQuestion,role};
}
