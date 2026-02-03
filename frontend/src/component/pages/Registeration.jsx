import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Registeration = ()=>{
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    age: "",
    gender: "",
    email: "",
    password: "",
    imageUrl: "",
    city: "",
  });

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setForm({...form,[name]: value});
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post("http://localhost:9090/register", form);
      alert(data?.message || "Registration successful!");
      navigate("/login");
    } catch (error) {
      alert("Something went wrong, try again later");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-700 px-4 py-10">
      <div className="w-full max-w-md bg-green-800 border border-slate-700 rounded-2xl shadow-xl p-10">
        <h2 className="text-3xl font-bold text-center text-white mb-10">
          Create An Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" name="username" placeholder="Full Name" value={form.username} onChange={handleChange} required 
          className="w-full px-4 py-3.5 rounded-lg bg-slate-500 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none" />

          <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} required
          className="w-full px-4 py-3.5 rounded-lg bg-slate-500 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none" />

          <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} required
          className="w-full px-4 py-3.5 rounded-lg bg-slate-500 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none" />

          <select name="gender" value={form.gender} onChange={handleChange} required className="w-full px-4 py-3.5 rounded-lg bg-slate-500 border border-slate-700 text-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input type="email" name="email" placeholder="Email address" value={form.email} onChange={handleChange} required
          className="w-full px-4 py-3.5 rounded-lg bg-slate-500 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none" />

          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required
          className="w-full px-4 py-3.5 rounded-lg bg-slate-500 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none" />

          <input type="text" name="imageUrl" placeholder="Profile Image URL" value={form.imageUrl} onChange={handleChange} required
          className="w-full px-4 py-3.5 rounded-lg bg-slate-500 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none" />

          <button type="submit" className="w-full py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition" >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-slate-400 mt-8">
          Already have an <Link to="/login" className="text-blue-400 hover:underline font-medium" >Account</Link>?
        </p>
      </div>
    </div>
  );
};

export default Registeration;
