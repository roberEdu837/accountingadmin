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

export const patchClientInSocietyById = (id: number, paymentDate: Date) => {
  return axiosInstance.patch(`client-in-societies/${id}`, {
    paymentDate: paymentDate,
    status: true,
  });
};

export const patchClientInSociety = (ids:Array<number> = [],paymentDate: string) => {
 return axiosInstance.patch('client-in-societies',{
  ids,
  fecha:paymentDate
 })
}
