import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./css files/profile.css"
function Profile() {
    const token= localStorage.getItem("token");
    const [user,setuser]=useState();
    const [testinfo,settestinfo]=useState([]);


    const getdata=async()=>{
        const response=await axios.get(`${import.meta.env.VITE_API_URL}/profile`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setuser(response.data);
    }
    const getgiventests=async()=>{
        const response=await axios.get(`${import.meta.env.VITE_API_URL}/attemptedtests`,{
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
        <div className='profile-performa' style={{borderRadius:"10px"}}>
        <p style={{color:"#2c3e50"}}> Name: {user.name}</p>
        <p style={{color:"#2c3e50"}}> Email-Id: {user.email}</p>
        {/* {user.isAdmin && <span className="admin-badge">Admin</span>} */}
        </div>
        {testinfo&&<p style={{fontSize:"2rem" ,color:"#2c3e50" ,fontWeight:"bold"}}>My tests</p>}
        {testinfo.length>0 ?(<div className='cards-container'>
            
         {testinfo.map((test,index)=>(
            <div key={index} className="card1" >
                <p style={{textAlign:"center"}}>{test.test.testname}</p>

               <p style={{textAlign:"center"}}>Total Score :{test.score} out of 360</p> 
               
               {test.subjectScores.map((subject,index)=>(
              <p style={{textAlign:"center"}} key={index}> {subject.subjectName} Marks:{subject.score}
               </p> 

               ))}
             <p style={{textAlign:"center"}}>  Test duration: {test.test.duration} mins</p>
           
             <p style={{textAlign:"center"}}>Time taken by you : {(test.testDuration/60).toFixed(2)} mins </p>
                
            </div>
        ))}
        </div>):(<p>No tests were attempted by you</p>)}
        
        </> }
   
        
        </div>
  )
}

export default Profile