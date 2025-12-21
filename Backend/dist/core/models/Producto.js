"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
class Producto {
    constructor(data) {
        this.id = data.id;
        this.empresa_id = data.empresa_id;
        this.categoria_id = data.categoria_id;
        this.nombre = data.nombre;
        this.descripcion = data.descripcion;
        this.precio = data.precio;
        this.stock = data.stock;
        this.stock_minimo = data.stock_minimo;
        this.codigo = data.codigo;
        this.activo = data.activo;
        this.fecha_creacion = data.fecha_creacion;
    }
}
exports.Producto = Producto;
