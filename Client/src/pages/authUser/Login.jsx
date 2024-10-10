import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../../zustand/auth-store'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const navigate = useNavigate()
  const actionLogin = useAuthStore(state => state.actionLogin)


  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const hdlOnChange = (e) => {
    setForm({
      ...form, [e.target.name]: e.target.value
    })
  }
  const hdlSubmit = async (e) => {
    e.preventDefault()
    const role = await actionLogin(form)
    if (role) {
      roleRedirect(role)
    }
  }
  const roleRedirect = (role) => {
    console.log(role)
    if (role == 'ADMIN') {
      //redirect
      navigate("/admin")
    } else {
      //redirect
      navigate("/")
    }
  }

  return (
    <div className='h-[calc(100vh-218px)] w-screen'>
      <div className="flex flex-col items-center justify-center m-auto w-full gap-10" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
        <div className='m-auto'>
          <h1 className='text-5xl text-red-400'>Login</h1>
        </div>
        <form onSubmit={hdlSubmit} className='flex flex-col items-center w-full'>

          <div className='flex flex-col gap-6 w-full items-center'>
            <h3 className='text-2xl text-black'>Email ID</h3>
            <input placeholder='Email' name="email" value={form.email} onChange={hdlOnChange} type="text" className='input input-bordered rounded-full w-full max-w-xs bg-gray-500' />
          </div>

          <div className='flex flex-col gap-6 w-full items-center'>
            <h3 className='text-2xl text-black'>Password</h3>
            <input placeholder='Password' name="password" type="password" value={form.password} onChange={hdlOnChange} className='input input-bordered rounded-full w-full max-w-xs bg-gray-500' />
          </div>
          <div className='w-full text-center mt-8'>
          <button className='btn btn-square rounded-full w-1/6'>login</button>

          </div>


        </form>
        <div className='flex gap-20'>
          <h2 className='text-blue-400 hover:underline'><Link >Forgot Password?</Link></h2>
          <h2 className='text-blue-400 hover:underline'><Link to={"/Register"}>Sign Up</Link></h2>
        </div>
      </div>

    </div>
  )
}

export default Login
