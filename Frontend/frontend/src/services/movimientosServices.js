import api from "./api";

export const crearMovimiento = async (data) => {
  try {
    const token = localStorage.getItem("token");

    const res = await api.post("/movimientos", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    const mensaje = error.response?.data?.error;
    throw new Error(mensaje || "Error interno, intente mas tarde");
  }
};

export const obtenerMovimientos = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await api.get("/movimientos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    const mensaje = error.response?.data?.error;
    throw new Error(mensaje || "Error interno, intente mas tarde");
  }
};


export const filtrarMovimientos = async (desde, hasta) => {
  const res = await api.get(`/movimientos/filtrar?desde=${desde}&hasta=${hasta}`);
  return res.data;
};


export const topProductos = async () => {
  const res = await api.get("/dashboard/Kpis");
  console.log(res.data);
  
  return res.data;
}