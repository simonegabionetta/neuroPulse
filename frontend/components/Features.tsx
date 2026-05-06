"use client";

const Features = () => {
  const features = [
    "Leitura anônima e agregada, adequada para conversas estratégicas de RH.",
    "Dashboard executivo para acompanhar risco, energia e tendência por período.",
    "Alertas preventivos para priorizar equipes que exigem atenção.",
    "Recomendações práticas para orientar liderança, comunicação e cuidado.",
  ];

  return (
    <section id="diferenciais" className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="reveal">
          <span className="text-base font-semibold uppercase tracking-widest text-muted">
            Diferenciais
          </span>
          <h2 className="mt-4 text-5xl font-extrabold leading-tight text-dark sm:text-6xl lg:text-7xl">
            Clareza para decidir sem invadir a privacidade do colaborador.
          </h2>
          <p className="mt-6 max-w-2xl text-2xl leading-relaxed text-dark/75">
            O produto foi pensado para dar visibilidade ao RH sem transformar
            saúde mental em vigilância individual.
          </p>
        </div>

        <div className="grid gap-3">
          {features.map((feature, index) => (
            <div
              key={feature}
              className={`reveal hover-lift flex gap-5 border-b border-dark/15 py-6 reveal-delay-${index + 1}`}
            >
              <span className="text-xl font-extrabold text-dark">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-2xl font-medium leading-relaxed text-dark">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
