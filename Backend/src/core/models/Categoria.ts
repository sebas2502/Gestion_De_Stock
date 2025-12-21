export class Categoria {
  id?: number;
  empresa_id: number;
  nombre: string;
  

  constructor(data: any) {
    this.id = data.id;
    this.empresa_id = data.empresa_id;
    this.nombre = data.nombre;
    }
}
