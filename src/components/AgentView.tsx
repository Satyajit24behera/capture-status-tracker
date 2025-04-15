
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProgressBar from "@/components/ProgressBar";
import { AgentData } from "@/types/data";
import { ArrowDownUp, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AgentViewProps {
  agentData: AgentData[];
}

const AgentView: React.FC<AgentViewProps> = ({ agentData }) => {
  const [sortField, setSortField] = React.useState<keyof AgentData>("agentName");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof AgentData) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: keyof AgentData) => {
    if (field !== sortField) return <ArrowDownUp size={16} />;
    return sortDirection === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
  };

  const sortedData = [...agentData].sort((a, b) => {
    // Handle numeric fields differently
    if (sortField === "captured" || sortField === "totalSKUs") {
      return sortDirection === "asc" 
        ? Number(a[sortField]) - Number(b[sortField])
        : Number(b[sortField]) - Number(a[sortField]);
    }
    
    // Handle string fields
    const fieldA = String(a[sortField]).toLowerCase();
    const fieldB = String(b[sortField]).toLowerCase();
    
    if (sortDirection === "asc") {
      return fieldA.localeCompare(fieldB);
    } else {
      return fieldB.localeCompare(fieldA);
    }
  });

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl">Agent-wise Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-1 font-semibold"
                    onClick={() => handleSort("agentName")}
                  >
                    Agent {getSortIcon("agentName")}
                  </Button>
                </th>
                <th className="text-left py-3 px-4">
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-1 font-semibold"
                    onClick={() => handleSort("city")}
                  >
                    City {getSortIcon("city")}
                  </Button>
                </th>
                <th className="text-left py-3 px-4">
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-1 font-semibold"
                    onClick={() => handleSort("totalSKUs")}
                  >
                    Total SKUs {getSortIcon("totalSKUs")}
                  </Button>
                </th>
                <th className="text-left py-3 px-4 w-1/3">Progress</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((agent, index) => {
                const percentage = Math.round((agent.captured / agent.totalSKUs) * 100);
                
                return (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{agent.agentName}</td>
                    <td className="py-3 px-4">{agent.city}</td>
                    <td className="py-3 px-4">{agent.totalSKUs}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <ProgressBar percentage={percentage} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentView;
