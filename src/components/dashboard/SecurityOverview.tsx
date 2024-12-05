"use client"
import { Shield, AlertTriangle, Users, Lock } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';
import { useEffect, useState } from 'react';

const stats = [
  { name: 'Security Score Today',  icon: Lock, color: 'text-green-500',value:"" },
  { name: 'Requests Today',  icon: Users, color: 'text-blue-500',value:"" },
  { name: 'Alerts Today',  icon: AlertTriangle, color: 'text-yellow-500',value:"" },
  { name: 'Total Request',  icon: Users, color: 'text-yellow-500',value:"" },
];

type metrics = {
  totalRequestCount:number,
  totalMaliciousRequest:number,
  totalMaliciousRequestToday:number,
  totalNormalRequestToday:number
}

export default function SecurityOverview() {

  const [metrics, setMetrics] = useState<metrics>();

  useEffect(()=>{
    const fetchMetrics = async()=>{
      try {
        const response = await fetch('/api/metrics')
        if(response.status==200){
          const data = await response.json();
          setMetrics(data)
          console.log(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchMetrics();
  },[])
  if(!metrics){
    return <p>Loading...</p>
  }
  stats[1].value = (metrics.totalMaliciousRequestToday+metrics.totalNormalRequestToday).toString();
  stats[0].value = ((metrics.totalMaliciousRequest/metrics.totalRequestCount)*100).toString().slice(0,2)+"%";
  stats[2].value = metrics.totalMaliciousRequestToday.toString();
  stats[3].value = metrics.totalRequestCount.toString();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
      {stats.map((stat,index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}