import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuthStore from '../../zustand/auth-store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const resetPassword = useAuthStore((state) => state.resetPassword);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const hdlReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }

    try {
      const body = { password, token };
      console.log(body);
      await resetPassword(body);
      toast.success("Password reset successfully! You will be redirected to the login page.");
      navigate('/login');
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message;
      toast.error(errMsg);
    }
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        background: 'linear-gradient(to bottom right, #fff, #f8e4e4)',
        border: '1px solid #e1a1a1',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
      className='h-[calc(100vh-218px)] flex flex-col items-center'
    >
      <h2
        style={{
          color: '#d05f5f',
          marginBottom: '20px',
          fontSize: '1.5rem',
        }}
      >
        Reset Your Password
      </h2>
      <p
        style={{
          fontSize: '0.9rem',
          color: '#6d6d6d',
          marginBottom: '20px',
        }}
      >
        Please enter a new password to regain access to your account. Make sure both fields match.
      </p>
      <form onSubmit={hdlReset}>
        <input type="hidden" name="token" value={token} />

        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label
            htmlFor="newPassword"
            style={{
              display: 'block',
              marginBottom: '5px',
              color: '#b52b2b',
              fontWeight: 'bold',
            }}
          >
            New Password:
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #d1a0a0',
              borderRadius: '5px',
              transition: 'border 0.3s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#d05f5f')}
            onBlur={(e) => (e.target.style.borderColor = '')}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label
            htmlFor="confirmPassword"
            style={{
              display: 'block',
              marginBottom: '5px',
              color: '#b52b2b',
              fontWeight: 'bold',
            }}
          >
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #d1a0a0',
              borderRadius: '5px',
              transition: 'border 0.3s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#d05f5f')}
            onBlur={(e) => (e.target.style.borderColor = '')}
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>

        <button
          style={{
            backgroundColor: '#d05f5f',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            marginTop: '10px',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#c24e4e')} // Darker pink on hover
          onMouseOut={(e) => (e.target.style.backgroundColor = '#d05f5f')} // Revert to original color
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
