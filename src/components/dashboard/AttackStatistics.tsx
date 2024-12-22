import { PieChart, BarChart, LineChart } from "lucide-react";
import dynamic from "next/dynamic";
import { prisma } from "@/lib/prisma";

const PieChartComponent = dynamic(
  () => import("@/components/ui/PieChartComponent"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    ),
  }
);

const BarChartComponent = dynamic(
  () => import("@/components/ui/BarChartComponent"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    ),
  }
);

const LineChartComponent = dynamic(
  () => import("@/components/ui/LineChartComponent"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    ),
  }
);

const LABELS = [
  "SQLI",
  "XSS",
  "LFI",
  "SSRF",
  "CMDI",
  "NoSQLI",
  "XXE",
  "HTMLI",
  "CSSI",
];

async function getCategoryCounts() {
  const arrayOfCounts = await prisma.activity.groupBy({
    by: ["attackType"],
    _count: {
      attackType: true,
    },
  });

  const data = arrayOfCounts.map((item) => ({
    category: item.attackType,
    count: item._count.attackType,
  }));

  return data
    .filter((item) => item.category !== "NULL")
    .map((item) => item.count);
}

const attackCountArray = getCategoryCounts();

const pieChartData = {
  labels: LABELS,
  datasets: [
    {
      data: attackCountArray,
      backgroundColor: [
        "rgba(255, 99, 132, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(75, 192, 192, 0.8)",
        "rgba(153, 102, 255, 0.8)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const barChartData = {
  labels: LABELS,
  datasets: [
    {
      label: "Attack Frequency",
      data: attackCountArray,
      backgroundColor: "rgba(54, 162, 235, 0.8)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
  ],
};

const lineChartData = {
  labels: LABELS,
  datasets: [
    {
      label: "Attack Trends",
      data: attackCountArray,
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderWidth: 2,
      tension: 0.4,
    },
  ],
};

export default async function AttackStatistics() {
  const LABELS = [
    "SQLI",
    "XSS",
    "LFI",
    "SSRF",
    "CMDI",
    "NoSQLI",
    "XXE",
    "HTMLI",
    "CSSI",
  ];

  async function getCategoryCounts() {
    const arrayOfCounts = await prisma.activity.groupBy({
      by: ["attackType"],
      _count: {
        attackType: true,
      },
    });

    const data = arrayOfCounts.map((item) => ({
      category: item.attackType,
      count: item._count.attackType,
    }));

    return data
      .filter((item) => item.category !== "NULL")
      .map((item) => item.count);
  }

  const attackCountArray = await getCategoryCounts();

  const pieChartData = {
    labels: LABELS,
    datasets: [
      {
        data: attackCountArray,
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const barChartData = {
    labels: LABELS,
    datasets: [
      {
        label: "Attack Frequency",
        data: attackCountArray,
        backgroundColor: "rgba(54, 162, 235, 0.8)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: LABELS,
    datasets: [
      {
        label: "Attack Trends",
        data: attackCountArray,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Pie Chart */}
      <div className="group relative bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center mb-4">
          <PieChart className="h-8 w-8 text-indigo-500 group-hover:animate-spin" />
          <h2 className="ml-3 text-xl font-semibold text-gray-800 group-hover:text-indigo-500 transition-colors duration-300">
            Pie Chart
          </h2>
        </div>
        <PieChartComponent data={pieChartData} />
      </div>

      {/* Bar Chart */}
      <div className="group relative bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center mb-4">
          <BarChart className="h-8 w-8 text-blue-500 group-hover:scale-125 transition-transform duration-300" />
          <h2 className="ml-3 text-xl font-semibold text-gray-800 group-hover:text-blue-500 transition-colors duration-300">
            Bar Chart
          </h2>
        </div>
        <BarChartComponent data={barChartData} />
      </div>

      {/* Line Chart */}
      <div className="group relative bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 lg:col-span-2">
        <div className="flex items-center mb-4">
          <LineChart className="h-8 w-8 text-green-500 group-hover:rotate-45 transition-transform duration-300" />
          <h2 className="ml-3 text-xl font-semibold text-gray-800 group-hover:text-green-500 transition-colors duration-300">
            Line Chart
          </h2>
        </div>
        <LineChartComponent data={lineChartData} />
      </div>
    </div>
  );
}
