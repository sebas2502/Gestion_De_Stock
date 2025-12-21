import api from "./api";

export const getProductos = async () => {

    try {
        const {data} = await api.get("/productos");
       
       return data;
    } catch (error) {
        console.log("Error: ",error)
    }

}

export const crearProducto = async (data) => {
  try {
    const res = await api.post("/productos", data);
    return res.data;
  } catch (error) {
    const mensaje = error.response?.data?.message;
    throw new Error(mensaje || "No tiene permisos para crear productos"); 
  }
};


export const actualizarProducto = async (id, producto) => {
  const res = await api.put(`/productos/${id}`, producto);

  return res.data; 
};



export const eliminarProducto = async (id) => {

  const token = localStorage.getItem("token");
  const res = await api.put(`/productos/desactivar/${id}`);
 

  return res.data;
};
