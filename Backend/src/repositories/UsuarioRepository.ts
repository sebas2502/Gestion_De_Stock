import { BaseRepository } from "./BaseRepository";
import { Usuario } from "../core/models/Usuario";

export class UsuarioRepository extends BaseRepository {

  async findByEmail(empresa_id: number, email: string): Promise<Usuario | null> {
    const rows = await this.query<Usuario>(
      "SELECT * FROM usuarios WHERE empresa_id = ? AND email = ? LIMIT 1",
      [empresa_id, email]
    );
    return rows.length > 0 ? new Usuario(rows[0]) : null;
  }

  async findById(id: number , empresa_id:number): Promise<Usuario | null> {
    const rows = await this.query<Usuario>(
      "SELECT * FROM usuarios WHERE id = ? AND empresa_id = ? LIMIT 1",
      [id , empresa_id]
    );
    return rows.length > 0 ? new Usuario(rows[0]) : null;
  }

  async create(user: Usuario): Promise<number> {
    const result: any = await this.pool.query(
      `INSERT INTO usuarios (empresa_id, nombre, email, password_hash, rol_id, estado)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user.empresa_id,
        user.nombre,
        user.email,
        user.password,
        user.rolId,
        user.estado,
      ]
    );

    return result[0].insertId;
  }
}
