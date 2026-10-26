import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Landing from "./pages/Landing";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Le simulateur (WebGL) et le bilan ne sont chargés que lorsqu'on en a besoin.
const Profile = lazy(() => import("./pages/Profile"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Preparation = lazy(() => import("./pages/Preparation"));
const Interview = lazy(() => import("./pages/Interview"));
const Report = lazy(() => import("./pages/Report"));
const Academy = lazy(() => import("./pages/Academy"));
const AcademyExercise = lazy(() => import("./pages/AcademyExercise"));
const AcademyPaths = lazy(() => import("./pages/AcademyPaths"));

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <Suspense fallback={<div className="min-h-dvh bg-[#F8F9FF]" />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/tableau-de-bord" element={<Dashboard />} />
          <Route path="/preparation" element={<Preparation />} />
          <Route path="/entretien" element={<Interview />} />
          <Route path="/rapport/:id" element={<Report />} />
          <Route path="/academie" element={<Academy />} />
          <Route path="/academie/exercices/:id" element={<AcademyExercise />} />
          <Route path="/academie/parcours" element={<AcademyPaths />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
