import { DashboardRepository } from "../repositories/DashboardRepository";

export class DashboardServices {
  private repo = new DashboardRepository();

  async getDashboardData(empresa_id: number) {
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
