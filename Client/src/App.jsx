import React from 'react';
import SakuraImg from './assets/Bgimg.jpg'
import AppRouter from './routes/AppRouter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MantineProvider } from '@mantine/core';
const MangaWebsite = () => {
  return (
    <div className='h-fit' style={{ backgroundImage: `url(${SakuraImg})`, backgroundSize: "cover" }}>
      <div className="h-fit" style={{ backgroundColor: "rgba(255,255,255,0.3)" }} >
      
      <ToastContainer/>
      <MantineProvider>
        <AppRouter />
      </MantineProvider>
      </div>
    </div>

  );
};

export default MangaWebsite;