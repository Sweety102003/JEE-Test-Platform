import React, { useEffect, useState } from 'react'
import axios from "axios"
function Profile() {
    const token= localStorage.getItem("token");
    const [user,setuser]=useState();


    const getdata=async()=>{
        const response=await axios.get("http://localhost:5000/profile",{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setuser(response.data);
    }
    const getgiventests=async()=>{
        const response=await axios.get("http://localhost:5000/attemptedtests",{
            headers:{ Authorization: `Bearer ${token}`,},
        });
        console.log(response);
    }
  
    useEffect(()=>{
        getdata();
        getgiventests();
    },[])
  return (
    <div>
        {user&&<>
        <p> {user.name}</p>
        <p> {user.email}</p>
        <p> {user.isAdmin&&<>Admin</>}</p>
        
        </> }
   
        
        </div>
  )
}

export default Profile