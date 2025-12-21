import { toast } from "react-toastify";

export const logout = () => {
  localStorage.removeItem("token");
 

  toast.info("Sesión cerrada", {
    position: "top-center",
    theme: "dark",
  });

  setTimeout(() => {
    window.location.href = "/login";
  }, 800);
};
