/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, TrendingUp, Target, ExternalLink } from "lucide-react";
// type VariantProps = {
//   variant?:
//     | "destructive"
//     | "default"
//     | "outline"
//     | "secondary"
//     | "success"
//     | null
//     | undefined;
// };
// Mock data for operations/assignments
const mockOperations = [
  {
    id: "OPS-001",
    date: "2024-01-15",
    assignEmployeeId: "11367",
    assignEmployee: "Nahidul Islam",
    employeeId: "11367",
    employeeName: "Nahidul Islam",
    assignTeam: "Dark Pharos",
    profileName: "E-Commerce Platform",
    orderId: "ORD-2024-001",
    monetaryValue: 5000,
    clientId: "CLI-001",
    companyName: "Tech Solutions Inc",
    orderLink: "https://example.com/order/001",
    salesStatus: "Delivered",
    instructionSheetLink: "https://example.com/instructions/001",
    instructionSheetList: ["Setup Guide", "API Documentation", "Design Assets"],
    orderStatus: "Completed",
    assignmentDate: "2024-01-10",
    deliveryLastDate: "2024-01-20",
    orderReference: "REF-001",
    deliveryAmount: 5000,
    remainingBalance: 0,
    specialRemarks: "Project completed successfully ahead of schedule",
  },
  {
    id: "OPS-002",
    date: "2024-01-16",
    assignEmployeeId: "11367",
    assignEmployee: "Nahidul Islam",
    employeeId: "11367",
    employeeName: "Nahidul Islam",
    assignTeam: "Dark Pharos",
    profileName: "Mobile Application",
    orderId: "ORD-2024-002",
    monetaryValue: 7500,
    clientId: "CLI-002",
    companyName: "StartUp Ventures",
    orderLink: "https://example.com/order/002",
    salesStatus: "In Progress",
    instructionSheetLink: "https://example.com/instructions/002",
    instructionSheetList: ["Wireframes", "Technical Specs", "Brand Guidelines"],
    orderStatus: "In Progress",
    assignmentDate: "2024-01-12",
    deliveryLastDate: "2024-01-25",
    orderReference: "REF-002",
    deliveryAmount: 3750,
    remainingBalance: 3750,
    specialRemarks: "Awaiting client feedback on initial designs",
  },
  {
    id: "OPS-003",
    date: "2024-01-17",
    assignEmployeeId: "11367",
    assignEmployee: "Nahidul Islam",
    employeeId: "11367",
    employeeName: "Nahidul Islam",
    assignTeam: "Dark Pharos",
    profileName: "Dashboard Redesign",
    orderId: "ORD-2024-003",
    monetaryValue: 3500,
    clientId: "CLI-003",
    companyName: "Enterprise Corp",
    orderLink: "https://example.com/order/003",
    salesStatus: "Pending Review",
    instructionSheetLink: "https://example.com/instructions/003",
    instructionSheetList: [
      "Current Dashboard",
      "User Feedback",
      "Requirements Doc",
    ],
    orderStatus: "Delivered",
    assignmentDate: "2024-01-14",
    deliveryLastDate: "2024-01-22",
    orderReference: "REF-003",
    deliveryAmount: 3500,
    remainingBalance: 0,
    specialRemarks: "Client requested minor color adjustments",
  },
  {
    id: "OPS-004",
    date: "2024-01-18",
    assignEmployeeId: "11367",
    assignEmployee: "Nahidul Islam",
    employeeId: "11367",
    employeeName: "Nahidul Islam",
    assignTeam: "Dark Pharos",
    profileName: "Landing Page",
    orderId: "ORD-2024-004",
    monetaryValue: 2500,
    clientId: "CLI-004",
    companyName: "Marketing Agency",
    orderLink: "https://example.com/order/004",
    salesStatus: "Active",
    instructionSheetLink: "https://example.com/instructions/004",
    instructionSheetList: ["Content Copy", "Image Assets", "SEO Requirements"],
    orderStatus: "In Progress",
    assignmentDate: "2024-01-15",
    deliveryLastDate: "2024-01-28",
    orderReference: "REF-004",
    deliveryAmount: 0,
    remainingBalance: 2500,
    specialRemarks: "",
  },
];

export default function EmployeeDashboard() {
  const [selectedMonth, setSelectedMonth] = useState("january");
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState<any>(null);
  const [operations, setOperations] = useState(mockOperations);
  const [editedStatus, setEditedStatus] = useState("");
  const [editedRemarks, setEditedRemarks] = useState("");

  // Employee information
  const employeeInfo = {
    name: "Nahidul Islam",
    id: "11367",
    teamName: "Dark Pharos",
    teamLeader: "Md. Shahed",
  };

  // Calculate KPIs based on operations
  const targetKPI = 85;
  const completedOperations = operations.filter(
    (op) => op.orderStatus === "Completed"
  ).length;
  const totalOperations = operations.length;
  const achievedKPI =
    totalOperations > 0
      ? Math.round((completedOperations / totalOperations) * 100)
      : 0;
  const kpiPercentage =
    targetKPI > 0 ? Math.round((achievedKPI / targetKPI) * 100) : 0;

  const getKPIStatus = () => {
    if (kpiPercentage >= 90) return { label: "On Track", color: "success" };
    if (kpiPercentage >= 70) return { label: "At Risk", color: "warning" };
    return { label: "Below Target", color: "destructive" };
  };

  const kpiStatus = getKPIStatus();

//   const getStatusBadgeVariant = (status: string): VariantProps["variant"] => {
//     if (status === "Delivered" || status === "Completed" || status === "Active")
//       return "success";
//     if (
//       status === "Pending" ||
//       status === "In Progress" ||
//       status === "Pending Review"
//     )
//       return "warning";
//     return "default";
//   };

  const getStatusBadgeClass = (status: string) => {
    if (["Delivered", "Completed", "Active"].includes(status)) {
      return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200";
    }
    if (["Pending", "In Progress", "Pending Review"].includes(status)) {
      return "bg-amber-100 text-amber-800 hover:bg-amber-200";
    }
    return "bg-gray-100 text-gray-800";
  };

  const handleRowClick = (operation: any) => {
    setSelectedOperation(operation);
    setEditedStatus(operation.orderStatus);
    setEditedRemarks(operation.specialRemarks);
    setDetailModalOpen(true);
  };

  const handleSaveChanges = () => {
    if (selectedOperation) {
      setOperations((prevOps) =>
        prevOps.map((op) =>
          op.id === selectedOperation.id
            ? {
                ...op,
                orderStatus: editedStatus,
                specialRemarks: editedRemarks,
              }
            : op
        )
      );
      setDetailModalOpen(false);
      setSelectedOperation(null);
    }
  };

  const handleCancelModal = () => {
    setDetailModalOpen(false);
    setSelectedOperation(null);
    setEditedStatus("");
    setEditedRemarks("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b bg-card backdrop-blur supports-[backdrop-filter]:bg-card/95">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {employeeInfo.name}
                <span className="ml-3 text-sm font-normal text-muted-foreground">
                  ID: {employeeInfo.id}
                </span>
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span>
                  Team:{" "}
                  <span className="font-medium text-foreground">
                    {employeeInfo.teamName}
                  </span>
                </span>
                <span className="text-muted-foreground/50">•</span>
                <span>
                  Team Leader:{" "}
                  <span className="font-medium text-foreground">
                    {employeeInfo.teamLeader}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
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
      </header>

      {/* Sticky KPI Card */}
      <div className="sticky top-[104px] z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95">
        <div className="container mx-auto px-6 py-4">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <div className="flex items-center gap-3">
                  <Target className="h-8 w-8 text-primary opacity-70" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Target KPI
                    </p>
                    <p className="text-2xl font-bold">{targetKPI}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-8 w-8 text-primary opacity-70" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Achieved KPI
                    </p>
                    <p className="text-2xl font-bold">{achievedKPI}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      KPI Percentage
                    </p>
                    <p className={`text-2xl font-bold text-${kpiStatus.color}`}>
                      {kpiPercentage}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Status
                    </p>
                    <Badge variant={kpiStatus.color as any} className="mt-1">
                      {kpiStatus.label}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <main className="container mx-auto px-6 py-8">
        {/* Operations Sheet Table */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">My Assignments</h2>
            <p className="text-sm text-muted-foreground">
              Click on any row to view details and update status or remarks
            </p>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="sticky left-0 z-10 bg-card">
                        ID
                      </TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Assign Employee ID</TableHead>
                      <TableHead className="sticky left-[80px] z-10 bg-card">
                        Assign Employee
                      </TableHead>
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Employee Name</TableHead>
                      <TableHead>Assign Team</TableHead>
                      <TableHead>Profile Name</TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Monetary Value</TableHead>
                      <TableHead>Client ID</TableHead>
                      <TableHead>Order Link</TableHead>
                      <TableHead>Sales Status</TableHead>
                      <TableHead>Instruction Sheet</TableHead>
                      <TableHead>Order Status</TableHead>
                      <TableHead>Special Remarks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {operations.map((operation) => (
                      <TableRow
                        key={operation.id}
                        className="cursor-pointer transition-colors hover:bg-muted/50"
                        onClick={() => handleRowClick(operation)}
                      >
                        <TableCell className="sticky left-0 bg-card font-medium">
                          {operation.id}
                        </TableCell>
                        <TableCell>
                          {new Date(operation.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{operation.assignEmployeeId}</TableCell>
                        <TableCell className="sticky left-[80px] bg-card font-medium">
                          {operation.assignEmployee}
                        </TableCell>
                        <TableCell>{operation.employeeId}</TableCell>
                        <TableCell>{operation.employeeName}</TableCell>
                        <TableCell>{operation.assignTeam}</TableCell>
                        <TableCell>{operation.profileName}</TableCell>
                        <TableCell>{operation.orderId}</TableCell>
                        <TableCell>
                          ${operation.monetaryValue.toLocaleString()}
                        </TableCell>
                        <TableCell>{operation.clientId}</TableCell>
                        <TableCell>
                          <a
                            href={operation.orderLink}
                            className="inline-flex items-center gap-1 text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View <ExternalLink className="h-3 w-3" />
                          </a>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getStatusBadgeClass(
                              operation.salesStatus
                            )}
                          >
                            {operation.salesStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <a
                            href={operation.instructionSheetLink}
                            className="inline-flex items-center gap-1 text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View <ExternalLink className="h-3 w-3" />
                          </a>
                        </TableCell>
                        <TableCell>
                    <Badge className={getStatusBadgeClass(operation.orderStatus)}>
    {operation.orderStatus}
  </Badge>
                        </TableCell>
                        <TableCell className="max-w-[250px]">
                          <span className="line-clamp-2">
                            {operation.specialRemarks || "—"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Detail Modal */}
      <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Operation Details</DialogTitle>
            <DialogDescription>
              View and update assignment status and remarks
            </DialogDescription>
          </DialogHeader>

          {selectedOperation && (
            <div className="grid gap-6 py-4">
              {/* Basic Information */}
              <div className="grid gap-4 rounded-lg border p-4">
                <h3 className="font-semibold">Basic Information</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Employee ID
                    </p>
                    <p className="text-sm">{selectedOperation.employeeId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Employee Name
                    </p>
                    <p className="text-sm">{selectedOperation.employeeName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Company Name
                    </p>
                    <p className="text-sm">{selectedOperation.companyName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Assign Team
                    </p>
                    <p className="text-sm">{selectedOperation.assignTeam}</p>
                  </div>
                </div>
              </div>

              {/* Order Information */}
              <div className="grid gap-4 rounded-lg border p-4">
                <h3 className="font-semibold">Order Information</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Assignment Date
                    </p>
                    <p className="text-sm">
                      {new Date(
                        selectedOperation.assignmentDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Delivery Last Date
                    </p>
                    <p className="text-sm">
                      {new Date(
                        selectedOperation.deliveryLastDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Sales Status
                    </p>
                    <Badge
                      className={getStatusBadgeClass(selectedOperation.salesStatus)}
                    >
                      {selectedOperation.salesStatus}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Order Reference
                    </p>
                    <p className="text-sm">
                      {selectedOperation.orderReference}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Client ID
                    </p>
                    <p className="text-sm">{selectedOperation.clientId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Profile Name
                    </p>
                    <p className="text-sm">{selectedOperation.profileName}</p>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="grid gap-4 rounded-lg border p-4">
                <h3 className="font-semibold">Financial Information</h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Delivery Amount
                    </p>
                    <p className="text-sm font-semibold">
                      ${selectedOperation.deliveryAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Monetary Value
                    </p>
                    <p className="text-sm font-semibold">
                      ${selectedOperation.monetaryValue.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Remaining Balance
                    </p>
                    <p className="text-sm font-semibold">
                      ${selectedOperation.remainingBalance.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="grid gap-4 rounded-lg border p-4">
                <h3 className="font-semibold">Resources</h3>
                <div className="grid gap-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Order Link
                    </p>
                    <a
                      href={selectedOperation.orderLink}
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {selectedOperation.orderLink}{" "}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Instruction Sheet List
                    </p>
                    <ul className="mt-1 list-inside list-disc space-y-1 text-sm">
                      {selectedOperation.instructionSheetList.map(
                        (item: string, index: number) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>
                    <a
                      href={selectedOperation.instructionSheetLink}
                      className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View All Instructions <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Editable Fields */}
              <div className="grid gap-4 rounded-lg border border-primary/50 bg-primary/5 p-4">
                <h3 className="font-semibold">Update Status & Remarks</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="orderStatus">Order Status *</Label>
                    <Select
                      value={editedStatus}
                      onValueChange={setEditedStatus}
                    >
                      <SelectTrigger id="orderStatus">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="specialRemarks">Special Remarks</Label>
                    <Textarea
                      id="specialRemarks"
                      placeholder="Add comments or notes about this assignment..."
                      value={editedRemarks}
                      onChange={(e) => setEditedRemarks(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={handleCancelModal}>
              Cancel
            </Button>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
