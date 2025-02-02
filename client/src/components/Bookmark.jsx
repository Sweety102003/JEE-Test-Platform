import React, { useEffect, useState } from 'react'
import axios from "axios"
function Bookmark() {
    const [questions ,setquestions]=useState([]);
    const token=localStorage.getItem("token");
    
    const getdata=async()=>{
const response=await axios.get(`http://localhost:5000/bookmarks`,{
    headers:{
        Authorization : `Bearer ${token}`,
    }
});
setquestions(response.data.bookmarkedQuestions);
    };
    useEffect(()=>{
        getdata();
    },[])

  return (
    <div>
        {questions.length>0?(
        questions.map((question ,index)=>(
       <div key={index}>
       Ques: &nbsp; {question.questionText}
        
            {question.options.map((option,indexs)=>(
                <p key={indexs} ><input  type="radio"></input>
                {option.optionText}
                </p>
            ))}
        
        <p>Ans : Option no. {question.correctAnswer+1}</p>

        </div>
        ))
        
        
        ) : (<p>
        No bookmarked questions
        </p>)}
    </div>
  )
}

export default Bookmark