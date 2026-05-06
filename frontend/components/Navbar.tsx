"use client";

import { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Diferenciais", href: "#diferenciais" },
    { label: "FAQ", href: "#faq" },
  ];

  const textColor = "text-dark";
  const mutedColor = "text-muted hover:text-dark";

  return (
    <nav
      id="navbar"
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-card-border/70 bg-white/90 shadow-sm backdrop-blur-xl"
          : "bg-white/70 backdrop-blur-xl"
      }`}
      role="navigation"
      aria-label="Navegação principal"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <a
            href="/"
            id="logo"
            className="group flex items-center"
            aria-label="NeuroPulse - Página inicial"
          >
            <span className={`text-2xl font-extrabold tracking-tight ${textColor}`}>
              NeuroPulse
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-lg font-semibold transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full ${mutedColor}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a
              href="#lead-form"
              id="nav-cta"
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-lg font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                "bg-dark text-white shadow-lg shadow-dark/15"
              }`}
            >
              Agendar demo
              <svg
                width="16"
                height="16"
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
          </div>

          <button
            id="mobile-menu-btn"
            type="button"
            className={`rounded-lg p-2 transition-colors md:hidden ${
              "text-dark hover:bg-accent-soft"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 8h18M3 16h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
        role="menu"
      >
        <div className="space-y-4 border-t border-card-border/50 bg-white px-4 py-6 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              role="menuitem"
              className="block py-2 text-lg font-semibold text-muted transition-colors hover:text-dark"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#lead-form"
            role="menuitem"
            className="block w-full bg-dark px-5 py-3 text-center text-lg font-semibold text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Agendar demo
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
