import type { createPayment } from "../@types/payments";
import { axiosInstance } from "../utils/axios";

export const PostPayment = ( payment: createPayment) => {
  return axiosInstance.post(`/paymets`,  payment );
}
