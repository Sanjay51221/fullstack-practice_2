const bcrypt = require("bcrypt")
const { UserModel } = require("../models/user")
const emailSend = require("../config/email")

// test api
const testApi = (req,res)=>{
  console.log(req.myData)
  res.status(200).json({message: "API is healthy"})
}

// get all user
const getAllUsers = async(req,res)=>{
  try {
    const users = await UserModel.find()
    res.status(200).json({ users })
  } catch (error){
    res.status(500).json({message: "Failed to fetch users"})
  }
}

// register
const register = async(req,res)=>{
  try {
    const {username,age,email,password,imageUrl,gender,city} = req.body

    if (!username || !age || !email || !password || !imageUrl || !gender || !city){
      return res.status(400).json({ message: "All fields are required" })
    }

    const existingUser = await UserModel.findOne({email})
    if (existingUser){
      return res.status(409).json({ message: "Email already registered" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await UserModel.create({
      username,
      age,
      email,
      password: hashedPassword,
      imageUrl,
      gender,
      city
    })

    emailSend(
      email,
      "Welcome to Our Platform",
      `Hello ${username},
       You are successfully registered`
    )

    res.status(201).json({
      message: "Register successfully",
      userId: user._id
    })
  } catch (error){
    console.log(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

// login user
const login = async(req,res)=>{
  try {
    const { email, password } = req.body

    const user = await UserModel.findOne({email:email.toLowerCase()})
    if (!user){
      return res.status(404).json({ message: "Email not found" })
    }

    const matchPassword = await bcrypt.compare(password, user.password)
    if (!matchPassword){
      return res.status(401).json({message:"Incorrect password"})
    }

    //     emailSend(
    //   email,
    //   "Welcome to Our Platform",
    //   `Hello ${username},
    //    You are successfully logedin`
    // )

    // console.log(email)

    res.status(200).json({
      message: "Login successful",
      userId: user._id,
      username: user.username,
      email: user.email
    })
  } catch (error){
    res.status(500).json({ message: "Internal server error" })
  }
}

// get user by id
const getUserById = async(req,res)=>{
  try {
    const user = await UserModel.findOne({_id: req.params.id})
    if (!user){
      return res.status(404).json({message: "User not found"})
    }
    res.status(200).json(user)
  } catch (error){
    res.status(500).json({ message: "Internal server error" })
  }
}

// update user
const updateUser = async(req,res)=>{
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!updatedUser){
      return res.status(404).json({message: "User not found"})
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    })
  } catch (error){
    res.status(500).json({ message: "Update failed" })
  }
}

// delete user
const deleteUser = async(req,res)=>{
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id)

    if (!user){
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({ message: "Account deleted successfully" })
  } catch (error){
    res.status(500).json({ message: "Delete failed" })
  }
}

const crypto = require("crypto")

// !forgot password
// send reset otp
const forgotPassword = async (req,res)=>{
  try {
    const {email} = req.body

    const user = await UserModel.findOne({email})
    if (!user) {
      return res.status(404).json({ message: "Email not registered" })
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    user.resetOtp = otp
    user.resetOtpExpire = Date.now() + 5 * 60 * 1000 
    await user.save()

    emailSend(
      email,
      "Password Reset OTP",
      `Your OTP for password reset is: ${otp}`
    )

    res.status(200).json({message: "OTP sent to email"})
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Server error"})
  }
}

// reset password
const resetPassword = async (req,res)=>{
  try {
    const {email, otp, newPassword} = req.body

    const user = await UserModel.findOne({email,resetOtp: otp,resetOtpExpire: {$gt: Date.now()}})

    if (!user) {
      return res.status(400).json({message:"Invalid or expired OTP"})
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    user.password = hashedPassword
    user.resetOtp = undefined
    user.resetOtpExpire = undefined
    await user.save()

    res.status(200).json({message:"Password reset successful"})
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Server error"})
  }
}



module.exports ={
  testApi,
  getAllUsers,
  register,
  login,
  getUserById,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword
}
