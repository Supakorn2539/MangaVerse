import React, { useState } from 'react';
import { AddPictureIcon } from '../../icons';
import { Link, useNavigate } from 'react-router-dom';
import useMangaStore from '../../zustand/manga-store';
import Swal from 'sweetalert2';

const AddManga = () => {
    const navigate = useNavigate()
    const  titlePost  = useMangaStore(state => state.titlePost); 
    const [mangaTitle, setMangaTitle] = useState({
        mangaName: "",
        description: "",
        views: "",
        userId: "",
        imageUrl: ""
    });
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");    
    const [loading, setLoading] = useState(false);

    const hdlClose = (e) => {
        e.stopPropagation();
        document.getElementById('input-file').value = '';
        setFile(null);
    };

    const hdlFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const hdlChange = (e) => {
        setMessage(e.target.value);
    };

    const hdlAddManga = async (e) => {
        e.preventDefault(); 
        try {
            setLoading(true);
            const body = new FormData();
            body.append('mangaName', mangaTitle.mangaName);
            body.append('description', message);
            body.append('views', mangaTitle.views);
            body.append('userId', mangaTitle.userId);
            if (file) {
                body.append('imageUrl', file); 
            }

           
            await titlePost(body, mangaTitle.userId); 
            setMessage(""); // Reset message after adding
            setFile(null); // Reset file input
            Swal.fire("Add Manga successful")
            navigate("/ManageManga")
        } catch (err) {
            console.error("Error adding manga:", err);
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='m-auto max-w-lg p-6 rounded-lg flex flex-col gap-4' style={{ backgroundColor: "rgba(255, 245, 245, 0.8)" }}>
            <div className='text-center'>
                <p className='text-pink-600 font-semibold text-xl'>หน้าปก</p>
            </div>
            <div className='flex flex-col gap-6'>
                <form className='flex flex-col' onSubmit={hdlAddManga}>
                    <div className='flex flex-col p-3 border border-pink-200 rounded-lg shadow-md'>
                        <div
                            className='bg-pink-50 hover:bg-pink-100 min-h-40 rounded-lg relative cursor-pointer transition-all duration-300'
                            onClick={() => document.getElementById('input-file').click()}
                            style={{ border: "2px dashed #f9c0c0" }}
                        >
                            <input type="file" className='opacity-0' id="input-file" onChange={hdlFileChange} />
                            {file && <img src={URL.createObjectURL(file)} className='h-100 block mx-auto rounded-md shadow-md' />}
                            <button
                                className='btn btn-sm btn-circle btn-outline border-pink-300 absolute top-1 right-1 opacity-50 hover:opacity-100 hover:bg-pink-100 transition-opacity'
                                onClick={hdlClose}
                            >
                                X
                            </button>
                            {!file && (
                                <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-300'>
                                    <AddPictureIcon className="w-10 opacity-70" />
                                </p>
                            )}
                        </div>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <p className='text-pink-600 font-semibold'>Title:</p>
                        <input
                            type="text"
                            value={mangaTitle?.mangaName}
                            onChange={(e) => setMangaTitle({ ...mangaTitle, mangaName: e.target.value })}
                            className="max-w-xs bg-transparent border-b-2 border-pink-400 focus:border-pink-600 transition-colors"
                        />
                    </div>

                    <div className='flex w-full gap-3'>
                        <p className='text-pink-600 font-semibold'>Description:</p>
                        <textarea
                            placeholder={"Story...."}
                            className="textarea textarea-bordered textarea-sm w-full border-pink-300 focus:border-pink-600 transition-colors shadow-sm"
                            value={message}
                            onChange={hdlChange}
                            rows={message.split("\n").length || 4}
                        />
                    </div>
                </form>
            </div>

            <div className='flex justify-center gap-4 mt-4'>
                <Link to={"/ManageManga"}  disabled={loading} className='btn bg-pink-100 text-pink-600 rounded-full shadow-md hover:bg-pink-200 transition-colors'>
                    Cancel
                </Link>
                <button disabled={loading} type="submit" onClick={hdlAddManga} className='btn bg-pink-400 text-white rounded-full shadow-md hover:bg-pink-500 transition-colors'>
                    Add Manga
                </button>
            </div>
            {loading && <span className="loading loading-dots loading-xs"></span>}
        </div>
    );
};

export default AddManga;
