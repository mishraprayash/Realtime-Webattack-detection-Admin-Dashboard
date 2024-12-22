"use client";

import { useEffect, useMemo, useState } from "react";
import { LogsTable } from "./logs-table";
import { LogEntry, AttackType } from "@/utils/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

const TIME_FILTERS = [
  { label: "Today", value: "today" },
  { label: "Last 7 Days", value: "last7days" },
  { label: "Last Month", value: "lastmonth" },
  { label: "All Time", value: "alltime" },
];

interface SelectInputProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  className?: string;
}

const PAGE_SIZE = 30; // Logs per page

const SelectInput: React.FC<SelectInputProps> = ({
  value,
  onChange,
  options,
  className,
}) => (
  <select
    className={`border rounded px-3 py-2 text-sm ${className}`}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >
    {options.map(({ label, value: optionValue }) => (
      <option key={optionValue} value={optionValue}>
        {label}
      </option>
    ))}
  </select>
);

export function Logs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState({
    attackType: "ALL",
    ip: "",
    time: "alltime",
  });
  const [currentPage, setCurrentPage] = useState(1);
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
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
      case "last7days":
        return new Date(now.setDate(now.getDate() - 7));
      case "lastmonth":
        return new Date(now.setMonth(now.getMonth() - 1));
      default:
        return null;
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

  const handleFilterChange = (key: keyof typeof filter, value: string) => {
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
          className={`px-3 py-1 border rounded text-sm ${
            page === currentPage
              ? "bg-blue-500 text-white"
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
          className="px-3 py-1 border rounded text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          {"<<"}
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          {"<"}
        </button>
        {pages}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          {">"}
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          {">>"}
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        {/* Attack Type Filter */}
        <SelectInput
          value={filter.attackType}
          onChange={(value: any) => handleFilterChange("attackType", value)}
          options={[
            { label: "All Attacks", value: "ALL" },
            ...ATTACK_TYPES.map((type) => ({ label: type, value: type })),
          ]}
          className={"w-40"}
        />

        {/* IP Filter */}
        <Input
          placeholder="Search IP"
          className="w-40 border text-sm"
          value={filter.ip}
          onChange={(e) => handleFilterChange("ip", e.target.value)}
        />

        {/* Time Filter */}
        <SelectInput
          value={filter.time}
          onChange={(value: any) => handleFilterChange("time", value)}
          options={TIME_FILTERS}
          className={"w-40"}
        />

        {/* Refresh Data */}
        <Button
          onClick={() => fetchLogs()}
          className="bg-gray-700 text-white hover:bg-gray-600 rounded-2xl"
        >
          Refresh Data
        </Button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
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



