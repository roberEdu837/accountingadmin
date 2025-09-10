import { toast } from "react-hot-toast";

export const ToastNotification = (message: string, type: "success"|"error"|"loading"| "warning") => {

  if (type === "success") {
    toast.success(message, {
      duration: 3000,
      position: "top-right",
      style: {
        background: "#232323",
        color: "#FFF",
        fontWeight: "normal",
      },
    });
  } else if (type === "error" && message !== 'Request failed with status code 422') {
    toast.error(message, {
      duration: 3000,
      position: "top-right",
      style: {
        background: "#232323",
        color: "#FFF",
        fontWeight: "normal",
      },
    });
  } else if (type === "loading") {
    toast.loading(message, {
      duration: 3000,
      position: "top-right",
      style: {
        background: "#232323ff",
        color: "#FFF",
        fontWeight: "normal",
      },
    });
  }else if(type === "warning"){
      toast.error(message, {
      duration: 5000,
      position: "top-right",
      style: {
        background: "#232323ff",
        color: "#FFF",
        fontWeight: "normal",
      },
    });
  }
};

export default ToastNotification;
