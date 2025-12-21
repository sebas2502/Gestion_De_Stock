import { toast } from "react-toastify";

export const confirmToast = (mensaje, onConfirm) => {
  toast(
    ({ closeToast }) => (
      <div className="flex flex-col gap-3">
        <p className="text-gray-100">{mensaje}</p>

        <div className="flex justify-end gap-2">
          <button
            onClick={closeToast}
            className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-sm"
          >
            Cancelar
          </button>

          <button
            onClick={() => {
              onConfirm();
              closeToast();
            }}
            className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-sm text-white"
          >
            Eliminar
          </button>
        </div>
      </div>
    ),
    {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      className: "bg-gray-900 border border-gray-700",
    }
  );
};
