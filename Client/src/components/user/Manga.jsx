
import axios from '../../config/axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const Manga = () => {
  const { mangaId, chapterNo } = useParams();
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(parseInt(chapterNo));
  const [totalChapters, setTotalChapter] = useState(0)
  const fetchManga = async () => {
    try {
      const res = await axios.get(`/manga/myManga/${mangaId}/Chapter/${currentChapter}/pages`);
      console.log(res,"totalchapter")
      setPages(res.data.chapter.pages);
      setTotalChapter(res.data.totalChapters)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
      console.log(err);
    }
  };

  useEffect(() => {
    fetchManga();
  }, [currentChapter]);

  const goToNextChapter = () => {
    if (currentChapter) {
      setCurrentChapter(prev => prev + 1);
      navigate(`/manga/${mangaId}/Chapter/${currentChapter + 1}`);

    }
  };

  const goToPreviousChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter(prev => prev - 1);
      navigate(`/manga/${mangaId}/Chapter/${currentChapter - 1}`);
    }
  };



  return (
    <div className="container mx-auto p-4 bg-pink-50 rounded-lg shadow-lg">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h1 className="text-3xl font-bold text-pink-600 mb-4 text-center">Manga Name</h1>
        <div className="flex justify-between mb-4">
          <button
            onClick={goToPreviousChapter}
            className={`px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition ${currentChapter === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentChapter === 1}
          >
            Previous
          </button>
          <button
            onClick={goToNextChapter}
            className={`px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition ${currentChapter === totalChapters ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentChapter === totalChapters}
          >
            Next
          </button>
        </div>
        <div className="flex flex-col items-center">
          {pages.map((page, index) => (
            <img key={index} src={page.imageUrl} alt={`Page ${index + 1}`} className="mb-2" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Manga;
