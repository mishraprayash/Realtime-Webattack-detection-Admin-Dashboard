import { Logs } from "./logs";

export default function AttackLogsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-10 text-center bg-blue-200 p-5 rounded-2xl">Attack Logs </h1>
      <Logs />
    </div>
  );
}
