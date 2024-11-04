import React, { useState } from 'react';
import { validateRegister } from '../../utils/validator';  // <-- use named import
import useAuthStore from '../../zustand/auth-store';
import { useNavigate } from 'react-router-dom';
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: ""
};

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialState);
  const actionRegister = useAuthStore((state) => state.actionRegister);
  const [formErrors, setFormErrors] = useState({});

  const hdlChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const hdlSubmit = (e) => {
    e.preventDefault();
    const error = validateRegister(form);
    if (error) {
      return setFormErrors(error);
    } else {
      setFormErrors({});
    }
    actionRegister(form);
    setForm(initialState);
    navigate("/login")
  };

  return (
    <div className="m-auto max-w-lg p-8 rounded-lg shadow-lg" style={{ backgroundColor: "rgba(255, 245, 245, 0.9)" }}>
      <div className="m-auto">
        <div className="flex flex-col items-center">
          <p className="text-3xl font-extrabold text-pink-600 mb-6 tracking-wide">Create Your Account</p>
          <form onSubmit={hdlSubmit} className="flex flex-col space-y-6 w-full">
            {/* Username input */}
            <input
              type="text"
              value={form.username}
              name="username"
              onChange={hdlChange}
              placeholder="Username"
              className={`p-3 rounded-md w-full border ${formErrors.username ? 'border-red-500' : 'border-pink-300'} shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500`}
            />
            {formErrors?.username && (
              <span className="text-red-500 text-xs">{formErrors.username}</span>
            )}
            
            {/* First name input */}
            <input
              type="text"
              value={form.firstName}
              name="firstName"
              onChange={hdlChange}
              placeholder="First Name"
              className={`p-3 rounded-md w-full border ${formErrors.firstName ? 'border-red-500' : 'border-pink-300'} shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500`}
            />
            {formErrors?.firstName && (
              <span className="text-red-500 text-xs">{formErrors.firstName}</span>
            )}

            {/* Last name input */}
            <input
              type="text"
              value={form.lastName}
              name="lastName"
              onChange={hdlChange}
              placeholder="Last Name"
              className={`p-3 rounded-md w-full border ${formErrors.lastName ? 'border-red-500' : 'border-pink-300'} shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500`}
            />
            {formErrors?.lastName && (
              <span className="text-red-500 text-xs">{formErrors.lastName}</span>
            )}
            
            {/* Email input */}
            <input
              type="email"
              value={form.email}
              name="email"
              onChange={hdlChange}
              placeholder="Email"
              className={`p-3 rounded-md w-full border ${formErrors.email ? 'border-red-500' : 'border-pink-300'} shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500`}
            />
            {formErrors?.email && (
              <span className="text-red-500 text-xs">{formErrors.email}</span>
            )}

            {/* Password input */}
            <input
              type="password"
              value={form.password}
              name="password"
              onChange={hdlChange}
              placeholder="Password"
              className={`p-3 rounded-md w-full border ${formErrors.password ? 'border-red-500' : 'border-pink-300'} shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500`}
            />
            {formErrors?.password && (
              <span className="text-red-500 text-xs">{formErrors.password}</span>
            )}

            {/* Confirm Password input */}
            <input
              type="password"
              value={form.confirmPassword}
              name="confirmPassword"
              onChange={hdlChange}
              placeholder="Confirm Password"
              className={`p-3 rounded-md w-full border ${formErrors.confirmPassword ? 'border-red-500' : 'border-pink-300'} shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500`}
            />
            {formErrors?.confirmPassword && (
              <span className="text-red-500 text-xs">{formErrors.confirmPassword}</span>
            )}

            {/* Submit Button */}
            <button className="bg-gradient-to-r from-pink-400 to-pink-600 text-white font-bold py-3 rounded-md hover:from-pink-500 hover:to-pink-700 hover:shadow-lg transition-all duration-300">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
