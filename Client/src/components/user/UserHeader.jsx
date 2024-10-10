import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import IconWeb from '../../assets/IconWeb.png'
import Avatar from '../Avatar'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../zustand/auth-store'
const UserHeader = () => {
    const actionLogout = useAuthStore(state => state.actionLogout)
    const navigate = useNavigate()
    const [isLogin, setIslogin] = useState(false)
    const token = useAuthStore(state => state.token)
   
    useEffect(()=> {
        if(token){
            setIslogin(true)
        }else {
            setIslogin(false)
        }
    },[token])

    const hdlLogout = () => {
        actionLogout()
        setIslogin(false)
        navigate("/")
        
    }
    return (
        <div className='bg-pink-400'>
            <div style={{
                backgroundColor: "rgba(255,255,255,0.3)"
            }}>
                <header className="flex justify-around items-center mb-4 ">
                    <h1 className="text-3xl font-bold text-purple-600"><Link className='flex' to={"/"}><img src={IconWeb} alt="iconweb" className='w-10' />MangaVerse</Link></h1>
                    <Link to={"/Allmanga"} className='hover:underline p-4 text-2xl text-red-600'>All manga</Link>
                    <input type="text" placeholder='search...' className="input input-bordered input-secondary w-full max-w-xs" />


                    {!isLogin ?

                        (<Link to={"/login"} className="bg-pink-500 text-white px-4 py-2 rounded-full">Login</Link>) :

                        <div className="dropdown dropdown-end mt-2">
                            <div tabIndex={0} role="button" >
                                <Avatar
                                    className="w-11 h-11 rounded-full"
                                    
                                    menu={true}
                                />
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li ><Link to={"/Profile"}>Profile</Link></li>
                                <li ><Link to={"/My favorite"}>My favorite</Link></li>
                                <li ><Link to={"/ManageManga"}>Manage Manga</Link></li>
                                <li onClick={hdlLogout}><a>Logout</a></li>
                            </ul>
                        </div>}
                </header>
            </div>

        </div>
    )
}

export default UserHeader
