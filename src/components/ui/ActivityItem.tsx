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
      <div className="md:flex justify-between gap-6">
        <p className="font-bold text-gray-800 p-2  italic">
          <span className="font-normal text-gray-500">IP Address{":  "}</span>
          {ip}
        </p>

        <p className="text-red-500  p-2 font-bold">
          <span className="font-normal text-gray-500">Type{":  "}</span>
          {attackType}
        </p>

        <p className="text-gray-500 p-2">
          <span className="font-bold ">Date{":  "}</span>
          {new Date(createdAt).toUTCString()}
        </p>
      </div>
    </div>
  );
}
