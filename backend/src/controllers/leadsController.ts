import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { getSupabaseClient } from "../lib/supabase";

interface Lead {
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  colaboradores: string;
  mensagem: string | null;
  origem: string;
  ip_hash: string;
}

export async function createLead(req: Request, res: Response): Promise<void> {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: errors.array(),
    });
    return;
  }

  const { nome, email, empresa, cargo, colaboradores, mensagem } = req.body;
  const normalizedEmail = email.toLowerCase().trim();

  try {
    const lead: Lead = {
      nome: nome.trim(),
      email: normalizedEmail,
      empresa: empresa.trim(),
      cargo: cargo.trim(),
      colaboradores,
      mensagem: mensagem?.trim() || null,
      origem: req.headers.referer || "direct",
      ip_hash: hashIP(req.ip || "unknown"),
    };

    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("leads")
      .insert(lead)
      .select("id")
      .single();

    if (error) {
      if (error.code === "23505") {
        res.status(200).json({
          success: true,
          data: { id: null },
          message: "Lead ja cadastrado.",
        });
        return;
      }

      console.error("Erro ao salvar lead no Supabase:", error);
      res.status(500).json({
        success: false,
        errors: [{ msg: "Erro interno ao salvar lead." }],
      });
      return;
    }

    res.status(201).json({
      success: true,
      data: { id: data.id },
      message: "Lead criado com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao salvar lead:", error);
    res.status(500).json({
      success: false,
      errors: [{ msg: "Erro interno ao salvar lead." }],
    });
  }
}

function hashIP(ip: string): string {
  let hash = 0;

  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }

  return hash.toString(36);
}
