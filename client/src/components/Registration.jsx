import React, { useState } from 'react'
import "./register.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function Registration() {
  const navigate=useNavigate();
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [password , setPassword]=useState();
  const [isAdmin ,setisadmin]=useState(false);
  const postdata=async(req,res)=>{
const response=await axios.post("http://localhost:5000/register",{
name:name,
email:email,
password:password,
isAdmin:isAdmin
});
console.log(response.data.message);
navigate("/login");


  };


  return (
    <div className='container'>
        <h1> Register
        </h1>
        <h3>To enroll for tests and build your carrer </h3>
<div className="form">
    <input type="text" id="text"  value={name} placeholder='Enter your name ' onChange={(e)=>{
      setName(e.target.value);
    }}/>
    <input type="email" id="email" value={email} placeholder="Enter your email " onChange={(e)=>{
      setEmail(e.target.value);}} />
    <input type="password" id="password" value={password} placeholder='Enter your password' onChange={(e)=>{setPassword(e.target.value);}} />
    <label><input type='checkbox' value={isAdmin} onChange={(e)=>{setisadmin(e.target.checked);}}/> Admin </label>
    <button className='btn' onClick={postdata}> Register Now</button>

</div>
    </div>
  )
}

export default Registration
