import { MovimientosRepository } from "../repositories/MovimientoRepository";
import { AppError } from "../errors/AppError";

export class MovimientosService {
  constructor(private movimientosRepo: MovimientosRepository) {}

  async crearMovimiento(
    empresa_id: number,
    producto_id: number,
    tipo: "entrada" | "salida",
    cantidad: number,
    descripcion: string | undefined,
    fecha: Date | undefined,
    usuario_id: number,
    total: number
  ) {
    if (!["entrada", "salida"].includes(tipo)) {
      throw new AppError("Tipo de movimiento inválido", 400);
    }

    if (cantidad <= 0) {
      throw new AppError("La cantidad debe ser mayor a 0", 400);
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

  async listarTodos(empresa_id: number) {
    return await this.movimientosRepo.obtenerTodos(empresa_id);
  }

  async listarPorProducto(empresa_id: number, producto_id: number) {
    return await this.movimientosRepo.obtenerPorProducto(
      empresa_id,
      producto_id
    );
  }

  async buscar(empresa_id?: number, desde?: string, hasta?: string) {
    return await this.movimientosRepo.buscar(empresa_id, desde, hasta);

  }

  async getKpis(){
    const mas_vendidos = await this.movimientosRepo.topProductosMasVendidos();
    const menos_vendidos = await this.movimientosRepo.topProductosMenosVendidos();
    return {mas_vendidos , menos_vendidos}
  }
}
