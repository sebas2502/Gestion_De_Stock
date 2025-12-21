import { BaseRepository } from "./BaseRepository";
import { Categoria } from "../core/models/Categoria";

export class CategoriaRepository extends BaseRepository {
  
  async findAllByEmpresa(empresa_id: number): Promise<Categoria[]> {
    const rows = await this.query<Categoria>(
      `SELECT * FROM categorias 
       WHERE empresa_id = ?`,
      [empresa_id]
    );
    return rows.map(r => new Categoria(r));
  }

  async findById(empresa_id: number, id: number): Promise<Categoria | null> {
    const rows = await this.query<Categoria>(
      `SELECT * FROM categorias
       WHERE empresa_id = ? AND id = ? AND estado = 1 LIMIT 1`,
      [empresa_id, id]
    );
    return rows.length > 0 ? new Categoria(rows[0]) : null;
  }

  async create(cat: Categoria): Promise<number> {
    const result: any = await this.pool.query(
      `INSERT INTO categorias (empresa_id, nombre)
       VALUES (?, ?, ?, ?)`,
      [cat.empresa_id, cat.nombre]
    );
    return result[0].insertId;
  }

  async update(cat: Categoria): Promise<void> {
    await this.pool.query(
      `UPDATE categorias 
       SET nombre = ?, descripcion = ?
       WHERE empresa_id = ? AND id = ?`,
      [cat.nombre, cat.empresa_id, cat.id]
    );
  }

  async delete(empresa_id: number, id: number): Promise<void> {
    await this.pool.query(
      `UPDATE categorias SET estado = 0 WHERE empresa_id = ? AND id = ?`,
      [empresa_id, id]
    );
  }
}
