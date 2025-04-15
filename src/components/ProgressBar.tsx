
import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  percentage: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, className }) => {
  // Determine color based on percentage
  const getColorClass = () => {
    if (percentage < 50) return "bg-progress-low";
    if (percentage <= 80) return "bg-yellow-300";
    return "bg-green-500";
  };

  // For text color
  const getTextColorClass = () => {
    if (percentage < 50) return "text-progress-low";
    if (percentage <= 80) return "text-yellow-700";
    return "text-green-700";
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`${getColorClass()} h-4 rounded-full transition-all duration-500 ease-in-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className={`text-right font-semibold mt-1 ${getTextColorClass()}`}>
        {percentage}%
      </div>
    </div>
  );
};

export default ProgressBar;
