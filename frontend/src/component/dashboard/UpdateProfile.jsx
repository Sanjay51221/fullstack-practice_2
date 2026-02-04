import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const UpdateProfile = ()=>{
  const navigate = useNavigate()
  const userId = localStorage.getItem("userId")

  const [form, setForm] = useState({
    username: "",
    email: "",
    age: "",
    gender: "",
    city: "",
    imageUrl: ""
  })

  useEffect(()=>{
    if (!userId) {
      navigate("/login")
      return
    }

    const fetchUser = async ()=>{
      try {
        const {data} = await axios.get(`http://localhost:9090/user/${userId}`)

        setForm({
          username: data.username || "",
          email: data.email || "",
          age: data.age || "",
          gender: data.gender || "",
          city: data.city || "",
          imageUrl: data.imageUrl || ""
        })
      } catch (error) {
        console.log(error)
        alert("Failed to load user data")
      }
    }

    fetchUser()
  }, [userId, navigate])

  const handleChange = (e)=>{
    const {name, value} = e.target
    setForm({...form, [name]: value})
  }

  // update user
  const handleUpdate = async (e)=>{
    e.preventDefault()
    try {
      const {data} = await axios.put(`http://localhost:9090/update/${userId}`,form)

      alert(data.message)
      navigate("/dashboardHome")
    } catch (error) {
      console.log(error)
      alert("Update failed")
    }
  }

  // delete user
  const handleDelete = async ()=>{
    const confirmDelete = window.confirm("Are you sure you want to delete your account?")

    if (!confirmDelete) return

    try {
      const { data } = await axios.delete(`http://localhost:9090/delete/${userId}`)

      localStorage.removeItem("userId")
      alert(data.message)
      navigate("/register")
    } catch (error) {
      console.log(error)
      alert("Delete failed")
    }
  }

  return (
    <div className="max-w-xl bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Update Profile</h1>

      <form onSubmit={handleUpdate} className="space-y-4">

        <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="Username"
        className="w-full border px-3 py-2 rounded" />

        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email"
        className="w-full border px-3 py-2 rounded" />

        <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="Age"
        className="w-full border px-3 py-2 rounded" />

        <select name="gender" value={form.gender} onChange={handleChange} className="w-full border px-3 py-2 rounded" >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="City"
        className="w-full border px-3 py-2 rounded" />

        <input type="text" name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Profile Image URL"
        className="w-full border px-3 py-2 rounded" />

        <div className="flex gap-4 pt-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded" >
            Update
          </button>

          <button type="button" onClick={handleDelete} className="bg-red-600 text-white px-6 py-2 rounded" >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProfile
