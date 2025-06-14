import { toast } from "react-toastify";
const succesToast = (notify) => {
  return toast.success(`${notify}`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
const globalToast = (notify) => {
  return toast.success(`${notify}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
const warningToast = (notify) => {
  return toast.warning(`${notify}`, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export { succesToast, warningToast, globalToast };
