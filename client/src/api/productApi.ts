import api from "../api/axios";
import { Product,ProductResponse,SearchParams} from "../types/product";

export const getProducts =async (params: SearchParams): Promise<ProductResponse> => {
  const response = await api.get("/products", { params });
  return response.data;
}

export const getProductById =async (id: number)=>{
const response= await api.get(`/products/${id}`);
return response.data;
}

export const addProduct =async (id: number,data:Product)=>{
const response= await api.post(`/products/${id}`,data);
return response.data;
}

 export const updateProduct =async (id: number,data :Product)=>{
const response= await api.put(`/products/${id}`,data);
return response.data;
}
export const deleteProducts =async (id: number,)=>{
const response= await api.delete(`/products/${id}`);
return response.data;
}
