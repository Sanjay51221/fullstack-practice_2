const mongoose = require("mongoose")

const connectDb=async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
    console.log("database connected")
    } catch (error) {
        console.log("Failed to connect DB", error)
    }
}

module.exports=connectDb
