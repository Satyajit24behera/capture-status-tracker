
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAgentData } from "@/services/mockData";
import Dashboard from "@/components/Dashboard";
import { Card } from "@/components/ui/card";
import { ChartBar, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  
  const { data: agentData, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['agentData'],
    queryFn: fetchAgentData,
  });

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Refreshing data",
      description: "Getting the latest price capturing data.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <ChartBar className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Price Capture Dashboard</h1>
          </div>
          <Button 
            onClick={handleRefresh} 
            className="flex items-center gap-2"
            disabled={isLoading || isRefetching}
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh Data</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card className="p-6 shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow border">
                <h3 className="text-sm font-medium text-gray-500">Total Agents</h3>
                <p className="text-2xl font-bold">{agentData?.length || 0}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border">
                <h3 className="text-sm font-medium text-gray-500">Total Cities</h3>
                <p className="text-2xl font-bold">{
                  agentData ? new Set(agentData.map(item => item.city)).size : 0
                }</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border">
                <h3 className="text-sm font-medium text-gray-500">Total SKUs</h3>
                <p className="text-2xl font-bold">{
                  agentData?.reduce((sum, item) => sum + item.totalSKUs, 0) || 0
                }</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow border">
                <h3 className="text-sm font-medium text-gray-500">Overall Capture Rate</h3>
                <p className="text-2xl font-bold">{
                  agentData 
                    ? Math.round(
                        (agentData.reduce((sum, item) => sum + item.captured, 0) / 
                         agentData.reduce((sum, item) => sum + item.totalSKUs, 0)) * 100
                      ) + '%'
                    : '0%'
                }</p>
              </div>
            </div>

            <Dashboard 
              agentData={agentData || []} 
              isLoading={isLoading || isRefetching} 
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
