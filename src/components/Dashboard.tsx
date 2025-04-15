
import React from "react";
import AgentView from "@/components/AgentView";
import CityView from "@/components/CityView";
import { AgentData } from "@/types/data";

interface DashboardProps {
  agentData: AgentData[];
  isLoading: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ agentData, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="h-12 w-12 border-4 border-t-4 border-primary rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium">Loading data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <AgentView agentData={agentData} />
      <CityView agentData={agentData} />
    </div>
  );
};

export default Dashboard;
