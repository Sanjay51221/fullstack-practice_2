// const nodemailer = require("nodemailer")

// const transporter = nodemailer.createTransport({
//     service:"gmail",
//     auth:{
//         user:process.env.GOOGLE_MAIL,
//         pass:process.env.GOOGLE_APP_PASSWORD
//     }
// })

// const emailSend = async (email,subject_text,message)=>{

//     const mailOption={
//         from:process.env.GOOGLE_MAIL,
//         to:email,
//         subject:subject_text,
//         text:message
//     }

//     const info=await transporter.sendMail(mailOption)
//     console.log(info) 

// }

// module.exports=emailSend



const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_MAIL,
    pass: process.env.GOOGLE_APP_PASSWORD
  }
})

const emailSend = async (email, subject_text, message) => {
  try {
    const mailOption = {
      from: process.env.GOOGLE_MAIL,
      to: email,
      subject: subject_text,
      text: message
    }

    await transporter.sendMail(mailOption)
    console.log("Email sent successfully")
  } catch (error) {
    console.log("Email failed:", error.message)
  }
}

module.exports = emailSend
