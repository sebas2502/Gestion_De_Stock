import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/layouts/Sidebar";
import Dashboard from "./pages/Dashboard";
import Productos from "./pages/Productos";
import Movimientos from "./pages/Movimientos";
import Login from "./pages/Login";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./router/PrivateRoutes";

const App = () => {
  return (
    <div className="w-screen h-screen">

      {/* ✅ TOAST GLOBAL */}
      <ToastContainer
        position="top-center"
        autoClose={2500}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />

      <Routes>
        {/* ✅ RUTA PÚBLICA */}
        <Route path="/login" element={<Login />} />

        {/* ✅ RUTAS PROTEGIDAS */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/productos" element={<Layout><Productos /></Layout>} />
          <Route path="/movimientos" element={<Layout><Movimientos /></Layout>} />
        </Route>
      </Routes>
    </div>
  );
};

/* ✅ LAYOUT REAL CON SEPARACIÓN VISUAL */
const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-950">
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENIDO */}
      <main className="flex-1 p-6 bg-slate-900 overflow-auto shadow-inner border-l border-slate-700">
        {children}
      </main>
    </div>
  );
};

export default App;
