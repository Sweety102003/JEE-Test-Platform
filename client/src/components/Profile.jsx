import React, { useEffect, useState } from 'react'
import axios from "axios"
function Profile() {
    const token= localStorage.getItem("token");
    const [user,setuser]=useState();

console.log(token);
    const getdata=async()=>{
        const response=await axios.get("http://localhost:5000/profile",{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(response);
        setuser(response.data);
// console.log(response.data);
        

    }
    console.log(user);
    useEffect(()=>{
        getdata();
    },[])
  return (
    <div>
        {user&&<>
        <p> {user.name}</p>
        <p> {user.email}</p>
        <p> {user.isAdmin}</p>
        
        </> }
   
        
        </div>
  )
}

export default Profile