"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const Producto_1 = require("../core/models/Producto");
class ProductoRepository extends BaseRepository_1.BaseRepository {
    async findAllByEmpresa(empresa_id) {
        const rows = await this.query(`
    SELECT 
      p.*, 
      c.nombre AS categoria_nombre
    FROM productos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    WHERE p.empresa_id = ? 
      AND p.activo = 1
    `, [empresa_id]);
        return rows.map(r => ({
            ...r,
            categoria_nombre: r.categoria_nombre
        }));
    }
    async findById(id, empresa_id) {
        const rows = await this.query(`SELECT * FROM productos WHERE empresa_id = ? AND id = ? AND activo = 1 LIMIT 1`, [empresa_id, id]);
        return rows.length > 0 ? new Producto_1.Producto(rows[0]) : null;
    }
    async create(producto) {
        const result = await this.pool.query(`INSERT INTO productos (empresa_id, categoria_id, nombre, descripcion, precio, stock, stock_minimo, codigo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
            Number(producto.empresa_id),
            Number(producto.categoria_id),
            producto.nombre,
            producto.descripcion,
            Number(producto.precio),
            Number(producto.stock),
            Number(producto.stock_minimo),
            producto.codigo,
        ]);
        return result[0].insertId;
    }
    async update(producto) {
        await this.pool.query(`UPDATE productos SET nombre = ?, categoria_id = ?, descripcion = ?, precio = ?, stock_minimo = ?, codigo = ? WHERE empresa_id = ? AND id = ?`, [
            producto.nombre,
            producto.categoria_id,
            producto.descripcion,
            producto.precio,
            producto.stock_minimo,
            producto.codigo,
            producto.empresa_id,
            producto.id,
        ]);
    }
    async findByIdConCategoria(id, empresa_id) {
        const rows = await this.query(`
    SELECT 
      p.*, 
      c.nombre AS categoria_nombre
    FROM productos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    WHERE p.id = ?
      AND p.empresa_id = ?
      AND p.activo = 1
    LIMIT 1
    `, [id, empresa_id]);
        return rows.length > 0 ? rows[0] : null;
    }
    async delete(id, empresa_id) {
        const [result] = await this.pool.query(`UPDATE productos 
     SET activo = 0 
     WHERE id = ? AND empresa_id = ?`, [id, empresa_id]);
        return result; // devolvemos affectedRows
    }
}
exports.ProductoRepository = ProductoRepository;
