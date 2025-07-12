import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css'; 
import App from './App.jsx';


import AuthProvider from './context/AuthContext.jsx';
import UserContextProvider from './context/UserContext.jsx';
import ShopContext from './context/ShopContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserContextProvider>
          <ShopContext>
            <App />
          </ShopContext>
        </UserContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
