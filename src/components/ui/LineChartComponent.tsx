"use client";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register required components
ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);
interface LineChartData {
  labels: string[] ; // X-axis labels, could be strings or numbers
  datasets: Dataset[];
}

interface Dataset {
  label: string; // Label for the dataset
  data: number[]; // Array of data points for the chart
  backgroundColor: string; // Color of the line or area
  borderColor: string; // Border color of the line
  borderWidth: number; // Width of the line
  tension: number; // Line tension for smooth curves
}

export default function LineChartComponent({ data }:{data: LineChartData}) {
  return <Line data={data} />;
}
