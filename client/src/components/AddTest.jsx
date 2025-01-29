import React, { useEffect, useState } from 'react'
import axios from "axios"
function AddTest() {
    const [testname,settestname]=useState();
    const [duration ,setduration]=useState();
    const postdata=async()=>{await axios.post("http://localhost:5000/create",{

    })};
    useEffect(()=>{
        postdata();
    },[])
    

  return (
    <div className='test-container'>
        <input type="number" value={duration} id="duration" placeholder='Enter test duration' onChange={(e)=>{setduration(e.target.value);}} />
        <input type="text" value={testname} id="testname" placeholder="Enter test name" onChange={(e)=>{settestname(e.target.value)}} />
    </div>
  )
}

export default AddTest