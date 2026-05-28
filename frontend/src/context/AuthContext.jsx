import { createContext, useContext, useEffect, useState } from "react";
import { fetchUserData } from "../services/auth.api.js";
const AuthContext = createContext("");
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const getUserData= async()=>{
        setLoading(true)
        const data= await fetchUserData();
        // console.log(data);
        
        setUser(data);
        
        
        setLoading(false)
    }

    useEffect(()=>{
        getUserData();
    },[])

  return (
    <AuthContext value={{ user, setUser, loading, setLoading, getUserData }}>
      {children}
    </AuthContext>
  );
};
export { AuthContext };


