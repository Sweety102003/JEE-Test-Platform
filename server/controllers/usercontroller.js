const USER = require("../models/user");
const nodemailer=require("nodemailer");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const JWT_SECRET=require("../keys2");


const registeruser=async(req, res)=>{
const {name ,email,password ,isAdmin}=req.body;
if(!name ||! email ||!password)
{
    return res.status(400).send({message:"please add all the details"});
}
bcrypt.hash(password,12).then((hashedpassword)=>{


const user =new USER({
name ,
email ,
password:hashedpassword,
isAdmin
});});
user.save().then(user=>   res.send({message:"User registered successfully "})).catch(err=>{console.log(err);});
// sendConfirmationEmail(user.email);

}
// const sendConfirmationEmail = (userEmail) => {
// const transporter=nodemailer.createTransport({
// service:
// "gmail",
// auth:{
//     user:"",
//     pass:""
// }
// });
// const mailOptions = {
//     from: '',       
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
bcrypt.compare(password,user.password).then((match)=>{
if(match){
    const token=jwt.sign({_id:user.id},JWT_SECRET);
    return res.json({message:"signed in successfully"},token);
}
    else{
        return res.json({message:"invalid password"});

    }

})


}
module.exports=[registeruser,getuser];