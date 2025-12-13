/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

const recentLeaves = [
  {
    id: 1,
    leaveType: "Casual Leave",
    duration: "2 days",
    status: "Approved",
    date: "2024-12-10 to 2024-12-11",
  },
  {
    id: 2,
    leaveType: "Sick Leave",
    duration: "1 day",
    status: "Pending",
    date: "2024-12-16",
  },
  {
    id: 3,
    leaveType: "Earned Leave",
    duration: "5 days",
    status: "Approved",
    date: "2024-12-23 to 2024-12-27",
  },
  {
    id: 4,
    leaveType: "Casual Leave",
    duration: "1 day",
    status: "Rejected",
    date: "2024-12-05",
  },
  {
    id: 5,
    leaveType: "Sick Leave",
    duration: "3 days",
    status: "Approved",
    date: "2024-11-28 to 2024-11-30",
  },
];

// Helper to extract month from a date string (supports both "YYYY-MM-DD" and "YYYY-MM-DD to YYYY-MM-DD")
const extractMonthFromDateString = (dateStr: string): number => {
  // Take the first part of the date (before " to ")
  const firstDatePart = dateStr.split(" to ")[0];
  const [year, month] = firstDatePart.split("-").map(Number);
  return month; // returns 1–12
};

function LeaveStatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Approved: "bg-green-100 text-green-800 hover:bg-green-100",
    Pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    Rejected: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  return <Badge className={colors[status]}>{status}</Badge>;
}

export function RecentLeavesTable() {
  const [selectedMonth, setSelectedMonth] = useState<number | "all">("all");

  // Filter leaves based on selected month
  const filteredLeaves = selectedMonth === "all"
    ? recentLeaves
    : recentLeaves.filter((leave) => extractMonthFromDateString(leave.date) === selectedMonth);

  // Generate month options (you can adjust based on real data or current year)
  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1); // 1 to 12

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold text-slate-900">Leave History</CardTitle>
        <div>
          <label htmlFor="month-filter" className="text-sm text-slate-600 mr-2">Filter by Month:</label>
          <select
            id="month-filter"
            value={selectedMonth}
            onChange={(e) =>
              setSelectedMonth(e.target.value === "all" ? "all" : Number(e.target.value))
            }
            className="text-sm border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-slate-400"
          >
            <option value="all">All Months</option>
            {monthOptions.map((month) => (
              <option key={month} value={month}>
                {new Date(2024, month - 1).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200">
                <TableHead className="text-slate-700 font-semibold">Leave Type</TableHead>
                <TableHead className="text-slate-700 font-semibold">Duration</TableHead>
                <TableHead className="text-slate-700 font-semibold">Status</TableHead>
                <TableHead className="text-slate-700 font-semibold">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeaves.map((leave) => (
                <TableRow key={leave.id} className="border-slate-100 hover:bg-slate-50">
                  <TableCell className="font-medium text-slate-900">{leave.leaveType}</TableCell>
                  <TableCell className="text-slate-600">{leave.duration}</TableCell>
                  <TableCell>
                    <LeaveStatusBadge status={leave.status} />
                  </TableCell>
                  <TableCell className="text-slate-600">{leave.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}