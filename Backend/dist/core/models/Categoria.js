"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categoria = void 0;
class Categoria {
    constructor(data) {
        this.id = data.id;
        this.empresa_id = data.empresa_id;
        this.nombre = data.nombre;
    }
}
exports.Categoria = Categoria;
