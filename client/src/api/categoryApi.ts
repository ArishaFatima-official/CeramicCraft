import api from "../api/axios";

export const getCategory =async ()=>{
const response= await api.get('/categories/');
return response.data;
}

export const getCategorytById =async (id: number)=>{
const response= await api.get(`/categories/${id}`);
return response.data;
}
export const addCategory = async (name: string) => {
  const response = await api.post("/categories", {
    name,
  });
  return response.data;
};

export const updateCategory = async (
  id: number,
  name: string
) => {
  const response = await api.put(`/categories/${id}`, {
    name,
  });
  return response.data;
};
export const deleteCategory =async (id: number,)=>{
const response= await api.delete(`/categories/${id}`);
return response.data;
}
