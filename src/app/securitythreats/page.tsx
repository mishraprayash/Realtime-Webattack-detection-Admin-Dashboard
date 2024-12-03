import { Logs } from "./logs";

export default function AttackLogsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Attack Logs Dashboard</h1>
      <Logs />
    </div>
  );
}
