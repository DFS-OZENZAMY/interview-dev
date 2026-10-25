import { API_BASE } from "./api";
import { Listener, Speaker } from "./voice";

/**
 * Instances uniques pour toute l'application : le clic « Lancer mon entretien »
 * de la préparation débloque l'audio et le micro, qui restent disponibles pour l'entretien.
 */
const sameOrigin = (() => {
  try {
    return new URL(API_BASE, window.location.href).origin === window.location.origin;
  } catch {
    return false;
  }
})();

export const speaker = new Speaker(sameOrigin);
export const listener = new Listener();
