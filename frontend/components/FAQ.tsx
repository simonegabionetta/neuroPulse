const FAQ = () => {
  const faqs = [
    {
      question: "As respostas dos colaboradores são identificadas?",
      answer:
        "Não. A proposta do NeuroPulse é trabalhar com leitura agregada e anônima, evitando exposição individual.",
    },
    {
      question: "O que o RH recebe na prática?",
      answer:
        "O RH recebe uma visão executiva de risco, tendências por período e recomendações para priorizar ações preventivas.",
    },
    {
      question: "Para quais empresas faz sentido?",
      answer:
        "Faz sentido para empresas que já percebem sinais de sobrecarga, queda de engajamento ou aumento de afastamentos.",
    },
  ];

  return (
    <section id="faq" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <span className="text-base font-semibold uppercase tracking-widest text-muted">
          FAQ
        </span>
        <h2 className="reveal mt-4 text-5xl font-extrabold leading-tight text-dark sm:text-6xl">
          Perguntas frequentes
        </h2>

        <div className="reveal-soft mt-10 divide-y divide-card-border border-y border-card-border">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="group" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left marker:hidden">
                <span className="text-2xl font-bold text-dark">
                  {faq.question}
                </span>
                <span className="flex h-10 w-10 flex-none items-center justify-center border border-card-border text-3xl leading-none text-dark transition group-hover:bg-accent-soft group-open:hidden">
                  +
                </span>
                <span className="hidden h-10 w-10 flex-none items-center justify-center border border-card-border bg-accent-soft text-3xl leading-none text-dark group-open:flex">
                  −
                </span>
              </summary>
              <p className="max-w-3xl pb-7 text-2xl leading-relaxed text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
