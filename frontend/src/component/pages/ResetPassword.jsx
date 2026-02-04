import React, { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from "axios"

const ResetPassword = () => {
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        await axios.post("http://localhost:9090/reset-password",{email,otp,newPassword})
        alert("Password reset successful! Please login with your new password.")
        navigate("/login")
    } catch (err) {
        setError(err.response?.data?.message || "Reset failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-700 px-4">
      <div className="w-full max-w-md bg-green-800 border border-slate-700 rounded-2xl shadow-xl p-8">

        <h2 className="text-3xl font-bold text-center text-white mb-4">
            Reset Password
        </h2>

        <p className="text-sm text-center text-slate-400 mb-6">
            Enter OTP sent to your email and your new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required
            className="w-full px-4 py-3 rounded-lg bg-slate-500 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required
            className="w-full px-4 py-3 rounded-lg bg-slate-500 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button type="submit" className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition active:scale-[0.98]">
            Reset Password
          </button>

        </form>

        {error && <p className="text-red-400 text-center mt-4">{error}</p>}

        <p className="text-sm text-center text-slate-400 mt-6">
          Back to
          <Link to="/login" className="text-blue-400 hover:underline ml-1">
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}

export default ResetPassword
