import type { Password } from "../@types/passwors";
import { axiosInstance } from "../utils/axios";

export const getPasswordsById = (id: number) => {
  return axiosInstance.get(`passwords/${id}`);
};

export const postPasswordByCustomer = (data: Password) => {
  return axiosInstance.post("passwords", data);
};

export const putPasswordById = (id: number, data: Password) => {
  return axiosInstance.put(`passwords/${id}`, data);
};
