
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProgressBar from "@/components/ProgressBar";
import { AgentData, CityData } from "@/types/data";
import { ArrowDownUp, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CityViewProps {
  agentData: AgentData[];
}

const CityView: React.FC<CityViewProps> = ({ agentData }) => {
  const [sortField, setSortField] = React.useState<keyof CityData>("city");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");

  // Aggregate data by city
  const cityData: CityData[] = React.useMemo(() => {
    const cities: Record<string, CityData> = {};

    agentData.forEach(agent => {
      if (!cities[agent.city]) {
        cities[agent.city] = {
          city: agent.city,
          totalSKUs: 0,
          captured: 0,
          percentage: 0
        };
      }
      
      cities[agent.city].totalSKUs += agent.totalSKUs;
      cities[agent.city].captured += agent.captured;
    });

    // Calculate percentages
    return Object.values(cities).map(city => ({
      ...city,
      percentage: Math.round((city.captured / city.totalSKUs) * 100)
    }));
  }, [agentData]);

  const handleSort = (field: keyof CityData) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: keyof CityData) => {
    if (field !== sortField) return <ArrowDownUp size={16} />;
    return sortDirection === "asc" ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
  };

  const sortedData = [...cityData].sort((a, b) => {
    // Handle numeric fields differently
    if (sortField === "captured" || sortField === "totalSKUs" || sortField === "percentage") {
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
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">City-wise Aggregated View</CardTitle>
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
                <th className="text-left py-3 px-4">
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-1 font-semibold"
                    onClick={() => handleSort("captured")}
                  >
                    Captured {getSortIcon("captured")}
                  </Button>
                </th>
                <th className="text-left py-3 px-4 w-1/3">
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-1 font-semibold"
                    onClick={() => handleSort("percentage")}
                  >
                    Progress {getSortIcon("percentage")}
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((city, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{city.city}</td>
                  <td className="py-3 px-4">{city.totalSKUs}</td>
                  <td className="py-3 px-4">{city.captured}</td>
                  <td className="py-3 px-4">
                    <ProgressBar percentage={city.percentage} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CityView;
