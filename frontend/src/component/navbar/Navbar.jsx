import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ()=>{
  const navigate = useNavigate()

  return (
    <nav className="h-[72px] bg-green-800 backdrop-blur border-b border-slate-700 text-white px-8 flex items-center justify-between">
      
      <div>
        <h1 className="text-2xl font-bold font-serif tracking-wide text-yellow-300">
          Dive-Into
        </h1>
      </div>

      <div>
        <ul className="flex items-center gap-10 text-sm md:text-base font-medium">
          <li>
            <Link to="/" className="text-slate-200 hover:text-blue-400 hover:underline underline-offset" >
              Home
            </Link>
          </li>

          <li className="text-slate-200 hover:text-blue-400 hover:underline underline-offset">
            About
          </li>

          <li className="text-slate-200 hover:text-blue-400 hover:underline underline-offset">
            Services
          </li>

          <li className="text-slate-200 hover:text-blue-400 hover:underline underline-offset">
            Contact
          </li>
        </ul>
      </div>

      <div>
        <button
          onClick={()=> navigate('/login')}
          className="bg-yellow-300 text-lg text-blue-800 font-bold hover:bg-yellow-600 active:scale-95 transition px-5 py-2 rounded-full shadow-md"
        >
          Login
        </button>
      </div>

    </nav>
  )
}

export default Navbar
