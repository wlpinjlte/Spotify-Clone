import axios from "axios";
import { URL } from "./utils";

export const Login=(data)=>{
    return axios.post(`${URL}/api/token/`,data)
}

export const Register=(data)=>{
    return axios.post(`${URL}/api/register/`,data)
}

export const Verify=(data)=>{
    return axios.post(`${URL}/api/token/verify/`,data)
}

export const RefreshToken=(refreshToken)=>{
    return axios.post(`${URL}/api/token/refresh/`,{refresh:refreshToken})
}