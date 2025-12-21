import api from "./api";

export const getEmpresas = async () => {

    try {
        const {data} = await api.get("/empresas");
       return data;
    } catch (error) {
        console.log("Error: ",error)
    }

}