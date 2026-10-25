export type Msg = { role: "system" | "user" | "assistant"; content: string };
export type ChatOpts = { maxTokens?: number };

export interface LLM {
  chat(messages: Msg[], opts?: ChatOpts): Promise<string>;
}

export class GroqLLM implements LLM {
  constructor(
    private apiKey: string,
    private model = "openai/gpt-oss-120b",
  ) {}

  async chat(messages: Msg[], opts: ChatOpts = {}): Promise<string> {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        max_tokens: opts.maxTokens ?? 800,
        reasoning_effort: "low",
      }),
    });
    if (!r.ok) throw new Error(`Groq ${r.status}: ${await r.text()}`);
    const data: any = await r.json();
    return data.choices[0].message.content ?? "";
  }
}