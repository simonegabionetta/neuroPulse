const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-card-border bg-white py-10 text-dark" role="contentinfo">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <div className="text-2xl font-extrabold">
            NeuroPulse
          </div>
          <p className="mt-2 max-w-xl text-lg text-muted">
            Plataforma para leitura preventiva de sinais de burnout e bem-estar
            em empresas.
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-lg text-muted">
          <a href="#como-funciona" className="hover:text-dark">
            Como funciona
          </a>
          <a href="#lead-form" className="hover:text-dark">
            Agendar demo
          </a>
          <span>&copy; {currentYear}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
