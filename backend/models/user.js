const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    username: String,
    age: Number,
    email: String,
    password: String,
    imageUrl:String,
    gender: String,
    city:String,
    resetOtp: String,
    resetOtpExpire: Date,
})

const UserModel = mongoose.model("users", userSchema)

module.exports = {UserModel}
