import type { FilterAccounting } from "../@types/FilterAccounting";
import type { PatchAccounting } from "../@types/patchAccounting";
import { axiosInstance } from "../utils/axios";

export const patchAccounting = (id: number, data: PatchAccounting) => {
  return axiosInstance.patch(`/monthly-accountings/${id}`, data);
};

export const getAccounting = (filter: FilterAccounting) => {
  return axiosInstance.post(`/monthly-accountings/search`, filter);
};

export const getYears = () => {
  return axiosInstance.get("monthly-accountings/years");
};

export const createAccounting = () => {
  return axiosInstance.post("monthly-accountings");
};

export const debts = () => {
  return axiosInstance.get("client-in-societies/associated-debts");
};

export const getDetsAccounting = (id: number | undefined) => {
  return axiosInstance.get(`monthly-accountings/debts/customer/${id}`);
}

export const getPdfAccounting = (data:any) => {
  
 return axiosInstance.post('monthly-accountings/debts',data,{
  responseType: 'blob', 
 })
}
