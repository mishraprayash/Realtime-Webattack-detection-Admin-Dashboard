"use client";

import { useState } from "react";
import { LogsTable } from "./logs-table";
import { generateMockLogs, LogEntry, AttackType } from "@/utils/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Logs() {
  const [logs, setLogs] = useState<LogEntry[]>(() => generateMockLogs(100));
  const [filter, setFilter] = useState<AttackType | "ALL">("ALL");

  const filteredLogs =
    filter === "ALL" ? logs : logs.filter((log) => log.type === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <select
          className="border rounded p-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value as AttackType | "ALL")}
        >
          <option value="ALL">All Attacks</option>
          <option value="SQL">SQL</option>
          <option value="CMD">CMD</option>
          <option value="LFI">LFI</option>
          <option value="NoSQL">NoSQL</option>
          <option value="CSS">CSS</option>
          <option value="HTML">HTML</option>
          <option value="XXE">XXE</option>
          <option value="XSS">XSS</option>
        </select>
        <div className="flex ">
          <Input placeholder="Search IP" className="w-40" />
          <Button type="submit">Search</Button>
        </div>
        <Button
          //   className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setLogs(generateMockLogs(100))}
        >
          Refresh Data
        </Button>
      </div>
      <LogsTable logs={filteredLogs} />
    </div>
  );
}
