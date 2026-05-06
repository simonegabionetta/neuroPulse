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

const colaboradoresPermitidos = ["50-100", "100-200", "200-500", "500+"];

type FieldErrors = Partial<Record<keyof typeof initialState, string>>;

const LeadForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setFieldErrors({});

    if (formData.honeypot) {
      setStatus("success");
      setMessage(
        "Solicitacao recebida com sucesso. Em breve entraremos em contato."
      );
      return;
    }

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setStatus("error");
      setFieldErrors(validationErrors);
      setMessage("Revise os campos destacados antes de enviar.");
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

      if (response.status === 409) {
        setStatus("success");
        setMessage(
          "Este email ja estava cadastrado. Sua solicitacao continua registrada."
        );
        setFormData(initialState);
        return;
      }

      if (!response.ok) {
        throw new Error(data.errors?.[0]?.msg || "Erro ao enviar formulario.");
      }

      setStatus("success");
      setMessage(
        "Solicitacao recebida com sucesso. Em breve entraremos em contato."
      );
      setFormData(initialState);
      setFieldErrors({});
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Nao foi possivel enviar. Tente novamente."
      );
    }
  }

  const fieldClass =
    "w-full border border-card-border bg-white px-4 py-3 text-lg text-dark outline-none transition focus:border-dark focus:ring-2 focus:ring-dark/10";
  const errorClass = "text-base font-semibold leading-snug text-red-700";

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
            privacidade, metodo e foco em acao.
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
                maxLength={100}
                placeholder="Seu nome"
                aria-invalid={Boolean(fieldErrors.nome)}
              />
              {fieldErrors.nome && (
                <span className={errorClass}>{fieldErrors.nome}</span>
              )}
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
                maxLength={255}
                placeholder="voce@empresa.com"
                aria-invalid={Boolean(fieldErrors.email)}
              />
              {fieldErrors.email && (
                <span className={errorClass}>{fieldErrors.email}</span>
              )}
            </label>
            <label className="grid gap-2 text-lg font-semibold text-dark">
              Empresa *
              <input
                className={fieldClass}
                value={formData.empresa}
                onChange={(event) =>
                  setFormData({ ...formData, empresa: event.target.value })
                }
                maxLength={200}
                placeholder="Nome da empresa"
                aria-invalid={Boolean(fieldErrors.empresa)}
              />
              {fieldErrors.empresa && (
                <span className={errorClass}>{fieldErrors.empresa}</span>
              )}
            </label>
            <label className="grid gap-2 text-lg font-semibold text-dark">
              Cargo *
              <input
                className={fieldClass}
                value={formData.cargo}
                onChange={(event) =>
                  setFormData({ ...formData, cargo: event.target.value })
                }
                maxLength={100}
                placeholder="RH, CEO, People Ops"
                aria-invalid={Boolean(fieldErrors.cargo)}
              />
              {fieldErrors.cargo && (
                <span className={errorClass}>{fieldErrors.cargo}</span>
              )}
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
                aria-invalid={Boolean(fieldErrors.colaboradores)}
              >
                <option value="">Selecione</option>
                <option value="50-100">50-100</option>
                <option value="100-200">100-200</option>
                <option value="200-500">200-500</option>
                <option value="500+">500+</option>
              </select>
              {fieldErrors.colaboradores && (
                <span className={errorClass}>{fieldErrors.colaboradores}</span>
              )}
            </label>
            <label className="grid gap-2 text-lg font-semibold text-dark sm:col-span-2">
              Mensagem
              <textarea
                className={`${fieldClass} min-h-28 resize-none`}
                value={formData.mensagem}
                onChange={(event) =>
                  setFormData({ ...formData, mensagem: event.target.value })
                }
                maxLength={1000}
                placeholder="Conte rapidamente o contexto da empresa"
                aria-invalid={Boolean(fieldErrors.mensagem)}
              />
              {fieldErrors.mensagem && (
                <span className={errorClass}>{fieldErrors.mensagem}</span>
              )}
            </label>
          </div>

          <div aria-live="polite" role="status">
            {status === "success" && (
              <div className="mt-5 border-2 border-dark bg-accent-soft p-4 text-dark">
                <p className="text-xl font-extrabold">Formulario enviado.</p>
                <p className="mt-1 text-base font-medium leading-relaxed">
                  {message}
                </p>
              </div>
            )}

            {status === "error" && (
              <div className="mt-5 border-2 border-red-700 bg-red-50 p-4 text-red-800">
                <p className="text-xl font-extrabold text-red-900">
                  Nao foi possivel enviar.
                </p>
                <p className="mt-1 text-base font-medium leading-relaxed">
                  {message}
                </p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-6 w-full bg-dark px-6 py-4 text-lg font-bold text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading"
              ? "Enviando..."
              : status === "success"
              ? "Solicitacao enviada"
              : "Solicitar demonstracao"}
          </button>
        </form>
      </div>
    </section>
  );
};

function validateForm(data: typeof initialState): FieldErrors {
  const errors: FieldErrors = {};
  const nome = data.nome.trim();
  const email = data.email.trim();
  const empresa = data.empresa.trim();
  const cargo = data.cargo.trim();
  const mensagem = data.mensagem.trim();

  if (!nome) {
    errors.nome = "Informe seu nome.";
  } else if (nome.length < 2 || nome.length > 100) {
    errors.nome = "Nome deve ter entre 2 e 100 caracteres.";
  }

  if (!email) {
    errors.email = "Informe seu email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Informe um email valido.";
  } else if (email.length > 255) {
    errors.email = "Email deve ter no maximo 255 caracteres.";
  }

  if (!empresa) {
    errors.empresa = "Informe o nome da empresa.";
  } else if (empresa.length < 2 || empresa.length > 200) {
    errors.empresa = "Empresa deve ter entre 2 e 200 caracteres.";
  }

  if (!cargo) {
    errors.cargo = "Informe seu cargo.";
  } else if (cargo.length < 2 || cargo.length > 100) {
    errors.cargo = "Cargo deve ter entre 2 e 100 caracteres.";
  }

  if (!data.colaboradores) {
    errors.colaboradores = "Selecione uma faixa de colaboradores.";
  } else if (!colaboradoresPermitidos.includes(data.colaboradores)) {
    errors.colaboradores = "Selecione uma faixa valida.";
  }

  if (mensagem.length > 1000) {
    errors.mensagem = "Mensagem deve ter no maximo 1000 caracteres.";
  }

  return errors;
}

export default LeadForm;
