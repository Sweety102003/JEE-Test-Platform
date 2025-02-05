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

function Chartsforperformances2({ testScores }) {
  // Labels and data for the chart
  const chartData = {
    labels: testScores.map((_, index) => `Test ${index + 1}`), // Test labels like Test 1, Test 2, etc.
    datasets: [
      {
        label: "Test Scores",
        data: testScores,
        backgroundColor: "rgba(196, 123, 28, 0.6)", // A different color to differentiate from subject scores
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
        text: "Test Scores Chart",
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
          text: "Test",
        },
      },
    },
  };

  return (
    <div className="chart-section">
      <h2 style={{ fontSize: "1.5rem" }}>Scores Across Different Tests</h2>
      <div className="bar-chart-wrapper">
      <Bar data={chartData} options={chartOptions} /></div>
    </div>
  );
}

export default Chartsforperformances2;
