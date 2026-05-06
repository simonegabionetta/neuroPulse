import express from "express";
import dotenv from "dotenv";
import { setupSecurity } from "./middlewares/security";
import leadsRouter from "./routes/leads";

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Body parser
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false, limit: "10kb" }));

// Segurança
setupSecurity(app);

// Rotas
app.use("/api/leads", leadsRouter);

// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "neuropulse-api",
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    errors: [{ msg: "Rota não encontrada" }],
  });
});

// Error handler global
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("Erro não tratado:", err.message);
    res.status(500).json({
      success: false,
      errors: [{ msg: "Erro interno do servidor" }],
    });
  }
);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🧠 NeuroPulse API rodando na porta ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
});

export default app;
