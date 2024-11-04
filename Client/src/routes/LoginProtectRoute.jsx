import React, { useEffect } from 'react';
import useAuthStore from '../zustand/auth-store';
import { Navigate } from 'react-router-dom';

const LoginProtectRoute = (props) => {
  const { element } = props;
  const token = localStorage.getItem('ACCESS_TOKEN');
  const currentUser = useAuthStore((state) => state.currentUser);

  if (token) {
    return <Navigate to="/" />;
  }

  return element;
};

export default LoginProtectRoute;