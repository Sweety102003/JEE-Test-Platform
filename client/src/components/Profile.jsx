import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./css files/profile.css"
function Profile() {
    const token= localStorage.getItem("token");
    const [user,setuser]=useState();
    const [testinfo,settestinfo]=useState([]);


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
        settestinfo(response.data);
    }
  
    useEffect(()=>{
        getdata();
        getgiventests();
    },[])
  return (
    <div className="profile-component">
        {user&&<>
        <p> {user.name}</p>
        <p> {user.email}</p>
        {user.isAdmin && <span className="admin-badge">Admin</span>}
        {testinfo&&<div className='cards-container'>
         {testinfo.map((test,index)=>(
            <div key={index} className="card1">
                <p>{test.test.testname}</p>

               <p>Total Score :{test.score} out of 360</p> 
               
               {test.subjectScores.map((subject,index)=>(
              <p key={index}> {subject.subjectName} Marks:{subject.score}
               </p> 

               ))}
             <p> Test duration: {test.test.duration} mins</p>
           
             <p>Time taken by you : {(test.testDuration/60).toFixed(2)} mins </p>
                
            </div>
        ))}
        </div>}
        
        </> }
   
        
        </div>
  )
}

export default Profile