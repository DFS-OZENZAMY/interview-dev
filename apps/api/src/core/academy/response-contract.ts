// Repris d'ai-interview-platform (Achraf SILA), Académie V5.1, logique inchangée.
/** Stable presentation contract. Legacy kind/reply fields remain available during migration. */
export type AcademyView="explanation"|"question"|"case"|"feedback"|"recommendation"|"resources";
export type AcademyResponseContract={version:1;view:AcademyView;message:string;question?:string;actions:({type:"continue"|"save"|"open";label:string})[]};
export function createResponseContract(payload:Record<string,unknown>):AcademyResponseContract{
 const kind=payload.kind;
 const message=typeof payload.reply==="string"?payload.reply:typeof payload.understanding==="string"?payload.understanding:"";
 const question=typeof payload.question==="string"&&payload.question.trim()?payload.question.trim().slice(0,500):undefined;
 const normalized=message.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
 const view:AcademyView=kind==="recommend"?"recommendation":payload.practiceFeedback===true?"feedback":/cas pratique\s*[·:]|case study\s*[·:]/.test(normalized)?"case":/supports? pour|ressources? de preparation/.test(normalized)?"resources":kind==="clarify"||question?"question":"explanation";
 const actions:AcademyResponseContract["actions"]=view==="recommendation"?[{type:"save",label:"Enregistrer dans mon parcours"}]:view==="feedback"?[{type:"continue",label:"Poursuivre le cas"}]:[];
 return {version:1,view,message,question,actions};
}
