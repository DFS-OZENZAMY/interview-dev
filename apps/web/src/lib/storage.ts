import type { HistoryEntry, InterviewConfig, Profile } from "./types";

// Le navigateur peut refuser le stockage (navigation privée, quotas) : on ne plante jamais.
function read<T>(store: Storage | undefined, key: string): T | null {
  try {
    const raw = store?.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(store: Storage | undefined, key: string, value: unknown) {
  try {
    store?.setItem(key, JSON.stringify(value));
  } catch {
    /* stockage indisponible : la séance continue sans mémoire locale */
  }
}

const local = () => (typeof window === "undefined" ? undefined : window.localStorage);
const session = () => (typeof window === "undefined" ? undefined : window.sessionStorage);

export const profileStore = {
  get: () => read<Profile>(local(), "il:profile"),
  set: (p: Profile) => write(local(), "il:profile", p),
};

export const configStore = {
  get: () => read<InterviewConfig>(session(), "il:config"),
  set: (c: InterviewConfig) => write(session(), "il:config", c),
};

const MAX_HISTORY = 30;

export const historyStore = {
  list: () => read<HistoryEntry[]>(local(), "il:history") ?? [],
  get: (id: string) => historyStore.list().find((h) => h.sessionId === id) ?? null,
  save(entry: HistoryEntry) {
    const rest = historyStore.list().filter((h) => h.sessionId !== entry.sessionId);
    write(local(), "il:history", [entry, ...rest].slice(0, MAX_HISTORY));
  },
};
