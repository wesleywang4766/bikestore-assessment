import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabHeaderProps {
  statuses: string[];
  currentStatus: string;
  onStatusChange: (status: string) => void;
}

export const TabHeader: React.FC<TabHeaderProps> = ({ statuses, currentStatus, onStatusChange }) => (
  <TabsList>
    {statuses.map((status) => (
      <TabsTrigger key={status} value={status} onClick={() => onStatusChange(status)}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </TabsTrigger>
    ))}
  </TabsList>
);