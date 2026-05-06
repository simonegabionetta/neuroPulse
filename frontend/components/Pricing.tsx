"use client";

const Pricing = () => {
  const included = [
    "Diagnóstico inicial de risco psicossocial",
    "Check-ins recorrentes para colaboradores",
    "Painel executivo para RH e liderança",
    "Alertas preventivos por tendência de risco",
    "Recomendações de ação por prioridade",
  ];

  return (
    <section id="precos" className="section-warm py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal-soft grid gap-12 border-y border-dark/15 py-14 text-dark lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div className="reveal">
            <span className="text-base font-semibold uppercase tracking-widest text-muted">
              Demonstração
            </span>
            <h2 className="mt-4 text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
              Veja como o NeuroPulse funcionaria na sua empresa.
            </h2>
            <p className="mt-6 max-w-3xl text-2xl leading-relaxed text-dark/75">
              A demonstração apresenta a experiência principal: coleta leve,
              leitura agregada de risco e visão executiva para tomada de decisão.
            </p>
            <a
              href="#lead-form"
              className="mt-8 inline-flex bg-dark px-8 py-4 text-lg font-bold text-white transition hover:bg-black/80"
            >
              Solicitar demonstração
            </a>
          </div>

          <ul
            className="reveal grid gap-0 border-y border-dark/15 lg:border-y-0 lg:border-l lg:pl-10"
            role="list"
          >
            {included.map((item) => (
              <li
                key={item}
                className="flex items-start gap-4 border-b border-dark/15 py-5 text-xl leading-snug text-dark/80 last:border-b-0 sm:text-2xl"
              >
                <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-dark" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
