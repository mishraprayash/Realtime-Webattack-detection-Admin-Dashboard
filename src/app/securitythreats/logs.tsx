// "use client";

// import { useEffect, useState } from "react";
// import { LogsTable } from "./logs-table";
// import { LogEntry, AttackType } from "@/utils/mockData";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export function Logs() {
//   const [logs, setLogs] = useState<LogEntry[]>([]);
//   const [filter, setFilter] = useState<AttackType | "ALL">("ALL");
//   const [ipfilter, setIPFilter] = useState<string>("");
//   const fetchLogs = async () => {
//     const response = await fetch("/api/threats");
//     if (response.ok) {
//       const data = await response.json();
//       setLogs(data);
//     }
//   };
//   useEffect(() => {
//     fetchLogs();
//   }, []);

//   let filteredLogs = filter === "ALL"
//       ? logs
//       : logs.filter((log) => log.attackType === filter);

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <select
//           className="border border-black rounded p-2"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value as AttackType | "ALL")}
//         >
//           <option value="ALL">All Attacks</option>
//           <option value="SQLI">SQL Injection</option>
//           <option value="CMDI">Command Injection</option>
//           <option value="LFI">Local File Inclusion</option>
//           <option value="NOSQLI">NoSQL Injection</option>
//           <option value="CSSI">CSS Injection</option>
//           <option value="HTMLI">HTML Injection</option>
//           <option value="XXE">XXE</option>
//           <option value="XSS">XSS</option>
//         </select>
//         <div className="flex gap-2">
//           <Input
//             placeholder="Search IP"
//             className="w-40  border-black"
//             onChange={(e) => {
//               setIPFilter(e.target.value);
//             }}
//           />
//           <Button type="submit">
//             Search
//           </Button>
//         </div>
//         <Button onClick={() => fetchLogs()}>Refresh Data</Button>
//       </div>
//       <LogsTable logs={filteredLogs} />
//     </div>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import { LogsTable } from "./logs-table";
import { LogEntry, AttackType } from "@/utils/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ATTACK_TYPES: (AttackType | "ALL")[] = [
  "ALL",
  "SQLI",
  "CMDI",
  "LFI",
  "NOSQLI",
  "CSSI",
  "HTMLI",
  "XXE",
  "XSS",
];

const TIME_FILTERS = [
  { label: "Today", value: "today" },
  { label: "Last 7 Days", value: "last7days" },
  { label: "Last Month", value: "lastmonth" },
  { label: "All Time", value: "alltime" },
];

const PAGE_SIZE = 20; // Number of logs to display per page

export function Logs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState({
    attackType: "ALL",
    ip: "",
    time: "alltime",
  });
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/threats");
      if (!response.ok) throw new Error("Failed to fetch logs");

      const data = await response.json();
      setLogs(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const getDateRange = (timeFilter: string) => {
    const now = new Date();
    switch (timeFilter) {
      case "today":
        // Reset to midnight today
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
      case "last7days":
        // Subtract 7 days from the current date
        return new Date(now.setDate(now.getDate() - 7));
      case "lastmonth":
        // Subtract 1 month from the current date
        return new Date(now.setMonth(now.getMonth() - 1));
      default:
        // No filtering for "alltime"
        return null;
    }
  };

  const filteredLogs = useMemo(() => {
    const timeFilterDate = getDateRange(filter.time);
    return logs.filter((log) => {
      const matchesType =
        filter.attackType === "ALL" || log.attackType === filter.attackType;
      const matchesIP = filter.ip === "" || log.ip.includes(filter.ip);
      const matchesTime =
        !timeFilterDate || new Date(log.createdAt) >= timeFilterDate;

      return matchesType && matchesIP && matchesTime;
    });
  }, [logs, filter]);

  const visibleLogs = useMemo(() => {
    return filteredLogs.slice(0, visibleCount);
  }, [filteredLogs, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        {/* Attack Type Filter */}
        <select
          className="border border-black rounded p-2"
          value={filter.attackType}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, attackType: e.target.value }))
          }
        >
          {ATTACK_TYPES.map((type) => (
            <option key={type} value={type}>
              {type === "ALL" ? "All Attacks" : type}
            </option>
          ))}
        </select>

        {/* IP Filter */}
        <Input
          placeholder="Search IP"
          className="w-40 border-black"
          value={filter.ip}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, ip: e.target.value }))
          }
        />

        {/* Time Filter */}
        <select
          className="border border-black rounded p-2"
          value={filter.time}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, time: e.target.value }))
          }
        >
          {TIME_FILTERS.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        {/* Refresh Data */}
        <Button onClick={fetchLogs}>Refresh Data</Button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <LogsTable logs={visibleLogs} />
          {visibleLogs.length < filteredLogs.length && (
            <div className="text-center mt-4">
              <Button onClick={handleLoadMore}>Load More Logs</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
