import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

interface Lead {
  id: string;
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  colaboradores: string;
  mensagem: string | null;
  origem: string;
  ip_hash: string;
  created_at: string;
}

const dataDir = path.resolve(process.cwd(), "data");
const leadsFile = path.join(dataDir, "leads.json");

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
    const leads = await readLeads();
    const emailExists = leads.some((lead) => lead.email === normalizedEmail);

    if (emailExists) {
      res.status(409).json({
        success: false,
        errors: [{ msg: "Este email ja esta cadastrado." }],
      });
      return;
    }

    const lead: Lead = {
      id: randomUUID(),
      nome: nome.trim(),
      email: normalizedEmail,
      empresa: empresa.trim(),
      cargo: cargo.trim(),
      colaboradores,
      mensagem: mensagem?.trim() || null,
      origem: req.headers.referer || "direct",
      ip_hash: hashIP(req.ip || "unknown"),
      created_at: new Date().toISOString(),
    };

    leads.push(lead);
    await saveLeads(leads);

    res.status(201).json({
      success: true,
      data: { id: lead.id },
      message: "Lead criado com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao salvar lead local:", error);
    res.status(500).json({
      success: false,
      errors: [{ msg: "Erro interno ao salvar lead." }],
    });
  }
}

async function readLeads(): Promise<Lead[]> {
  try {
    const file = await readFile(leadsFile, "utf8");
    return JSON.parse(file) as Lead[];
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;

    if (code === "ENOENT") {
      await saveLeads([]);
      return [];
    }

    throw error;
  }
}

async function saveLeads(leads: Lead[]): Promise<void> {
  await mkdir(dataDir, { recursive: true });
  await writeFile(leadsFile, `${JSON.stringify(leads, null, 2)}\n`, "utf8");
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
