import React, { useEffect } from 'react';
import useAuthStore from '../zustand/auth-store';

const ProtectRoute = (props) => {
  const { element } = props;
  const token = localStorage.getItem('ACCESS_TOKEN');
  const currentUser = useAuthStore((state) => state.currentUser);
  
  useEffect(() => {
    if (token) {
      fetchDataUser();
    }
  }, [currentUser]);

  const fetchDataUser = () => {
    try {
       currentUser();
      
    } catch (err) {
      console.log(err);
    }
  };
  return element;
};

export default ProtectRoute;
