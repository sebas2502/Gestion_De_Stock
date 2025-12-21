import { ProductoRepository } from "../repositories/ProductoRepository";
import { Producto } from "../core/models/Producto";
import { AppError } from "../errors/AppError";


export class ProductoServices {
  constructor(private repo: ProductoRepository) {}

  async listar(empresa_id: number) {
   
    return await this.repo.findAllByEmpresa(empresa_id);
  }

  async obtener(empresa_id: number, id: number) {
    const prod = await this.repo.findById(empresa_id, id);
    if (!prod) throw new Error("Producto no encontrado");
    return prod;
  }

  async crear(empresa_id: number, data: any) {
    const producto = new Producto({
      ...data,
      empresa_id: empresa_id,
      estado: 1,
      stock: data.stock ?? 0,
    });

    const id = await this.repo.create(producto);
    return await this.repo.findByIdConCategoria(id,empresa_id);
  }

async actualizar(
  productoId: number,
  empresaId: number,
  data: any
) {
  await this.repo.update(
    new Producto({
      ...data,
      id: productoId,
      empresa_id: empresaId
    })
  );

  const producto = await this.repo.findByIdConCategoria(
    productoId,
    empresaId
  );

  if (!producto) {
    throw new AppError("Producto no encontrado", 404);
  }

  return producto;
}


  async eliminar(id: number, empresa_id: number) {
  
  
  const producto = await this.repo.findById(id,empresa_id);
  if (!producto) {
    throw new AppError("El producto no existe", 404);
  }

  await this.repo.delete(id, empresa_id); // CORREGIDO
}

}
