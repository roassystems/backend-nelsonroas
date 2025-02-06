import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET || "default_secret";

// Extender la interfaz Request para incluir "user"
declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      res.status(401).json({ ok: false, mensaje: "Acceso denegado" });
      return; // Detiene la ejecución
    }

    const decoded = jwt.verify(token, jwtSecret);
    (req as any).user = decoded; //Agregar usuario al request con TypeScript
    next(); // Solo se ejecuta si no hubo error
  } catch (error) {
    res.status(403).json({ ok: false, mensaje: "Token inválido" });
    return; // Detiene la ejecución
  }
};
// Middleware de validación y sanitización de datos en el registro
export const validateRegister = [
  body("nombre")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("El nombre es obligatorio"),
  body("apellido")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("El apellido es obligatorio"),
  body("correo").isEmail().normalizeEmail().withMessage("Correo inválido"),
  body("clave")
    .isLength({ min: 4 })
    .matches(/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .withMessage(
      "La clave debe tener mínimo 4 caracteres, una mayúscula, un número y un carácter especial"
    ),
];

// Middleware de validación y sanitización de datos en el login
export const validateLogin = [
  body("correo").isEmail().normalizeEmail().withMessage("Correo inválido"),
  body("clave").notEmpty().withMessage("La clave es obligatoria"),
];
