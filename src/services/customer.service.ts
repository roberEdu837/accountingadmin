import type { Customer } from "../@types/customer";
import { axiosInstance } from "../utils/axios";

export const  getCustomers = () => {
    return axiosInstance.get('/customers');
}

export const getCustomAssociates = () => {
    return axiosInstance.get('/customers/associates');
}

export const PostCustomer = (customer: Customer) => {
 return axiosInstance.post('/customers', customer);
}

export const patchCustomer = (customer: Customer, id: number) => {
 return axiosInstance.patch(`/customers/${id}`,customer)
}