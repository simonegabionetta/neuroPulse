"use client";

const Problem = () => {
  const metrics = [
    {
      value: "Sinais invisíveis",
      label: "sobrecarga, queda de energia e insegurança psicológica raramente aparecem cedo nos indicadores tradicionais.",
    },
    {
      value: "Dados dispersos",
      label: "pesquisas de clima, absenteísmo e relatos de liderança ficam separados, dificultando uma leitura executiva.",
    },
    {
      value: "Ação tardia",
      label: "quando o risco vira afastamento, a empresa já perdeu tempo, produtividade e confiança.",
    },
  ];

  return (
    <section id="problema" className="section-warm py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="reveal">
          <span className="text-base font-semibold uppercase tracking-widest text-muted">
            Contexto
          </span>
          <h2 className="mt-4 max-w-2xl text-5xl font-extrabold leading-tight text-dark sm:text-6xl lg:text-7xl">
            Empresas precisam enxergar risco emocional antes que ele vire crise.
          </h2>
        </div>

        <div className="grid gap-4">
          {metrics.map((metric, index) => (
            <div
              key={metric.value}
              className={`reveal hover-lift grid gap-3 border-t border-dark/15 py-7 sm:grid-cols-[220px_1fr] reveal-delay-${index + 1}`}
            >
              <strong className="text-4xl font-extrabold text-dark">
                {metric.value}
              </strong>
              <p className="text-2xl leading-relaxed text-dark/75">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
