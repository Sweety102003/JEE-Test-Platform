import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Chartsforresult from "./Chartsforresult";
import Piechartshowingresult from "./Piechartshowingresult";

function Result() {
  const location = useLocation();
  const { subjectScores } = location.state || {};
  const [performanceData, setPerformanceData] = useState([]);
  const [data, setData] = useState();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const getdata = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/results/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      setPerformanceData(response.data.performanceData);
    } catch (error) {
      console.error("Error fetching result data:", error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="contain">
      <h1 style={{ color: "#2c3e50", textAlign: "center", fontSize: "2rem" }}>Result</h1>
      {data && (
        <>
          <p>You have successfully attempted the test</p>
          <p style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Your Score: {data.score}</p>

          {subjectScores && (
            <>
              <div className="charts-container">
                <div className="chart-wrapper">
                  <Chartsforresult subjectScores={subjectScores} />
                </div>
                <div className="chart-wrapper">
                  <Piechartshowingresult subjectScores={subjectScores} />
                </div>
              </div>
            </>
          )}

          <div style={{ marginTop: "2rem" }}>
            <h2 style={{ textAlign: "center" }}>Time Spent on Each Question</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={performanceData.map((item, index) => ({
               
                  question: `Q${index + 1}`,
                  timeSpent: Math.floor(Number(item.timeTaken)||0),

                }))}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="question" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="timeSpent" fill="#8884d8" name="Time Spent (seconds)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default Result;
