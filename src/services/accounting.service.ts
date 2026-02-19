import type { FilterAccounting } from "../@types/FilterAccounting";
import type { PatchAccounting } from "../@types/patchAccounting";
import { axiosInstance } from "../utils/axios";

export const patchAccounting = (id: number, data: PatchAccounting) => {
  return axiosInstance.patch(`/monthly-accountings/${id}`, data);
};

export const getaccounting = (filter: FilterAccounting) => {
  return axiosInstance.post(`/monthly-accountings/search`, filter);
};


export const createAccounting = () => {
  return axiosInstance.post("monthly-accountings/generate");
};

export const getPdfAccountingPayments = (id: number | undefined) => {
  return axiosInstance.get(`monthly-accountings/debts/customer/${id}/pdf/`,{
  responseType: 'blob', 
 });
}

export const  getHasDebtsAccountings = () => {
  return axiosInstance.get('monthly-accountings/has-debts')
}

