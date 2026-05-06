import { Router } from "express";
import { body } from "express-validator";
import { createLead } from "../controllers/leadsController";
import { leadsRateLimiter } from "../middlewares/security";

const router = Router();

/**
 * POST /api/leads
 * Cria um novo lead com validação e sanitização.
 */
router.post(
  "/",
  leadsRateLimiter,
  [
    body("nome")
      .trim()
      .notEmpty()
      .withMessage("Nome é obrigatório")
      .isLength({ min: 2, max: 100 })
      .withMessage("Nome deve ter entre 2 e 100 caracteres")
      .escape(),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email é obrigatório")
      .isEmail()
      .withMessage("Email inválido")
      .normalizeEmail()
      .isLength({ max: 255 })
      .withMessage("Email muito longo"),

    body("empresa")
      .trim()
      .notEmpty()
      .withMessage("Empresa é obrigatória")
      .isLength({ min: 2, max: 200 })
      .withMessage("Empresa deve ter entre 2 e 200 caracteres")
      .escape(),

    body("cargo")
      .trim()
      .notEmpty()
      .withMessage("Cargo é obrigatório")
      .isLength({ min: 2, max: 100 })
      .withMessage("Cargo deve ter entre 2 e 100 caracteres")
      .escape(),

    body("colaboradores")
      .trim()
      .notEmpty()
      .withMessage("Número de colaboradores é obrigatório")
      .isIn(["50-100", "100-200", "200-500", "500+"])
      .withMessage("Faixa de colaboradores inválida"),

    body("mensagem")
      .optional()
      .trim()
      .isLength({ max: 1000 })
      .withMessage("Mensagem deve ter no máximo 1000 caracteres")
      .escape(),
  ],
  createLead
);

export default router;
