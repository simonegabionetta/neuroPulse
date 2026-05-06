"use client";

const SocialProof = () => {
  return (
    <section className="section-warm py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="reveal">
          <span className="text-base font-semibold uppercase tracking-widest text-muted">
            Indicado para
          </span>
          <h2 className="mt-4 text-5xl font-extrabold leading-tight text-dark sm:text-6xl">
            Feito para lideranças que querem cuidar melhor sem perder rigor.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {["RH", "CEO", "People Ops"].map((role, index) => (
            <div
              key={role}
              className={`reveal hover-lift border-l border-card-border pl-5 reveal-delay-${index + 1}`}
            >
              <strong className="text-3xl font-extrabold text-dark">{role}</strong>
              <p className="mt-3 text-2xl leading-relaxed text-muted">
                Informação objetiva para priorizar cuidado, reduzir risco e
                sustentar decisões com dados.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
