import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../../zustand/auth-store'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const Login = () => {
  const navigate = useNavigate()
  const actionLogin = useAuthStore(state => state.actionLogin)
  const user = useAuthStore(state => state.user)
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
    e.preventDefault();
    try {
      console.log('hdlSubmit')
      const user = await actionLogin(form);
      
      if (user?.role) {
        roleRedirect(user?.role);
        toast.success("Login successful");
      } 
    } catch (err) {
      if(err.status === 403){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your account has been banned. Please contact support.',
        });
      }else {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid Email or Password.',
        });
      }
      // console.log(err);
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Oops...',
      //     text: 'Invalid Email or Password.',
      //   });
      
    }
  };

  const roleRedirect = (role) => {
    // console.log(role)
    console.log("REDIRECT FUNCTION")
    if (role == 'ADMIN') {
      //redirect
      
      navigate("/admin")
    } else {
      //redirect
      navigate("/")
    }
  }

  return (
    <div className='h-[calc(100vh-218px)] w-screen flex items-center justify-center'>
      <div className="flex flex-col items-center justify-center w-full gap-10 p-8 rounded-lg shadow-lg" style={{ backgroundColor: "rgba(255, 245, 245, 0.8)" }}>

        <div className='text-center'>
          <h1 className='text-5xl text-pink-600 font-bold'>Login</h1>
        </div>

        <form onSubmit={hdlSubmit} className='flex flex-col items-center w-full gap-6'>
          <div className='flex flex-col gap-2 w-full items-center'>
            <h3 className='text-2xl text-pink-600 font-semibold'>Email ID</h3>
            <input
              placeholder='Email'
              name="email"
              value={form.email}
              onChange={hdlOnChange}
              type="text"
              className='input input-bordered rounded-full w-full max-w-xs bg-white border-pink-300 focus:border-pink-600 focus:ring-pink-600 transition-colors shadow-sm'
            />
          </div>

          <div className='flex flex-col gap-2 w-full items-center'>
            <h3 className='text-2xl text-pink-600 font-semibold'>Password</h3>
            <input
              placeholder='Password'
              name="password"
              type="password"
              value={form.password}
              onChange={hdlOnChange}
              className='input input-bordered rounded-full w-full max-w-xs bg-white border-pink-300 focus:border-pink-600 focus:ring-pink-600 transition-colors shadow-sm'
            />
          </div>

          <div className='w-full text-center mt-8'>
            <button className='btn bg-pink-400 text-white rounded-full w-1/6 shadow-md hover:bg-pink-500 transition-colors'>
              Login
            </button>
          </div>
        </form>

        <div className='flex gap-10 mt-4'>
          <h2 className='text-blue-400 hover:underline transition-colors'>
            <Link to={'/GetResetLink'}>Forgot Password?</Link>
          </h2>
          <h2 className='text-blue-400 hover:underline transition-colors'>
            <Link to={"/Register"}>Sign Up</Link>
          </h2>
        </div>
      </div>
    </div>

  )
}

export default Login

