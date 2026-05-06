"use client";

import { FormEvent, useState } from "react";

const initialState = {
  nome: "",
  email: "",
  empresa: "",
  cargo: "",
  colaboradores: "",
  mensagem: "",
  honeypot: "",
};

const LeadForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (formData.honeypot) {
      setStatus("success");
      return;
    }

    if (
      !formData.nome ||
      !formData.email ||
      !formData.empresa ||
      !formData.cargo ||
      !formData.colaboradores
    ) {
      setStatus("error");
      setMessage("Preencha todos os campos obrigatórios.");
      return;
    }

    setStatus("loading");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const response = await fetch(`${apiUrl}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.[0]?.msg || "Erro ao enviar formulário.");
      }

      setStatus("success");
      setFormData(initialState);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar. Tente novamente."
      );
    }
  }

  const fieldClass =
    "w-full border border-card-border bg-white px-4 py-3 text-lg text-dark outline-none transition focus:border-dark focus:ring-2 focus:ring-dark/10";

  return (
    <section id="lead-form" className="section-warm py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:px-8">
        <div className="reveal">
          <span className="text-base font-semibold uppercase tracking-widest text-muted">
            Contato
          </span>
          <h2 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[1.02] text-dark sm:text-6xl lg:text-[5.8rem]">
            Agende uma conversa com o NeuroPulse.
          </h2>
          <p className="mt-6 max-w-2xl text-2xl leading-relaxed text-dark/75">
            Compartilhe seus dados e entraremos em contato para apresentar como
            a plataforma pode apoiar o cuidado preventivo na sua empresa.
          </p>
          <p className="mt-8 max-w-xl border-l border-dark/15 pl-5 text-2xl leading-relaxed text-dark/70">
            Recomendado para empresas que querem acompanhar bem-estar com
            privacidade, método e foco em ação.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="reveal-soft border border-card-border bg-white p-6 shadow-xl shadow-dark/5 sm:p-8"
          noValidate
        >
          <div className="hidden">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              value={formData.honeypot}
              onChange={(event) =>
                setFormData({ ...formData, honeypot: event.target.value })
              }
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-lg font-semibold text-dark">
              Nome *
              <input
                className={fieldClass}
                value={formData.nome}
                onChange={(event) =>
                  setFormData({ ...formData, nome: event.target.value })
                }
                placeholder="Seu nome"
              />
            </label>
            <label className="grid gap-2 text-lg font-semibold text-dark">
              Email *
              <input
                className={fieldClass}
                type="email"
                value={formData.email}
                onChange={(event) =>
                  setFormData({ ...formData, email: event.target.value })
                }
                placeholder="voce@empresa.com"
              />
            </label>
            <label className="grid gap-2 text-lg font-semibold text-dark">
              Empresa *
              <input
                className={fieldClass}
                value={formData.empresa}
                onChange={(event) =>
                  setFormData({ ...formData, empresa: event.target.value })
                }
                placeholder="Nome da empresa"
              />
            </label>
            <label className="grid gap-2 text-lg font-semibold text-dark">
              Cargo *
              <input
                className={fieldClass}
                value={formData.cargo}
                onChange={(event) =>
                  setFormData({ ...formData, cargo: event.target.value })
                }
                placeholder="RH, CEO, People Ops"
              />
            </label>
            <label className="grid gap-2 text-lg font-semibold text-dark">
              Colaboradores *
              <select
                className={fieldClass}
                value={formData.colaboradores}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    colaboradores: event.target.value,
                  })
                }
              >
                <option value="">Selecione</option>
                <option value="50-100">50-100</option>
                <option value="100-200">100-200</option>
                <option value="200-500">200-500</option>
                <option value="500+">500+</option>
              </select>
            </label>
            <label className="grid gap-2 text-lg font-semibold text-dark sm:col-span-2">
              Mensagem
              <textarea
                className={`${fieldClass} min-h-28 resize-none`}
                value={formData.mensagem}
                onChange={(event) =>
                  setFormData({ ...formData, mensagem: event.target.value })
                }
                placeholder="Conte rapidamente o contexto da empresa"
              />
            </label>
          </div>

          {status === "success" && (
            <p className="mt-5 border border-card-border bg-background p-3 text-base font-medium text-dark">
              Solicitação recebida com sucesso.
            </p>
          )}

          {status === "error" && (
            <p className="mt-5 border border-card-border bg-background p-3 text-base font-medium text-dark">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-6 w-full bg-dark px-6 py-4 text-lg font-bold text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Enviando..." : "Solicitar demonstração"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default LeadForm;
