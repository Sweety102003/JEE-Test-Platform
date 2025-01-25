import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./display.css";
import { IoIosArrowDropdownCircle } from "react-icons/io";

function Testdisplaypage() {
  const { id } = useParams();
  const [test, setTest] = useState();
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [testname, setTestname] = useState();
  const [showDropdown, setShowDropdown] = useState([]);
  const [questionStatus, setQuestionStatus] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    getdata();
  }, [id]);

  const getdata = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/test/${id}`);
      setTest(response.data);
      setSubjects(response.data.subjects);
      setTestname(response.data.testname);

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
      }
    } catch (error) {
      console.error("Error fetching test data:", error);
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

  const handleSubjectChange = (subjectIndex) => {
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

  const handleSubmit = () => {
    const payload = {
      testId: id,
      answers: selectedAnswers,
      statuses: questionStatus,
    };
    console.log("Submission Payload:", payload);
    // Send the payload to your backend
  };

  return (
    <div className="contained">
      <div className="sidebar">
        {subjects.map((subject, index) => (
          <div className="subject-container" key={index}>
            <div className="subject-header">
              <button
                className={`subject-button ${
                  index === currentSubjectIndex ? "active" : ""
                }`}
                onClick={() => handleSubjectChange(index)}
              >
                {subject.subjectname}
              </button>
              <IoIosArrowDropdownCircle
                className="dropdown-icon"
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
        <h1 style={{display:"inline-block"}}>{testname}</h1>
      
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
                    selectedAnswers[currentSubjectIndex][currentQuestionIndex] ===
                    oIndex
                  }
                  onChange={() =>
                    handleAnswerSelection(currentQuestionIndex, oIndex)
                  }
                />
                {option.optionText}
              </div>
            ))}

            <div className="navigation-section">
              <button
                className="mark-for-review-btn"
                onClick={() => handleMarkForReview(currentQuestionIndex)}
              >
                Mark for Review
              </button>

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
