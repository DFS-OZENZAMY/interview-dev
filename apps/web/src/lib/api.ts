import type { InterviewConfig, ReportResult, VoiceConfig } from "./types";
import { QUESTIONS_BY_DURATION } from "./labels";

/** URL de l'API. Par défaut /api (proxy Vite en local, Nginx en Docker, rewrites en hébergement). */
export const API_BASE = (import.meta.env.VITE_API_URL ?? "/api").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let r: Response;
  try {
    r = await fetch(API_BASE + path, init);
  } catch {
    throw new ApiError("Le serveur est injoignable. Vérifiez votre connexion puis réessayez.", 0);
  }
  const data = await r.json().catch(() => ({}));
  if (!r.ok) {
    const fallback =
      r.status === 429 ? "Trop de requêtes. Patientez une minute puis réessayez." : "Le serveur a renvoyé une erreur.";
    throw new ApiError((data as { error?: string }).error ?? fallback, r.status);
  }
  return data as T;
}

const json = (body: unknown): RequestInit => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export type Turn =
  | { done: false; question: string; index: number; total: number; truncated?: boolean }
  | { done: true; closing: string; report: ReportResult; interrupted?: boolean };

export const api = {
  voiceConfig: () => request<VoiceConfig>("/voice/config"),

  start: (c: InterviewConfig) =>
    request<{ sessionId: string; question: string; index: number; total: number }>(
      "/interview/start",
      json({
        poste: c.poste,
        type: c.type,
        locale: c.locale,
        description: c.description || undefined,
        objectifs: c.objectifs,
        experience: c.experience,
        questions: QUESTIONS_BY_DURATION[c.duree],
      }),
    ),

  answer: (sessionId: string, answer: string) => request<Turn>("/interview/answer", json({ sessionId, answer })),

  finish: (sessionId: string) =>
    request<Extract<Turn, { done: true }>>(`/interview/${sessionId}/finish`, { method: "POST" }),

  get: (sessionId: string) =>
    request<{ sessionId: string; poste: string; type: "rh" | "technique"; locale: "fr" | "en"; createdAt: number; done: boolean; interrupted: boolean; report: ReportResult }>(
      `/interview/${sessionId}`,
    ),

  transcribe: async (sessionId: string, audio: Blob) => {
    const form = new FormData();
    form.append("audio", audio, "reponse");
    return request<{ text: string }>(`/interview/${sessionId}/transcribe`, { method: "POST", body: form });
  },

  /** URL audio de la question en cours ; `turn` évite que le navigateur rejoue un ancien fichier en cache. */
  speechUrl: (sessionId: string, turn: number) => `${API_BASE}/interview/${sessionId}/speech?t=${turn}`,
  phraseUrl: (name: "intro" | "closing", locale: "fr" | "en") => `${API_BASE}/voice/phrase/${name}?locale=${locale}`,
};
