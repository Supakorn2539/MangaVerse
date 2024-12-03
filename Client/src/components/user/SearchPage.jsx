import React from 'react';
import useMangaStore from '../../zustand/manga-store';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
    const navigate = useNavigate();
    const mangas = useMangaStore(state => state.mangas);

    const hdlOnClick = (mangaId) => {
        navigate(`/manga/${mangaId}`);
    };

    return (
        <div className='min-h-screen' >
            <h1 className="text-2xl font-bold mb-4">Search Results</h1>
            {mangas.length > 0 ? (
                <div className="flex flex-wrap gap-4 justify-around">
                    {mangas.map((manga) => (
                        <div
                            onClick={() => hdlOnClick(manga.id)}
                            key={manga.id}
                            className="bg-white rounded-lg shadow-lg p-4 cursor-pointer w-full  sm:w-1/2 md:w-1/3 lg:w-1/4"
                        >
                            {manga.imageUrl && (
                                <img
                                    src={manga.imageUrl}
                                    className="w-full h-50   object-cover rounded"
                                />
                            )}
                            <h2 className="text-xl font-semibold mt-2 text-center">{manga.mangaName}</h2>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default SearchPage;
