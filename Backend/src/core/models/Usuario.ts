export class Usuario {
  id?: number;
  empresa_id: number;
  nombre: string;
  email: string;
  password: string;
  rolId: number;
  estado: number;

  constructor(data: any) {
    this.id = data.id;
    this.empresa_id = data.empresa_id;
    this.nombre = data.nombre;
    this.email = data.email;
    this.password = data.password;
    this.rolId = data.rol_id;
    this.estado = data.estado;
  }
}
