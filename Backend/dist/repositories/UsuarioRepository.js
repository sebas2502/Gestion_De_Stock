"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const Usuario_1 = require("../core/models/Usuario");
class UsuarioRepository extends BaseRepository_1.BaseRepository {
    async findByEmail(empresa_id, email) {
        const rows = await this.query("SELECT * FROM usuarios WHERE empresa_id = ? AND email = ? LIMIT 1", [empresa_id, email]);
        return rows.length > 0 ? new Usuario_1.Usuario(rows[0]) : null;
    }
    async findById(id, empresa_id) {
        const rows = await this.query("SELECT * FROM usuarios WHERE id = ? AND empresa_id = ? LIMIT 1", [id, empresa_id]);
        return rows.length > 0 ? new Usuario_1.Usuario(rows[0]) : null;
    }
    async create(user) {
        const result = await this.pool.query(`INSERT INTO usuarios (empresa_id, nombre, email, password_hash, rol_id, estado)
       VALUES (?, ?, ?, ?, ?, ?)`, [
            user.empresa_id,
            user.nombre,
            user.email,
            user.password,
            user.rolId,
            user.estado,
        ]);
        return result[0].insertId;
    }
}
exports.UsuarioRepository = UsuarioRepository;
