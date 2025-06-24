import { axiosInstance } from "../utils/axios"

export const login = async (password: string, email: string) => {
 return axiosInstance.post('users/login',{password, email})
}