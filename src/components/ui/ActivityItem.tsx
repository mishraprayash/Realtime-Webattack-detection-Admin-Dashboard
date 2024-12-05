
interface ActivityItemProps {
  ip: string;
  createdAt: Date;
  attackType: string;
}

const statusColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  normal: "bg-green-100 text-green-800",
};

export default function ActivityItem({
  ip,
  createdAt,
  attackType,
}: ActivityItemProps) {

  return (
    <div className="px-6 py-4 bg-gray-200 rounded-lg m-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900">{ip}</p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-4">{attackType}</span>
        </div>
        <p className="mt-2 text-sm text-gray-500">{new Date(createdAt).toUTCString()}</p>
      </div>
    </div>
  );
}
