import api from "../api/axios";
import { Order } from "../types/order";

export const getOrder =async ()=>{
const response= await api.get('/order/');
return response.data;
}

export const getOrderById =async (id: number)=>{
const response= await api.get(`/order/${id}`);
return response.data;
}

export const addOrder =async (data :Order)=>{
const response= await api.post(`/order/`,data);
return response.data;
}

 export const updateOrder =async (id: number,data :Order)=>{
const response= await api.put(`/order/${id}`,data);
return response.data;
}
export const deleteOrder =async (id: number)=>{
const response= await api.delete(  `/order/${id}`);
return response.data;
}
