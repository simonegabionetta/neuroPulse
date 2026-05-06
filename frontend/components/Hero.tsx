"use client";

const Hero = () => {
  const stats = [
    {
      value: "Pulso",
      label: "check-ins curtos e recorrentes",
    },
    {
      value: "Risco",
      label: "leitura agregada por equipe",
    },
    {
      value: "Ação",
      label: "prioridades claras para o RH",
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-white text-dark"
      aria-labelledby="hero-headline"
    >
      <div className="absolute right-0 top-0 hidden h-full w-[58%] lg:block">
        <video
          className="h-full w-full object-cover"
          src="/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#FFFFFF_0%,rgba(255,255,255,0.78)_26%,rgba(255,255,255,0.08)_100%)]" />
      </div>
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-[0.12] lg:hidden"
        src="/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-20 lg:pt-32">
        <div className="max-w-[780px] animate-slide-in-left">
          <div className="space-y-10">
            <p className="text-base font-semibold uppercase tracking-widest text-muted">
              Plataforma de saúde mental corporativa
            </p>

            <h1
              id="hero-headline"
              className="max-w-[820px] text-[4.4rem] font-extrabold leading-[0.9] text-dark sm:text-[6rem] lg:text-[7rem] xl:text-[8rem]"
            >
              Bem-estar corporativo medido antes do burnout.
            </h1>

            <p className="max-w-3xl text-2xl leading-relaxed text-muted sm:text-[1.75rem]">
              O NeuroPulse ajuda RH e lideranças a acompanhar sinais de carga,
              energia e risco emocional com dados agregados, anônimos e
              acionáveis.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#lead-form"
                id="hero-cta-primary"
                className="inline-flex items-center justify-center gap-2 bg-dark px-9 py-4 text-lg font-semibold text-white transition-all duration-200 hover:bg-black/80 active:scale-[0.98]"
              >
                Solicitar demonstração
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#como-funciona"
                id="hero-cta-secondary"
                className="inline-flex items-center justify-center border border-card-border bg-white px-9 py-4 text-lg font-semibold text-dark transition-all duration-200 hover:bg-accent-soft"
              >
                Como funciona
              </a>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-3 pt-4 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <div
                  key={stat.value}
                  id={`hero-stat-${index}`}
                  className="border-l border-card-border pl-4"
                >
                  <div className="text-2xl font-extrabold text-dark sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-base leading-tight text-muted sm:text-lg">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
