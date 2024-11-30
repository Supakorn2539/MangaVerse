import React, { useEffect, useState } from 'react';
import useMangaStore from '../zustand/manga-store';
import { useNavigate } from 'react-router-dom';

const AllManga = () => {
  const getAllManga = useMangaStore(state=>state.getAllManga)
  const mangas = useMangaStore(state=>state.mangas)
 
  const navigate = useNavigate()
  const hdlOnClick = (mangaId) =>{
    navigate(`/manga/${mangaId}`)
  }
  
  const fetchAllManga = async()=>{
    try {
      
      await getAllManga()
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    fetchAllManga()
   
  },[])
  // console.log(mangas)
  return (
    <div className="min-h-screen container mx-auto p-4 bg-pink-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-pink-600">All Manga</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mangas?.map(manga => (
          
          <div onClick={()=>hdlOnClick(manga.id)}
            key={manga.id}
            className=" bg-white rounded-lg shadow-md flex flex-col  border border-pink-300 transition-transform transform hover:scale-105"
          >
            <img
              src={manga?.imageUrl}
              alt={manga?.mangaName}
              className=" h-[300px]  object-cover "
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2 text-pink-500">{manga?.mangaName}</h2>
            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllManga;
