import React from 'react'

import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import UserLayout from '../layouts/UserLayout'
import Login from '../pages/authUser/Login'
import Register from '../pages/authUser/Register'
import Unauthorized from '../pages/authUser/Unauthorized'
import PagenotFound from '../pages/authUser/PagenotFound'
import Allmanga from '../pages/authUser/Allmanga'
import Home from '../pages/Home'
import Profile from '../components/user/Profile'
import MyFavorite from '../components/user/MyFavorite'
import ManageManga from '../components/user/ManageManga'
import ProtectRoute from './ProtectRoute'

const router = createBrowserRouter([
  {
    path : "/",
    element : <ProtectRoute element={<UserLayout/>}/> ,
    children : [
    {index : true , element : <Home/>},
    {path : "Register", element : <Register/>},
    {path : "login", element : <Login />},
    {path : "all", element : <Allmanga/>},
    {path : "Profile", element : <Profile/>}, 
    {path : "My Favorite", element : <MyFavorite/>}, 
    {path : "ManageManga", element : <ManageManga/>}, 
    {path : "unauthorize", element : <Unauthorized/>},
    {path : "*", element : <PagenotFound/>}
    ]
  },


])

const AppRouter = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default AppRouter
