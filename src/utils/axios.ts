import axios from "axios";
import ToastNotification from "../components/utils/ToastNotification";
import { ExpiredToken } from "./jwt";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_API,   
});

axiosInstance.interceptors.response.use(
  (response) => {
   return response;
  },
  (error)=>{
    const messageError = error.response.data.error.message;
    if(messageError === "Error: Sesión invalida."){
         ToastNotification(
          "Tu sesión ha caducado",
          "error"
         );
          setTimeout(() => {
        ExpiredToken();
      }, 3000);
    }else{
      ToastNotification(messageError, "error");
    }
    return Promise.reject(error);
  }
)

axiosInstance.interceptors.request.use(
  (config) => {
    const tokenaccounting = localStorage.getItem(
      "accounting_tkn"
    );

    if (tokenaccounting) {
      config.headers["Authorization"] = `Bearer ${tokenaccounting}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
