/** Halos colorés flous des pages claires (accueil, profil, espace candidat). */
export function LightAmbient() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="blob -right-44 -top-48 h-[670px] w-[670px] bg-[#EBCDF8]/55 blur-[110px]" />
      <div className="blob -left-48 top-32 h-[680px] w-[680px] bg-[#D7E5FF]/65 blur-[110px]" />
    </div>
  );
}
