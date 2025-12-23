import { Request, Response } from "express";
import { AuthService } from "../services/AuthServices";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { AppError } from "../errors/AppError";

const usuarioRepo = new UsuarioRepository();
const authService = new AuthService(usuarioRepo);

export class AuthController {
  static async login(req: Request, res: Response) {
   
    try {
      console.log("Login body:", req.body);
      const { nombre_empresa, email, password } = req.body;
      const data = await authService.login(nombre_empresa, email, password);
      res.json(data);
    } catch (err: any) {
      console.error("LOGIN ERROR: ",err.message);
      res.status(400).json({ message: err.message });
    }
  }

  static async me(req: any, res: Response) {
    try {
      const usuarioId = req.user.id;
      const empresaId = req.user.empresa_id;

      const usuario = await authService.obtenerUsuarioActual(usuarioId, empresaId);

      return res.json(usuario);
    } catch (error: any) {
     if(error instanceof AppError){
      return res.status(500).json({ error: error.message });
     }
       return res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
