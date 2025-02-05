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

function Chartsforresult({ subjectScores }) {
    const subjectScoresArray = Object.entries(subjectScores).map(([subjectName, values]) => ({
        subjectName,
        ...values,
      }));
  const chartData = {
    labels:  subjectScoresArray.map((subject) => subject.subjectName),
    datasets: [
      {
        label: "Score",
        data:  subjectScoresArray.map((subject) => subject.score),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Total Questions",
        data:  subjectScoresArray.map((subject) => subject.totalQuestions),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Subject Scores Chart",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <h2>Subject Scores</h2>
      <div className="bar-chart-wrapper" >
      <Bar data={chartData} options={chartOptions} />
    </div></div>
  );
}

export default Chartsforresult;
