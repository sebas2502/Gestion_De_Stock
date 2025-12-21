import { Pencil, Trash } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FilaProducto({ prod, onEliminar, onEditar }) {
  const confirmarEliminacion = () => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-3 text-white">
          <p className="font-semibold text-white">¿Eliminar el producto?</p>

          <div className="flex justify-end gap-2">
            <button 
              onClick={() => {  
                onEliminar(prod.id);  
                closeToast();
              }}
              className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded"
            >
              Sí
            </button>

            <button
              onClick={closeToast}
              className="px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
        position: "top-center",

       
        toastClassName:
          "bg-gray-900 text-white border border-gray-700 rounded-lg shadow-lg",
      }
    );
  };

  return (
    <tr className="border-b border-gray-800">
      <td className="px-4 py-2 text-center bg-gray-900">{prod.codigo}</td>
      <td className="px-4 py-2 text-center bg-gray-900">{prod.categoria_nombre}</td>
      <td className="px-4 py-2 text-center bg-gray-900">{prod.nombre}</td>
      <td className="px-4 py-2 text-center bg-gray-900">{prod.descripcion}</td>
      <td className="px-4 py-2 text-center bg-gray-900">{prod.precio}</td>
      <td className="px-4 py-2 text-center bg-gray-900">{prod.stock}</td>
      <td className="px-4 py-2 text-center bg-gray-900">{prod.stock_minimo}</td>

      <td className="px-4 py-2 text-center bg-gray-900">
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onEditar({ ...prod })}
            className="text-yellow-400 hover:text-yellow-300"
          >
            <Pencil size={20} />
          </button>

          <button
            onClick={confirmarEliminacion}
            className="text-red-500 hover:text-red-400"
          >
            <Trash size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
}
