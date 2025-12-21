"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovimientosService = void 0;
const AppError_1 = require("../errors/AppError");
class MovimientosService {
    constructor(movimientosRepo) {
        this.movimientosRepo = movimientosRepo;
    }
    async crearMovimiento(empresa_id, producto_id, tipo, cantidad, descripcion, fecha, usuario_id, total) {
        if (!["entrada", "salida"].includes(tipo)) {
            throw new AppError_1.AppError("Tipo de movimiento inválido", 400);
        }
        if (cantidad <= 0) {
            throw new AppError_1.AppError("La cantidad debe ser mayor a 0", 400);
        }
        // 👇 Ajuste importante: mandar los datos en el orden CORRECTO
        const id = await this.movimientosRepo.crearMovimiento({
            empresa_id,
            producto_id,
            tipo,
            cantidad,
            descripcion,
            fecha,
            usuario_id,
            total,
        });
        return { id };
    }
    async listarTodos(empresa_id) {
        return await this.movimientosRepo.obtenerTodos(empresa_id);
    }
    async listarPorProducto(empresa_id, producto_id) {
        return await this.movimientosRepo.obtenerPorProducto(empresa_id, producto_id);
    }
    async buscar(empresa_id, desde, hasta) {
        return await this.movimientosRepo.buscar(empresa_id, desde, hasta);
    }
    async getKpis() {
        const mas_vendidos = await this.movimientosRepo.topProductosMasVendidos();
        const menos_vendidos = await this.movimientosRepo.topProductosMenosVendidos();
        return { mas_vendidos, menos_vendidos };
    }
}
exports.MovimientosService = MovimientosService;
