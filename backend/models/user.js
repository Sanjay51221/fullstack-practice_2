const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    username: String,
    age: Number,
    email: String,
    password: String,
    imageUrl:String,
    gender: String,
    city:String
})

const UserModel = mongoose.model("users", userSchema)

module.exports = {UserModel}
