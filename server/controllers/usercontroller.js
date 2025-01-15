const USER = require("../models/user");
const nodemailer=require("nodemailer");
const registeruser=async(req, res)=>{
const {name ,email,password ,isAdmin}=req.body;
if(!name ||! email ||!password)
{
    return res.status(400).send({message:"please add all the details"});
}
const user =new USER({
name ,
email ,
password ,
isAdmin
});
user.save().then(user=>   res.send({message:"User registered successfully "})).catch(err=>{console.log(err);});
// sendConfirmationEmail(user.email);

}
// const sendConfirmationEmail = (userEmail) => {
// const transporter=nodemailer.createTransport({
// service:
// "gmail",
// auth:{
//     user:"kavyahooda83@gmail.com",
//     pass:"Sk@88890"
// }
// });
// const mailOptions = {
//     from: 'kavyahooda83@gmail.com',       
//     to: userEmail,                      
//     subject: 'Welcome to our platform!', 
//     text: 'Thank you for registering. Please click the link to verify your email.'  
//   };
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });};
const getuser=async(req,res)=>{
const {email , password}=req.body;
if(!email || !password)
{
    return res.status(400).json({message:"please enter all the fields"});
}
 const user= await USER.findOne({email});
 if (!user) {
    return res.status(400).json({ message: "User not found" });
}


}
module.exports=[registeruser,getuser];