"use client";
export default function DashboardHeader() {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold">Security Dashboard</h1>
      <p className="text-sm text-gray-400">
        Monitor your system&apos;s security status and recent activities
      </p>
      <button className="bg-gray-300 text-gray-800 px-4 py-2 mt-4 rounded-full" onClick={()=>window.location.href="/securitythreats"}>View Logs</button>
    </div>
  );
}
