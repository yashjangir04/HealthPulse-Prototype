// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { getMe , logout } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const Login = (userData) => setUser(userData);

  const logout = () => {
    logout() ;
    setUser(null) ;
  };

  useEffect(() => {
    const fetchUser = async () => {
      const me = await getMe(); 
      
      if (me) {
        setUser(me);
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, Login, logout, isLoggedIn: !!user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);