import type { Register } from "../@types/user"
import { axiosInstance } from "../utils/axios"

export const login = async (password: string, email: string) => {
 return axiosInstance.post('users/login',{password, email})
}

export const register = async (data: Register) => {
    return axiosInstance.post('users/register',data)
}