
export type AttackType =
  | "SQLI"
  | "CMDI"
  | "LFI"
  | "NOSQLI"
  | "CSSI"
  | "HTMLI"
  | "XXE"
  | "XSS"
  | "SSRF";

export interface LogEntry {
  id: string;
  attackType: AttackType;
  attackPayload:string;
  ip: string;
  endpoint: string;
  method:string;
  createdAt: string;
}

const attackTypes: AttackType[] = [
  "SQLI",
  "CMDI",
  "LFI",
  "NOSQLI",
  "CSSI",
  "HTMLI",
  "XXE",
  "XSS",
  "SSRF"
];


