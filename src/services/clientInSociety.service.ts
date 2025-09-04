import { axiosInstance } from "../utils/axios";
import type { FilterState } from "../redux/slices/filterSlice";

export const getClientInSociety = (filter: FilterState) => {
  return axiosInstance.post("client-in-societies/search", filter);
};

export const postClientIsSociety = (id: number) => {
  return axiosInstance.post("client-in-societies", { monthlyAccountingId: id });
};

export const patchClientInSociety = (id: number, paymentDate: Date) => {
  return axiosInstance.patch(`client-in-societies/${id}`, {
    paymentDate: paymentDate,
    status: true
  });
};

export const GetDebtsAssociated = () => {
  return axiosInstance.get("client-in-societies/associated-debts");
};
