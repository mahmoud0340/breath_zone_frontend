import React, { createContext, useEffect, useState, useContext } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  const login = async () => {
    setUser({ name: 'John' });
  };

  const logout = () => setUser(null);

  useEffect(() => {
    const checkLogin = async () => {
      // simulate auth check
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
