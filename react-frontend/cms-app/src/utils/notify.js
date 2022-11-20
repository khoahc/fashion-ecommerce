import { toast } from "react-toastify";

const notify = (type, message) => {
  type === 1
    ? toast.success(message, {
        position: "bottom-left",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    : toast.warn(message, {
        position: "bottom-left",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
};

export default notify;