import React from 'react'
import { Link } from 'react-router-dom'
import IconWeb from '../../assets/IconWeb.png'
const UserHeader = () => {
    return (
        <div className='bg-pink-400'>
            <div style={{
                backgroundColor: "rgba(255,255,255,0.3)"
            }}>
                <header className="flex justify-around items-center mb-4 ">
                    <h1 className="text-3xl font-bold text-purple-600"><Link className='flex' to={"/"}><img src={IconWeb} alt="iconweb" className='w-10' />MangaVerse</Link></h1>
                    <Link to={"/Allmanga"} className='hover:underline p-4 text-2xl text-red-600'>All manga</Link>
                    <input type="text" placeholder='search...' className="input input-bordered input-secondary w-full max-w-xs" />
                    <Link to={"/login"} className="bg-pink-500 text-white px-4 py-2 rounded-full">Login</Link>
                </header>
            </div>

        </div>
    )
}

export default UserHeader
