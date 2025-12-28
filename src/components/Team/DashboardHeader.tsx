// components/dashboard/DashboardHeader.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DashboardHeader({
  selectedMonth,
  onMonthChange,
}: {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}) {
  return (
    <header className="sticky top-0 z-50 border-b bg-card backdrop-blur supports-[backdrop-filter]:bg-card/95">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dark Pharos</h1>
              <p className="text-sm text-muted-foreground">TEAM-DP-001</p>
            </div>
            <Badge variant="default" className="h-fit">Team Leader</Badge>
            <Badge variant="destructive" className="h-fit">Active</Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedMonth} onValueChange={onMonthChange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="january">January 2024</SelectItem>
                  <SelectItem value="february">February 2024</SelectItem>
                  <SelectItem value="march">March 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          You can assign tasks, update KPI, and edit orders
        </p>
      </div>
    </header>
  );
}