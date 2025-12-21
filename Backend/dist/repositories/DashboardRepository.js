"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
class DashboardRepository extends BaseRepository_1.BaseRepository {
    async obtenerProductosBajoStock(empresa_id) {
        return this.query(`SELECT id, nombre, stock, stock_minimo 
       FROM productos 
       WHERE empresa_id = ? 
       AND stock <= stock_minimo
       ORDER BY stock ASC`, [empresa_id]);
    }
    async otenerTodosLosMovimientos(empresa_id) {
        const result = await this.query(`SELECT 
          SUM(CASE WHEN tipo = 'entrada' THEN 1 ELSE 0 END) AS entradas,
          SUM(CASE WHEN tipo = 'salida' THEN 1 ELSE 0 END) AS salidas,
          COUNT(*) AS total
       FROM movimientos_stock
       WHERE empresa_id = ?
       AND DATE(fecha) = CURDATE()`, [empresa_id]);
        return result[0];
    }
    //Movimientos de productos en el lapso de 30 dias
    async obtenerProductosConMasMovimientos(empresa_id) {
        return this.query(`SELECT 
          p.id, p.nombre,
          COUNT(m.id) AS movimientos
       FROM productos p
       JOIN movimientos_stock m ON m.producto_id = p.id
       WHERE p.empresa_id = ?
       AND m.fecha >= DATE_SUB(NOW(), INTERVAL 30 DAY) 
       GROUP BY p.id, p.nombre
       ORDER BY movimientos DESC
       LIMIT 5`, [empresa_id]);
    }
}
exports.DashboardRepository = DashboardRepository;
