import React, { useState } from 'react'
import validateRegister from '../../utils/validator'
import useAuthStore from '../../zustand/auth-store'
const initialState = {
  firstName: "",
    lastName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: ""
}

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  })
  const name = useAuthStore(state => state.user)
  const actionRegister = useAuthStore(state => state.actionRegister)
  const [formErrors, setFormErrors] = useState({})
  
  const hdlChange = (e) => {
    setForm({
      ...form, [e.target.name]: e.target.value
    })
  }
  const hdlSubmit = (e) => {
    // Validate with Joi
    e.preventDefault()
    const error = validateRegister(form)
    setForm(error)
    if (error) {
      return setFormErrors(error)
    } else {
      setFormErrors([])
    }
    actionRegister(form)
    setForm(initialState)
    setFormErrors({})

  }
  return (

    
    <div className=" m-auto  max-w-lg p-6  rounded-lg " style={{ backgroundColor: "rgba(255,255,255,0.3)" }}>
      <div className="m-auto ">
        <div className="flex flex-col items-center">
          <p className="text-3xl font-extrabold text-gray-800 mb-6 tracking-wide">Create Your Account</p>
          {/* Form */}
          <form onSubmit={hdlSubmit} className="flex flex-col space-y-6 w-full">
            <input
              type="text"
              value={form.email}
              name="email"
              onChange={hdlChange}
              placeholder="Email"
              className="p-3 rounded-md w-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={form.username}
              name="username"
              onChange={hdlChange}
              placeholder="Username"
              className="p-3 rounded-md w-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={form.firstName}
              name="firstName"
              onChange={hdlChange}
              placeholder="First Name"
              className="p-3 rounded-md w-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={form.lastName}
              name="lastName"
              onChange={hdlChange}
              placeholder="Last Name"
              className="p-3 rounded-md w-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formErrors?.email && (
              <span className="text-red-500 text-xs">{formErrors.email}</span>
            )}
            <input
              type="password"
              value={form.password}
              name="password"
              onChange={hdlChange}
              placeholder="Password"
              className="p-3 rounded-md w-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formErrors?.password && (
              <span className="text-red-500 text-xs">{formErrors.password}</span>
            )}
            <input
              type="password"
              value={form.confirmPassword}
              name="confirmPassword"
              onChange={hdlChange}
              placeholder="Confirm Password"
              className="p-3 rounded-md w-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formErrors?.confirmPassword && (
              <span className="text-red-500 text-xs">{formErrors.confirmPassword}</span>
            )}
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 rounded-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg transition-all duration-300"
            >
              Register
            </button>
          </form>
          {/* Form End */}
        </div>
      </div>
    </div>



  )
}

export default Register 
