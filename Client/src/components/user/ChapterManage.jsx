import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import axios from '../../config/axios';
import convertDate from '../../utils/convertDate';
import useAuthStore from '../../zustand/auth-store';
import Swal from 'sweetalert2';

const ChapterManage = ({isViewOnly}) => {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const { mangaId,chapterNo } = useParams();
  const [showModal, setShowModal] = useState({
    action: "",
    isShow: false,
    id: null
  });

  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const res = await axios.get(`/manga/myManga/${mangaId}/Chapter`);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const hdlOnClick = (mangaId,chapterNo) => {
    navigate(`/manga/${mangaId}/Chapter/${chapterNo}`)
  }
  const hdlDelete = async (id) => {
    try {
      if (confirm("Delete Chapter")) {
        await axios.delete(`/manga/myManga/${mangaId}/Chapter/${id}`);
        fetchData(); 
      }
    } catch (err) {
      console.log(err);
    }
  };

  const incrementViews = async (mangaId) => {
    try {
      await axios.patch(`/manga/${mangaId}/increment-views`);  
    } catch (error) {
      console.log('Failed to increment views', error);
    }
  };

  useEffect(() => {
    fetchData();
    incrementViews(mangaId)
  }, [mangaId]);

  useEffect(() => {
    if (!isViewOnly && data.manga && user?.id && user.id !== data.manga.userId) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You are not Authorized in this page",
      })
      navigate("/");
    }
  }, [data, user, navigate]);

// h-[calc(100vh-218px)]
  return (
    <div >
      <main className="w-full mx-auto p-4 flex flex-col text-center ">
        <div className="bg-white rounded-lg shadow-lg  mx-auto aspect-auto w-4/12 flex flex-col">
          <div className='w-full h-1/2'>
          <img src={data?.manga?.imageUrl} alt={data?.manga?.mangaName} className="w-full " />
          </div>
        </div>
          <div className="p-4 w-4/12 h-1/2 mx-auto" style={{backgroundColor : "rgba(255,255,255,0.3)"}}>
            <h2 className="text-xl font-bold mb-2">{data?.manga?.mangaName}</h2>
            <p className="text-sm text-gray-600">{data?.manga?.description}</p>
          </div>
      </main>

      <div className="container mx-auto p-4 max-w-md bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Chapter Title</h2>
        {data?.manga?.chapters?.sort((a, b) => (a.chapterNo - b.chapterNo)).map((el) => ( 
          
          <div key={el.id} className="text-gray-700 mb-4 flex gap-4 cursor-pointer " >
            <button onClick={()=>hdlOnClick(el.mangaId,el.chapterNo)} className='gap-3 flex btn btn-primary'>
            <span>Chapter:{el.chapterNo}</span>
            <span>{convertDate(el.updatedAt)}</span>
            </button>
            {!isViewOnly && (
              <div className="flex gap-3 items-baseline">
              <button  className="btn btn-primary bg-blue-500" onClick={() => setShowModal(prv => ({ ...prv, isShow: !prv.isShow, action: "EDIT", id: el.chapterNo, description: el.description, chapterTitle: el.chapterTitle }))}>
              Edit
            </button>
            <button  className="btn btn-primary bg-red-500"onClick={() => hdlDelete(el.id)}>Delete</button>
              </div>
          )}
          </div>
        ))}
      {!isViewOnly &&

        <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={() => setShowModal(prv => ({ ...prv, isShow: !prv.isShow, action: "ADD", id: +mangaId }))}
        >
          Add Chapter
        </button>
        }
      </div>

      {!isViewOnly && showModal.isShow &&
        <Modal fn={fetchData} showModal={showModal} setShowModal={setShowModal} id={showModal.id} idParams={mangaId} />
      }
    </div>
  );
};

export default ChapterManage;
