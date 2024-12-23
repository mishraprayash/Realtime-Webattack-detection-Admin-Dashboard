
"use client";

import { useEffect, useMemo, useState } from "react";
import { LogsTable } from "./logs-table";
import { Input } from "@/components/ui/input";
import { LogEntry } from "@/utils/mockData";

const ATTACK_TYPES = [
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

interface FilterState {
  attackType: string;
  ip: string;
  time: string;
  customRange: {
    start: Date | null;
    end: Date | null;
  };
}

const TIME_FILTERS = [
  { label: "1 Hour", value: "1hour" },
  { label: "3 Hours", value: "3hours" },
  { label: "6 Hours", value: "6hours" },
  { label: "Today", value: "today" },
  { label: "24 Hours", value: "24hours" },
  { label: "7 Days", value: "7days" },
  { label: "Month", value: "month" },
  { label: "All Time", value: "alltime" },
];

const PAGE_SIZE = 48;

export function Logs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState<FilterState>({
    attackType: "ALL",
    ip: "",
    time: "alltime",
    customRange: { start: null, end: null },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prev) => !prev);
  };

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/threats", { cache: "no-store" });
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
      case "1hour":
        return new Date(now.getTime() - 1 * 60 * 60 * 1000); // Subtract 1 hour
      case "3hours":
        return new Date(now.getTime() - 3 * 60 * 60 * 1000); // Subtract 3 hours
      case "6hours":
        return new Date(now.getTime() - 6 * 60 * 60 * 1000); // Subtract 6 hours
      case "24hours":
        return new Date(now.getTime() - 24 * 60 * 60 * 1000); // Subtract 24 hours
      case "today":
        return new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Midnight of today
      case "7days":
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // Subtract 7 days
      case "month":
        return new Date(now.setMonth(now.getMonth() - 1)); // Subtract 1 month
      default:
        return null; // No time filter
    }
  };

  const filteredLogs = useMemo(() => {
    const timeFilterDate = getDateRange(filter.time);
    return logs.filter(({ attackType, ip, createdAt }) => {
      const matchesType =
        filter.attackType === "ALL" || attackType === filter.attackType;
      const matchesIP = !filter.ip || ip.includes(filter.ip);
      const matchesTime =
        !timeFilterDate || new Date(createdAt) >= timeFilterDate;
      return matchesType && matchesIP && matchesTime;
    });
  }, [logs, filter]);

  const totalPages = Math.ceil(filteredLogs.length / PAGE_SIZE);

  const currentLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredLogs.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredLogs, currentPage]);

  const handleFilterChange = (key: keyof typeof filter, value: any) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to the first page on filter change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 border rounded-xl text-sm ${
            page === currentPage
              ? "bg-gray-700 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-lg text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          {"<<"}
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-lg text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          {"<"}
        </button>
        {pages}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-lg text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          {">"}
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-lg text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          {">>"}
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Row with Toggle Button */}
      <div className="flex justify-end items-center p-4 bg-white shadow rounded-xl">
        <button
          onClick={toggleFilterVisibility}
          className="px-5 py-2 transition-colors duration-200 rounded-xl shadow-md focus:outline-none bg-gray-700 text-white hover:bg-gray-800 mr-4"
        >
          {isFilterVisible ? "Hide Filters" : "Show Filters"}
        </button>
        <button
          onClick={fetchLogs}
          className="px-5 py-2 transition-colors duration-200 rounded-xl shadow-md focus:outline-none bg-gray-700 text-white hover:bg-gray-800"
        >
          Refresh Data
        </button>
      </div>

      {/* Filter Section */}
      {isFilterVisible && (
        <div className="flex flex-wrap justify-evenly items-center p-4 rounded-xl space-y-4 sm:space-y-0">
          <select
            value={filter.attackType}
            onChange={(e) => handleFilterChange("attackType", e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 focus:outline-none w-40 shadow-lg"
          >
            {ATTACK_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <Input
            placeholder="Search IP"
            className="w-40 rounded-lg shadow-lg"
            value={filter.ip}
            onChange={(e) => handleFilterChange("ip", e.target.value)}
          />

          <select
            value={filter.time}
            onChange={(e) => handleFilterChange("time", e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 focus:outline-none w-40 shadow-lg"
          >
            {TIME_FILTERS.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Logs Table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-500"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      ) : filteredLogs.length === 0 ? (
        <p className="text-center text-gray-600 font-medium">
          No data available for the selected filters.
        </p>
      ) : (
        <>
          <div className="flex justify-between items-center px-4">
            <p className=" text-gray-600 ml-4">
              Showing{" "}
              {currentLogs.length > 0 ? (currentPage - 1) * PAGE_SIZE + 1 : 0}-
              {Math.min(currentPage * PAGE_SIZE, filteredLogs.length)} of{" "}
              {filteredLogs.length} logs
            </p>
            {renderPagination()}
          </div>
          <LogsTable logs={currentLogs} />
        </>
      )}
    </div>
  );
}
