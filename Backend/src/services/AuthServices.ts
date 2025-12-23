import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { jwtSecret, jwtOptions } from "../config/jwtConfig";
import { pool } from "../config/db";
import { RowDataPacket } from "mysql2";
import { AppError } from "../errors/AppError";

export class AuthService {
  constructor(private usuarioRepo: UsuarioRepository) {}
  
  async login(nombre_empresa: string, email: string, password: string) {
    console.log("LOGIN PARAMS:", {
    nombre_empresa,
    email,
    password: password ? "***" : "EMPTY"
});
   if (!nombre_empresa?.trim()) {
    throw new Error("Debe ingresar una empresa válida");
   }
    const [row] = await pool.query<RowDataPacket[]>("SELECT * FROM empresas WHERE LOWER(nombre) = LOWER(?)" , [nombre_empresa]);
    const empresa = row[0];
    if(!empresa){
      throw new Error("La empresa ingresada no existe!")
    }
      
   
    const user = await this.usuarioRepo.findByEmail(Number(empresa.id), email);
    if (!user) throw new Error("Usuario no encontrado");

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new Error("Contraseña incorrecta");

    const token = jwt.sign(
      {
        id: user.id,
        empresa_id: user.empresa_id,
        rolId: user.rolId,
      },
      jwtSecret,
      jwtOptions
    );
 

    return { token, user };
  }

   async obtenerUsuarioActual(id: number, empresa_id: number) {
    const usuario = await this.usuarioRepo.findById(id, empresa_id);

    if (!usuario) {
      throw new AppError("Usuario no encontrado",401);
    }

    return usuario;
  }

}
