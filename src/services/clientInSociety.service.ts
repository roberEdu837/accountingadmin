import type { FilterAccounting } from "../@types/FilterAccounting"
import { axiosInstance } from "../utils/axios"

export const getClientInSociety = (filter: FilterAccounting) => {
    return axiosInstance.post('client-in-societies/search',filter)
}

export const postClientIsSociety = (id: number) => {
    return axiosInstance.post('client-in-societies',{monthlyAccountingId: id})
}