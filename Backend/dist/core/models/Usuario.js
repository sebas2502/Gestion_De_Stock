"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
class Usuario {
    constructor(data) {
        this.id = data.id;
        this.empresa_id = data.empresa_id;
        this.nombre = data.nombre;
        this.email = data.email;
        this.password = data.password;
        this.rolId = data.rol_id;
        this.estado = data.estado;
    }
}
exports.Usuario = Usuario;
