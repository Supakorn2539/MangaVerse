import React from 'react';
import SakuraImg from './assets/Bgimg.jpg'
import AppRouter from './routes/AppRouter';
const MangaWebsite = () => {
  return (
    <div className='h-fit' style={{ backgroundImage: `url(${SakuraImg})`, backgroundSize: "cover" }}>
      <div className="h-fit" style={{ backgroundColor: "rgba(255,255,255,0.3)" }} >
        <AppRouter />
      </div>
    </div>

  );
};

export default MangaWebsite;