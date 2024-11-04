import React, { useState } from 'react';
import useAuthStore from '../../zustand/auth-store';


const GetResetLink = () => {
    const getLink = useAuthStore(state => state.getLink)
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const hdlSubmit = async (e) => {
        try {
            setLoading(true)
            const body = { email }
            e.preventDefault()
            await getLink(body)
            setEmail("")
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message
            console.log(errMsg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='h-[calc(100vh-218px)] flex items-center'>
            <form onSubmit={hdlSubmit} className='flex flex-col items-center mx-auto space-y-4'>
                <p className='text-lg font-semibold'>Forgot your password?</p>
                <p className='text-sm text-gray-600'>Enter your email address below, and we’ll send you a link to reset your password.</p>

                <div className="join w-full max-w-sm">
                    <input
                        className="input input-bordered join-item w-full"
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button className="btn join-item rounded-r-full bg-pink-500">Send Reset Link</button>
                </div>

                {loading && <span className="loading loading-dots loading-xs"></span>}
            </form>
        </div>

    );
}

export default GetResetLink;
