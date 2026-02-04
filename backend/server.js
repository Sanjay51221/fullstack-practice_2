// require("dotenv").config()
// const express = require("express")
// const cors = require("cors")
// const bcrypt = require("bcrypt")
// const connectDb = require("./config/db")
// const { UserModel } = require("./models/user")
// const emailSend = require("./config/email")
// const { authorizetion } = require("./middleware/authermiddleware")

// const app = express()

// app.use(express.json())
// app.use(cors())

// connectDb()

// // test api
// app.get("/test",authorizetion,(req,res)=>{
//     console.log(req.myData)
//   res.status(200).json({message: "API is healthy"})
// })

// // get all user
// app.get("/allusers", async (req, res) => {
//   try {
//     const users = await UserModel.find()
//     res.status(200).json({ users })
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch users" })
//   }
// })

// // resister
// app.post("/register",async (req,res)=>{
//   try {
//     const { username, age, email, password, imageUrl, gender, city } = req.body

//     if (!username || !age || !email || !password || !imageUrl || !gender || !city) {
//       return res.status(400).json({ message: "All fields are required" })
//     }

//     const existingUser = await UserModel.findOne({ email })
//     if (existingUser) {
//       return res.status(409).json({ message: "Email already registered" })
//     }

//     const hashedPassword = await bcrypt.hash(password, 10)

//     const user = await UserModel.create({
//       username,
//       age,
//       email,
//       password: hashedPassword,
//       imageUrl,
//       gender,
//       city
//     })

//     emailSend(
//       email,
//       "Welcome to Our Platform",
//       `Hello ${username},
//        You are successfully registered`
//     )

//     res.status(201).json({ message: "Register successfully", userId: user._id })
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: "Internal server error" })
//   }
//   //   Email failed: connect ETIMEDOUT 192.178.211.108:465 this error is comming
// })



// // login user
// app.post("/login",async (req,res)=>{
//   try {
//     const {email,password} = req.body

//     const user = await UserModel.findOne({email: email.toLowerCase()})
//     if (!user){
//       return res.status(404).json({message: "Email not found"})
//     }

//     const matchPassword = await bcrypt.compare(password, user.password)
//     if (!matchPassword){
//       return res.status(401).json({message: "Incorrect password"})
//     }

//     res.status(200).json({
//       message: "Login successful",
//       userId: user._id,
//       username: user.username,
//       email: user.email
//     })
//   } catch (error){
//     res.status(500).json({message: "Internal server error"})
//   }
// })


// // get user by id
// app.get("/user/:id", async (req, res)=>{
//   try {
//     const user = await UserModel.findOne({ _id: req.params.id })

//     if (!user){
//       return res.status(404).json({message: "User not found"})
//     }

//     res.status(200).json(user)
//   } catch (error){
//     res.status(500).json({message: "Internal server error"})
//   }
// })


// // .update
// app.put("/update/:id", async (req, res)=>{
//   try {
//     const updatedUser = await UserModel.findByIdAndUpdate(req.params.id,req.body,{ new: true })

//     if (!updatedUser){
//       return res.status(404).json({message: "User not found"})
//     }

//     res.status(200).json({message: "Profile updated successfully",user: updatedUser})
//   } catch (error){
//     res.status(500).json({message: "Update failed"})
//   }
// })


// // delete user
// app.delete("/delete/:id", async (req, res)=>{
//   try {
//     const user = await UserModel.findByIdAndDelete(req.params.id)

//     if (!user){
//       return res.status(404).json({message: "User not found"})
//     }

//     res.status(200).json({message: "Account deleted successfully"})
//   } catch (error){
//     res.status(500).json({message: "Delete failed"})
//   }
// })


// app.listen(process.env.PORT,()=>{
//   console.log(`Server running on http://localhost:${process.env.PORT}`)
// })







require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectDb = require("./config/db")

const {
  testApi,
  getAllUsers,
  register,
  login,
  getUserById,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword
} = require("./controllers/userControllers.js")

const {authorizetion} = require("./middleware/authermiddleware.js")

const app = express()

app.use(express.json())
app.use(cors())

connectDb()

app.get("/test",authorizetion,testApi)
app.get("/allusers", getAllUsers)
app.post("/register", register)
app.post("/login",authorizetion, login)
app.get("/user/:id", getUserById)
app.put("/update/:id", updateUser)
app.delete("/delete/:id", deleteUser)
app.post("/forgot-password", forgotPassword)
app.post("/reset-password", resetPassword)

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT} Server running...`)
})
