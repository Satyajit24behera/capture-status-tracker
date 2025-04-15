
export interface AgentData {
  agentName: string;
  city: string;
  totalSKUs: number;
  captured: number;
}

export interface CityData {
  city: string;
  totalSKUs: number;
  captured: number;
  percentage: number;
}
