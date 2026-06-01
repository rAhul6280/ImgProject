import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  fetchUserData,
  login,
  logout,
  register,
} from "../services/auth.api.js";
import { useNavigate } from "react-router-dom";
import authEvents from "../api/authEvents.js";

const AuthContext = createContext("");

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getUserData = useCallback(async () => {
    try {
      setLoading(true);
      // Add 5 second timeout to prevent infinite loops
     
      const data = await fetchUserData();
      setUser(data);
    } catch(err){
      console.log("Failed to fetch user:", err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  },[])

  const handleRegister = async (form) => {
    try {
      setLoading(true);
      const data = await register(form);
      if (data) {
        setUser(data);
      }
    } catch (error) {
      setUser(null);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (form) => {
    try {
      setLoading(true);
      const data = await login(form);
    
        setUser(data);
      
    } catch (error) {
      
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const isLoggedOut = await logout();
      if (isLoggedOut) setUser(null);
      navigate("/login");  
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
     // Try to fetch user data on mount, but don't let it block the page
     // The timeout in axios interceptor will prevent infinite loops
      
      
     
       getUserData();
     // Small delay to ensure context is ready
     
    
  }, []);

  useEffect(() => {
    // Listen for global logout events (e.g., from token refresh failures)
    authEvents.logout = () => {
      setUser(null);
      navigate('/login');
    };
  }, []);


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        getUserData,
        handleLogin,
        handleLogout,
        handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext };
