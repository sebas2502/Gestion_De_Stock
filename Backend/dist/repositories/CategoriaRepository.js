"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const Categoria_1 = require("../core/models/Categoria");
class CategoriaRepository extends BaseRepository_1.BaseRepository {
    async findAllByEmpresa(empresa_id) {
        const rows = await this.query(`SELECT * FROM categorias 
       WHERE empresa_id = ?`, [empresa_id]);
        return rows.map(r => new Categoria_1.Categoria(r));
    }
    async findById(empresa_id, id) {
        const rows = await this.query(`SELECT * FROM categorias
       WHERE empresa_id = ? AND id = ? AND estado = 1 LIMIT 1`, [empresa_id, id]);
        return rows.length > 0 ? new Categoria_1.Categoria(rows[0]) : null;
    }
    async create(cat) {
        const result = await this.pool.query(`INSERT INTO categorias (empresa_id, nombre)
       VALUES (?, ?, ?, ?)`, [cat.empresa_id, cat.nombre]);
        return result[0].insertId;
    }
    async update(cat) {
        await this.pool.query(`UPDATE categorias 
       SET nombre = ?, descripcion = ?
       WHERE empresa_id = ? AND id = ?`, [cat.nombre, cat.empresa_id, cat.id]);
    }
    async delete(empresa_id, id) {
        await this.pool.query(`UPDATE categorias SET estado = 0 WHERE empresa_id = ? AND id = ?`, [empresa_id, id]);
    }
}
exports.CategoriaRepository = CategoriaRepository;
