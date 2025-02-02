import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./css files/admin.css"
function Admindashboard() {
    const token =localStorage.getItem('token');
    const [tests,setTests]=useState([]);
    const [attempts ,setAttempts]=useState([]);
    const [user,setuser]=useState([])
    const getdata=async()=>{
        const response=await axios.get("http://localhost:5000/admintests",{
            headers:{
                Authorization:`Bearer ${token}`,
            }
        });
       await  setTests(response.data);
       
        

    }
    const getusersintest=async(testid)=>{
        if(tests.length===0) return ;

const response=await axios.post("http://localhost:5000/calculatingtestusers",{
    id:testid,
});

setAttempts(response.data);
    }
   const getleaderboard= async()=>{
    const response=await axios.get("http://localhost:5000/leaderboard");
    setuser(response.data);
   }

    useEffect(()=>{
      
        getdata();
        getleaderboard();
       
        
    },[]);
    useEffect(() => {
        if (tests.length > 0) {
            const testIds = tests.map((test) => test._id);
            getusersintest(testIds);
        }
    }, [tests]);

  return (
    <div>
    <div className="admin-container">
<h1 style={{fontSize:" 3.2rem" ,textAlign:"center"}}> Admin Dashboard  </h1>
<p> Total tests :{tests.length}</p>

<div className="card-container1" style={{display:"flex" ,flexDirection:"row" ,flexWrap:"wrap"}}>

        {tests.map((testi,index)=>(
            <div key={index}  className="card3">
           <div style={{fontSize:"2rem" ,color:' #2c3e50' ,  textAlign:"center" ,borderBottom:"2px solid green"}}> {testi.testname} </div>
            {attempts.filter((user)=>
                user.test===testi._id
            ).map((user,index)=>(
<p key={index} style={{color:"blue"}}>
   
{user.user.name}  scored {user.score} marks ,
</p>
    
   ))} 
            </div>
        ))}</div>
         <div className="leaderboard">
        <h2>Leaderboard</h2>
        {user.map((user, index) => (
          <div key={index}>
            <p>{index + 1}. {user.user.name} - {user.score}</p>
          </div>
        ))}
      </div>
       
        </div> </div>
  )
}

export default Admindashboard