import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";

function Result() {
    const [data,setdata]=useState();
    const {id}=useParams();
    const token=localStorage.getItem('token');
    const getdata=async()=>{
        const response=await axios.get(`http://localhost:5000/results/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`,
            }
        });
        setdata(response.data);

    }
    useEffect(()=>{
        getdata();
    },[])
  return (
    <div className='contain'>
        <h1 style={{color:"#2c3e50" ,textAlign:"center" ,fontSize:"2rem"}}>Result</h1>
        {data&&<>
        <p >You have successfully attempted the test</p>
        <p style={{fontWeight:"bold" ,fontSize:"1.5rem"}}>
             Your Score:{data.score} </p>
            </>}
    </div>
  )
}

export default Result
