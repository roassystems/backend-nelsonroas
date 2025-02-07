import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { validatePassword, validateEmail } from "../utils/validators.util";
import dotenv from "dotenv";
import {
  LoginInterface,
  UsuarioInterface,
} from "../interfaces/usuario-interface";

dotenv.config();
const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET || "default_secret";

export const registerUser = async ({
  nombre,
  apellido,
  correo,
  clave,
}: UsuarioInterface) => {
  if (!nombre || !apellido || !correo || !clave || !clave || !correo) {
    return {
      status: 400,
      ok: false,
      mensaje: "Los datos del registro no pueden ser nulos",
    };
  } else if (!validatePassword(clave)) {
    return {
      status: 400,
      ok: false,
      mensaje:
        "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.",
    };
  } else if (!validateEmail(correo)) {
    return { status: 400, ok: false, mensaje: "Formato de correo incorrecto" };
  }

  const hashedPassword = await bcrypt.hash(clave, 10);
  try {
    await prisma.usuario.create({
      data: { nombre, apellido, correo, clave: hashedPassword },
    });
    return { status: 201, ok: true, mensaje: "Usuario registrado" };
  } catch (error) {
    return {
      status: 500,
      ok: false,
      mensaje: "Error al registrar usuario, usuario ya existe",
    };
  }
};

export const loginUser = async ({ correo, clave }: LoginInterface) => {
  if (!correo || !clave) {
    return { status: 400, ok: false, mensaje: "Datos inválidos" };
  }
  const user = await prisma.usuario.findUnique({ where: { correo } });
  if (!user || !(await bcrypt.compare(clave, user.clave))) {
    return { status: 401, ok: false, mensaje: "Credenciales inválidas" };
  }
  const token = jwt.sign({ id: user.id, correo: user.correo, nombre:user.nombre, apellido:user.apellido }, jwtSecret, {
    expiresIn: "1h",
  });
  return { status: 200, ok: true, mensaje: "Login exitoso", token };
};
