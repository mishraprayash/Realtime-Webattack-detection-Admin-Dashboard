interface ActivityItemProps {
  id: number;
  user: string;
  action: string;
  location: string;
  time: string;
  status: 'high' | 'medium' | 'normal';
}

const statusColors = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  normal: 'bg-green-100 text-green-800',
};

export default function ActivityItem({ id, user, action, location, time, status }: ActivityItemProps) {
  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full"
            src={`https://images.unsplash.com/photo-${id + 1500000000000}-8e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
            alt=""
          />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900">{user}</p>
            <p className="text-sm text-gray-500">{action}</p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-4">{location}</span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}>
            {status}
          </span>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-500">{time}</p>
    </div>
  );
}