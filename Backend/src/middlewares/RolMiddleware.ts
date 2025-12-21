import { Response, NextFunction } from "express";
import { AuthRequest } from "./AuthMiddleware";
import { AppError } from "../errors/AppError";

export function RolMiddleware(rolesPermitidos: number[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    
    if (!req.user) {
      throw new AppError("No autenticado", 401); // ✅ antes respondía
    }

    const rolUsuario = req.user.rolId;

    if (!rolesPermitidos.includes(rolUsuario)) {
      throw new AppError(
        "No tenés permisos para realizar esta accion",
        403
      ); // ✅ antes respondía
    }

    next();
  };
}
