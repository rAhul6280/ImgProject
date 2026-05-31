import api from "../api/axios.js";
import { toast } from "react-toastify";



export const register = async (formData) => {
  try {
    const resp = await api.post("/user/register", formData);
    const { success, message, data } = resp.data;
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
    return data;
  } catch (error) {
    toast.error(error.message || "Error in registering user");
    return null;
  }
};

export const login = async (formData) => {
  try {
    const resp = await api.post("/user/login", formData);
    const { success, message, data } = resp.data;
    if (success) {
      toast.success(message);
    } else toast.error(message);
    return data;
  } catch (err) {
    toast.error(err.message||"Login failed");
    return null;
  }
};

export const logout = async()=>{
    try {
        const resp=await api.post('/user/logout');
        const {success,message}=resp.data;
        if(success){
          toast.success(message);
          return true;
        }else{
          toast.error(message);
          return false;
        }
    } catch (error) {
        toast.error(error.message||"Logout failed")
        return false;
    }
}

export const fetchUserData=async()=>{
  try {
    const resp=await api.get('/user/get-user');
    const {data}=resp.data;
    // console.log(data);
    
    return data? data : null;
  } catch (error) {
    // console.error("Error fetching user data:", error);
    return null;
  }
}
