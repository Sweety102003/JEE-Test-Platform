import React, { useState } from 'react'
import("./login.css")
import axios from "axios"
import { useNavigate } from 'react-router-dom';
function Login() {
  const [email , setEmail]=useState();
  const [password ,setPassword]=useState();
  const navigate=useNavigate();

  const postdata=async(req,res)=>{
    const response=await axios.post("http://localhost:5000/login",{
      email:email,
      password:password
    });
    console.log(response.data);
    localStorage.setItem("token" ,response.data);
  }

  return (
    <>
    <div className="container">

<h1> Login 
        </h1>
        <h3>By login to our app, you will be able to give tests and analyze your performance </h3>
<div className="form" >
   
    <input type="email" id="email" placeholder="Enter your email " value={email} onChange={(e)=>{setEmail(e.target.value);}}/>
    <input type="text" id="password" placeholder='Enter your password' value={password} onChange={(e)=>{setPassword(e.target.value);}} />
    
    </div>
    <div className='flexb'>
    <input type="checkbox" id ="check">
    </input>
    
        By signing in, you are accepting our cookies policy 
    </div>
    
    <button className='btn2' onClick={postdata}> Login </button>
    <hr style={{color:"grey"}} />
    <div className='form2' style={{marginTop:"12px",borderTop:"1px solid grey"}}>
      <span style={{display:"inline-block" ,fontSize:"1rem" ,textAlign:"left"}} >
        If you dont have a account, please register first :
    <p style={{display:"inline-block" ,color:"blue",fontSize:"1rem" , cursor:"pointer"}} onClick={()=>{navigate("/register")}}> Register now </p>
      </span>
    </div>

    </div>
    
    </>
  )
}

export default Login