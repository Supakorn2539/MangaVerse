import React from 'react';
import '../../index.css';
import useMangaStore from '../../zustand/manga-store';
import { Link } from 'react-router-dom';

const ItemManga = (props) => {
  const { el } = props
  const token = localStorage.getItem('ACCESS_TOKEN');
  const deleteManga = useMangaStore((state) => state.deleteManga);

  const hdlDelete = async (e) => {
    try {
      if (!confirm("Delete this post?")) {
        return console.log("Cancel Delete Post");
      }
      await deleteManga(el.id, token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card card-side bg-pink-50 shadow-2xl rounded-lg transform hover:scale-105 transition-transform duration-300 ease-in-out w-full">
      <div className="p-2 w-1/3">
        <img
          src={el.imageUrl}
          className="rounded-lg border-4 border-pink-200 shadow-md w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl">{el.mangaName}</h3>
        <Link
          to={`/chapterManage/${el.id}`}
          className="btn bg-pink-400 text-white mt-2 rounded-full shadow-md hover:bg-pink-500 transition-colors"
        >
          Add Chapter
        </Link>
        <button
          className="btn bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
          onClick={hdlDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ItemManga;
