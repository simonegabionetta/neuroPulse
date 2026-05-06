import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { Express } from "express";

/**
 * Configura todos os middlewares de segurança na aplicação Express.
 */
export function setupSecurity(app: Express): void {
  // Helmet - Headers de segurança
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:"],
          connectSrc: ["'self'"],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          frameSrc: ["'none'"],
        },
      },
      crossOriginEmbedderPolicy: false,
    })
  );

  // CORS - Restrito
  const allowedOrigins = [
    process.env.FRONTEND_URL || "http://localhost:3000",
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        // Permitir requisições sem origin (Postman, curl, etc.) apenas em dev
        if (!origin && process.env.NODE_ENV !== "production") {
          return callback(null, true);
        }
        if (origin && allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        callback(new Error("Não permitido pelo CORS"));
      },
      methods: ["POST"],
      allowedHeaders: ["Content-Type"],
      credentials: false,
    })
  );

  // Headers de segurança adicionais
  app.use((_req, res, next) => {
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=()"
    );
    next();
  });
}

/**
 * Rate limiter específico para a rota de leads.
 * 10 requisições por minuto por IP.
 */
export const leadsRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Muitas requisições. Tente novamente em 1 minuto.",
  },
  keyGenerator: (req) => {
    return req.ip || req.headers["x-forwarded-for"]?.toString() || "unknown";
  },
});
