import type { Customer, FilterCustomer } from "../@types/customer";
import { axiosInstance } from "../utils/axios";

export const  getCustomers = (filter: FilterCustomer) => {
    return axiosInstance.post('/customers/search',filter);
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

export const desactivateCustomer = (id: number | undefined, status: boolean) => {
 return axiosInstance.patch(`/customers/${id}`, {status: status})
}