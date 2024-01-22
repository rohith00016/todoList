import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  const login = (id, token) => {
    setUserId(id);
    setAuthToken(token);
  };

  const logout = () => {
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout, authToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
