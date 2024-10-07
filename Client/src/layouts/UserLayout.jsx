import React from 'react'
import { Outlet } from 'react-router-dom'
import UserFooter from '../components/user/UserFooter'
import UserHeader from '../components/user/UserHeader'

const UserLayout = () => {
  return (
    <div >
      <UserHeader/>
      <Outlet/>
      <UserFooter/>
    </div>
  )
}

export default UserLayout
