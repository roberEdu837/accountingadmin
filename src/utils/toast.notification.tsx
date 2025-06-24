import { toast } from "react-hot-toast";

export const ToastNotification = (message: string, type: "success"|"error"|"loading") => {

  if (type === "success") {
    toast.success(message, {
      duration: 3000,
      position: "bottom-right",
      style: {
        background: "#232323",
        color: "#FFF",
        fontWeight: "normal",
      },
    });
  } else if (type === "error") {
    toast.error(message, {
      duration: 3000,
      position: "bottom-right",
      style: {
        background: "#232323",
        color: "#FFF",
        fontWeight: "normal",
      },
    });
  } else if (type === "loading") {
    toast.loading(message, {
      duration: 3000,
      position: "bottom-right",
      style: {
        background: "#232323",
        color: "#FFF",
        fontWeight: "normal",
      },
    });
  }
};

export default ToastNotification;
