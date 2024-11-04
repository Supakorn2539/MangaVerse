import React from 'react';
import useAuthStore from '../zustand/auth-store';
import { Navigate } from 'react-router-dom';

export default function CheckAuthRoute(props) {
  const { element } = props;
  const token = localStorage.getItem('ACCESS_TOKEN');
  const user = useAuthStore((state) => state.user);
//   console.log(user,"saasdjkasjdkasjkdjalksdjlkasjdk")

  if (!token) {
    return <Navigate to="/" />;
  }

  return element;
}