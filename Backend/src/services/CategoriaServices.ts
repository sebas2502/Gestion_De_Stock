import { CategoriaRepository } from "../repositories/CategoriaRepository";
import { Categoria } from "../core/models/Categoria";

export class CategoriaServices {
  constructor(private repo: CategoriaRepository) {}

  async listar(empresa_id: number) {
    return await this.repo.findAllByEmpresa(Number(empresa_id));
  }

  async obtener(empresa_id: number, id: number) {
    const cat = await this.repo.findById(empresa_id, id);
    if (!cat) throw new Error("Categoría no encontrada");
    return cat;
  }

  async crear(empresa_id: number, data: any) {
    const cat = new Categoria({
      empresa_id: empresa_id,
      nombre: data.nombre,
      descripcion: data.descripcion ?? "",
      estado: 1,
    });

    const id = await this.repo.create(cat);
    return this.obtener(empresa_id, id);
  }

  async actualizar(empresa_id: number, id: number, data: any) {
    const cat = await this.obtener(empresa_id, id);

    cat.nombre = data.nombre ?? cat.nombre;
   
    await this.repo.update(cat);
    return cat;
  }

  async eliminar(empresa_id: number, id: number) {
    await this.repo.delete(empresa_id, id);
  }
}
