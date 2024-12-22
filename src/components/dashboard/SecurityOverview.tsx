"use client";

import { Shield, AlertTriangle, Users, Lock } from "lucide-react";
import { useEffect, useState } from "react";

const statsTemplate = [
  {
    name: "Security Score Today",
    icon: Lock,
    color: "from-green-400 to-green-600",
    value: "",
  },
  {
    name: "Requests Today",
    icon: Users,
    color: "from-blue-400 to-blue-600",
    value: "",
  },
  {
    name: "Alerts Today",
    icon: AlertTriangle,
    color: "from-red-400 to-red-600",
    value: "",
  },
  {
    name: "Total Requests",
    icon: Shield,
    color: "from-purple-400 to-purple-600",
    value: "",
  },
];

type Metrics = {
  totalRequestCount: number;
  totalMaliciousRequest: number;
  totalMaliciousRequestToday: number;
  totalNormalRequestToday: number;
};

export default function SecurityOverview() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch("/api/metrics");
        if (response.ok) {
          const data = await response.json();
          setMetrics(data);
        } else {
          setError("Failed to fetch metrics.");
        }
      } catch (error) {
        setError("An error occurred while fetching metrics.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500 "></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow hover:from-indigo-600 hover:to-purple-600  transform hover:scale-105 transition-transform"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  const stats = [...statsTemplate];
  stats[0].value =
    ((metrics!.totalMaliciousRequest / metrics!.totalRequestCount) * 100)
      .toFixed(1)
      .toString() + "%";
  stats[1].value = (
    metrics!.totalMaliciousRequestToday + metrics!.totalNormalRequestToday
  ).toString();
  stats[2].value = metrics!.totalMaliciousRequestToday.toString();
  stats[3].value = metrics!.totalRequestCount.toString();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`group relative p-6 rounded-lg shadow-lg bg-gradient-to-br ${stat.color} text-white hover:shadow-xl transition-all duration-500 transform hover:scale-105 my-5 rounded-xl overflow-hidden`}
        >
          <div className="flex items-center space-x-4">
            <stat.icon className="h-12 w-12 bg-white p-2 rounded-full text-gray-800 shadow-lg group-hover:animate-bounce transition-all" />
            <div>
              <p className="text-lg font-medium">{stat.name}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br from-black to-gray-900 rounded-lg"></div>
        </div>
      ))}
    </div>
  );
}
