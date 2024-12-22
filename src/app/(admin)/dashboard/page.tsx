import SecurityOverview from "@/components/dashboard/SecurityOverview";
import RecentActivity from "@/components/dashboard/RecentActivity";
import AttackStatistics from "@/components/dashboard/AttackStatistics";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const admintoken = cookies().get("token");
  if (!admintoken || admintoken.value !== "admintoken") {
    redirect("/");
  }
  return (
    <div className="flex flex-col flex-wrap">
      <DashboardHeader />
      <SecurityOverview />
      <AttackStatistics />
      {/* <div className=""> */}
        <RecentActivity />
      {/* </div> */}
    </div>  
  );
}
