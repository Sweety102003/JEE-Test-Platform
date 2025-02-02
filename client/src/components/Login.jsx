import React, { useState } from 'react'
import("./css files/login.css")
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Login() {
  const [email , setEmail]=useState("");
  const [password ,setPassword]=useState("");
  const notifyA=(message)=> toast.error(message);
  const notifyb=(message)=> toast.success(message);
  const navigate=useNavigate();

  const postdata=async()=>{
    try{
    const response=await axios.post("http://localhost:5000/login",{
      email:email,
      password:password
    });
    localStorage.setItem("token" ,response.data.token);
notifyb(response.data.message);

    window.dispatchEvent(new Event("storage"));
    navigate("/");
  }
  catch(error){
  
    notifyA(error.response?.data?.message || "Login failed!");
  }


    
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
      <p style={{display:"inline-block" ,fontSize:"1rem" ,textAlign:"left"}} >
        If you dont have a account, please register first :
    <span style={{display:"inline-block" ,color:"blue",fontSize:"1rem" , cursor:"pointer" ,textAlign:"center"}} onClick={()=>{navigate("/register")}}> Register now </span>
      </p>
    </div>

    </div>
    
    </>
  )
}

export default Login