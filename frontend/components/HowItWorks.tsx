"use client";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Check-ins leves",
      description:
        "Perguntas curtas coletam sinais de energia, foco, carga e segurança psicológica com baixa fricção.",
    },
    {
      number: "02",
      title: "Leitura por IA",
      description:
        "O sistema organiza tendências por time, área e período, sempre com leitura agregada e anônima.",
    },
    {
      number: "03",
      title: "Plano de ação",
      description:
        "RH e lideranças recebem prioridades e recomendações para agir antes que o risco se transforme em afastamento.",
    },
  ];

  return (
    <section id="como-funciona" className="bg-white py-20 text-dark lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal max-w-3xl">
          <span className="text-base font-semibold uppercase tracking-widest text-muted">
            Como funciona
          </span>
          <h2 className="mt-4 text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
            Um fluxo simples para transformar sinais em decisão.
          </h2>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className={`reveal hover-lift border-t border-card-border py-8 reveal-delay-${index + 1}`}
            >
              <span className="text-lg font-bold text-muted">
                {step.number}
              </span>
              <h3 className="mt-8 text-3xl font-bold">{step.title}</h3>
              <p className="mt-4 text-2xl leading-relaxed text-muted">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
