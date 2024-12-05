import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LogEntry } from "@/utils/mockData";


interface LogsTableProps {
  logs: LogEntry[];
}

export function LogsTable({ logs }: LogsTableProps) {
  if(logs.length>0){
  return (
    <Table>
      <TableHeader>
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
          <TableRow key={log.id}>
            <TableCell>{log.method}</TableCell>
            <TableCell>{log.endpoint}</TableCell>
            <TableCell>{log.ip}</TableCell>
            <TableCell>{log.attackType}</TableCell>
            <TableCell>{new Date(log.createdAt).toUTCString()}.</TableCell>
            <TableCell>{log.attackPayload}.</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );}
  else return <div className="flex justify-center items-center ">
    No records found
  </div>
}
