import api from "../api/axios";
import { Category } from "../types/category";

export const getCategory =async ()=>{
const response= await api.get('/categories/');
return response.data;
}

export const getCategorytById =async (id: number)=>{
const response= await api.get(`/categories/${id}`);
return response.data;
}

export const addCategory =async (id: number,data :Category)=>{
const response= await api.post(`/categories/${id}`,data);
return response.data;
}

 export const updateCategory =async (data :Category)=>{
const response= await api.put('/categories/',data);
return response.data;
}
export const deleteCategory =async (id: number,)=>{
const response= await api.delete(`/categories/${id}`);
return response.data;
}
