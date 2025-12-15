/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Badge,
} from "@/components/ui/badge";
import {
  Button,
} from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Input,
} from "@/components/ui/input";
import {
  Label,
} from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  UsersIcon,
  TrendingUpIcon,
  DollarSignIcon,
  CalendarIcon,
  SearchIcon,
  ExternalLinkIcon,
  EditIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  FileTextIcon,
} from "lucide-react";
import { useState, useEffect } from "react";

// ======================
// TYPES
// ======================

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

type TeamMember = {
  id: string;
  name: string;
  grade: string;
  monthlyKPIRate: number;
};

type Operation = {
  id: number;
  date: string;
  assignEmployeeId: string;
  assignEmployeeName: string;
  employeeId: string;
  employeeName: string;
  assignTeam: string;
  profileName: string;
  orderId: string;
  monetaryValue: number;
  clientId: string;
  orderLink: string;
  salesStatus: string;
  instructionSheet: string;
  orderStatus: string;
};

// ======================
// MOCK DATA
// ======================

const teamData = {
  teamName: "Operations Team A",
  leaderName: "Nahidul Islam",
  totalMembers: 6,
  totalOperations: 145,
  completedTasks: 128,
  totalMonetaryValue: 124500,
  avgKPIRate: 88,
};

const teamMembers: TeamMember[] = [
  { id: "EMP-001", name: "Sarah Johnson", grade: "Senior", monthlyKPIRate: 92 },
  { id: "EMP-002", name: "Michael Chen", grade: "Mid-Level", monthlyKPIRate: 88 },
  { id: "EMP-003", name: "Emily Rodriguez", grade: "Senior", monthlyKPIRate: 95 },
  { id: "EMP-004", name: "James Wilson", grade: "Junior", monthlyKPIRate: 78 },
  { id: "EMP-005", name: "Priya Sharma", grade: "Mid-Level", monthlyKPIRate: 85 },
  { id: "EMP-006", name: "Robert Taylor", grade: "Senior", monthlyKPIRate: 91 },
];

const initialOperations: Operation[] = [
  {
    id: 1,
    date: "2025-12-01",
    assignEmployeeId: "EMP-001",
    assignEmployeeName: "Sarah Johnson",
    employeeId: "EMP-003",
    employeeName: "Emily Rodriguez",
    assignTeam: "Operations Team A",
    profileName: "E-Commerce Platform",
    orderId: "ORD-2025-001",
    monetaryValue: 8500,
    clientId: "CLI-045",
    orderLink: "https://example.com/orders/001",
    salesStatus: "Delivered",
    instructionSheet: "https://example.com/instructions/001.pdf",
    orderStatus: "Complete",
  },
  {
    id: 2,
    date: "2025-12-02",
    assignEmployeeId: "EMP-002",
    assignEmployeeName: "Michael Chen",
    employeeId: "EMP-004",
    employeeName: "James Wilson",
    assignTeam: "Operations Team A",
    profileName: "Mobile App Development",
    orderId: "ORD-2025-002",
    monetaryValue: 12000,
    clientId: "CLI-067",
    orderLink: "https://example.com/orders/002",
    salesStatus: "Revision",
    instructionSheet: "",
    orderStatus: "Delivered",
  },
  {
    id: 3,
    date: "2025-12-03",
    assignEmployeeId: "EMP-001",
    assignEmployeeName: "Sarah Johnson",
    employeeId: "EMP-005",
    employeeName: "Priya Sharma",
    assignTeam: "Operations Team A",
    profileName: "CRM Integration",
    orderId: "ORD-2025-003",
    monetaryValue: 6500,
    clientId: "CLI-089",
    orderLink: "https://example.com/orders/003",
    salesStatus: "Delivered",
    instructionSheet: "https://example.com/instructions/003.pdf",
    orderStatus: "Complete",
  },
];

// ======================
// HELPER COMPONENTS
// ======================

function StatusBadge({ value }: { value: string }) {
  const map: Record<string, string> = {
    Present: "bg-green-100 text-green-800",
    Absent: "bg-red-100 text-red-800",
    Late: "bg-yellow-100 text-yellow-800",
    Approved: "bg-green-100 text-green-800",
    Pending: "bg-orange-100 text-orange-800",
    "N/A": "bg-slate-100 text-slate-600",
    Complete: "bg-emerald-100 text-emerald-800",
    Delivered: "bg-blue-100 text-blue-800",
    Revision: "bg-amber-100 text-amber-800",
  };

  return <Badge className={map[value] || "bg-gray-100 text-gray-800"}>{value}</Badge>;
}

// ======================
// MAIN COMPONENT
// ======================

export default function TeamWorkspace() {
  const [selectedMemberId, setSelectedMemberId] = useState<string>("EMP-003");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState<"status" | "attendance" | null>(null);
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);
  const [operations, setOperations] = useState<Operation[]>(initialOperations);

  // Attendance state: { EMP-001: [ ...attendance records... ] }
  const [memberAttendance, setMemberAttendance] = useState<Record<string, Attendance[]>>({});

  const selectedMember = teamMembers.find((m) => m.id === selectedMemberId);

  // ======================
  // EFFECTS
  // ======================

  // Initialize attendance for selected member for current month
  useEffect(() => {
    if (!selectedMemberId) return;
    if (memberAttendance[selectedMemberId]) return;

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 0-indexed
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const newAttendance: Attendance[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      newAttendance.push({
        date: dateStr,
        actualStatus: "N/A",
        approvalStatus: "N/A",
      });
    }

    setMemberAttendance((prev) => ({
      ...prev,
      [selectedMemberId]: newAttendance,
    }));
  }, [selectedMemberId, memberAttendance]);

  // ======================
  // FILTERED OPERATIONS
  // ======================

  const filteredOperations = operations.filter((op) => {
    const matchesSearch =
      !searchQuery ||
      op.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.clientId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = !dateFilter || op.date === dateFilter;
    return matchesSearch && matchesDate;
  });

  // ======================
  // KPI CALCULATION
  // ======================

  const memberOperations = filteredOperations.filter((op) => op.employeeId === selectedMemberId);
  const totalOps = memberOperations.length;
  const completedOps = memberOperations.filter((op) => op.orderStatus === "Complete").length;
  const totalMonetary = memberOperations.reduce((sum, op) => sum + op.monetaryValue, 0);
  const minTarget = 80;
  const achievedPercent = totalOps > 0 ? Math.round((completedOps / totalOps) * 100) : 0;

  // ======================
  // HANDLERS
  // ======================

  const handleOpenDrawer = (type: "status", operation: Operation) => {
    setDrawerType(type);
    setSelectedOperation(operation);
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setDrawerType(null);
    setSelectedOperation(null);
  };

  const handleSaveOperation = (updatedData: Partial<Operation>) => {
    if (!selectedOperation) return;
    setOperations((prev) =>
      prev.map((op) =>
        op.id === selectedOperation.id ? { ...op, ...updatedData } : op
      )
    );
    handleCloseDrawer();
  };

  const updateAttendance = (memberId: string, date: string, status: "Present" | "Absent") => {
    setMemberAttendance((prev) => {
      const list = prev[memberId] || [];
      const updated = list.map((att) =>
        att.date === date
          ? { ...att, actualStatus: status, approvalStatus: "Approved" as const }
          : att
      );
      return { ...prev, [memberId]: updated };
    });
  };

  const handleQuickAttendance = (memberId: string, status: "Present" | "Absent") => {
    const today = new Date().toISOString().split("T")[0];
    updateAttendance(memberId, today, status);
  };

  // ======================
  // BADGE RENDERERS
  // ======================

  const getSalesStatusBadge = (status: string) => <StatusBadge value={status} />;
  const getOrderStatusBadge = (status: string) => <StatusBadge value={status} />;

  // ======================
  // RENDER
  // ======================

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Team Workspace</h1>
          <p className="text-sm text-muted-foreground">Manage tasks, attendance, and performance</p>
        </div>

        {/* Team Summary */}
        <Card className="shadow-sm">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{teamData.teamName}</h2>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                  <span>Team Leader: <span className="font-medium text-foreground">{teamData.leaderName}</span></span>
                  <span className="h-4 w-px bg-border"></span>
                  <span className="flex items-center gap-1">
                    <UsersIcon className="h-4 w-4" /> {teamData.totalMembers} Members
                  </span>
                  <span className="h-4 w-px bg-border"></span>
                  <span>{teamData.totalOperations} Operations</span>
                </div>
              </div>
              <Select defaultValue="2025-12">
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-12">December 2025</SelectItem>
                  <SelectItem value="2025-11">November 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <StatBox label="Completed Tasks" value={teamData.completedTasks.toString()} />
              <StatBox
                label="Total Value"
                value={`$${teamData.totalMonetaryValue.toLocaleString()}`}
                icon={<DollarSignIcon className="h-4 w-4 text-emerald-600" />}
              />
              <StatBox
                label="Avg KPI Rate"
                value={`${teamData.avgKPIRate}%`}
                icon={<TrendingUpIcon className="h-4 w-4 text-blue-600" />}
              />
            </div>
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {teamMembers.map((member) => (
                <button
                  key={member.id}
                  onClick={() => setSelectedMemberId(member.id)}
                  className={`flex-shrink-0 rounded-lg border p-3 transition-all hover:shadow ${
                    selectedMemberId === member.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-[200px]">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.grade}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-sm font-semibold">{member.monthlyKPIRate}%</p>
                      <p className="text-xs text-muted-foreground">KPI</p>
                    </div>
                  </div>

                  {/* Quick Attendance */}
                  <div className="flex gap-1.5 mt-2 pt-2 border-t border-border">
                    <Button
                      size="sm"
                      variant={memberAttendance[member.id]?.find(a => a.date === new Date().toISOString().split("T")[0])?.actualStatus === "Present" ? "default" : "outline"}
                      className="h-7 text-xs flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickAttendance(member.id, "Present");
                      }}
                    >
                      <CheckCircleIcon className="h-3 w-3 mr-1" /> P
                    </Button>
                    <Button
                      size="sm"
                      variant={memberAttendance[member.id]?.find(a => a.date === new Date().toISOString().split("T")[0])?.actualStatus === "Absent" ? "destructive" : "outline"}
                      className="h-7 text-xs flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickAttendance(member.id, "Absent");
                      }}
                    >
                      <XCircleIcon className="h-3 w-3 mr-1" /> A
                    </Button>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Operations Table */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Operations — {selectedMember?.name || "Select a member"}</CardTitle>
                <Badge variant="outline" className="mt-1">
                  {selectedMember?.grade || "—"}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="relative flex-1 min-w-[200px]">
                  <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search Order/Client ID"
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="date"
                    className="pl-9"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-10">ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Profile</TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead>Sales Status</TableHead>
                    <TableHead>Order Status</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOperations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                        No operations found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOperations.map((op) => (
                      <TableRow key={op.id}>
                        <TableCell className="font-mono">{op.id}</TableCell>
                        <TableCell>{op.date}</TableCell>
                        <TableCell className="font-medium">{op.profileName}</TableCell>
                        <TableCell className="font-mono">{op.orderId}</TableCell>
                        <TableCell className="text-right font-semibold text-emerald-700">
                          ${op.monetaryValue.toLocaleString()}
                        </TableCell>
                        <TableCell>{getSalesStatusBadge(op.salesStatus)}</TableCell>
                        <TableCell>{getOrderStatusBadge(op.orderStatus)}</TableCell>
                        <TableCell className="text-center">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => handleOpenDrawer("status", op)}
                          >
                            <EditIcon className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* KPI Panel */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>KPI — {selectedMember?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              <StatBox label="Total Ops" value={totalOps.toString()} />
              <StatBox label="Completed" value={completedOps.toString()} className="text-emerald-600" />
              <StatBox label="Total Value" value={`$${totalMonetary.toLocaleString()}`} />
              <StatBox label="Min Target" value={`${minTarget}%`} />
              <StatBox label="Achieved" value={`${achievedPercent}%`} className="text-blue-600" />
              <div
                className={`rounded-md border p-3 text-center ${
                  achievedPercent >= minTarget
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <p className="text-xs text-muted-foreground mb-1">Status</p>
                <p className={`text-lg font-bold ${achievedPercent >= minTarget ? "text-emerald-700" : "text-red-700"}`}>
                  {achievedPercent >= minTarget ? "✓ Bonus" : "✗ Penalty"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Section */}
        {selectedMember && memberAttendance[selectedMemberId] && (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Attendance — {selectedMember.name}</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Mark</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Approval</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {memberAttendance[selectedMemberId].map((att) => (
                    <TableRow key={att.date}>
                      <TableCell>{att.date}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant={att.actualStatus === "Present" ? "default" : "outline"}
                            onClick={() => updateAttendance(selectedMemberId, att.date, "Present")}
                          >
                            P
                          </Button>
                          <Button
                            size="sm"
                            variant={att.actualStatus === "Absent" ? "destructive" : "outline"}
                            onClick={() => updateAttendance(selectedMemberId, att.date, "Absent")}
                          >
                            A
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge value={att.actualStatus} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge value={att.approvalStatus || "N/A"} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Operation Edit Drawer */}
        <Sheet open={openDrawer} onOpenChange={setOpenDrawer}>
          <SheetContent className="sm:max-w-[450px]">
            <SheetHeader>
              <SheetTitle>Update Operation</SheetTitle>
              <SheetDescription>
                Edit details for {selectedOperation?.orderId}
              </SheetDescription>
            </SheetHeader>
            {selectedOperation && (
              <div className="py-6 space-y-4">
                <div className="space-y-2">
                  <Label>Order Status</Label>
                  <Select
                    defaultValue={selectedOperation.orderStatus}
                    onValueChange={(value) =>
                      handleSaveOperation({ orderStatus: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Complete">Complete</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Revision">Revision</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Sales Status</Label>
                  <Select
                    defaultValue={selectedOperation.salesStatus}
                    onValueChange={(value) =>
                      handleSaveOperation({ salesStatus: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Revision">Revision</SelectItem>
                      <SelectItem value="Complete">Complete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Monetary Value</Label>
                  <Input
                    type="number"
                    defaultValue={selectedOperation.monetaryValue}
                    onBlur={(e) =>
                      handleSaveOperation({ monetaryValue: Number(e.target.value) })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Instruction Sheet URL</Label>
                  <Input
                    type="url"
                    defaultValue={selectedOperation.instructionSheet}
                    onBlur={(e) =>
                      handleSaveOperation({ instructionSheet: e.target.value })
                    }
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1" onClick={handleCloseDrawer}>
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={handleCloseDrawer}>
                    Save
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

// ======================
// REUSABLE STAT BOX
// ======================

function StatBox({
  label,
  value,
  icon,
  className = "text-foreground",
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="rounded-md border bg-card p-3">
      <div className="flex items-center gap-1.5 mb-1">
        {icon}
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
      <p className={`text-lg font-semibold ${className}`}>{value}</p>
    </div>
  );
}