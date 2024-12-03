import { PieChart } from 'lucide-react';
import dynamic from 'next/dynamic';
import { attackData } from '@/lib/chart-config';

const PieChartComponent = dynamic(() => import('@/components/ui/PieChartComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  ),
});

export default function AttackStatistics() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <PieChart className="h-5 w-5 text-gray-500 mr-2" />
        <h2 className="text-lg font-medium text-gray-900">Attack Distribution</h2>
      </div>
      <PieChartComponent data={attackData} />
      <div className="mt-4 text-sm text-gray-500 text-center">
        Total Attacks Detected: {attackData.datasets[0].data.reduce((a, b) => a + b, 0)}
      </div>
    </div>
  );
}