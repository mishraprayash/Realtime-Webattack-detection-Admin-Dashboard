import { Shield, Users, AlertTriangle, Settings, BarChart } from 'lucide-react';

export const navigation = [
  { name: 'Dashboard', icon: BarChart, current: true },
  { name: 'Security Threats', icon: Shield, current: false },
  { name: 'User Activity', icon: Users, current: false },
  { name: 'Alerts', icon: AlertTriangle, current: false },
  { name: 'Settings', icon: Settings, current: false },
];