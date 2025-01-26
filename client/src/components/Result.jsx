import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import axios from "axios";
import Chartsforresult from './Chartsforresult';
import Piechartshowingresult from './Piechartshowingresult';

function Result() {
    const location = useLocation();
  const { subjectScores, score } = location.state || {};

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
          {subjectScores&&<> <div className="charts-container">
      <div className="chart-section">
        <Chartsforresult subjectScores={subjectScores} /> 
      </div>
      <div className="chart-section">
        <Piechartshowingresult subjectScores={subjectScores} />
      </div>
    </div></>}  
            </>}
    </div>
  )
}

export default Result
