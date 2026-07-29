import api from "../api/axios";

const dashbord =async (data :unknown)=>{
const response= await api.post("/admin/dashbord",data);
return response.data;
}
export default dashbord;