import { Clock } from 'lucide-react';
import { activities } from '@/lib/activity-data';
import ActivityItem from '@/components/ui/ActivityItem';

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-gray-500 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} {...activity} />
        ))}
      </div>
    </div>
  );
}