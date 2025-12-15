'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Attendance = {
  date: string;
  inTime?: string;
  outTime?: string;
  manualIn?: string;
  manualOut?: string;
  totalHours?: string;
  actualStatus: "Present" | "Absent" | "Late" | "N/A";
  requestStatus?: "Present" | "Absent";
  reason?: string;
  approvalStatus?: "Approved" | "Pending" | "N/A";
};

const attendanceData: Attendance[] = [
  {
    date: "2025-12-01",
    inTime: "2:58 PM",
    outTime: "6:30 PM",
    totalHours: "3h 32m",
    actualStatus: "Late",
    approvalStatus: "N/A",
  },
  {
    date: "2025-12-02",
    actualStatus: "Absent",
    approvalStatus: "N/A",
  },
  {
    date: "2025-12-03",
    actualStatus: "Absent",
    approvalStatus: "N/A",
  },
];

function StatusBadge({ value }: { value: string }) {
  const map: Record<string, string> = {
    Present: "bg-green-100 text-green-800",
    Absent: "bg-red-100 text-red-800",
    Late: "bg-yellow-100 text-yellow-800",
    Approved: "bg-green-100 text-green-800",
    Pending: "bg-orange-100 text-orange-800",
    "N/A": "bg-slate-100 text-slate-600",
  };

  return <Badge className={map[value]}>{value}</Badge>;
}

export function EmployeeAttendanceSheet() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Attendance — Nahidul Islam
        </CardTitle>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>In Time</TableHead>
              <TableHead>Out Time</TableHead>
              <TableHead>Manual In</TableHead>
              <TableHead>Manual Out</TableHead>
              <TableHead>Total Hours</TableHead>
              <TableHead>Actual Status</TableHead>
              <TableHead>Request</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Approval</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {attendanceData.map((row) => (
              <TableRow key={row.date}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.inTime || "-"}</TableCell>
                <TableCell>{row.outTime || "-"}</TableCell>
                <TableCell>{row.manualIn || "-"}</TableCell>
                <TableCell>{row.manualOut || "-"}</TableCell>
                <TableCell>{row.totalHours || "-"}</TableCell>
                <TableCell>
                  <StatusBadge value={row.actualStatus} />
                </TableCell>
                <TableCell>{row.requestStatus || "-"}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {row.reason || "-"}
                </TableCell>
                <TableCell>
                  <StatusBadge value={row.approvalStatus || "N/A"} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
