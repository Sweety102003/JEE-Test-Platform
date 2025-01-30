import React, { useEffect, useState } from 'react'
import Calendar from "react-calendar";
import axios from "axios" 
import "./css files/calender.css"
function Testcalender() {
    const [tests, settests] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const getdata=async()=>{
        const response=await axios.get("http://localhost:5000/upcomingtests");
        console.log("mera",response);
        settests(response.data);
    }
    useEffect(()=>{
        getdata();
    },[])
    const tileClassName = ({ date }) => {
        return tests.some(test => new Date(test.date).toDateString() === date.toDateString())
            ? "highlight"
            : "";
    };

  return (
    <div className='calender'> <h2>Upcoming Tests</h2>
    <Calendar 
        value={selectedDate} 
        onChange={setSelectedDate} 
        tileClassName={tileClassName} 
    />
    <ul>
        {tests
            .filter(test => new Date(test.date).toDateString() === selectedDate.toDateString())
            .map((test, index) => (
                <li key={index}>{test.testname} - {new Date(test.date).toLocaleString()}</li>
            ))}
    </ul>
    
</div>
  )
}

export default Testcalender