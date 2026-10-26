export type Msg = { role: "system" | "user" | "assistant"; content: string };
export type ChatOpts = { maxTokens?: number; json?: boolean; temperature?: number };

export interface LLM {
  chat(messages: Msg[], opts?: ChatOpts): Promise<string>;
}

const MAX_ATTEMPTS = 3;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Client pour toute API compatible OpenAI (Groq par défaut). Utilise uniquement fetch. */
export class GroqLLM implements LLM {
  constructor(
    private apiKey: string,
    private model: string,
    private baseUrl: string,
    private timeoutMs: number,
  ) {}

  async chat(messages: Msg[], opts: ChatOpts = {}): Promise<string> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        const r = await fetch(`${this.baseUrl.replace(/\/$/, "")}/chat/completions`, {
          method: "POST",
          signal: AbortSignal.timeout(this.timeoutMs),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            model: this.model,
            messages,
            max_tokens: opts.maxTokens ?? 800,
            reasoning_effort: "low",
            ...(opts.json ? { response_format: { type: "json_object" } } : {}),
            ...(opts.temperature !== undefined ? { temperature: opts.temperature } : {}),
          }),
        });

        // 429 et 5xx : erreurs temporaires, on réessaie avec un délai croissant.
        if (r.status === 429 || r.status >= 500) {
          lastError = new Error(`LLM ${r.status}: ${await r.text()}`);
          if (attempt < MAX_ATTEMPTS) {
            const retryAfter = Number(r.headers.get("retry-after"));
            await sleep(Number.isFinite(retryAfter) && retryAfter > 0 ? Math.min(retryAfter, 10) * 1000 : 1000 * attempt);
          }
          continue;
        }
        if (!r.ok) throw new Error(`LLM ${r.status}: ${await r.text()}`);

        const data: any = await r.json();
        const content = data?.choices?.[0]?.message?.content;
        if (typeof content !== "string" || !content.trim()) {
          throw new Error("Réponse du LLM vide ou inattendue");
        }
        return content;
      } catch (e) {
        lastError = e;
        const isTimeout = e instanceof Error && e.name === "TimeoutError";
        if (!isTimeout || attempt === MAX_ATTEMPTS) throw e;
      }
    }
    throw lastError;
  }
}
