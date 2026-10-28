// Repris d'ai-interview-platform (Achraf SILA), Académie V5.1.
// Seul écart : « exercic\w* » (l'original n'acceptait pas « exercice », car « exercic\b » exigeait une fin de mot).
/** Academy V5.1: deterministic routing based on the current turn, not keyword history. */
export type ConversationTurn={role:"user"|"assistant";content:string};
export type AcademyIntent="case_start"|"case_answer"|"resources"|"training"|"switch"|"conversation";
export const normalizeText=(text:string)=>text.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
export function routeAcademyTurn(turns:ConversationTurn[]):{intent:AcademyIntent;activeCase:boolean}{
 const last=turns.at(-1);if(!last||last.role!=="user")return {intent:"conversation",activeCase:false};
 const text=normalizeText(last.content);
 const caseStart=/^(?:un |une )?(?:use case|case study|etude de cas|cas pratique|mise en situation|scenario)(?:\s+(?:rh|hrbp))?[.!? ]*$/.test(text)||/^je souhaite travailler\s*:\s*(?:etude de cas|use case|case study|mise en situation|cas pratique)/.test(text);
 const explicitSwitch=/^(?:arretons|arrete|stop|changeons de sujet|nouveau sujet|autre sujet|quitter le cas|terminer le cas|je veux changer|passons a autre chose)/.test(text);
 const resources=/\b(supports?|ressources?|documentation|documents?|guides?|pdf|livres?|lectures?|articles?|videos?|podcasts?)\b/.test(text)&&/\b(aider|utile|preparer|pour|avoir|proposer|disponible|trouver|conseiller|auriez|avez|aurez|pourrais|peux|as.tu)\b/.test(text);
 const training=/^(?:je veux|je souhaite|propose|donne.moi|lance|commencons|faisons)\b.{0,90}\b(exercic\w*|entrainement|simulation|atelier|parcours)\b/.test(text);
 if(caseStart)return {intent:"case_start",activeCase:true};
 if(explicitSwitch)return {intent:"switch",activeCase:false};
 if(resources)return {intent:"resources",activeCase:false};
 const assistantTurns=turns.slice(0,-1).filter(t=>t.role==="assistant");
 const caseStarted=assistantTurns.some(t=>/cas pratique\s*[·:]|case study\s*[·:]|mise en situation\s*[·:]/i.test(t.content));
 const previousAssistant=assistantTurns.at(-1)?.content||"";
 const hasExerciseQuestion=caseStarted&&/\?\s*$/.test(previousAssistant.trim());
 if(hasExerciseQuestion&&!training)return {intent:"case_answer",activeCase:true};
 if(training)return {intent:"training",activeCase:false};
 return {intent:"conversation",activeCase:caseStarted};
}
