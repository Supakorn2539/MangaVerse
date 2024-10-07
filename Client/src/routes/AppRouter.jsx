import React from 'react'

import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import UserLayout from '../layouts/UserLayout'
import Login from '../pages/authUser/Login'
import Register from '../pages/authUser/Register'
import Unauthorized from '../pages/authUser/Unauthorized'
import PagenotFound from '../pages/authUser/PagenotFound'
import Allmanga from '../pages/authUser/Allmanga'
import Home from '../pages/Home'

const router = createBrowserRouter([
  {
    path : "/",
    element : <UserLayout />,
    children : [
    {index : true , element : <Home/>},
    {path : "signup", element : <Register/>},
    {path : "login", element : <Login />},
    {path : "all", element : <Allmanga/>}, 
    {path : "unauthorize", element : <Unauthorized/>},
    {path : "*", element : <PagenotFound/>}
    ]
  }
])

const AppRouter = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default AppRouter
