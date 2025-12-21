"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaServices = void 0;
const Categoria_1 = require("../core/models/Categoria");
class CategoriaServices {
    constructor(repo) {
        this.repo = repo;
    }
    async listar(empresa_id) {
        return await this.repo.findAllByEmpresa(Number(empresa_id));
    }
    async obtener(empresa_id, id) {
        const cat = await this.repo.findById(empresa_id, id);
        if (!cat)
            throw new Error("Categoría no encontrada");
        return cat;
    }
    async crear(empresa_id, data) {
        const cat = new Categoria_1.Categoria({
            empresa_id: empresa_id,
            nombre: data.nombre,
            descripcion: data.descripcion ?? "",
            estado: 1,
        });
        const id = await this.repo.create(cat);
        return this.obtener(empresa_id, id);
    }
    async actualizar(empresa_id, id, data) {
        const cat = await this.obtener(empresa_id, id);
        cat.nombre = data.nombre ?? cat.nombre;
        await this.repo.update(cat);
        return cat;
    }
    async eliminar(empresa_id, id) {
        await this.repo.delete(empresa_id, id);
    }
}
exports.CategoriaServices = CategoriaServices;
