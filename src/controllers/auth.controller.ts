import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";

/**
 * Controlador para registrar un usuario
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await registerUser(req.body);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
};

/**
 * Controlador para iniciar sesión
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await loginUser(req.body);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: "Error interno del servidor" });
  }
};
