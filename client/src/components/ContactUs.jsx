import React, { useState } from 'react'
import "./css files/contact.css"
import photo1 from "../images/jee2.jpeg"
function ContactUs() {
  const [name,setname]=useState();
  const [email ,setemail]=useState();
  const [subject,setsubject]=useState();
  const [message ,setmessage]=useState();
const handlesubmit=async()=>{
  const token =localStorage.getItem('token');
  const response=await axios.post("",{
    name:name,
    email:email ,
    subject:subject ,
    message:message,
  },{
    headers:{
      Authorization:`Bearer ${token}`,
    }
  });
  console.log(response);
}
  return (
    <div style={{display:"flex",flexDirection:"row" ,justifyContent:"space-evenly"}}>
    <div className='form-container'>
      <h2> Contact Us</h2>
        <input type="text" value={name} placeholder='Enter your name' />
        <input type="email" value={email} placeholder='Enter your email' />
        <input type="text" value={subject} placeholder='Enter subject' />
        <textarea type="text" value={message} placeholder='Write this message' />
        <button onClick={()=>{handlesubmit();}}> Send Message</button>

    </div>
    <div>
      <img style={{objectFit:"cover"}} src={photo1} />
    </div>
    </div>
  )
}

export default ContactUs