import { Logs } from "../securitythreats/logs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AttackLogsPage() {
  const admintoken = cookies().get("token");
  if (!admintoken || admintoken.value !== "admintoken") {
    redirect("/");
  }
  return (
    <div className="p-5 w-full">
      <h1 className="text-3xl font-bold mb-5 text-center p-5 rounded-2xl bg-gray-800 text-white">
        Attack Logs
      </h1>
      <Logs />
    </div>
  );
}
