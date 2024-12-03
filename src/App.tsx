import React from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import SecurityOverview from './components/dashboard/SecurityOverview';
import RecentActivity from './components/dashboard/RecentActivity';
import AttackStatistics from './components/dashboard/AttackStatistics';

function App() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Security Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor your system's security status and recent activities
          </p>
        </div>
        
        <SecurityOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AttackStatistics />
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default App;