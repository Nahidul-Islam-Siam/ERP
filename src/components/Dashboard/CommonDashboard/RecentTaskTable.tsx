'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

const recentTasks = [
  {
    id: 1,
    name: "Q4 Budget Planning",
    assignedBy: "John Smith",
    status: "In Progress",
    dueDate: "2024-12-15",
    priority: "High",
  },
  {
    id: 2,
    name: "Performance Review Forms",
    assignedBy: "Emily Davis",
    status: "Pending",
    dueDate: "2024-12-20",
    priority: "Medium",
  },
  {
    id: 3,
    name: "Team Building Event Planning",
    assignedBy: "Michael Brown",
    status: "Completed",
    dueDate: "2024-12-01",
    priority: "Low",
  },
  {
    id: 4,
    name: "Update Training Materials",
    assignedBy: "Sarah Johnson",
    status: "In Progress",
    dueDate: "2024-12-18",
    priority: "High",
  },
  {
    id: 5,
    name: "Policy Documentation Review",
    assignedBy: "John Smith",
    status: "Pending",
    dueDate: "2024-12-25",
    priority: "Medium",
  },
  {
    id: 6,
    name: "Recruitment Drive - Posting",
    assignedBy: "Lisa Anderson",
    status: "Completed",
    dueDate: "2024-11-30",
    priority: "High",
  },
];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Completed: "bg-green-100 text-green-800 hover:bg-green-100",
    "In Progress": "bg-blue-100 text-blue-800 hover:bg-blue-100",
    Pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  };

  return <Badge className={colors[status]}>{status}</Badge>;
}

function PriorityBadge({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    High: "bg-red-100 text-red-800 hover:bg-red-100",
    Medium: "bg-orange-100 text-orange-800 hover:bg-orange-100",
    Low: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  };

  return <Badge className={colors[priority]}>{priority}</Badge>;
}

export function RecentTasksTable() {
  const [selectedMonth, setSelectedMonth] = useState<number | "all">("all");

  // Filter tasks by selected month (based on dueDate)
  const filteredTasks = selectedMonth === "all"
    ? recentTasks
    : recentTasks.filter(task => {
        const taskMonth = new Date(task.dueDate).getMonth() + 1; // getMonth() is 0-indexed
        return taskMonth === selectedMonth;
      });

  // Generate month options (1–12)
  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <CardTitle className="text-base font-semibold text-slate-900">Recent Tasks</CardTitle>
          <div className="flex items-center gap-2">
            <label htmlFor="task-month-filter" className="text-sm text-slate-600 whitespace-nowrap">
              Filter by Month:
            </label>
            <select
              id="task-month-filter"
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
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200">
                <TableHead className="text-slate-700 font-semibold">Task Name</TableHead>
                <TableHead className="text-slate-700 font-semibold">Assigned By</TableHead>
                <TableHead className="text-slate-700 font-semibold">Status</TableHead>
                <TableHead className="text-slate-700 font-semibold">Due Date</TableHead>
                <TableHead className="text-slate-700 font-semibold">Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id} className="border-slate-100 hover:bg-slate-50">
                  <TableCell className="font-medium text-slate-900">{task.name}</TableCell>
                  <TableCell className="text-slate-600">{task.assignedBy}</TableCell>
                  <TableCell>
                    <StatusBadge status={task.status} />
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {new Date(task.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <PriorityBadge priority={task.priority} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}