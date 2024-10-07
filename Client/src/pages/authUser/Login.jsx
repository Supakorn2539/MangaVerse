import React from 'react'
import { Link } from 'react-router-dom'
const Login = () => {
  // const [form, setForm] = useState({
  //     email : "",
  //     password : "",
  // })
  // const hdlOnChange = (e) => {
  //     setForm({
  //         ...form, [e.target.name] : e.target.value
  //     })
  // }
  // const hdlSubmit = async (e) =>{
  //     e.preventDefault()
  //     const role = await actionLogin(form)
  //     if(role){
  //         roleRedirect(role)
  //     }
  // }
  return (
    <div className='h-[calc(100vh-218px)] w-screen'>
      <div className="flex flex-col items-center justify-center m-auto w-full gap-10" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
        <div className='m-auto'>
          <h1 className='text-5xl text-red-400'>Login</h1>
        </div>
        <div className='flex flex-col items-center w-full'>
          <div className='flex flex-col gap-6 w-full items-center'>
            <h3 className='text-2xl text-black'>Email ID</h3>
            <input placeholder='Email' type="text" className='input input-bordered rounded-full w-full max-w-xs bg-gray-500' />
          </div>
        </div>
        <div className='flex flex-col gap-6 w-full items-center'>
          <h3 className='text-2xl text-black'>Password</h3>
          <input placeholder='Password' type="text" className='input input-bordered rounded-full w-full max-w-xs bg-gray-500' />
        </div>
        <div className='flex gap-20'>
          <h2 className='text-blue-400 hover:underline'><Link>Forgot Password?</Link></h2>
          <h2 className='text-blue-400 hover:underline'><Link>Sign Up</Link></h2>
        </div>
      </div>

    </div>
  )
}

export default Login
