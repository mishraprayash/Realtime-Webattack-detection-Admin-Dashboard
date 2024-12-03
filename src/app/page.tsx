import SecurityOverview from '@/components/dashboard/SecurityOverview';
import RecentActivity from '@/components/dashboard/RecentActivity';
import AttackStatistics from '@/components/dashboard/AttackStatistics';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export default function Home() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <SecurityOverview />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttackStatistics />
        <RecentActivity />
      </div>
    </div>
  );
}