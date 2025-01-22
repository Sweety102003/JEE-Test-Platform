import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import "./display.css"
function Testdisplaypage() {

    const {id}=useParams();
    const [test,setTest]=useState();
    const [currentSubjectIndex,setCurrentSubjectIndex]=useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [subjects ,setSubjects]=useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [questions,setQuestions]=useState([]);
const [testname,settestname]=useState();
    
    useEffect(()=>{
getdata();
    },[id])

const getdata=async()=>{
    const response= await axios.get(`http://localhost:5000/test/${id}`);
    console.log(response);
    setTest(response.data);
    setSubjects(response.data.subjects);
    settestname(response.data.testname);
    if (response.data.subjects && response.data.subjects.length > 0) {
      setQuestions(response.data.subjects[0].questions); 
    }
};



const handleNextQuestion = () => {
if (currentQuestionIndex < questions.length - 1) {
  setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
}
};
const handlePreviousQuestion = () => {
  if (currentQuestionIndex > 0) {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  }
};
const handleNextSubject = () => {
  if (currentSubjectIndex < subjects.length - 1) {
    setCurrentSubjectIndex((prevIndex) => prevIndex + 1);
    setCurrentQuestionIndex(0); 
  }
};
const handleSubjectChange = (subjectIndex) => {
  setCurrentSubjectIndex(subjectIndex);
  setQuestions(subjects[subjectIndex].questions);
  setCurrentQuestionIndex(0); 
};
const handlePreviousSubject = () => {
  if (currentSubjectIndex > 0) {
    setCurrentSubjectIndex((prevIndex) => prevIndex - 1);
    setCurrentQuestionIndex(0); 
  }
};
 
  return (

<div className='contained'>
<div className="sidebar">
        {subjects.map((subject, index) => (
          <button
            key={index}
            onClick={() => handleSubjectChange(index)}
            className={index === currentSubjectIndex ? "active" : ""}
          >
            {subject.subjectname}
          </button>
        ))}
      </div>
      <div className="question-section">
        <h1>{testname}</h1>
        {questions.length > 0 && (
          <>
            <p style={{fontSize:"2rem"}}>Ques: {questions[currentQuestionIndex].questionText}</p>
            <div style={{fontSize:"2rem"}}>
              <input type="radio" style={{fontWeight:"bolder"}}></input>
              {questions[currentQuestionIndex].options[0].optionText}
            </div>
            <div style={{fontSize:"2rem"}}>
              <input type="radio" style={{fontWeight:"bolder"}}></input>
              {questions[currentQuestionIndex].options[1].optionText}
            </div>
            <div style={{fontSize:"2rem"}}>
              <input type="radio" style={{fontWeight:"bolder"}}></input>
              {questions[currentQuestionIndex].options[2].optionText}
            </div>
            <div style={{fontSize:"2rem"}}>
              <input type="radio" style={{fontWeight:"bolder"}}></input>
              {questions[currentQuestionIndex].options[3].optionText}
            </div>
            
            
            <div className="navigation-buttons">
              <button className='previous'
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous Question
              </button>
              <button className='next'
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next Question
              </button>
            </div>
          </>
        )}
      </div>
      <div>
        <button className='btn'>Submit</button>
      </div>
    

        </div> )};


      

   
   
   
  
  


export default Testdisplaypage
