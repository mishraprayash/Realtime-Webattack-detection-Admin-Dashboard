import { Shield, AlertTriangle, Users, Lock } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';

const stats = [
  { name: 'Active Threats', value: '12', change: '+2', icon: Shield, color: 'text-red-500' },
  { name: 'Security Score', value: '85%', change: '+5%', icon: Lock, color: 'text-green-500' },
  { name: 'Active Users', value: '1,234', change: '+30', icon: Users, color: 'text-blue-500' },
  { name: 'Alerts Today', value: '24', change: '-3', icon: AlertTriangle, color: 'text-yellow-500' },
];

export default function SecurityOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <StatCard key={stat.name} {...stat} />
      ))}
    </div>
  );
}