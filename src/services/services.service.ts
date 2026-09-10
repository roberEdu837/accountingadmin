import type { AddAccountingService, Service, TableAccountingService } from "../@types/services";
import { axiosInstance } from "../utils/axios";

export const getServices = () => {
    return axiosInstance.get<Service[]>(`/services`);
}

export const postService = (service: Service) => {
    return axiosInstance.post('/services', service);
}

export const patchService = (service: Service, id: number) => {
    return axiosInstance.patch(`/services/${id}`, service);
}


export const postAddServiceAccounting = (service: AddAccountingService) => {
    return axiosInstance.post('/accounting-services', service);
}

export const getAccountingServicesById = (id: number) => {
    return axiosInstance.get<TableAccountingService[]>(`/accounting-services/monthly-accounting/${id}`);
}


export const patchAccountingServices = (id: number) => {
    return axiosInstance.patch(`/accounting-services/${id}`,{
        status: "Done"
    });
}

export const deleteAccountingService = (id: number) => {
    return axiosInstance.delete(`/accounting-services/${id}`);
}