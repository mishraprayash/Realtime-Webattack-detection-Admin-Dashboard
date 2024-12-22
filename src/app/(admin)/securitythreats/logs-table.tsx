import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Modal from "@/components/ui/modal";
import { LogEntry } from "@/utils/mockData";

interface LogsTableProps {
  logs: LogEntry[];
}

export function LogsTable({ logs }: LogsTableProps) {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [viewType, setViewType] = useState<"table" | "grid">("grid");
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const [showRedacted, setShowRedacted] = useState<boolean>(true); // state to toggle redacted view

  // Toggle row expansion to show/hide the payload
  const toggleRowExpansion = (rowId: string) => {
    setExpandedRows((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId]
    );
  };

  // Switch between Table and Grid view
  const toggleView = () => {
    setViewType(viewType === "table" ? "grid" : "table");
  };

  // Close the modal
  const handleModalClose = () => {
    setSelectedLog(null);
  };

  // Redact sensitive information (like email, password) in JSON
  const redactSensitiveInfo = (input: string): string => {
    // Handle JSON input (both single and double quotes)
    input = input
      .replace(/'email':\s*'[^']+'/g, "'email': '********'")
      .replace(/'password':\s*'[^']+'/g, "'password': '********'")
      .replace(/'token':\s*'[^']+'/g, "'token': '********'")
      .replace(/'username':\s*'[^']+'/g, "'username': '********'")
      .replace(/"email":\s*"[^"]+"/g, '"email": "********"')
      .replace(/"password":\s*"[^"]+"/g, '"password": "********"')
      .replace(/"token":\s*"[^"]+"/g, '"token": "********"')
      .replace(/"username":\s*"[^"]+"/g, '"username": "********"');
    
    // Handle form data (e.g., URL-encoded form data)
    input = input
      .replace(/(?:^|&)(email|password|token|username)=([^&]*)/gi, (match, key, value) => {
        return `&${key}=${key === 'password' || key === 'email' || key === 'username' || key === 'token' ? '********' : value}`;
      });
    
    // Optionally handle sensitive info in other places (cookies, headers, etc.)
    input = input
      .replace(/(?:^|;\s*)(email|password|token|username)=([^;]*)/gi, (match, key, value) => {
        return `; ${key}=${key === 'password' || key === 'email' || key === 'username' || key === 'token' ? '********' : value}`;
      });
    
    return input;
  };

  // Render Table view
  const renderTableView = () => (
    <Table className="border rounded-md shadow">
      <TableHeader className="bg-gray-100">
        <TableRow>
          <TableHead>Method</TableHead>
          <TableHead>Endpoint</TableHead>
          <TableHead>IP</TableHead>
          <TableHead>Attack Type</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead>Payload</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <TableRow
            key={log.id}
            className={`${
              expandedRows.includes(log.id) ? "bg-gray-50" : ""
            } hover:bg-gray-100`}
          >
            <TableCell>{log.method}</TableCell>
            <TableCell>{log.endpoint}</TableCell>
            <TableCell>{log.ip}</TableCell>
            <TableCell>{log.attackType}</TableCell>
            <TableCell>{new Date(log.createdAt).toUTCString()}</TableCell>
            <TableCell>
              <button
                onClick={() => {
                  // Set the selected log to show in the modal
                  setSelectedLog(log);
                }}
                className="text-blue-500 hover:underline"
              >
                {expandedRows.includes(log.id) ? "Hide" : "View"}
              </button>
              {expandedRows.includes(log.id) && (
                <div className="mt-2 p-2 border rounded bg-gray-50">
                  <pre className="text-xs text-gray-800 whitespace-pre-wrap">
                    {parseJSONSafely(log.attackPayload)}
                  </pre>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  // Render Grid view
  const renderGridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {logs.map((log) => (
        <div
          key={log.id}
          className={`p-4  rounded-md shadow-lg border-4 hover:scale-[99%] transition-all ${
            expandedRows.includes(log.id) ? "bg-gray-50" : "bg-white"
          } cursor-pointer`}
          onClick={() => setSelectedLog(log)}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-md text-white bg-red-500 px-1 py-1 rounded-xl w-fit mb-2 ">{log.attackType}</p>
              <h3 className="font-semibold text-lg overflow-hidden w-40 truncate">
                {log.method} - {log.endpoint}
              </h3>
            </div>
            <span className="text-sm text-gray-400">
              {new Date(log.createdAt).toUTCString()}
            </span>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              IP:{" "}
              <b>
                <i>{log.ip}</i>
              </b>
            </p>
            <button
              className="text-blue-500 hover:underline"
            >
              See Request
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // Render the modal for Grid view
  const renderLogDetailsModal = () => {
    if (!selectedLog) return null;
    return (
      <Modal onClose={handleModalClose}>
        <div className="relative p-3">
          {/* Button to toggle redacted content */}
          <button
            className="absolute top-[-40px] right-2 px-2 py-1 bg-gray-200 text-sm rounded-md"
            onClick={() => setShowRedacted(!showRedacted)}
          >
            {showRedacted ? "Show Redacted Info" : "Hide Sensitive Info"}
          </button>
          <div>
              <p className="whitespace-pre-wrap">
            <span className="text-blue-500 text-xl font-semibold">{selectedLog.method}</span> - <span className="text-[1rem] px-3 text-gray-700">{selectedLog.endpoint}</span>
          </p>
          <p className="text-lg font-mono font-extrabold text-gray-500 py-5">
            {selectedLog.attackType}
          </p>
          </div>
        

          <p className="mt-2 text-md text-gray-600">
            IP:{" "}
            <b>
              <i>{selectedLog.ip}</i>
            </b>
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Timestamp: {new Date(selectedLog.createdAt).toUTCString()}
          </p>
          <pre className="mt-4 p-4 border-black border-[0.1px] rounded bg-gray-50 text-sm text-gray-800 whitespace-pre-wrap overflow-auto max-w-full word-wrap break-word shadow-2xl">
            {showRedacted
              ? redactSensitiveInfo(selectedLog.attackPayload)
              : parseJSONSafely(selectedLog.attackPayload)}
          </pre>
        </div>
      </Modal>
    );
  };

  return (
    <div>
      <div className="flex justify-end items-center mb-4">
        <button
          onClick={toggleView}
          className="px-4 py-2 text-white bg-gray-700 rounded-xl"
        >
          {viewType === "table" ? "Grid View" : "Table View"}
        </button>
      </div>
      {viewType === "table" ? renderTableView() : renderGridView()}
      {renderLogDetailsModal()}
    </div>
  );
}

/** Helper function to safely parse JSON */
function parseJSONSafely(jsonString: string): string {
  try {
    return JSON.stringify(JSON.parse(jsonString), null, 2); // Pretty print JSON
  } catch (error) {
    return jsonString; // Return raw string if parsing fails
  }
}