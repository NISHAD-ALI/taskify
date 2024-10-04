import axios, { AxiosInstance } from "axios";

const axiosInstance : AxiosInstance = axios.create({
    baseURL : "https://taskifyco.up.railway.app/",
    withCredentials : true
})

export default axiosInstance