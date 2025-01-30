import React, { useEffect } from 'react'
import axios from "axios"
function Testcalender() {
    const getdata=async()=>{
        const response=await axios.get("http://localhost:5000/upcomingtests");
        console.log("mera",response);
    }
    useEffect(()=>{
        getdata();
    },[])
  return (
    <div>Testcalender</div>
  )
}

export default Testcalender