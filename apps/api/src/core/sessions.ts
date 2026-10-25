import type { Msg } from "./llm";
import type { KV } from "./kv";

export type InterviewType = "rh" | "technique";
export type Objective = "confiance" | "structure" | "communication" | "connaissances" | "stress";
export type Experience = "debutant" | "junior" | "confirme" | "senior";

export type Session = {
  id: string;
  poste: string;
  type: InterviewType;
  locale: "fr" | "en";
  description?: string;
  objectifs: Objective[];
  experience?: Experience;
  /** Nombre de questions prévues pour cette séance. */
  total: number;
  messages: Msg[];
  asked: number;
  done: boolean;
  /** Fin anticipée demandée par le candidat. */
  interrupted?: boolean;
  report?: unknown;
  createdAt: number;
};

export class SessionNotFoundError extends Error {}
export class SessionBusyError extends Error {}

const LOCK_TTL_MS = 120_000;

export class SessionStore {
  constructor(
    private kv: KV,
    private ttlSeconds: number,
  ) {}

  private key = (id: string) => `session:${id}`;
  private lockKey = (id: string) => `lock:session:${id}`;

  async save(s: Session) {
    await this.kv.set(this.key(s.id), JSON.stringify(s), { exSeconds: this.ttlSeconds });
  }

  async get(id: string): Promise<Session | null> {
    const raw = await this.kv.get(this.key(id));
    return raw ? (JSON.parse(raw) as Session) : null;
  }

  /** Exécute fn en tenant un verrou sur la session (évite deux réponses simultanées). */
  async withLock<T>(id: string, fn: () => Promise<T>): Promise<T> {
    const token = crypto.randomUUID();
    const ok = await this.kv.set(this.lockKey(id), token, { pxMs: LOCK_TTL_MS, nx: true });
    if (!ok) throw new SessionBusyError();
    try {
      return await fn();
    } finally {
      await this.kv.delIfEquals(this.lockKey(id), token);
    }
  }
}
