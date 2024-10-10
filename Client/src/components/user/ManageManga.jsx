import React from 'react'
import useAuthStore from '../../zustand/auth-store'
import Avatar from '../Avatar'

const ManageManga = () => {
      
  return (
    <div className='m-auto  max-w-lg p-6  rounded-lg' style={{ backgroundColor: "rgba(255,255,255,0.3)" }}>
    <div className='m-auto flex justify-center items-baseline'>
      <Avatar  className="w-40 h-40 rounded-full"/>
      <button className='btn btn-primary'>Edit</button>
    </div>
  </div>
  )
}

export default ManageManga
