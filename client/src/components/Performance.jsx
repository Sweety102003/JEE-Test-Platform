import React, { useEffect, useState } from "react";
import axios from "axios";
import Chartsforperformances from "./Chartsforperformances";
import Chartsforperformances2 from "./Chartsforperformances2";

function Performance() {
  const [test, setTest] = useState([]);
  const token = localStorage.getItem("token");

  const getdata = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/attemptedtests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTest(response.data);
    } catch (error) {
      console.error("Error fetching test data:", error);
    }
  };

  
  const getSubjectScores = () => {
    return test.flatMap((testItem) => testItem.subjectScores || []);
  };

  const getTestScores = () => {
    return test.map((item) => item.score || 0);
  };

  
  const calculateInsights = (subjectScores) => {
    const strengths = [];
    const weaknesses = [];
    const threshold = { strong: 150, weak: 45 };

    subjectScores.forEach((score) => {
      if (score.score >= threshold.strong) strengths.push(score.subjectName);
      if (score.score <= threshold.weak) weaknesses.push(score.subjectName);
    });

    return { strengths, weaknesses };
  };

  useEffect(() => {
    getdata();
  }, []);

  const subjectScores = getSubjectScores();
  const testScores = getTestScores();
  const insights = calculateInsights(subjectScores);

  return (
    <div
      className="Performance-container"
      style={{
        textAlign: "center",
        fontSize: "1.5rem",
        color: "#2c3e50",
        marginTop: "18px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Detailed Performance Analysis</h1>


     {test.length>0?(<>
     <div className="chart-wrapper">
      <Chartsforperformances2 testScores={testScores} />
      </div>
<div className="chart-wrapper" >
    
<Chartsforperformances subjectScores={subjectScores} /></div>
<div style={{ marginTop: "30px", width: "80%" }}>
        <h2>Strengths</h2>
        {insights.strengths.length > 0 ? (
          <ul>
            {insights.strengths.map((subject) => (
              <li key={subject}>{subject} ,</li>
            ))}
          </ul>
        ) : (
          <p>No strengths identified yet. Keep practicing!</p>
        )}

        <h2 style={{ marginTop: "20px" }}>Weaknesses</h2>
        {insights.weaknesses.length > 0 ? (
          
            <p>Need improvement in &nbsp;
            {insights.weaknesses.map((subject) => (
              <p style={{display:"inline-block"}} key={subject}> {subject} ,</p>
            ))}</p>
          
        ) : (
          <p>No weaknesses identified</p>
        )}
      </div>
     </>


     ):(<div>Please give tests first </div>)} 

    
      
    </div>
  );
}

export default Performance;
