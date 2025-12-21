export class Movimiento {
  id?: number;
  empresa_id!: number;
  producto_id!: number;  
  tipo!: "entrada" | "salida";
  cantidad!: number;
  descripcion?: string;
  fecha?: Date;
  usuario_id!: number;
  total!: number;

  constructor(data : any){
    this.empresa_id = data.empresa_id;
    this.producto_id = data.producto_id;
    this.tipo = data.tipo;
    this.cantidad = data.cantidad;
    this.descripcion = data.descripcion
    this.fecha = data.fecha;
    this.usuario_id = data.usuario_id;
    this.total = data.total;
  }
 
}
