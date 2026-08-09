import api from "../api/axios";
import { AdminDashboard } from "../types/admin";

export const getAdminDashboard = async () => {
  const response = await api.get<{ 
    success: boolean;
    data: AdminDashboard;
  }>("/admin/dashboard");

  return response.data;
};

// import api from "./axios";
// import type { AdminDashboard } from "../types/admin";

// export const getAdminDashboard = async () => {
//   const response = await api.get<{ 
//     success: boolean;
//     data: AdminDashboard;
//   }>("/admin/dashboard");

//   return response.data;
// };