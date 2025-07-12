import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthDataContext } from './AuthContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export const userDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserdata] = useState(null);
  const { serverUrl } = useContext(AuthDataContext);
  const location = useLocation();

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/getcurrentuser`, {
        withCredentials: true,
      });
      setUserdata(result.data);
      console.log("Current user:", result.data);
    } catch (error) {
      setUserdata(null);
      console.error("Error fetching current user:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    // Avoid calling it on login or signup routes
    const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

    if (!isAuthPage) {
      getCurrentUser();
    }
  }, [location.pathname]);

  const value = {
    userData,
    setUserdata,
    getCurrentUser,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
