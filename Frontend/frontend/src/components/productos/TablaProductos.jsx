import FilaProducto from "./FilaProducto";

export default function TablaProductos({ productos, onEditar, onEliminar }) {
  return (
   
 <div className=" rounded-xl w-full overflow-x-auto">
    <table className="min-w-full bg-gray-800 rounded-xl overflow-hidden">
  <thead>
    <tr className="bg-gray-800 text-gray-300">
      <th className="px-4 py-2 text-center">Codigo</th>
      <th className="px-4 py-2 text-center">Categoria</th>
      <th className="px-4 py-2 text-center">Nombre</th>
      <th className="px-4 py-2 text-center">Descripcion</th>
      <th className="px-4 py-2 text-center">Precio</th>
      <th className="px-4 py-2 text-center">Stock</th>
      <th className="px-4 py-2 text-center">Stock Mínimo</th>
      <th className="px-4 py-2 text-center">Acciones</th>
    </tr>
  </thead>

  <tbody>
    {productos.map((p) => (
      <FilaProducto key={p.id} prod = {p} onEditar = {onEditar} onEliminar = {onEliminar} />
    ))}
  </tbody>
</table> 
  
 </div>
  );
}