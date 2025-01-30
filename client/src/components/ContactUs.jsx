import React, { useState } from 'react'
import "./css files/contact.css"
import axios from "axios"
function ContactUs() {
  const [name,setname]=useState();
  const [email ,setemail]=useState();
  const [subject,setsubject]=useState();
  const [message ,setmessage]=useState();
const handlesubmit=async()=>{
  const token =localStorage.getItem('token');
  const response=await axios.post("http://localhost:5000/contact",{
    name:name,
    email:email ,
    subject:subject ,
    message:message,
  }
  );
  console.log(response.data.message);
}
  return (
    <div style={{display:"flex",flexDirection:"row" ,justifyContent:"space-evenly"}}>
    <div className='form-container'>
      <h2> Contact Us</h2>
        <input type="text" value={name} placeholder='Enter your name' onChange={(e)=>{setname(e.target.value);}} />
        <input type="email" value={email} placeholder='Enter your email' onChange={(e)=>{setemail(e.target.value);}}  />
        <input type="text" value={subject} placeholder='Enter subject' onChange={(e)=>{setsubject(e.target.value);}}  />
        <textarea type="text" value={message} placeholder='Write your message' onChange={(e)=>{setmessage(e.target.value);}}  />
        <button onClick={async()=>{ await handlesubmit();
          setname("");
          setemail("");
          setmessage("");
          setsubject("");

        }}> Send Message</button>

    </div>
    
    </div>
  )
}

export default ContactUs