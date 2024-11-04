import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import useMangaStore from '../../zustand/manga-store';

const Search = () => {
    const navigate = useNavigate(); 
    const searchManga = useMangaStore(state => state.searchManga);
    const [text, setText] = useState("");

   
    const handleSubmit = async(e) => {
        e.preventDefault(); 
        await searchManga(text.toLowerCase()); 
        navigate('/search'); 
        setText("")
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search..."
                className="input input-bordered input-secondary w-full max-w-xs rounded-full border-pink-300 shadow-md focus:ring-2 focus:ring-pink-500"
                onChange={(e) => setText(e.target.value)}
                value={text} 
            />
        </form>
    );
}

export default Search;
