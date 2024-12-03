export async function fetchActivities() {
  const response = await fetch('/api/activities');
  if (!response.ok) throw new Error('Failed to fetch activities');
  return response.json();
}

export async function fetchThreats() {
  const response = await fetch('/api/threats');
  if (!response.ok) throw new Error('Failed to fetch threats');
  return response.json();
}

export async function fetchMetrics() {
  const response = await fetch('/api/metrics');
  if (!response.ok) throw new Error('Failed to fetch metrics');
  return response.json();
}