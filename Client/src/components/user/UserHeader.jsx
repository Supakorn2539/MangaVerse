import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import IconWeb from '../../assets/IconWeb.png'
import Avatar from '../Avatar'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../zustand/auth-store'
import Search from './Search'
const UserHeader = () => {

    const actionLogout = useAuthStore(state => state.actionLogout)
    const navigate = useNavigate()
    const [isLogin, setIslogin] = useState(false)
    const user = useAuthStore(state => state.user)
    const token = localStorage.getItem('ACCESS_TOKEN');
    // console.log(user)

    useEffect(() => {
        if (token) {
            setIslogin(true)
        } else {
            setIslogin(false)
        }
    }, [token])

    const hdlLogout = () => {
        actionLogout()
        setIslogin(false)
        navigate("/")

    }
    return (
        <div className='bg-gradient-to-r from-pink-200 to-pink-300'>
            <div
                style={{
                    backgroundColor: "rgba(255,255,255,0.6)", // Softer, semi-transparent background
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className=" shadow-lg rounded-b-lg"
            >
                <header className="flex justify-around items-center mb-4">
                    {/* Logo and Title */}
                    <h1 className="text-4xl font-extrabold text-pink-600">
                        <Link className="flex items-center" to="/">
                            <img src={IconWeb} alt="iconweb" className="w-10 rounded-full shadow-md" />
                            <span className="ml-2">MangaVerse</span>
                        </Link>
                    </h1>

                    {/* Navigation Links */}
                    <Link to="/Allmanga" className="hover:underline p-4 text-2xl text-purple-700">
                        All manga
                    </Link>

                    {/* Search Box */}
                   <Search/>

                    {/* Login/Dropdown based on login status */}
                    {!isLogin ? (
                        <Link to="/login" className="bg-pink-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-pink-600">
                            Login
                        </Link>
                    ) : (
                        <div className="dropdown dropdown-end mt-2 z-10">
                            <div tabIndex={0} role="button" >
                                <Avatar className="w-11 h-11 rounded-full shadow-md" imgSrc={user?.profileImage} menu={true} />

                            </div>
                            <div>

                                <p>{user?.username}</p>
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-white rounded-lg shadow-lg w-52 p-2 mt-2">
                                <li>
                                    <Link to="/Profile">Profile</Link>
                                </li>
                                <li>
                                    <Link to="/MyFavorite">My favorite</Link>
                                </li>
                                <li>
                                    <Link to="/ManageManga">Manage Manga</Link>
                                </li>
                                {

                                user?.role === "ADMIN" && <li><Link to="/admin">UserManagement</Link></li>
                                }
                                <li onClick={hdlLogout}>
                                    <a>Logout</a>
                                </li>
                            </ul>
                        </div>
                    )}
                </header>
            </div>
        </div>

    )
}

export default UserHeader
