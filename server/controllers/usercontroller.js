const USER = require("../models/user");
const nodemailer=require("nodemailer");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const JWT_SECRET=require("../keys2");
const requirelogin = require("../middleware/requirelogin");
const Message = require("../models/message");


const registeruser=async(req, res)=>{
const {name ,email,password ,isAdmin}=req.body;
if(!name ||! email ||!password)
{
    return res.status(400).send({message:"please add all the details"});
}
const hashedpassword= await bcrypt.hash(password,12);


const user =new USER({
name ,
email ,
password:hashedpassword,
isAdmin
})
  await user.save() ;
  sendConfirmationEmail(user.email);
  return  res.send({message:"User registered successfully "});



}
const sendConfirmationEmail = (userEmail) => {
const transporter=nodemailer.createTransport({
service:
"gmail",
auth:{
    user:"kavyahooda83@gmail.com",
    pass:"wtzj yozt utnu atgu"
}
});
const mailOptions = {
    from: 'kavyahooda83@gmail.com',       
    to: userEmail,                      
    subject: 'Welcome to our platform!', 
    text: 'Thank you for registering. Please click the link to verify your email.'  
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });};
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
    return res.status(200).json(token );
}
    else{
        return res.json({message:"invalid password"});

    }

})


};
const userinfo=async(req ,res)=>{
const user=req.user;
return res.json(user);
}
const getmessage=async(req,res)=>{
  const {name ,email,subject,message}=req.body;
  const usermessage=new Message({
    name,
    email,subject,
    message,
  })
  await usermessage.save();
  return res.json({message:"message send successfully"});
  
}
module.exports=[registeruser,getuser,userinfo,getmessage];