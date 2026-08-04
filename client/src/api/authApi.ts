import api from "../api/axios";
import {loginData,registerData}  from "../types/auth";

const register =async (data :registerData)=>{
const response= await api.post("/auth/register",data);
return response.data;
}

const login =async (data: loginData) =>{
const response= await api.post("/auth/login", data);
return response.data;
}

export default {login, register };