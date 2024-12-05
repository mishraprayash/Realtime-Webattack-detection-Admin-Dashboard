import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  name: string;
  value:string,
  icon: LucideIcon;
  color: string;
}

export default function StatCard({ name,value, icon: Icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{name}</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full bg-gray-50 ${color}`}>,
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}