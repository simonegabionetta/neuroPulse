import { Router } from "express";
import { body } from "express-validator";
import { createLead } from "../controllers/leadsController";
import { leadsRateLimiter } from "../middlewares/security";

const router = Router();

const colaboradoresPermitidos = ["50-100", "100-200", "200-500", "500+"];

router.post(
  "/",
  leadsRateLimiter,
  [
    body("nome")
      .trim()
      .notEmpty()
      .withMessage("Nome e obrigatorio.")
      .bail()
      .isLength({ min: 2, max: 100 })
      .withMessage("Nome deve ter entre 2 e 100 caracteres.")
      .escape(),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email e obrigatorio.")
      .bail()
      .isEmail()
      .withMessage("Informe um email valido.")
      .bail()
      .normalizeEmail()
      .isLength({ max: 255 })
      .withMessage("Email deve ter no maximo 255 caracteres."),

    body("empresa")
      .trim()
      .notEmpty()
      .withMessage("Empresa e obrigatoria.")
      .bail()
      .isLength({ min: 2, max: 200 })
      .withMessage("Empresa deve ter entre 2 e 200 caracteres.")
      .escape(),

    body("cargo")
      .trim()
      .notEmpty()
      .withMessage("Cargo e obrigatorio.")
      .bail()
      .isLength({ min: 2, max: 100 })
      .withMessage("Cargo deve ter entre 2 e 100 caracteres.")
      .escape(),

    body("colaboradores")
      .trim()
      .notEmpty()
      .withMessage("Numero de colaboradores e obrigatorio.")
      .bail()
      .isIn(colaboradoresPermitidos)
      .withMessage("Selecione uma faixa de colaboradores valida."),

    body("mensagem")
      .optional()
      .trim()
      .isLength({ max: 1000 })
      .withMessage("Mensagem deve ter no maximo 1000 caracteres.")
      .escape(),
  ],
  createLead
);

export default router;
