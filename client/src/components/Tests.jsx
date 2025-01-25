import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./Tests.css"
import photo1 from "../images/jee.jpeg"
import { useNavigate } from 'react-router-dom';
function Tests() {
  const [tests ,setTests]=useState([]);
  const navigate =useNavigate();
  
   const getdata=async(req,res)=>{
   try {
    const response =await axios.get("http://localhost:5000/tests");
    console.log(response);
    setTests(response.data);
    
    }
  

    catch(err){
      console.log(err);
    }

   }
    useEffect(()=>{
      getdata();
    },[])
  return (
    <div className='contain'> 

<h1 style={{textAlign:'center'}}> Available Tests </h1>
{tests.length===0?(<p>
No tests available .Please check after some time.
</p>):(
  <div className='Testlist' >
  {tests.map((test)=>(
    <div key={test._id} className='card'>

  <h2 style={{color:" #333" , fontSize:"2rem"}}>
    {test.testname}
  </h2>
  <div className='card2'>
<div className='logo'>
  <img src={photo1} style={{width:"85%" ,height:"98%" ,left:"0px" ,marginTop:"-15px"}}/>
  </div>
  <div className="info" style={{fontWeight:"bold" ,fontSize:"24 px" ,padding:"0px"}}>
    <p> Questions: 90    </p><p> Duration: {test.duration} min</p></div></div>
    <button className="btn" style={{ width:"80%" , marginBottom:"8px" ,position:"relative" , bottom:"0px" ,fontSize:"2rem" ,fontWeight:"bold"}} 
    onClick={()=>{
      navigate(`/test/${test._id}`);
    }}>
      Start Test
    </button>



    </div>

))}
          </div>
            
          )}
       </div>
  );
}

export default Tests