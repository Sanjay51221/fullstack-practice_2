import React, { useState } from "react"
import { Link } from "react-router-dom"

const ForgotPassword = ()=>{
  const [email, setEmail] = useState("")

  const handleSubmit =(e)=>{
    e.preventDefault()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-700 px-4">
      <div className="w-full max-w-md bg-green-800 border border-slate-700 rounded-2xl shadow-xl p-8">

        <h2 className="text-3xl font-bold text-center text-white mb-4">
          Forgot Password
        </h2>

        <p className="text-sm text-center text-slate-400 mb-6">
          Enter your registered email and we'll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input type="email" placeholder="Email address" value={email} onChange={(e)=> setEmail(e.target.value)} required
          className="w-full px-4 py-3 rounded-lg bg-slate-500 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

          <button type="submit" className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition active:scale-[0.98]">
            Send OTP
          </button>

        </form>

        <p className="text-sm text-center text-slate-400 mt-6">
            Remember your password?
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
        </p>

      </div>
    </div>
  )
}

export default ForgotPassword
