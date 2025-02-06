import express from "express";
import cors from "cors";
import helmet from "helmet"; // Seguridad OWASP
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
// Middleware de seguridad OWASP, aplicando cabeceras de seguridad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      "script-src": ["'self'", process.env.DOMINIO_APP_WEB || ""],
      "style-src": ["'self'", process.env.STYLE_FONT_SRC || ""],
      "font-src": ["'self'", process.env.STYLE_FONT_SRC || ""],
      "default-src": ["'self'", process.env.STYLE_FONT_SRC || ""],
    },
  },
  
}));

// Configuración de CORS
// Configuración de CORS para restringir acceso
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // Restringir según frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Auth Nelson Roas Backend",
      version: "1.0.0",
      description: "API de autenticación Nelson Roas",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Servidor local",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
app.use("/api/auth", authRoutes);

export default app;
