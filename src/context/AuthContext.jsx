// src/context/AuthContext.jsx
import React, { createContext } from 'react';

export const AuthDataContext = createContext();

function AuthProvider({ children }) {
  const serverUrl = "http://localhost:8000";

  const value = {
    serverUrl,
  };

  return (
    <AuthDataContext.Provider value={value}>
      {children}
    </AuthDataContext.Provider>
  );
}

export default AuthProvider;
