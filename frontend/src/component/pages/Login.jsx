import axios from "axios"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Login = ()=>{
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: "", password: "" })

  const handleChange = (e)=>{
    const {name, value} = e.target
    setForm({...form, [name]: value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    try {
      const res = await axios.post("http://localhost:9090/login", form)
      alert(res.data.message)
      localStorage.setItem("userId", res.data.userId)
      navigate("/dashboardHome")
    } catch (error) {
      alert(error.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-700 px-4">
      <div className="w-full max-w-md bg-green-800 border border-slate-700 rounded-2xl shadow-xl p-8">

        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input type="email" name="email" placeholder="Email address" value={form.email} onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-slate-500 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" required />

          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-slate-500 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" required />

          <div className="text-right">
            <Link to="/forgotPassword" className="text-sm text-blue-400 hover:underline" >
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold tracking-wide transition active:scale-[0.98]" >
            Login
          </button>

        </form>

        <p className="text-sm text-center text-slate-400 mt-6">
          Don&apos;t have an account?
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login
