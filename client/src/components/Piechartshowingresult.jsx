import React from 'react'
import "./css files/chart.css"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
function Piechartshowingresult({ subjectScores }) {
    const subjectScoresArray = Object.entries(subjectScores).map(([subjectName, values]) => ({
        subjectName,
        ...values,
      }));
    const chartData = {
        labels: subjectScoresArray.map((subject) => subject.subjectName),
        datasets: [
          {
            label: "Score Distribution",
            data: subjectScoresArray.map((subject) => subject.score),
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
            ],
          },
        ],
      };
    
      const chartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return tooltipItem.label + ": " + tooltipItem.raw + " points";
              },
            },
          },
        },
      };
    
  return (
    
 <div className="chart-container">
      <h2>Score Distribution Across Subjects</h2>
      <Pie data={chartData} options={chartOptions} />
    </div>
    
  )
}

export default Piechartshowingresult