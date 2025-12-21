import api from "./api";

export const getCategorias = async () => {
    
    try {
        const token = localStorage.getItem("token");
        const {data} = await api.get("/categorias",{
              headers: {
              Authorization: `Bearer ${token}`
    }
        });
       return data;
    } catch (error) {
        console.log("Error: ",error);
        return[];
    }

}