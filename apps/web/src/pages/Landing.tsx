import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, AudioLines, BrainCircuit, Check, MessageCircleMore, MoveUpRight, Sparkles, Target, WandSparkles } from "lucide-react";
import { Logo } from "../components/Logo";
import { profileStore } from "../lib/storage";

const STEPS = [
  { icon: Target, title: "On fait connaissance", detail: "Votre projet, votre expérience, vos objectifs. On part de ce qui compte pour vous.", tone: "bg-[#EEE8FF] text-[#8455E7]" },
  { icon: AudioLines, title: "Vous passez l’entretien", detail: "Lina vous pose ses questions à voix haute et vous répondez à l’oral, comme en vrai.", tone: "bg-[#E5EEFF] text-[#5365FF]" },
  { icon: BrainCircuit, title: "Vous progressez", detail: "Un bilan clair : score, points forts, axes de progrès et conseils pour la suite.", tone: "bg-[#FCE8F8] text-[#D84FB9]" },
];

export default function Landing() {
  const start = profileStore.get() ? "/tableau-de-bord" : "/profil";
  return (
    <main className="relative min-h-dvh overflow-x-clip bg-[#F9FAFF] text-ink">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[960px] overflow-hidden">
        <div className="blob -left-40 -top-32 h-[680px] w-[680px] bg-[#DCE3FF]/75 blur-[100px]" />
        <div className="blob -right-40 top-20 h-[650px] w-[650px] bg-[#F5C9F6]/50 blur-[110px]" />
        <div className="blob left-[35%] top-[370px] h-[520px] w-[520px] bg-[#DAD0FF]/40 blur-[110px]" />
      </div>

      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-[max(12px,env(safe-area-inset-top))] sm:px-6 sm:pt-5">
        <header className="liquid-header pointer-events-auto relative mx-auto flex max-w-[1376px] items-center justify-between gap-2 rounded-[23px] px-3 py-2.5 sm:rounded-[27px] sm:px-5 sm:py-3">
          <Logo />
          <nav aria-label="Démarrer" className="flex shrink-0 items-center gap-1 sm:gap-3">
            <Link to="/tableau-de-bord" className="rounded-full px-2.5 py-3 text-[12px] font-bold text-[#283458] transition-colors hover:text-[#7951E9] sm:px-5 sm:text-sm">
              Mon espace
            </Link>
            <Link to={start} className="btn-gradient inline-flex min-h-10 items-center gap-1.5 rounded-full px-3.5 text-[12px] font-bold sm:min-h-11 sm:px-6 sm:text-sm">
              Commencer <ArrowUpRight size={15} />
            </Link>
          </nav>
        </header>
      </div>

      <section className="relative z-10 mx-auto grid max-w-[1480px] items-center gap-10 px-5 pb-16 pt-36 sm:px-10 sm:pt-40 lg:min-h-[760px] lg:grid-cols-[minmax(0,1.08fr)_minmax(0,.92fr)] lg:gap-14 lg:pb-24 lg:pt-36 xl:gap-20">
        <div className="enter relative z-10 max-w-[720px]">
          <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-[#CFC9FF]/70 bg-white/80 px-4 py-2 text-xs font-bold text-[#7859D9] shadow-[0_8px_30px_rgba(100,87,190,.08)] backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#B66CFC]/45" />
              <span className="relative h-2 w-2 rounded-full bg-[#9B69FD]" />
            </span>
            Lina vous attend pour votre entretien
          </div>
          <h1 className="max-w-[720px] text-[clamp(2.85rem,5vw,5.5rem)] font-extrabold leading-[1.08] tracking-[-.072em] text-[#151D3C]">
            Moins de stress.
            <br />
            <span className="gradient-text">Plus de confiance.</span>
          </h1>
          <p className="mt-7 max-w-[590px] text-[16px] leading-[1.85] text-ink-soft sm:text-lg">
            Entraînez-vous à l’oral avec Lina, une recruteuse IA qui adapte ses questions à votre poste. À la fin, vous recevez un bilan détaillé pour progresser à votre rythme.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link to={start} className="btn-gradient inline-flex min-h-[58px] items-center justify-center gap-3 rounded-2xl px-7 text-[15px] font-bold">
              Je prépare mon entretien <ArrowRight size={19} />
            </Link>
            <a href="#comment-ca-marche" className="inline-flex min-h-[54px] items-center gap-2 rounded-2xl border border-white/80 bg-white/75 px-6 text-sm font-bold text-[#35446B] shadow-[0_8px_35px_rgba(70,83,145,.07)] backdrop-blur-xl transition hover:border-[#D3CBFF] hover:bg-white">
              Voir comment ça marche
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-[#727D9A]">
            {["Entretien RH ou technique", "Français ou anglais", "Bilan après chaque séance"].map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <Check className="text-[#8256E9]" size={16} /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="enter-late relative mx-auto w-full max-w-[650px] py-3 sm:py-8">
          <div aria-hidden="true" className="absolute inset-x-[10%] bottom-[-2%] h-[55%] rounded-full bg-gradient-to-r from-[#9D77FF]/60 via-[#7E77FD]/45 to-[#F07BDB]/65 blur-[65px]" />
          <div className="relative overflow-hidden rounded-[28px] border border-white/95 bg-white/70 p-5 shadow-[0_28px_90px_rgba(90,82,175,.15),inset_0_2px_0_rgba(255,255,255,.9)] backdrop-blur-2xl sm:rounded-[34px] sm:p-9">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-[#506082]">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#EDE7FF] text-[#8157E7]">
                  <WandSparkles size={17} />
                </span>
                Entretien en cours
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E7F8F2] px-3 py-1.5 text-[10px] font-bold text-[#278568]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3CCF98]" /> Lina parle
              </span>
            </div>
            <div className="relative mx-auto my-8 grid h-[225px] place-items-center sm:my-11 sm:h-[280px]" aria-hidden="true">
              <div className="orbit absolute h-[218px] w-[218px] rounded-full border border-[#A4A1FA]/25 sm:h-[280px] sm:w-[280px]" />
              <div className="orbit-reverse absolute h-[190px] w-[190px] rounded-full border border-[#DBB3FC]/40" />
              <div className="breathe relative grid h-[145px] w-[145px] place-items-center rounded-full bg-[radial-gradient(circle_at_36%_29%,#E7D2FF_2%,#B4A1FF_33%,#6D6CF5_65%,#E56FDD_100%)] shadow-[0_10px_60px_rgba(126,93,246,.37),inset_0_0_30px_rgba(255,255,255,.65)] sm:h-[162px] sm:w-[162px]">
                <span className="absolute inset-4 rounded-full border border-white/40" />
                <AudioLines size={64} className="text-white drop-shadow-[0_3px_14px_rgba(255,255,255,.85)]" strokeWidth={1.6} />
              </div>
            </div>
            <div className="rounded-[22px] border border-[#E6E5F8] bg-white/80 p-5 shadow-[0_8px_30px_rgba(86,93,159,.055)]">
              <p className="mb-2 flex items-center gap-2 text-xs font-bold text-[#8A78C8]">
                <MessageCircleMore size={15} /> Lina
              </p>
              <p className="text-[18px] font-bold leading-snug tracking-[-.03em] text-[#202C54] sm:text-[20px]">
                « Parlez-moi d’un projet dont vous êtes fier, et de votre rôle dans sa réussite. »
              </p>
              <div className="mt-4 flex items-center gap-1.5" aria-hidden="true">
                {Array.from({ length: 27 }, (_, i) => (
                  <span key={i} className="wave w-[3px] rounded-full bg-gradient-to-t from-[#5365FF] to-[#E870DB]" style={{ height: `${9 + ((i * 7) % 24)}px`, animationDelay: `${(i % 8) * -0.13}s` }} />
                ))}
              </div>
            </div>
          </div>
          <div className="float-note absolute -bottom-1 -left-2 hidden items-center gap-3 rounded-2xl border border-white bg-white/95 px-4 py-3 shadow-[0_16px_42px_rgba(65,71,148,.15)] sm:flex">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#E9E5FF] text-[#7F5DE9]">
              <Sparkles size={18} />
            </span>
            <span className="text-xs font-bold text-[#344068]">
              Vous répondez à l’oral
              <br />
              <span className="font-medium text-[#8B95AC]">Lina vous écoute</span>
            </span>
          </div>
        </div>
      </section>

      <section id="comment-ca-marche" className="relative scroll-mt-24 border-t border-[#EDF0FC] bg-white/70 px-5 py-20 sm:px-10 lg:py-24">
        <div className="mx-auto max-w-[1376px]">
          <div className="mx-auto max-w-[760px] text-center">
            <h2 className="text-[clamp(2rem,4vw,3.15rem)] font-extrabold tracking-[-.055em]">Trois étapes pour prendre confiance</h2>
            <p className="mt-5 text-[16px] leading-7 text-[#727D98]">On part de votre objectif, vous vous entraînez avec Lina, et vous repartez avec un plan clair.</p>
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, detail, tone }, i) => (
              <li key={title} className="relative overflow-hidden rounded-[28px] border border-[#E6E9F7] bg-white p-7 shadow-[0_13px_48px_rgba(70,75,150,.055)] sm:p-8 lg:min-h-[270px]">
                <div className="mb-9 flex items-center justify-between">
                  <span className={`grid h-14 w-14 place-items-center rounded-[18px] ${tone}`}>
                    <Icon size={25} strokeWidth={1.9} />
                  </span>
                  <span className="text-sm font-extrabold text-[#B5BED5]">Étape {i + 1}</span>
                </div>
                <h3 className="text-xl font-extrabold tracking-[-.04em]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#6B7793]">{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#11183B] px-5 py-20 text-white sm:px-10 lg:py-24">
        <div aria-hidden="true" className="blob -right-28 -top-40 h-[500px] w-[500px] bg-[#8458F5]/25 blur-[100px]" />
        <div className="relative mx-auto flex max-w-[1376px] flex-col items-start justify-between gap-8 md:flex-row md:items-center md:gap-16">
          <div className="max-w-2xl">
            <h2 className="text-[clamp(2rem,4.2vw,3.5rem)] font-extrabold leading-tight tracking-[-.06em]">
              Votre meilleur entretien
              <br />
              se prépare aujourd’hui.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#B5BFDF]">Un espace pour essayer, apprendre et recommencer, sans pression.</p>
          </div>
          <Link to={start} className="btn-gradient inline-flex min-h-[58px] shrink-0 items-center gap-3 rounded-2xl px-7 text-sm font-bold">
            Commencer maintenant <MoveUpRight size={19} />
          </Link>
        </div>
      </section>
      <footer className="bg-[#11183B] px-5 py-8 text-[#C4CEEB] sm:px-10">
        <div className="mx-auto flex max-w-[1376px] flex-col justify-between gap-4 text-xs sm:flex-row sm:items-center">
          <span className="font-medium">
            © 2026 <span className="font-bold text-white">InterviewLab</span>, votre coach d’entretien IA
          </span>
          <span className="text-[#A6B2D4]">Un outil d’entraînement, pas une décision de recrutement.</span>
        </div>
      </footer>
    </main>
  );
}
