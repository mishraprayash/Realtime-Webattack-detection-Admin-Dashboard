"use client";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartComponentProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  };
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => {
  return (
    <div style={{ width: "100%", height: "400px", position: "relative" }}>  {/* Set a fixed height, like 400px */}
      <Bar
        data={data}
        options={{
          responsive: true, // Makes the chart responsive
          maintainAspectRatio: false, // Allows the chart to grow and shrink with the container
          plugins: {
            title: {
              display: true,
              text: "Attack Distribution Count",
              font: {
                size: 16,
              },
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                },
              },
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                autoSkip: false,
                maxRotation: 90,
                minRotation: 45,
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default BarChartComponent;
