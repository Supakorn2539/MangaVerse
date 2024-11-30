import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import Login from '../pages/authUser/Login'
import Register from '../pages/authUser/Register';
import Unauthorized from '../pages/authUser/Unauthorized';
import PageNotFound from '../pages/authUser/PagenotFound';
import AllManga from '../components/AllManga'
import Home from '../pages/Home';
import Profile from '../pages/authUser/Profile';

import ManageManga from '../pages/authUser/ManageManga'
import ProtectRoute from './ProtectRoute';
import LoginProtectRoute from './LoginProtectRoute';
import CheckAuthRoute from './CheckAuthRoute';
import AddManga from '../pages/authUser/AddManga';
import ChapterManage from '../components/user/ChapterManage';
import GetResetLink from '../pages/authUser/GetResetLink';
import ResetPassword from '../pages/authUser/ResetPassword';
import ChapterItem from '../components/user/Modal';
import Manga from '../components/user/Manga';
import ChapterSelect from '../components/user/ChapterSelect';
import SearchPage from '../components/user/SearchPage';

import ManageUser from '../components/admin/ManageUser';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectRoute element={<UserLayout />} />,
    children: [
      { index: true, element: <Home /> },
      { path: 'Register', element: <Register /> },
      { path: 'login', element: <LoginProtectRoute element={<Login/>} /> },
      {
        path: 'GetResetLink', element: <GetResetLink/>
      },{
        path: 'ResetPassword/:token',element:<ResetPassword/>
      },

      { path: 'AllManga', element: <AllManga/> },
      { path: 'Profile', element : <CheckAuthRoute element={<Profile />} />

      },
     
      {
        path: 'ManageManga',
        element: <CheckAuthRoute element={<ManageManga />} />
      },
      {
        path : 'addManga',
        element : <CheckAuthRoute element={<AddManga/>}/>
      },{
        path : 'chapterManage/:mangaId',
        element : <CheckAuthRoute element={<ChapterManage/>}/>
      },
      {
        path: 'unauthorize',
        element: <CheckAuthRoute element={<Unauthorized />} />
      },{
        path : "manga/:mangaId/Chapter/:chapterNo",
        element : <Manga/>
      },
      {
        path : "manga/:mangaId",
        element : <ChapterSelect/>
      },{
        path : "/search", element : <SearchPage/>
      },
      {
        path : "admin", element : <ManageUser/>
      },
      { path: '*', element: <PageNotFound /> }
    ]
  }
]);

const AppRouter = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default AppRouter;