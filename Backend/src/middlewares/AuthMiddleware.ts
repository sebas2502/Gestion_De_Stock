import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/jwtConfig";
import { AppError } from "../errors/AppError";

export interface AuthRequest extends Request {
  user?: any;
}

export function AuthMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;

  if (!header) {
    throw new AppError("Token requerido", 401); 
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; 
    //console.log("TOKEN HEADER:", req.headers.authorization);
    //console.log("USER DECODIFICADO:", decoded);

    next();
  } catch {
    throw new AppError("Token inválido", 401); // ✅ antes respondía
  }
}
