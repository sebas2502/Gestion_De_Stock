"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardServices = void 0;
const DashboardRepository_1 = require("../repositories/DashboardRepository");
class DashboardServices {
    constructor() {
        this.repo = new DashboardRepository_1.DashboardRepository();
    }
    async getDashboardData(empresa_id) {
        const bajoStock = await this.repo.obtenerProductosBajoStock(empresa_id);
        const movimientosDelDia = await this.repo.otenerTodosLosMovimientos(empresa_id);
        const topMovimientos = await this.repo.obtenerProductosConMasMovimientos(empresa_id);
        //console.log({bajoStock,movimientosDelDia,topMovimientos});
        return {
            bajoStock,
            movimientosDelDia,
            topMovimientos,
        };
    }
}
exports.DashboardServices = DashboardServices;
