import { axiosInstance } from "../utils/axios";

export const getClientInSociety = (filter: any) => {
  return axiosInstance.post("client-in-societies/search", filter);
};

export const postClientIsSociety = (
  id: number,
  amount: number,
  paymetId: number
) => {
  return axiosInstance.post("client-in-societies", { monthlyAccountingId: id,amount,paymetId });
};

export const patchClientInSociety = (id: number, paymentDate: Date) => {
  return axiosInstance.patch(`client-in-societies/${id}`, {
    paymentDate: paymentDate,
    status: true,
  });
};
