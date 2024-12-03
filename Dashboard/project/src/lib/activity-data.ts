export const activities = [
  {
    id: 1,
    user: 'Sarah Chen',
    action: 'Failed login attempt',
    location: 'Beijing, CN',
    time: '2 minutes ago',
    status: 'high' as const,
  },
  {
    id: 2,
    user: 'James Wilson',
    action: 'Password changed',
    location: 'London, UK',
    time: '15 minutes ago',
    status: 'normal' as const,
  },
  {
    id: 3,
    user: 'Maria Garcia',
    action: 'New device detected',
    location: 'Madrid, ES',
    time: '1 hour ago',
    status: 'medium' as const,
  },
  {
    id: 4,
    user: 'Alex Thompson',
    action: 'Accessed admin panel',
    location: 'New York, US',
    time: '2 hours ago',
    status: 'normal' as const,
  },
];