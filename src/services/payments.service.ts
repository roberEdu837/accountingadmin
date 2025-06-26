import type { createPayment } from "../@types/payments";
import { axiosInstance } from "../utils/axios";

export const PostPayment = ( payment: createPayment) => {
  return axiosInstance.post(`/paymets`,  payment );
}

export const statementPdf = (statement: any) => {
  return axiosInstance.post('statement', statement, {
    responseType: 'blob', // Agregar esto para que la respuesta sea un Blob (archivo binario)
  });
};

