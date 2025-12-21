"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoServices = void 0;
const Producto_1 = require("../core/models/Producto");
const AppError_1 = require("../errors/AppError");
class ProductoServices {
    constructor(repo) {
        this.repo = repo;
    }
    async listar(empresa_id) {
        return await this.repo.findAllByEmpresa(empresa_id);
    }
    async obtener(empresa_id, id) {
        const prod = await this.repo.findById(empresa_id, id);
        if (!prod)
            throw new Error("Producto no encontrado");
        return prod;
    }
    async crear(empresa_id, data) {
        const producto = new Producto_1.Producto({
            ...data,
            empresa_id: empresa_id,
            estado: 1,
            stock: data.stock ?? 0,
        });
        const id = await this.repo.create(producto);
        return await this.repo.findByIdConCategoria(id, empresa_id);
    }
    async actualizar(productoId, empresaId, data) {
        await this.repo.update(new Producto_1.Producto({
            ...data,
            id: productoId,
            empresa_id: empresaId
        }));
        const producto = await this.repo.findByIdConCategoria(productoId, empresaId);
        if (!producto) {
            throw new AppError_1.AppError("Producto no encontrado", 404);
        }
        return producto;
    }
    async eliminar(id, empresa_id) {
        const producto = await this.repo.findById(id, empresa_id);
        if (!producto) {
            throw new AppError_1.AppError("El producto no existe", 404);
        }
        await this.repo.delete(id, empresa_id); // CORREGIDO
    }
}
exports.ProductoServices = ProductoServices;
