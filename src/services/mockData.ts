
import { AgentData } from "@/types/data";

// Mock data for the application
export const mockAgentData: AgentData[] = [
  {
    agentName: "Amit Sharma",
    city: "Delhi",
    totalSKUs: 100,
    captured: 75
  },
  {
    agentName: "Priya Verma",
    city: "Mumbai",
    totalSKUs: 120,
    captured: 90
  },
  {
    agentName: "Rajesh Kumar",
    city: "Bangalore",
    totalSKUs: 80,
    captured: 35
  },
  {
    agentName: "Neha Singh",
    city: "Delhi",
    totalSKUs: 90,
    captured: 60
  },
  {
    agentName: "Vikram Malhotra",
    city: "Mumbai",
    totalSKUs: 110,
    captured: 95
  },
  {
    agentName: "Ananya Patel",
    city: "Ahmedabad",
    totalSKUs: 75,
    captured: 70
  },
  {
    agentName: "Sanjay Gupta",
    city: "Kolkata",
    totalSKUs: 85,
    captured: 40
  },
  {
    agentName: "Meera Desai",
    city: "Bangalore",
    totalSKUs: 95,
    captured: 75
  }
];

// Function to simulate an API call
export const fetchAgentData = (): Promise<AgentData[]> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(mockAgentData);
    }, 500);
  });
};
