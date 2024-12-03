import { subHours } from "date-fns";

export type AttackType =
  | "SQL"
  | "CMD"
  | "LFI"
  | "NoSQL"
  | "CSS"
  | "HTML"
  | "XXE"
  | "XSS";

export interface LogEntry {
  id: string;
  type: AttackType;
  ip: string;
  location: string;
  latitude: number;
  longitude: number;
  timestamp: Date;
}

const attackTypes: AttackType[] = [
  "SQL",
  "CMD",
  "LFI",
  "NoSQL",
  "CSS",
  "HTML",
  "XXE",
  "XSS",
];

const locations = [
  { city: "New York", country: "USA", lat: 40.7128, lon: -74.006 },
  { city: "London", country: "UK", lat: 51.5074, lon: -0.1278 },
  { city: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503 },
  { city: "Moscow", country: "Russia", lat: 55.7558, lon: 37.6173 },
  { city: "São Paulo", country: "Brazil", lat: -23.5505, lon: -46.6333 },
];

function generateRandomIP(): string {
  return Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * 256))
    .join(".");
}

export function generateMockLogs(count: number): LogEntry[] {
  return Array(count)
    .fill(null)
    .map((_, index) => {
      const location = locations[Math.floor(Math.random() * locations.length)];
      return {
        id: `log-${index}`,
        type: attackTypes[Math.floor(Math.random() * attackTypes.length)],
        ip: generateRandomIP(),
        location: `${location.city}, ${location.country}`,
        latitude: location.lat,
        longitude: location.lon,
        timestamp: subHours(new Date(), Math.random() * 24),
      };
    });
}
