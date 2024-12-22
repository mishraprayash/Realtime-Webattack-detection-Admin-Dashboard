import { Clock } from 'lucide-react';
import ActivityItem from '@/components/ui/ActivityItem';
import { fetchActivities } from '@/lib/api';


const RecentActivity = async()=> {
  const activities = await fetchActivities();
  return (
    <div className="bg-white rounded-lg shadow-sm flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-gray-500 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {activities.map((activity,index) => (
          <ActivityItem key={index} {...activity} />
        ))}
      </div>
    </div>
  );
}
export default RecentActivity;