import { Component, type ReactNode } from "react";
import { RotateCcw } from "lucide-react";

/**
 * Affiche un écran propre au lieu d'une page blanche si une page plante,
 * ou si le site a été mis à jour pendant la visite (ancien fichier introuvable).
 */
export class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  render() {
    if (!this.state.error) return this.props.children;
    const outdated = /dynamically imported module|Failed to fetch|Importing a module script failed|ChunkLoadError/i.test(this.state.error.message);
    return (
      <main role="alert" className="flex min-h-dvh items-center justify-center bg-[#F8F9FF] px-5 text-ink">
        <div className="panel panel-strong max-w-md rounded-[28px] p-8 text-center">
          <h1 className="text-2xl font-bold">{outdated ? "Une nouvelle version est disponible." : "Quelque chose s’est mal passé."}</h1>
          <p className="mt-3 text-sm leading-6 text-ink-soft">
            {outdated
              ? "Le site a été mis à jour pendant votre visite. Rechargez la page pour continuer."
              : "Rechargez la page pour reprendre. Votre profil et vos bilans sont conservés dans ce navigateur."}
          </p>
          <button type="button" onClick={() => window.location.reload()} className="btn-gradient mt-6 inline-flex min-h-12 items-center gap-2 rounded-2xl px-6 text-sm font-bold">
            <RotateCcw size={17} /> Recharger la page
          </button>
        </div>
      </main>
    );
  }
}
