"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movimiento = void 0;
class Movimiento {
    constructor(data) {
        this.empresa_id = data.empresa_id;
        this.producto_id = data.producto_id;
        this.tipo = data.tipo;
        this.cantidad = data.cantidad;
        this.descripcion = data.descripcion;
        this.fecha = data.fecha;
        this.usuario_id = data.usuario_id;
        this.total = data.total;
    }
}
exports.Movimiento = Movimiento;
