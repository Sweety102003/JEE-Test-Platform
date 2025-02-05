import React, { useState } from "react";
import axios from "axios";
import "./css files/addtest.css";

function AddTest() {
  const [testname, setTestname] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const [subjects, setSubjects] = useState([
    {
      subjectname: "",
      questions: [{ questionText: "", questionImage: null, correctAnswer: "", options: [{ optionText: "", optionImage: null }] }],
    },
  ]);

  const token = localStorage.getItem("token");

  const postImageToCloudinary = async (imageFile) => {
    if (!imageFile) return "";
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "socialclone");
    data.append("cloud_name", "sweetycloud");

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/sweetycloud/image/upload", data);
      return response.data.secure_url;
    } catch (error) {
      console.error("Image upload failed", error);
      return "";
    }
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { subjectname: "", questions: [{ questionText: "", questionImage: null, correctAnswer: "", options: [] }] }]);
  };

  const handleAddQuestion = (subjectIndex) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].questions.push({ questionText: "", questionImage: null, correctAnswer: "", options: [] });
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
    updatedSubjects[subjectIndex].questions[questionIndex].options.push({ optionText: "", optionImage: null });
    setSubjects(updatedSubjects);
  };

  const handleOptionChange = (subjectIndex, questionIndex, optionIndex, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].questions[questionIndex].options[optionIndex][field] = value;
    setSubjects(updatedSubjects);
  };

  const handleImageUpload = async (subjectIndex, questionIndex, optionIndex, imageFile) => {
    const imageUrl = await postImageToCloudinary(imageFile);
    const updatedSubjects = [...subjects];

    if (optionIndex === null) {
      updatedSubjects[subjectIndex].questions[questionIndex].questionImage = imageUrl;
    } else {
      updatedSubjects[subjectIndex].questions[questionIndex].options[optionIndex].optionImage = imageUrl;
    }

    setSubjects(updatedSubjects);
  };

  const postData = async () => {
    if (!testname || !duration || subjects.length === 0 || subjects.some(subject => !subject.subjectname)) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/create`,
        
        { testname, duration, date, subjects },
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
      <input type="text" value={testname} onChange={(e) => setTestname(e.target.value)} placeholder="Enter test name" />

      <label>Duration:</label>
      <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Enter duration" />

      <label>Date:</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Enter date" />

      <h3>Subjects:</h3>
      {subjects.map((subject, subjectIndex) => (
        <div className="subject-container" key={subjectIndex}>
          <input type="text" placeholder="Enter subject name" value={subject.subjectname} onChange={(e) => handleSubjectChange(subjectIndex, e.target.value)} />

          <h4>Questions:</h4>
          {subject.questions.map((question, questionIndex) => (
            <div className="question-container" key={questionIndex}>
              <input type="text" placeholder="Enter question text" value={question.questionText} onChange={(e) => handleQuestionChange(subjectIndex, questionIndex, "questionText", e.target.value)} />
              <label>Upload Question Image:</label>
              <input type="file" onChange={(e) => handleImageUpload(subjectIndex, questionIndex, null, e.target.files[0])} />

              <input type="number" placeholder="Enter correct answer index" value={question.correctAnswer} onChange={(e) => handleQuestionChange(subjectIndex, questionIndex, "correctAnswer", e.target.value)} />

              <h5>Options:</h5>
              {question.options.map((option, optionIndex) => (
                <div className="option-container" key={optionIndex}>
                  <input type="text" placeholder="Enter option text" value={option.optionText} onChange={(e) => handleOptionChange(subjectIndex, questionIndex, optionIndex, "optionText", e.target.value)} />
                  <label>Upload Option Image:</label>
                  <input type="file" onChange={(e) => handleImageUpload(subjectIndex, questionIndex, optionIndex, e.target.files[0])} />
                </div>
              ))}
              <button className="add-btn" onClick={() => handleAddOption(subjectIndex, questionIndex)}>Add Option</button>
            </div>
          ))}
          <button className="add-btn" onClick={() => handleAddQuestion(subjectIndex)}>Add Question</button>
        </div>
      ))}

      <button className="add-btn" onClick={handleAddSubject}>Add Subject</button>
      <button className="submit-btn" onClick={postData}>Submit Test</button>
    </div>
  );
}

export default AddTest;
