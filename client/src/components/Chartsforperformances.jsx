import React from "react";
import "./css files/chart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chartsforperformances({ subjectScores }) {
  
  const groupedScores = subjectScores.reduce((acc, scoreData) => {
    const { subjectName, score } = scoreData; 
    if (!acc[subjectName]) {
      acc[subjectName] = [];
    }
    acc[subjectName].push(score);
    return acc;
  }, {});

  
  const testCount = Math.max(...Object.values(groupedScores).map((scores) => scores.length));
  const labels = Array.from({ length: testCount }, (_, index) => `Test ${index + 1}`);

  
  const datasets = Object.entries(groupedScores).map(([subjectName, scores]) => ({
    label: subjectName,
    data: scores,
    backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, 0.6)`, 
  }));

  const chartData = {
    labels, 
    datasets, 
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Scores by Subject Across Tests",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Score",
        },
      },
      x: {
        title: {
          display: true,
          text: "Tests",
        },
      },
    },
  };

  return (
    <div className="chart-section">
      <h2 style={{ fontSize: "1.5rem" }}>Subject Scores Across Tests</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default Chartsforperformances;
