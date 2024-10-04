import axiosInstance from "./Axiosinstance";
import { toast } from 'react-hot-toast';

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});


export const signup = async (name: string, email: string, password: string, role: string) => {
    try {
        const formData = await axiosInstance.post('/signup', { name, email, password, role })
        console.log(formData)
        return formData
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
    }
}
export const login = async (email: string, password: string,role:string) => {
    try {
        let response = await axiosInstance.post('/login', { email, password,role })
        return response
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
    }
}
export const createTask = async (data: any) => {
    try {
        console.log(data)
        const response = await axiosInstance.post('/createTask',{ data });
        return response;
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
    }
}
export const getTasks = async () => {
    try {
        let response = await axiosInstance.get('/getTasks')
        return response.data.data
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}
export const getEmployeesByManagerStatus = async () => {
    try {
        let response = await axiosInstance.get('/getEmployeesByManagerStatus')
        console.log(response)
        return response.data
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}
export const assignManger = async (employee: any) => {
    try {
        console.log(employee)
        const response = await axiosInstance.post('/assignManger',{ employee });
        return response;
    } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
    }
}
export const getEmployeesUnderManager = async () => {
    try {
        let response = await axiosInstance.get('/getEmployeesUnderManager')
        console.log(response)
        return response.data
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}
export const getTasksAssignedToEmployee = async () => {
    try {
        let response = await axiosInstance.get('/getTasksAssignedToEmployee')
        console.log(response)
        return response.data
    } catch (error: any) {
        console.log(error.response.data.message);
    }
}