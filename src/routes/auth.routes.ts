import { Router, Request, Response, NextFunction } from "express";
import { register, login } from "../controllers/auth.controller";
import {
  validateRegister,
  validateLogin,
  authenticateToken,
} from "../middlewares/auth.middleware";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación desarrollado por Nelson Roas
 */

/**
 * Middleware para validar y sanitizar datos antes de pasar al controlador
 */
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Sanitización de entrada (ejemplo simple)
    req.body = JSON.parse(JSON.stringify(req.body).replace(/[^\w\s@.]/gi, ""));

    next(); //Si no hay errores, sigue al siguiente middleware
  } catch (error) {
    res
      .status(400)
      .json({
        ok: false,
        mensaje:
          "Error procesando la solicitud en sanitizacion validateRequest",
      });
    return;
  }
};

/**
 * @swagger
 * /api/auth/registrarUsuario:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - apellido
 *               - correo
 *               - clave
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan
 *               apellido:
 *                 type: string
 *                 example: Pérez
 *               correo:
 *                 type: string
 *                 example: juan.perez@example.com
 *               clave:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post(
  "/registrarUsuario",
  validateRegister,
  async (req: Request, res: Response) => {
    await register(req, res);
  }
);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión con un usuario registrado
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *               - clave
 *             properties:
 *               correo:
 *                 type: string
 *                 example: juan.perez@example.com
 *               clave:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       200:
 *         description: Login exitoso
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Credenciales incorrectas
 */
router.post(
  "/login",
  validateLogin,
  async (req: Request, res: Response) => {
    await login(req, res);
  }
);

// Ejemplo de una ruta protegida
router.get(
  "/perfil",
  authenticateToken,
  (req: Request, res: Response): void => {
    res
      .status(200)
      .json({ ok: true, mensaje: "Acceso permitido", usuario: req.user });
  }
);

export default router;
