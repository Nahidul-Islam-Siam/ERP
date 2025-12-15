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
import { useState } from "react";

type Operation = {
  id: string;
  date: string;
  assignEmployeeId?: string;
  assignEmployee: string;
  employeeId: string;
  employeeName: string;
  team: string;
  profileName: string;
  orderId: string;
  monetaryValue: number;
  clientId: string;
  orderLink?: string;
  salesStatus: "Delivered" | "Revisions";
  instructionLink?: string;
  orderStatus: "Complete" | "Delivered";
};

const operations: Operation[] = [
  {
    id: "EO/44447",
    date: "2025-11-23",
    assignEmployeeId: "11066",
    assignEmployee: "Md. Shahed",
    employeeId: "11367",
    employeeName: "Nahidul Islam",
    team: "Dark Pharos",
    profileName: "uidigital",
    orderId: "FO3D88175F41",
    monetaryValue: 120,
    clientId: "remywyt",
    orderLink: "Link",
    salesStatus: "Delivered",
    instructionLink: "Link",
    orderStatus: "Complete",
  },
  {
    id: "EO/32739",
    date: "2025-08-30",
    assignEmployee: "Md. Shahed",
    employeeId: "11367",
    employeeName: "Nahidul Islam",
    team: "Dark Pharos_Web_Night",
    profileName: "xpeed_studio",
    orderId: "FO82E15A6A6C6",
    monetaryValue: 200,
    clientId: "abdullaa460",
    salesStatus: "Revisions",
    orderStatus: "Complete",
  },
];

function StatusBadge({ value }: { value: string }) {
  const map: Record<string, string> = {
    Delivered: "bg-green-100 text-green-800",
    Revisions: "bg-yellow-100 text-yellow-800",
    Complete: "bg-blue-100 text-blue-800",
  };

  return <Badge className={map[value]}>{value}</Badge>;
}

export function TeamEmployeeTaskSheet() {
  const [selectedMonth, setSelectedMonth] = useState<number | "all">("all");

  const filtered = selectedMonth === "all"
    ? operations
    : operations.filter(op => {
        const m = new Date(op.date).getMonth() + 1;
        return m === selectedMonth;
      });

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-base font-semibold">
          Operations — Nahidul Islam
        </CardTitle>

        <select
          value={selectedMonth}
          onChange={(e) =>
            setSelectedMonth(
              e.target.value === "all" ? "all" : Number(e.target.value)
            )
          }
          className="text-sm border rounded-md px-2 py-1"
        >
          <option value="all">All Months</option>
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(2025, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Assign By</TableHead>
              <TableHead>Profile</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Sales Status</TableHead>
              <TableHead>Order Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.map((op) => (
              <TableRow key={op.id}>
                <TableCell className="font-medium">{op.id}</TableCell>
                <TableCell>
                  {new Date(op.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{op.assignEmployee}</TableCell>
                <TableCell>{op.profileName}</TableCell>
                <TableCell>{op.orderId}</TableCell>
                <TableCell className="font-semibold">
                  ${op.monetaryValue}
                </TableCell>
                <TableCell>{op.clientId}</TableCell>
                <TableCell>
                  <StatusBadge value={op.salesStatus} />
                </TableCell>
                <TableCell>
                  <StatusBadge value={op.orderStatus} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
