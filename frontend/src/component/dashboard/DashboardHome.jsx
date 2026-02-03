import React, { useEffect, useState } from "react"
import axios from "axios"

const DashboardHome = ()=>{
  const [username, setUsername] = useState("")

  useEffect(()=>{
    const userId = localStorage.getItem("userId")
    if (!userId) return

    const fetchUser = async ()=>{
      try {
        const {data} = await axios.get(`http://localhost:9090/user/${userId}`)

        setUsername(data.username)
      } catch (error) {
        console.log("Failed to load user",error)
      }
    }

    fetchUser()
  },[])

  return (
    <div className="h-screen flex items-center justify-center text-5xl font-bold">
      Welcome {username || "User"} 👋
    </div>
  )
}

export default DashboardHome
