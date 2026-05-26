import { createContext, useContext } from "react";

const AuthContext = createContext("");
export const AuthContextProvider = ({ children }) => {
  const login = async (data) => {};
  const register = async (data) => {};
  return <AuthContext value={{ login, register }}>{children}</AuthContext>;
};
export { AuthContext };

export const useAuth = () => useContext(AuthContext);
