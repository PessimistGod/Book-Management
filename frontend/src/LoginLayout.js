import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Components/Header';

const LoginLayout = () => {
  return (
    <div>
        <Header />
      <Outlet />

    </div>
  );
};

export default LoginLayout;
