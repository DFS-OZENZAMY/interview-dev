export type Msg = { role: "system" | "user" | "assistant"; content: string };
export type ChatOpts = { maxTokens?: number; json?: boolean };

export interface LLM {
  chat(messages: Msg[], opts?: ChatOpts): Promise<string>;
}

const TIMEOUT_MS = 30_000;
const MAX_ATTEMPTS = 3;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export class GroqLLM implements LLM {
  constructor(
    private apiKey: string,
    private model = "openai/gpt-oss-120b",
  ) {}

  async chat(messages: Msg[], opts: ChatOpts = {}): Promise<string> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          signal: AbortSignal.timeout(TIMEOUT_MS),
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
          }),
        });

        // 429 et 5xx : erreurs temporaires, on réessaie avec un délai croissant.
        if (r.status === 429 || r.status >= 500) {
          lastError = new Error(`Groq ${r.status}: ${await r.text()}`);
          const retryAfter = Number(r.headers.get("retry-after"));
          await sleep(Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : 1000 * attempt);
          continue;
        }
        if (!r.ok) throw new Error(`Groq ${r.status}: ${await r.text()}`);

        const data: any = await r.json();
        const content = data?.choices?.[0]?.message?.content;
        if (typeof content !== "string" || !content.trim()) {
          throw new Error("Réponse Groq vide ou inattendue");
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
