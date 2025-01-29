import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css files/display.css";
import { IoIosArrowDropdownCircle } from "react-icons/io";

function Testdisplaypage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState();
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [testname, setTestname] = useState();
  const [showDropdown, setShowDropdown] = useState([]);
  const [questionStatus, setQuestionStatus] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [timeSpentOnQuestions, setTimeSpentOnQuestions] = useState([]);

  useEffect(() => {
    getdata();
  }, [id]);

  const getdata = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/test/${id}`);
      setTest(response.data);
      setSubjects(response.data.subjects);
      setTestname(response.data.testname);

      setTimer(response.data.duration * 60);

      if (response.data.subjects && response.data.subjects.length > 0) {
        const initialStatuses = response.data.subjects.map((subject) =>
          Array(subject.questions.length).fill("not-attempted")
        );
        const initialAnswers = response.data.subjects.map((subject) =>
          Array(subject.questions.length).fill(null)
        );

        setQuestions(response.data.subjects[0].questions);
        setQuestionStatus(initialStatuses);
        setSelectedAnswers(initialAnswers);
        setShowDropdown(Array(response.data.subjects.length).fill(false));

        const initialTimeSpent = response.data.subjects.map((subject) =>
          Array(subject.questions.length).fill(0)
        );
        setTimeSpentOnQuestions(initialTimeSpent);

        setTimerRunning(true);
      }
    } catch (error) {
      console.error("Error fetching test data:", error);
    }
  };

  useEffect(() => {
    if (timer > 0 && timerRunning) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(timerInterval);
            handleSubmit();
          }
          return prevTimer - 1;
        });
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [timer, timerRunning]);

  const updateTimeSpent = () => {
    const timeNow = Date.now();
    const timeSpent = timeNow - questionStartTime;

    setTimeSpentOnQuestions((prev) => {
      const updated = [...prev];
      updated[currentSubjectIndex][currentQuestionIndex] += timeSpent;
      return updated;
    });

    setQuestionStartTime(timeNow);
  };

  const handleNextQuestion = () => {
    updateTimeSpent();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    updateTimeSpent();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubjectChange = (subjectIndex) => {
    updateTimeSpent();
    setCurrentSubjectIndex(subjectIndex);
    setQuestions(subjects[subjectIndex].questions);
    setCurrentQuestionIndex(0);
  };

  const toggleDropdown = (index) => {
    setShowDropdown((prev) =>
      prev.map((show, i) => (i === index ? !show : show))
    );
  };

  const updateQuestionStatus = (subjectIndex, questionIndex, status) => {
    setQuestionStatus((prev) => {
      const newStatuses = [...prev];
      newStatuses[subjectIndex][questionIndex] = status;
      return newStatuses;
    });
  };

  const handleAnswerSelection = (questionIndex, answerIndex) => {
    setSelectedAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentSubjectIndex][questionIndex] = answerIndex;
      return newAnswers;
    });
    updateQuestionStatus(currentSubjectIndex, questionIndex, "attempted");
  };

  const handleMarkForReview = (questionIndex) => {
    updateQuestionStatus(currentSubjectIndex, questionIndex, "marked-for-review");
  };
  const token = localStorage.getItem("token");
  const postbookmark =async()=>{
   
    const questionId = questions[currentQuestionIndex]._id;
    const response= await axios.post("http://localhost:5000/bookmark",{
   questionId:questionId,
      bookmarked:true},

      {headers:{
        Authorization: `Bearer ${token}`,
        
      }
    });
    
    if (response.status === 200) {
      console.log("Question bookmarked successfully:", response.data);}

  }

  const handleSubmit = async () => {
    updateTimeSpent();
    setTimerRunning(false);

    try {
      const answersPayload = [];
      const timeTakenPerQuestion = [];

      subjects.forEach((subject, subjectIndex) => {
        subject.questions.forEach((question, questionIndex) => {
          answersPayload.push({
            questionId: question._id,
            answer: selectedAnswers[subjectIndex][questionIndex],
          });

          timeTakenPerQuestion.push({
            questionId: question._id,
            timeSpent: timeSpentOnQuestions[subjectIndex][questionIndex],
          });
        });
      });

     
      const payload = {
        userid: token,
        answers: answersPayload,
        testid: id,
        timeTaken: timeTakenPerQuestion,
      };

      console.log(payload);

      const response = await axios.post("http://localhost:5000/submittest", payload);
      console.log("Submission Response:", response.data);
      const subjectScores = response.data.subjectScores;

      navigate(`/results/${id}`, { state: { subjectScores } });
    } catch (error) {
      console.error("Error submitting test:", error);
      alert("Error submitting the test. Please try again.");
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="contained">
      <div className="sidebar">
        {subjects.map((subject, index) => (
          <div className="subject-container" key={index}>
            <div className="subject-header" >
              <button
                className={`subject-button ${index === currentSubjectIndex ? "active" : ""}`}
                onClick={() => handleSubjectChange(index)} style={{backgroundColor:"#2c3e50"}}
              >
                {subject.subjectname}
              </button>
              <IoIosArrowDropdownCircle
                className="dropdown-icon" style={{color:"black"}}
                onClick={() => toggleDropdown(index)}
              />
            </div>
            {showDropdown[index] && (
              <div className="question-dropdown">
                {subjects[index].questions.map((_, qIndex) => (
                  <div
                    key={qIndex}
                    className={`question-item ${
                      questionStatus[index][qIndex] || "not-attempted"
                    }`}
                    onClick={() => {
                      updateTimeSpent();
                      setCurrentQuestionIndex(qIndex);
                      if (index !== currentSubjectIndex) {
                        handleSubjectChange(index);
                      }
                    }}
                  >
                    <p style={{ margin: 0, fontWeight: "bold" }}>Q{qIndex + 1}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="question-section">
        <div className="submit-container">
          <button className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <h1 style={{ display: "inline-block" }}>{testname}</h1>

        <div className="timer">Time Remaining: {formatTime(timer)}</div>

        {questions.length > 0 && (
          <>
            <p style={{ fontSize: "2rem" }}>
              Ques: {questions[currentQuestionIndex]?.questionText}
            </p>

            {questions[currentQuestionIndex]?.options.map((option, oIndex) => (
              <div key={oIndex} style={{ fontSize: "2rem" }}>
                <input
                  type="radio"
                  name={`option-${currentQuestionIndex}`}
                  checked={
                    selectedAnswers[currentSubjectIndex][currentQuestionIndex] === oIndex
                  }
                  onChange={() => handleAnswerSelection(currentQuestionIndex, oIndex)}
                />
                {option.optionText}
              </div>
            ))}

            <div className="navigation-section">
              <div style={{display:"flex" ,justifyContent:"space-between"}}><button
                className="mark-for-review-btn"
                onClick={() => handleMarkForReview(currentQuestionIndex)}
              >
                Mark for Review
              </button>
              <button
                className="mark-for-review-btn"
               style={{position:"relative" ,right:"0px"}} 
               onClick={()=>{postbookmark();}}
              >
                Bookmark
              </button>
              </div>
              <div className="navigation-buttons">
                <button
                  className="previous"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous Question
                </button>
                <button
                  className="next"
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                >
                  Next Question
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Testdisplaypage;
