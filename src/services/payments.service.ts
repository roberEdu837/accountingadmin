import type { createPayment } from "../@types/payments";
import { axiosInstance } from "../utils/axios";

export const postPayment = ( payment: createPayment) => {
  return axiosInstance.post(`/paymets`,  payment );
}

export const getPaymentsByAccountingId = (id: number) => {
  return axiosInstance.delete(`/paymets/${id}`);
}

