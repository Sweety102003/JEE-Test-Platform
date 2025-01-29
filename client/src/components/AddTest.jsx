import React, { useState } from "react";
import axios from "axios";
import "./css files/addtest.css";

function AddTest() {
  const [testname, setTestname] = useState("");
  const [duration, setDuration] = useState("");
  const [subjects, setSubjects] = useState([
    { subjectname: "", questions: [{ questionText: "", correctAnswer: "", options: [{ optionText: "" }] }] },
  ]);

  const handleAddSubject = () => {
    setSubjects([
      ...subjects,
      { subjectname: "", questions: [{ questionText: "", correctAnswer: "", options: [] }] },
    ]);
  };

  const handleAddQuestion = (subjectIndex) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].questions.push({ questionText: "", correctAnswer: "", options: [] });
    setSubjects(updatedSubjects);
  };

  const handleSubjectChange = (index, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].subjectname = value;
    setSubjects(updatedSubjects);
  };

  const handleQuestionChange = (subjectIndex, questionIndex, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].questions[questionIndex][field] = value;
    setSubjects(updatedSubjects);
  };

  const handleAddOption = (subjectIndex, questionIndex) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].questions[questionIndex].options.push({ optionText: "" });
    setSubjects(updatedSubjects);
  };

  const handleOptionChange = (subjectIndex, questionIndex, optionIndex, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].questions[questionIndex].options[optionIndex].optionText = value;
    setSubjects(updatedSubjects);
  };
const token=localStorage.getItem('token');
  const postData = async () => {
    
    if (!testname || !duration || subjects.length === 0 || subjects.some(subject => !subject.subjectname)) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/create", {
        testname,
        duration,
        subjects,
      },{
        headers:{
            Authorization:`Bearer ${token}`,
        }
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create test");
    }
  };

  return (
    <div className="test-container">
      <h2>Add Test</h2>
      <label>Test Name:</label>
      <input
        type="text"
        value={testname}
        onChange={(e) => setTestname(e.target.value)}
        placeholder="Enter test name"
      />

      <label>Duration:</label>
      <input
        type="text"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Enter duration"
      />

      <h3>Subjects:</h3>
      {subjects.map((subject, subjectIndex) => (
        <div className="subject-container" key={subjectIndex}>
          <input
            type="text"
            placeholder="Enter subject name"
            value={subject.subjectname}
            onChange={(e) => handleSubjectChange(subjectIndex, e.target.value)}
          />
          <h4>Questions:</h4>
          {subject.questions.map((question, questionIndex) => (
            <div className="question-container" key={questionIndex}>
              <input
                type="text"
                placeholder="Enter question text"
                value={question.questionText}
                onChange={(e) =>
                  handleQuestionChange(subjectIndex, questionIndex, "questionText", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Enter correct answer index"
                value={question.correctAnswer}
                onChange={(e) =>
                  handleQuestionChange(subjectIndex, questionIndex, "correctAnswer", e.target.value)
                }
              />
              <h5>Options:</h5>
              {question.options.map((option, optionIndex) => (
                <div className="option-container" key={optionIndex}>
                  <input
                    type="text"
                    placeholder="Enter option text"
                    value={option.optionText}
                    onChange={(e) =>
                      handleOptionChange(subjectIndex, questionIndex, optionIndex, e.target.value)
                    }
                  />
                </div>
              ))}
              <button className="add-btn" onClick={() => handleAddOption(subjectIndex, questionIndex)}>
                Add Option
              </button>
            </div>
          ))}
          <button className="add-btn" onClick={() => handleAddQuestion(subjectIndex)}>
            Add Question
          </button>
        </div>
      ))}

      <button className="add-btn" onClick={handleAddSubject}>
        Add Subject
      </button>
      <button className="submit-btn" onClick={postData}>
        Submit Test
      </button>
    </div>
  );
}

export default AddTest;
