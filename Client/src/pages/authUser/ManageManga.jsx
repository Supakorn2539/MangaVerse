import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMangaStore from '../../zustand/manga-store';
import Avatar from '../../components/Avatar';
import ListManga from '../../components/user/ListManga';
import useAuthStore from '../../zustand/auth-store';

const ManageManga = () => {
  const user = useAuthStore(state=>state.user)
  const getMyManga = useMangaStore(state=>state.getMyManga)

  useEffect(()=>{
    getMyManga()
  },[])
  return (
    <div className="m-auto max-w-lg p-6 rounded-lg flex flex-col gap-4" style={{ backgroundColor: "rgba(255, 245, 245, 0.8)", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
      <div className="m-auto w-40 h-40 flex justify-center items-baseline gap-4">
        <Avatar className="w-full h-full  rounded-full shadow-lg" imgSrc={user?.profileImage}/>
      </div>

      <div className="flex flex-col justify-center items-center mt-4">
        <p className="underline text-2xl text-pink-600 font-semibold">MyManga</p>
        <ListManga />
      </div>


      <Link to="/addManga" className="btn bg-pink-400 text-white mt-6 rounded-full shadow-md hover:bg-pink-500 transition-colors">
        Add Manga
      </Link>
    </div>
  );
};

export default ManageManga;
