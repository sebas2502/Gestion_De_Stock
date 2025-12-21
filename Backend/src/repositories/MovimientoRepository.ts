import { Pool } from "mysql2/promise";

export class MovimientosRepository {
  constructor(private db: Pool) {}

  async crearMovimiento(data: {
    empresa_id: number;
    producto_id: number;
    tipo: string;
    cantidad: number;
    descripcion?: string;
    fecha?: Date;
    usuario_id: number;
    total: number;

  }) {
    const sql = `
      INSERT INTO movimientos_stock 
      (empresa_id, producto_id, tipo, cantidad, descripcion, fecha, usuario_id, total)
      VALUES (?, ?, ?, ?, ?, NOW(), ?, ?)
    `;

    const params = [
      data.empresa_id,
      data.producto_id,
      data.tipo,
      data.cantidad,
      data.descripcion || null,
      data.usuario_id,
      data.total
    ];

    const [result]: any = await this.db.execute(sql, params);
    return result.insertId;
  }

  async obtenerPorProducto(empresa_id: number, producto_id: number) {
    const sql = `
      SELECT * 
      FROM movimientos_stock
      WHERE empresa_id = ? AND producto_id = ?
      ORDER BY fecha DESC
    `;
    const [rows] = await this.db.execute(sql, [empresa_id, producto_id]);
    return rows;
  }


   async obtenerTodos(empresa_id: number) {
  const [rows] = await this.db.query(
    `
    SELECT 
      m.id,
      m.fecha,
      m.tipo,
      m.cantidad,
      m.total,
      m.descripcion,

      p.id AS producto_id,
      p.nombre AS producto_nombre,

      u.id AS usuario_id,
      u.nombre AS usuario_nombre

    FROM movimientos_stock m
    JOIN productos p ON p.id = m.producto_id
    JOIN usuarios u ON u.id = m.usuario_id
    WHERE m.empresa_id = ?
    ORDER BY m.fecha DESC
    `,
    [empresa_id]
  );

  return rows;
}
async buscar(empresa_id?: number, desde?: string, hasta?: string) {
    let sql = `
      SELECT m.*, 
             p.nombre AS producto_nombre,
             u.nombre AS usuario_nombre
      FROM movimientos_stock m
      JOIN productos p ON p.id = m.producto_id
      JOIN usuarios u ON u.id = m.usuario_id
      WHERE 1 = 1
    `;

    const params: any[] = [];

    if (empresa_id) {
      sql += " AND m.empresa_id = ?";
      params.push(empresa_id);
    }

    if (desde && hasta) {
      sql += " AND DATE(m.fecha) BETWEEN ? AND ?";
      params.push(desde, hasta);
    } else if (desde) {
      sql += " AND DATE(m.fecha) >= ?";
      params.push(desde);
    } else if (hasta) {
      sql += " AND DATE(m.fecha) <= ?";
      params.push(hasta);
    }

    sql += " ORDER BY m.fecha DESC";

    const [rows] = await this.db.query(sql, params);
    return rows;
  }





async debug(empresa_id: number) {
  const [rows] = await this.db.query(
    "SELECT * FROM movimientos_stock WHERE empresa_id = ? ORDER BY fecha DESC",
    [empresa_id]
  );
  return rows;
}

  topProductosMasVendidos =  async () => {
      const sql = `
    SELECT p.id, p.nombre, SUM(dm.cantidad) AS total_vendido
    FROM movimientos_stock dm
    JOIN productos p ON p.id = dm.producto_id
    JOIN movimientos_stock m ON m.id = dm.id
    WHERE m.tipo = 'salida'
    GROUP BY p.id, p.nombre
    ORDER BY total_vendido DESC
    LIMIT 3;
  `;
    const [rows] = await this.db.query(sql)
  return rows;

  }

  topProductosMenosVendidos = async () => {
    const sql = `
    SELECT p.id, p.nombre, COALESCE(SUM(dm.cantidad), 0) AS total_vendido
    FROM productos p
    LEFT JOIN movimientos_stock dm ON p.id = dm.producto_id
    LEFT JOIN movimientos_stock m ON m.id = dm.id AND m.tipo = 'salida'
    GROUP BY p.id, p.nombre
    ORDER BY total_vendido ASC
    LIMIT 3;
  `;
  const [rows] = await this.db.query(sql)
  return rows;
  }

  }

