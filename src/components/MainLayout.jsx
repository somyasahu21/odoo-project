
import React from 'react';
import Nav from './Navbar.jsx';

const MainLayout = ({ children }) => {
  return (
    <>
      <Nav />
      
      <main className="pt-[130px] px-4">{children}</main>
    </>
  );
};

export default MainLayout;
