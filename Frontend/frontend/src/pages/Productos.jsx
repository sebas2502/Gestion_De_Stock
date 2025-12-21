import { useState , useEffect } from "react";
import { Pencil , Trash, Plus, Minus, Package, CheckCircle } from "lucide-react"; 
import TablaProductos from "../components/productos/TablaProductos";
import { crearProducto, actualizarProducto, getProductos, eliminarProducto } from "../services/productosServices";

import FormProducto from "../components/productos/FormProducto";
import { getCategorias } from "../services/categoriasServices";
import { toast } from "react-toastify";
import { reproducirSonido } from "../utils/sonidoToast";






export default function Productos() {
  const [categorias , setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({ codigo:"", categoria:"", nombre:"",descripcion:"",precio:"", stock:"", stock_minimo:"" });


  //Traemos todos los productos y categorias
   useEffect(() => {
    const cargarTodo = async () => {
      try {
        const prods = await getProductos();
        const cats = await getCategorias();

        setProductos(prods);
        setCategorias(cats);
      } catch (error) {
        console.error(error);
      }
    };

    cargarTodo();
  }, []);



  const productosFiltrados = productos.filter(p =>
    (p.nombre || "").toLowerCase().includes(busqueda.toLowerCase())
  );
  
  
const handleSubmit = async (productoFinal) => {
  try {
    let resultado;

    if (editando) {
      console.log("EDITANDO:", editando);
console.log(
  "DATOS INICIALES:",
  productos.find(p => p.id === editando)
);

      resultado = await actualizarProducto(editando, productoFinal);
      console.log("resultado: ",resultado)
      resultado.categoria_id = productoFinal.categoria_id;
      setProductos(
        productos.map((p) =>
          p.id === editando ? resultado : p
        )
      );
      toast.success("Producto actualizado correctamente");
      reproducirSonido();
    } else {
      resultado = await crearProducto(productoFinal);
      setProductos([...productos, resultado]);
      toast.success("Producto creado correctamente");
      reproducirSonido();
    }
    
    setMostrarFormulario(false);
    setEditando(null);

  } catch (error) {

    const mensaje = error.response?.data?.message || error.message;                 
    
    

    if(mensaje){
      toast.error(mensaje);
    }else{
      toast.error("Error inesperado intente mas tarde");
    }
  }
};




 const handleEdit = (prod) => {
  setEditando(prod.id);

  setFormData({
    codigo: prod.codigo || "",
    categoria_id: String(prod.categoria_id) || "",
    nombre: prod.nombre || "",
    descripcion: prod.descripcion || "",
    precio: prod.precio || "",
    //stock: prod.stock || "",
    stock_minimo: prod.stock_minimo || "",
  });

  setMostrarFormulario(true);
};


  const handleDelete = async (id) => {
    try {
    await eliminarProducto(id);

    setProductos(productos.filter(p => p.id !== id));

    toast.success("Producto eliminado correctamente");
  } catch (error) {
    const mensaje = error.response?.data?.message;
    console.log(mensaje)
    if(mensaje){
      toast.error(mensaje);
    }else{
      toast.error("Error inesperado al intentar eliminar");
    }
    
  }
  }

  return (
    <div className="p-6 text-gray-200">
       <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Package size={32} /> Productos
        </h2>
      </div>

      {/* BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700"
      />

      {/* BOTÓN NUEVO */}
      <button
        onClick={() => { setMostrarFormulario(!mostrarFormulario); setEditando(null); }}
        className="mb-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded 
             flex flex-row items-center justify-center gap-2 
             text-white font-medium"
      >
        {mostrarFormulario ? <Minus size={18} /> : <Plus size={18} />}
        {mostrarFormulario ? "Cerrar" : "Nuevo Producto"}
      </button>


     {/* FORMULARIO */}
{mostrarFormulario && (
  <FormProducto
   categorias={categorias}
   onSubmit={handleSubmit}
   
   datosIniciales={formData}
   editando={editando}
  />
)}


      {/* TABLA */}
      <TablaProductos productos = {productosFiltrados} onEditar={handleEdit} onEliminar={handleDelete} />
    </div>
  );
}
