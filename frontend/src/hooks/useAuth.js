import { useContext } from "react"
import { AuthContext } from "../context/AuthContext.jsx"
import { fetchUserData, login, logout, register } from "../services/auth.api.js";


const useAuth=()=>{
    const {user,setUser,loading,setLoading}=useContext(AuthContext);

    const handleRegister=async (form) => {
        setLoading(true);
        const data = await register(form);
        setUser(data);
        setLoading(false);
    }

    const handleLogin=async (form)=>{
        setLoading(true);
        const data=await login(form);
        setUser(data);
        setLoading(false)
    }

    const handleLogout=async()=>{
        setLoading(true)
        const isLoggedOut =await logout();
        if(isLoggedOut)setUser(null);
        setLoading(false);
    }

    
    return {user,setUser,loading,setLoading,handleRegister,handleLogin,handleLogout}
}

export default useAuth;