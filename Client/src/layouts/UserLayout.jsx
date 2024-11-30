import React from 'react'
import { Outlet } from 'react-router-dom'
import UserFooter from '../components/user/UserFooter'
import UserHeader from '../components/user/UserHeader'

const UserLayout = () => {
  return (
    <div >
      <UserHeader/>
      <div className='my-24'>
      <Outlet/>
      </div>
      <UserFooter/>
    </div>
  )
}

export default UserLayout
