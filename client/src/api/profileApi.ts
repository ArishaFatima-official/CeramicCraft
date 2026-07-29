import api from "./axios";
import {User,Userpassword } from "../types/user";
import {ApiResponse} from "../types/api";

export const getProfile = async ():Promise<ApiResponse<User>> => {
  const response = await api.get("/profile");
  return response.data;
};

export const updateProfile = async (data: User) => {
  const response = await api.put("/profile", data);
  return response.data;
};

export const changePassword = async (data: Userpassword) => {
  const response = await api.put("/profile/change-password", data);
  return response.data;
};