import api from "../api/axios";
import { CartItem } from "../types/cart";
import {ApiResponse} from "../types/api";

export const getCart =async (): Promise<ApiResponse<CartItem[]>>=>{
const response= await api.get('/cart/');
return response.data;
}

export const getCartById =async (id: number)=>{
const response= await api.get(`/cart/${id}`);
return response.data;
}

export const addtoCart =async (id: number,data :CartItem)=>{
const response= await api.post(`/cart/${id}`,data);
return response.data;
}

 export const updateCart =async (data :CartItem)=>{
const response= await api.put('/cart/',data);
return response.data;
}
export const deleteCartItem =async (id: number,)=>{
const response= await api.delete(`/cart/${id}`);
return response.data;
}
