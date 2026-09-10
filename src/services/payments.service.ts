import type { createPayment } from "../@types/payments";
import { axiosInstance } from "../utils/axios";

export const postPayment = ( payment: createPayment) => {
  return axiosInstance.post(`/paymets`,  payment );
}

export const deletePayment = (id: number) => {
  return axiosInstance.delete(`/paymets/${id}`);
}

export const getPaymentsByAccountingId = (id: number) => {
  return axiosInstance.get(`/paymets/monthly-accounting/${id}`);
}

