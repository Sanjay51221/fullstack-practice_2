import React from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"

const DashboardLayout = ()=>{
  const navigate = useNavigate()

  const handleLogout = ()=>{
    navigate("/login")
  }

  return (
    <div className="flex h-screen">
      {/* leftside */}
      <div className="w-64 bg-green-700 text-white p-5">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>

        <nav className="flex flex-col font-bold text-lg gap-4">
          <NavLink className="hover:text-blue-400 hover:underline" to="/dashboardHome" end>Home</NavLink>

          <NavLink className="hover:text-blue-400 hover:underline" to="/dashboardHome/update">Update</NavLink>

          <button onClick={handleLogout} className="bg-white text-blue-600 py-2 rounded-lg hover:bg-slate-300 hover:boder-2 mt-6" >Logout</button>
        </nav>
      </div>

{/* right side */}
      <div className="flex-1 flex items-center justify-center bg-green-300 p-6">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
