import api from "../api/axios";
import { AddToCartRequest, CartItem } from "../types/cart";
import {ApiResponse} from "../types/api";

export const getCart =async (): Promise<ApiResponse<CartItem[]>>=>{
const response= await api.get('/cart/');
return response.data;
}

export const getCartById =async (id: number)=>{
const response= await api.get(`/cart/${id}`);
return response.data;
}

export const addtoCart =async (data :AddToCartRequest)=>{
const response= await api.post('/cart/',data);
return response.data;
}

 export const updateCart =async (id: number, data :{
    quantity: number;
  })=>{
const response= await api.put(`/cart/${id}`,data);
return response.data;
}
export const deleteCartItem =async (id: number,)=>{
const response= await api.delete(`/cart/${id}`);
return response.data;
}
