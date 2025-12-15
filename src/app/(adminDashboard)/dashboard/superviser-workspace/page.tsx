/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  SearchIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  FileTextIcon,
  LockIcon,
  FlagIcon,
  MessageSquareIcon,
  ExternalLinkIcon,
  DownloadIcon,
  CalendarIcon,
  TrendingUpIcon,
  TrendingDownIcon,
} from "lucide-react"

// Sample data
const supervisorData = {
  name: "Rahul Sharma",
  totalTeams: 5,
  totalEmployees: 42,
}

const teamsData = [
  {
    id: "TEAM-001",
    name: "Operations Team A",
    leaderName: "Nahidul Islam",
    totalEmployees: 8,
    avgKPITarget: 85,
    avgKPIAchieved: 78,
    avgKPIPercent: 92,
    attendancePercent: 94,
    totalPresentDays: 168,
    totalAbsentDays: 8,
    performanceStatus: "Good",
    employees: [
      {
        id: "EMP-001",
        name: "Sarah Johnson",
        designation: "Senior Developer",
        grade: "A",
        monthlyKPITarget: 90,
        monthlyKPIAchieved: 88,
        kpiPercent: 98,
        totalOperations: 45,
        totalMonetaryValue: 78500,
        presentDays: 22,
        absentDays: 1,
        lateDays: 2,
        attendancePercent: 96,
        leaveDays: 1,
        flags: ["Late"],
      },
      {
        id: "EMP-002",
        name: "Michael Chen",
        designation: "Developer",
        grade: "B",
        monthlyKPITarget: 80,
        monthlyKPIAchieved: 75,
        kpiPercent: 94,
        totalOperations: 38,
        totalMonetaryValue: 62000,
        presentDays: 21,
        absentDays: 2,
        lateDays: 3,
        attendancePercent: 91,
        leaveDays: 2,
        flags: ["Late", "Low KPI"],
      },
      {
        id: "EMP-003",
        name: "Emily Rodriguez",
        designation: "Team Lead",
        grade: "A+",
        monthlyKPITarget: 95,
        monthlyKPIAchieved: 98,
        kpiPercent: 103,
        totalOperations: 52,
        totalMonetaryValue: 95000,
        presentDays: 23,
        absentDays: 0,
        lateDays: 0,
        attendancePercent: 100,
        leaveDays: 0,
        flags: [],
      },
    ],
  },
  {
    id: "TEAM-002",
    name: "Development Team B",
    leaderName: "Priya Patel",
    totalEmployees: 6,
    avgKPITarget: 80,
    avgKPIAchieved: 72,
    avgKPIPercent: 90,
    attendancePercent: 89,
    totalPresentDays: 132,
    totalAbsentDays: 12,
    performanceStatus: "Warning",
    employees: [
      {
        id: "EMP-004",
        name: "James Wilson",
        designation: "Developer",
        grade: "B",
        monthlyKPITarget: 75,
        monthlyKPIAchieved: 68,
        kpiPercent: 91,
        totalOperations: 32,
        totalMonetaryValue: 45000,
        presentDays: 20,
        absentDays: 3,
        lateDays: 4,
        attendancePercent: 87,
        leaveDays: 3,
        flags: ["Late", "Absent"],
      },
    ],
  },
]

const projectOperationsData = [
  {
    id: "OP-001",
    date: "2024-01-15",
    assignEmployeeId: "EMP-001",
    assignEmployeeName: "Sarah Johnson",
    employeeId: "EMP-001",
    employeeName: "Sarah Johnson",
    assignTeam: "Operations Team A",
    profileName: "E-Commerce Platform",
    orderId: "ORD-2024-001",
    monetaryValue: 8500,
    clientId: "CLT-105",
    orderLink: "https://example.com/orders/ORD-2024-001",
    salesStatus: "Delivered",
    instructionSheetLink: "https://example.com/instructions/ORD-2024-001.pdf",
    orderStatus: "Complete",
  },
  {
    id: "OP-002",
    date: "2024-01-16",
    assignEmployeeId: "EMP-002",
    assignEmployeeName: "Michael Chen",
    employeeId: "EMP-003",
    employeeName: "Emily Rodriguez",
    assignTeam: "Operations Team A",
    profileName: "Mobile App Development",
    orderId: "ORD-2024-002",
    monetaryValue: 12000,
    clientId: "CLT-108",
    orderLink: "https://example.com/orders/ORD-2024-002",
    salesStatus: "Revision",
    instructionSheetLink: "https://example.com/instructions/ORD-2024-002.pdf",
    orderStatus: "In Progress",
  },
  {
    id: "OP-003",
    date: "2024-01-17",
    assignEmployeeId: "EMP-001",
    assignEmployeeName: "Sarah Johnson",
    employeeId: "EMP-001",
    employeeName: "Sarah Johnson",
    assignTeam: "Operations Team A",
    profileName: "CRM Integration",
    orderId: "ORD-2024-003",
    monetaryValue: 6500,
    clientId: "CLT-112",
    orderLink: "https://example.com/orders/ORD-2024-003",
    salesStatus: "Pending",
    instructionSheetLink: "https://example.com/instructions/ORD-2024-003.pdf",
    orderStatus: "Pending",
  },
  {
    id: "OP-004",
    date: "2024-01-18",
    assignEmployeeId: "EMP-004",
    assignEmployeeName: "James Wilson",
    employeeId: "EMP-004",
    employeeName: "James Wilson",
    assignTeam: "Development Team B",
    profileName: "Website Redesign",
    orderId: "ORD-2024-004",
    monetaryValue: 4200,
    clientId: "CLT-095",
    orderLink: "https://example.com/orders/ORD-2024-004",
    salesStatus: "Delivered",
    instructionSheetLink: "https://example.com/instructions/ORD-2024-004.pdf",
    orderStatus: "Complete",
  },
]

const leaveRequestsData = [
  {
    id: "LR-001",
    employeeName: "Sarah Johnson",
    employeeId: "EMP-001",
    team: "Operations Team A",
    leaveType: "Casual Leave",
    leaveDuration: "Full Day",
    fromDate: "2024-01-20",
    toDate: "2024-01-22",
    leaveDays: 3,
    applicationDate: "2024-01-15",
    reason: "Family function to attend. Need to travel to hometown for the occasion.",
    approvalStatus: "Pending",
    currentBalance: 7,
    balanceAfter: 4,
    attachment: true,
    attachmentUrl: "/attachments/leave-LR-001.pdf",
  },
  {
    id: "LR-002",
    employeeName: "Michael Chen",
    employeeId: "EMP-002",
    team: "Operations Team A",
    leaveType: "Sick Leave",
    leaveDuration: "Half Day",
    fromDate: "2024-01-18",
    toDate: "2024-01-18",
    leaveDays: 0.5,
    applicationDate: "2024-01-17",
    reason: "Not feeling well. Doctor appointment scheduled.",
    approvalStatus: "Approved",
    currentBalance: 6.5,
    balanceAfter: 6,
    attachment: false,
    supervisorRemarks: "Approved. Hope you feel better soon.",
  },
  {
    id: "LR-003",
    employeeName: "James Wilson",
    employeeId: "EMP-004",
    team: "Development Team B",
    leaveType: "Earned Leave",
    leaveDuration: "Full Day",
    fromDate: "2024-01-25",
    toDate: "2024-01-27",
    leaveDays: 3,
    applicationDate: "2024-01-18",
    reason: "Planned vacation with family. All tasks completed and handed over.",
    approvalStatus: "Pending",
    currentBalance: 12,
    balanceAfter: 9,
    attachment: false,
  },
]

const attendanceDetailedData = [
  {
    date: "2024-01-22",
    inTime: "09:00 AM",
    outTime: "06:00 PM",
    workHours: "9h 0m",
    status: "Present",
    approvalStatus: "Approved",
  },
  {
    date: "2024-01-19",
    inTime: "09:15 AM",
    outTime: "06:05 PM",
    workHours: "8h 50m",
    status: "Late",
    approvalStatus: "Approved",
  },
  {
    date: "2024-01-18",
    inTime: "09:00 AM",
    outTime: "06:00 PM",
    workHours: "9h 0m",
    status: "Present",
    approvalStatus: "Approved",
  },
  {
    date: "2024-01-17",
    inTime: "-",
    outTime: "-",
    workHours: "-",
    status: "Absent",
    approvalStatus: "Pending Override",
  },
  {
    date: "2024-01-16",
    inTime: "09:05 AM",
    outTime: "06:10 PM",
    workHours: "9h 5m",
    status: "Present",
    approvalStatus: "Approved",
  },
]

const leaveHistoryData = [
  {
    id: "LH-001",
    leaveType: "Casual Leave",
    duration: "3 days",
    fromDate: "2024-01-10",
    toDate: "2024-01-12",
    status: "Approved",
    appliedOn: "2024-01-05",
    approvedBy: "Rahul Sharma",
    attachment: true,
  },
  {
    id: "LH-002",
    leaveType: "Sick Leave",
    duration: "1 day",
    fromDate: "2023-12-22",
    toDate: "2023-12-22",
    status: "Approved",
    appliedOn: "2023-12-21",
    approvedBy: "Rahul Sharma",
    attachment: false,
  },
  {
    id: "LH-003",
    leaveType: "Earned Leave",
    duration: "5 days",
    fromDate: "2023-12-10",
    toDate: "2023-12-14",
    status: "Approved",
    appliedOn: "2023-12-01",
    approvedBy: "Rahul Sharma",
    attachment: false,
  },
]

export default function SupervisorWorkspace() {
  const [expandedTeams, setExpandedTeams] = useState<Record<string, boolean>>({})
  const [selectedMonth, setSelectedMonth] = useState("2024-01")
  const [selectedYear, setSelectedYear] = useState("2024")
  const [selectedTeamsFilter, setSelectedTeamsFilter] = useState<string[]>([])
  const [searchEmployee, setSearchEmployee] = useState("")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [selectedEmployeeTeam, setSelectedEmployeeTeam] = useState<string>("")

  const [leaveDetailOpen, setLeaveDetailOpen] = useState(false)
  const [selectedLeave, setSelectedLeave] = useState<any>(null)

  const [projectDetailOpen, setProjectDetailOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)

  // Leave management filters
  const [leaveMonthFilter, setLeaveMonthFilter] = useState("2024-01")
  const [leaveStatusFilter, setLeaveStatusFilter] = useState("all")
  const [leaveTypeFilter, setLeaveTypeFilter] = useState("all")

  const [supervisorRemarks, setSupervisorRemarks] = useState("")

  const toggleTeamExpand = (teamId: string) => {
    setExpandedTeams((prev) => ({
      ...prev,
      [teamId]: !prev[teamId],
    }))
  }

  const handleEmployeeClick = (employee: any, team: any) => {
    setSelectedEmployee(employee)
    setSelectedEmployeeTeam(team.name)
    setDrawerOpen(true)
  }

  const handleLeaveDetailClick = (leave: any) => {
    setSelectedLeave(leave)
    setLeaveDetailOpen(true)
  }

  const handleProjectClick = (project: any) => {
    setSelectedProject(project)
    setProjectDetailOpen(true)
  }

  const getPerformanceBadge = (status: string) => {
    switch (status) {
      case "Good":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20">
            Good
          </Badge>
        )
      case "Warning":
        return (
          <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 border-amber-500/20">
            Warning
          </Badge>
        )
      case "Critical":
        return (
          <Badge className="bg-red-500/10 text-red-700 dark:text-red-400 hover:bg-red-500/20 border-red-500/20">
            Critical
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getKPIColor = (percent: number) => {
    if (percent >= 95) return "text-emerald-700 dark:text-emerald-400"
    if (percent >= 85) return "text-blue-700 dark:text-blue-400"
    if (percent >= 75) return "text-amber-700 dark:text-amber-400"
    return "text-red-700 dark:text-red-400"
  }

  const getAttendanceColor = (percent: number) => {
    if (percent >= 95) return "text-emerald-700 dark:text-emerald-400"
    if (percent >= 90) return "text-blue-700 dark:text-blue-400"
    if (percent >= 85) return "text-amber-700 dark:text-amber-400"
    return "text-red-700 dark:text-red-400"
  }

  const getApprovalStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20">
            <CheckCircleIcon className="mr-1 h-3 w-3" />
            Approved
          </Badge>
        )
      case "Pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 border-amber-500/20">
            <ClockIcon className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case "Rejected":
        return (
          <Badge className="bg-red-500/10 text-red-700 dark:text-red-400 hover:bg-red-500/20 border-red-500/20">
            <XCircleIcon className="mr-1 h-3 w-3" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getSalesStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20">
            Delivered
          </Badge>
        )
      case "Revision":
        return (
          <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 border-amber-500/20">
            Revision
          </Badge>
        )
      case "Pending":
        return (
          <Badge className="bg-blue-500/10 text-blue-700 dark:text-blue-400 hover:bg-blue-500/20 border-blue-500/20">
            Pending
          </Badge>
        )
      case "Cancelled":
        return (
          <Badge className="bg-red-500/10 text-red-700 dark:text-red-400 hover:bg-red-500/20 border-red-500/20">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "Complete":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20">
            Complete
          </Badge>
        )
      case "In Progress":
        return (
          <Badge className="bg-blue-500/10 text-blue-700 dark:text-blue-400 hover:bg-blue-500/20 border-blue-500/20">
            In Progress
          </Badge>
        )
      case "Pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 border-amber-500/20">
            Pending
          </Badge>
        )
      case "On Hold":
        return (
          <Badge className="bg-slate-500/10 text-slate-700 dark:text-slate-400 hover:bg-slate-500/20 border-slate-500/20">
            On Hold
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getAttendanceStatusBadge = (status: string) => {
    switch (status) {
      case "Present":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20">
            Present
          </Badge>
        )
      case "Late":
        return (
          <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 border-amber-500/20">
            Late
          </Badge>
        )
      case "Absent":
        return (
          <Badge className="bg-red-500/10 text-red-700 dark:text-red-400 hover:bg-red-500/20 border-red-500/20">
            Absent
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-background border-b shadow-sm">
        <div className="p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Supervisor Info */}
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-xl font-semibold text-foreground">Supervisor Workspace</h1>
                <p className="text-xs text-muted-foreground mt-0.5">{supervisorData.name}</p>
              </div>
              <div className="flex items-center gap-3 ml-6">
                <div className="rounded-lg border bg-card px-3 py-1.5">
                  <p className="text-xs text-muted-foreground">Total Teams</p>
                  <p className="text-base font-semibold text-foreground">{supervisorData.totalTeams}</p>
                </div>
                <div className="rounded-lg border bg-card px-3 py-1.5">
                  <p className="text-xs text-muted-foreground">Total Employees</p>
                  <p className="text-base font-semibold text-foreground">{supervisorData.totalEmployees}</p>
                </div>
              </div>
            </div>

            {/* Global Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5">
                <Label className="text-xs text-muted-foreground whitespace-nowrap">Month:</Label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="h-8 w-[130px] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-01">January 2024</SelectItem>
                    <SelectItem value="2023-12">December 2023</SelectItem>
                    <SelectItem value="2023-11">November 2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-1.5">
                <Label className="text-xs text-muted-foreground whitespace-nowrap">Year:</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="h-8 w-[90px] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search employee..."
                  className="h-8 pl-8 w-[180px] text-xs"
                  value={searchEmployee}
                  onChange={(e) => setSearchEmployee(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Team → Employee Performance Table */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/50 sticky top-0">
                  <TableRow className="text-xs">
                    <TableHead className="w-6 h-9"></TableHead>
                    <TableHead className="min-w-[160px] h-9">Team / Employee</TableHead>
                    <TableHead className="min-w-[130px] h-9">Leader / Designation</TableHead>
                    <TableHead className="w-16 text-center h-9">Grade</TableHead>
                    <TableHead className="w-20 text-center h-9">Target</TableHead>
                    <TableHead className="w-20 text-center h-9">Achieved</TableHead>
                    <TableHead className="w-16 text-center h-9">KPI %</TableHead>
                    <TableHead className="w-20 text-center h-9">Operations</TableHead>
                    <TableHead className="w-24 text-center h-9">Value (₹)</TableHead>
                    <TableHead className="w-20 text-center h-9">Present</TableHead>
                    <TableHead className="w-16 text-center h-9">Absent</TableHead>
                    <TableHead className="w-16 text-center h-9">Late</TableHead>
                    <TableHead className="w-20 text-center h-9">Attend %</TableHead>
                    <TableHead className="w-16 text-center h-9">Leave</TableHead>
                    <TableHead className="min-w-[140px] h-9">Status / Flags</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamsData.map((team) => (
                    <>
                      {/* Team Row */}
                      <TableRow
                        key={team.id}
                        className="bg-muted/20 hover:bg-muted/30 cursor-pointer font-medium text-xs"
                        onClick={() => toggleTeamExpand(team.id)}
                      >
                        <TableCell className="py-2">
                          {expandedTeams[team.id] ? (
                            <ChevronDownIcon className="h-3.5 w-3.5 text-muted-foreground" />
                          ) : (
                            <ChevronRightIcon className="h-3.5 w-3.5 text-muted-foreground" />
                          )}
                        </TableCell>
                        <TableCell className="font-semibold py-2">{team.name}</TableCell>
                        <TableCell className="py-2">{team.leaderName}</TableCell>
                        <TableCell className="text-center py-2">{team.totalEmployees} emp</TableCell>
                        <TableCell className="text-center py-2">{team.avgKPITarget}</TableCell>
                        <TableCell className="text-center py-2">{team.avgKPIAchieved}</TableCell>
                        <TableCell className={`text-center font-semibold py-2 ${getKPIColor(team.avgKPIPercent)}`}>
                          {team.avgKPIPercent}%
                        </TableCell>
                        <TableCell className="text-center py-2">-</TableCell>
                        <TableCell className="text-center py-2">-</TableCell>
                        <TableCell className="text-center py-2">{team.totalPresentDays}</TableCell>
                        <TableCell className="text-center py-2">{team.totalAbsentDays}</TableCell>
                        <TableCell className="text-center py-2">-</TableCell>
                        <TableCell
                          className={`text-center font-semibold py-2 ${getAttendanceColor(team.attendancePercent)}`}
                        >
                          {team.attendancePercent}%
                        </TableCell>
                        <TableCell className="text-center py-2">-</TableCell>
                        <TableCell className="py-2">{getPerformanceBadge(team.performanceStatus)}</TableCell>
                      </TableRow>

                      {/* Employee Rows (Nested) */}
                      {expandedTeams[team.id] &&
                        team.employees.map((employee) => (
                          <TableRow
                            key={employee.id}
                            className="hover:bg-muted/50 cursor-pointer text-xs"
                            onClick={() => handleEmployeeClick(employee, team)}
                          >
                            <TableCell className="py-1.5"></TableCell>
                            <TableCell className="pl-8 py-1.5">
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                                <div>
                                  <p className="text-xs font-medium">{employee.name}</p>
                                  <p className="text-[10px] text-muted-foreground">{employee.id}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-xs py-1.5">{employee.designation}</TableCell>
                            <TableCell className="text-center py-1.5">
                              <Badge variant="outline" className="font-mono text-[10px] h-5 px-1.5">
                                {employee.grade}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center text-xs py-1.5">{employee.monthlyKPITarget}</TableCell>
                            <TableCell className="text-center text-xs py-1.5">{employee.monthlyKPIAchieved}</TableCell>
                            <TableCell
                              className={`text-center font-semibold text-xs py-1.5 ${getKPIColor(employee.kpiPercent)}`}
                            >
                              {employee.kpiPercent}%
                            </TableCell>
                            <TableCell className="text-center text-xs py-1.5">{employee.totalOperations}</TableCell>
                            <TableCell className="text-center text-xs py-1.5">
                              ₹{(employee.totalMonetaryValue / 1000).toFixed(1)}k
                            </TableCell>
                            <TableCell className="text-center text-xs py-1.5">{employee.presentDays}</TableCell>
                            <TableCell className="text-center text-xs py-1.5">{employee.absentDays}</TableCell>
                            <TableCell className="text-center text-xs py-1.5">{employee.lateDays}</TableCell>
                            <TableCell
                              className={`text-center font-semibold text-xs py-1.5 ${getAttendanceColor(employee.attendancePercent)}`}
                            >
                              {employee.attendancePercent}%
                            </TableCell>
                            <TableCell className="text-center text-xs py-1.5">{employee.leaveDays}</TableCell>
                            <TableCell className="py-1.5">
                              <div className="flex items-center gap-1 flex-wrap">
                                {employee.flags.length > 0 ? (
                                  employee.flags.map((flag) => (
                                    <Badge
                                      key={flag}
                                      variant="outline"
                                      className="text-[10px] h-5 px-1.5 bg-amber-500/10 text-amber-700 dark:text-amber-400"
                                    >
                                      <AlertTriangleIcon className="h-2.5 w-2.5 mr-0.5" />
                                      {flag}
                                    </Badge>
                                  ))
                                ) : (
                                  <span className="text-[10px] text-muted-foreground">No alerts</span>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-base font-semibold">Employee Project / Operations Status</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Review operational output and cross-check KPI evidence
                </p>
              </div>
              <Button size="sm" variant="outline" className="h-8 text-xs bg-transparent">
                Export Data
              </Button>
            </div>

            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/50 sticky top-0">
                  <TableRow className="text-xs">
                    <TableHead className="w-16 h-8">ID</TableHead>
                    <TableHead className="w-24 h-8">Date</TableHead>
                    <TableHead className="w-24 h-8">Assign EID</TableHead>
                    <TableHead className="min-w-[120px] h-8">Assign Name</TableHead>
                    <TableHead className="w-24 h-8">Emp ID</TableHead>
                    <TableHead className="min-w-[120px] h-8">Emp Name</TableHead>
                    <TableHead className="min-w-[130px] h-8">Assign Team</TableHead>
                    <TableHead className="min-w-[140px] h-8">Profile Name</TableHead>
                    <TableHead className="w-28 h-8">Order ID</TableHead>
                    <TableHead className="w-24 text-right h-8">Value (₹)</TableHead>
                    <TableHead className="w-20 h-8">Client ID</TableHead>
                    <TableHead className="w-20 h-8">Order Link</TableHead>
                    <TableHead className="w-24 h-8">Sales Status</TableHead>
                    <TableHead className="w-24 h-8">Instruction</TableHead>
                    <TableHead className="w-28 h-8">Order Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projectOperationsData.map((project) => (
                    <TableRow
                      key={project.id}
                      className="hover:bg-muted/50 cursor-pointer text-xs"
                      onClick={() => handleProjectClick(project)}
                    >
                      <TableCell className="py-1.5 font-mono text-[10px]">{project.id}</TableCell>
                      <TableCell className="py-1.5">{project.date}</TableCell>
                      <TableCell className="py-1.5 font-mono text-[10px]">{project.assignEmployeeId}</TableCell>
                      <TableCell className="py-1.5">{project.assignEmployeeName}</TableCell>
                      <TableCell className="py-1.5 font-mono text-[10px]">{project.employeeId}</TableCell>
                      <TableCell className="py-1.5">{project.employeeName}</TableCell>
                      <TableCell className="py-1.5">{project.assignTeam}</TableCell>
                      <TableCell className="py-1.5 font-medium">{project.profileName}</TableCell>
                      <TableCell className="py-1.5">
                        <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded">{project.orderId}</code>
                      </TableCell>
                      <TableCell className="py-1.5 text-right font-semibold">
                        ₹{project.monetaryValue.toLocaleString()}
                      </TableCell>
                      <TableCell className="py-1.5 font-mono text-[10px]">{project.clientId}</TableCell>
                      <TableCell className="py-1.5">
                        <a
                          href={project.orderLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLinkIcon className="h-3 w-3" />
                        </a>
                      </TableCell>
                      <TableCell className="py-1.5">{getSalesStatusBadge(project.salesStatus)}</TableCell>
                      <TableCell className="py-1.5">
                        <a
                          href={project.instructionSheetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FileTextIcon className="h-3 w-3" />
                        </a>
                      </TableCell>
                      <TableCell className="py-1.5">{getOrderStatusBadge(project.orderStatus)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Leave Management Section */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-base font-semibold">Leave Management & Approval</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Review and approve employee leave requests</p>
              </div>

              <div className="flex items-center gap-2">
                <Select value={leaveMonthFilter} onValueChange={setLeaveMonthFilter}>
                  <SelectTrigger className="h-8 w-[130px] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-01">January 2024</SelectItem>
                    <SelectItem value="2023-12">December 2023</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={leaveTypeFilter} onValueChange={setLeaveTypeFilter}>
                  <SelectTrigger className="h-8 w-[110px] text-xs">
                    <SelectValue placeholder="Leave Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="casual">Casual Leave</SelectItem>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="earned">Earned Leave</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={leaveStatusFilter} onValueChange={setLeaveStatusFilter}>
                  <SelectTrigger className="h-8 w-[110px] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="text-xs">
                    <TableHead className="w-24 h-8">Emp ID</TableHead>
                    <TableHead className="min-w-[130px] h-8">Employee Name</TableHead>
                    <TableHead className="min-w-[130px] h-8">Team</TableHead>
                    <TableHead className="w-28 h-8">Leave Type</TableHead>
                    <TableHead className="w-20 h-8">Duration</TableHead>
                    <TableHead className="min-w-[160px] h-8">Date Range</TableHead>
                    <TableHead className="w-16 text-center h-8">Days</TableHead>
                    <TableHead className="w-24 h-8">Applied On</TableHead>
                    <TableHead className="min-w-[200px] h-8">Reason</TableHead>
                    <TableHead className="w-20 text-center h-8">Balance</TableHead>
                    <TableHead className="w-24 h-8">Status</TableHead>
                    <TableHead className="w-32 h-8 text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequestsData.map((leave) => (
                    <TableRow key={leave.id} className="hover:bg-muted/50 text-xs">
                      <TableCell className="py-1.5 font-mono text-[10px]">{leave.employeeId}</TableCell>
                      <TableCell className="py-1.5 font-medium">{leave.employeeName}</TableCell>
                      <TableCell className="py-1.5">{leave.team}</TableCell>
                      <TableCell className="py-1.5">{leave.leaveType}</TableCell>
                      <TableCell className="py-1.5">{leave.leaveDuration}</TableCell>
                      <TableCell className="py-1.5">
                        <div className="flex items-center gap-1 text-[11px]">
                          <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                          {leave.fromDate} – {leave.toDate}
                        </div>
                      </TableCell>
                      <TableCell className="py-1.5 text-center font-semibold">{leave.leaveDays}</TableCell>
                      <TableCell className="py-1.5 text-[11px]">{leave.applicationDate}</TableCell>
                      <TableCell className="py-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-muted-foreground line-clamp-1">{leave.reason}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-5 w-5 p-0"
                            onClick={() => handleLeaveDetailClick(leave)}
                          >
                            <FileTextIcon className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="py-1.5 text-center">
                        <div className="text-[11px]">
                          <span className="font-semibold">{leave.currentBalance}</span>
                          <span className="text-muted-foreground mx-0.5">→</span>
                          <span className="text-muted-foreground">{leave.balanceAfter}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-1.5">{getApprovalStatusBadge(leave.approvalStatus)}</TableCell>
                      <TableCell className="py-1.5">
                        {leave.approvalStatus === "Pending" && (
                          <div className="flex items-center gap-1">
                            <Button size="sm" className="h-6 px-2 text-[10px] bg-emerald-600 hover:bg-emerald-700">
                              <CheckCircleIcon className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-6 px-2 text-[10px] border-red-500/20 text-red-700 dark:text-red-400 hover:bg-red-500/10 bg-transparent"
                            >
                              <XCircleIcon className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                        {leave.approvalStatus === "Approved" && (
                          <span className="text-[10px] text-muted-foreground">No action</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-4">
            <h2 className="text-base font-semibold mb-3">Supervisor Validation Controls</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <Button variant="outline" className="h-auto py-3 flex-col items-start text-left gap-1 bg-transparent">
                <div className="flex items-center gap-2 w-full">
                  <LockIcon className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium">Lock KPI Month</span>
                </div>
                <p className="text-xs text-muted-foreground">Prevent KPI modifications</p>
              </Button>

              <Button variant="outline" className="h-auto py-3 flex-col items-start text-left gap-1 bg-transparent">
                <div className="flex items-center gap-2 w-full">
                  <ClockIcon className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Override Attendance</span>
                </div>
                <p className="text-xs text-muted-foreground">Manual attendance correction</p>
              </Button>

              <Button variant="outline" className="h-auto py-3 flex-col items-start text-left gap-1 bg-transparent">
                <div className="flex items-center gap-2 w-full">
                  <FlagIcon className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium">Flag Employee</span>
                </div>
                <p className="text-xs text-muted-foreground">Mark for supervisor attention</p>
              </Button>

              <Button variant="outline" className="h-auto py-3 flex-col items-start text-left gap-1 bg-transparent">
                <div className="flex items-center gap-2 w-full">
                  <MessageSquareIcon className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">Internal Remarks</span>
                </div>
                <p className="text-xs text-muted-foreground">Add supervisor notes</p>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          {selectedEmployee && (
            <>
              <SheetHeader className="pb-4 border-b">
                <div className="flex items-start justify-between">
                  <div>
                    <SheetTitle className="text-lg">{selectedEmployee.name}</SheetTitle>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{selectedEmployee.id}</span>
                      <span>•</span>
                      <span>{selectedEmployee.designation}</span>
                      <span>•</span>
                      <span>{selectedEmployeeTeam}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="font-mono">
                    Grade {selectedEmployee.grade}
                  </Badge>
                </div>
              </SheetHeader>

              <Tabs defaultValue="kpi" className="mt-4">
                <TabsList className="grid w-full grid-cols-4 h-9">
                  <TabsTrigger value="kpi" className="text-xs">
                    KPI & Operations
                  </TabsTrigger>
                  <TabsTrigger value="attendance" className="text-xs">
                    Attendance
                  </TabsTrigger>
                  <TabsTrigger value="projects" className="text-xs">
                    Projects
                  </TabsTrigger>
                  <TabsTrigger value="leave" className="text-xs">
                    Leave History
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="kpi" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground mb-1">Monthly KPI Target</p>
                        <p className="text-2xl font-bold">{selectedEmployee.monthlyKPITarget}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground mb-1">Monthly KPI Achieved</p>
                        <p className="text-2xl font-bold text-blue-600">{selectedEmployee.monthlyKPIAchieved}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground mb-1">KPI Achievement</p>
                        <div className="flex items-baseline gap-2">
                          <p className={`text-2xl font-bold ${getKPIColor(selectedEmployee.kpiPercent)}`}>
                            {selectedEmployee.kpiPercent}%
                          </p>
                          {selectedEmployee.kpiPercent >= 100 ? (
                            <TrendingUpIcon className="h-4 w-4 text-emerald-600" />
                          ) : (
                            <TrendingDownIcon className="h-4 w-4 text-amber-600" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground mb-1">Total Operations</p>
                        <p className="text-2xl font-bold">{selectedEmployee.totalOperations}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">Total Monetary Value</p>
                        <Badge variant="outline" className="text-emerald-700 dark:text-emerald-400">
                          High Performer
                        </Badge>
                      </div>
                      <p className="text-3xl font-bold text-emerald-600">
                        ₹{selectedEmployee.totalMonetaryValue.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Generated in {selectedEmployee.totalOperations} operations
                      </p>
                    </CardContent>
                  </Card>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Supervisor Remarks (Internal)</Label>
                    <Textarea
                      placeholder="Add internal remarks about employee performance (not visible to employee)"
                      className="min-h-[100px] text-xs"
                      value={supervisorRemarks}
                      onChange={(e) => setSupervisorRemarks(e.target.value)}
                    />
                    <Button size="sm" className="w-full">
                      Save Remarks
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="attendance" className="space-y-4 mt-4">
                  <div className="grid grid-cols-3 gap-3">
                    <Card>
                      <CardContent className="p-3">
                        <p className="text-xs text-muted-foreground mb-1">Present Days</p>
                        <p className="text-xl font-bold text-emerald-600">{selectedEmployee.presentDays}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3">
                        <p className="text-xs text-muted-foreground mb-1">Absent Days</p>
                        <p className="text-xl font-bold text-red-600">{selectedEmployee.absentDays}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3">
                        <p className="text-xs text-muted-foreground mb-1">Late Days</p>
                        <p className="text-xl font-bold text-amber-600">{selectedEmployee.lateDays}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow className="text-xs">
                          <TableHead className="h-8">Date</TableHead>
                          <TableHead className="h-8">In Time</TableHead>
                          <TableHead className="h-8">Out Time</TableHead>
                          <TableHead className="h-8">Hours</TableHead>
                          <TableHead className="h-8">Status</TableHead>
                          <TableHead className="h-8">Approval</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {attendanceDetailedData.map((record, index) => (
                          <TableRow key={index} className="text-xs">
                            <TableCell className="py-1.5 font-medium">{record.date}</TableCell>
                            <TableCell className="py-1.5">{record.inTime}</TableCell>
                            <TableCell className="py-1.5">{record.outTime}</TableCell>
                            <TableCell className="py-1.5 font-mono text-[10px]">{record.workHours}</TableCell>
                            <TableCell className="py-1.5">{getAttendanceStatusBadge(record.status)}</TableCell>
                            <TableCell className="py-1.5">{getApprovalStatusBadge(record.approvalStatus)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 text-xs bg-transparent">
                      <ClockIcon className="h-3.5 w-3.5 mr-1.5" />
                      Override Attendance
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-xs bg-transparent">
                      <DownloadIcon className="h-3.5 w-3.5 mr-1.5" />
                      Export Report
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="projects" className="space-y-4 mt-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow className="text-xs">
                          <TableHead className="h-8">Order ID</TableHead>
                          <TableHead className="h-8">Date</TableHead>
                          <TableHead className="h-8">Profile</TableHead>
                          <TableHead className="h-8 text-right">Value</TableHead>
                          <TableHead className="h-8">Sales Status</TableHead>
                          <TableHead className="h-8">Order Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projectOperationsData
                          .filter((p) => p.employeeId === selectedEmployee.id)
                          .map((project) => (
                            <TableRow
                              key={project.id}
                              className="text-xs cursor-pointer hover:bg-muted/50"
                              onClick={() => handleProjectClick(project)}
                            >
                              <TableCell className="py-1.5">
                                <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded">{project.orderId}</code>
                              </TableCell>
                              <TableCell className="py-1.5">{project.date}</TableCell>
                              <TableCell className="py-1.5 font-medium">{project.profileName}</TableCell>
                              <TableCell className="py-1.5 text-right font-semibold">
                                ₹{project.monetaryValue.toLocaleString()}
                              </TableCell>
                              <TableCell className="py-1.5">{getSalesStatusBadge(project.salesStatus)}</TableCell>
                              <TableCell className="py-1.5">{getOrderStatusBadge(project.orderStatus)}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>

                  {projectOperationsData.filter((p) => p.employeeId === selectedEmployee.id).length === 0 && (
                    <div className="text-center py-8 text-sm text-muted-foreground">
                      No project data available for this employee
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="leave" className="space-y-4 mt-4">
                  <div className="grid grid-cols-3 gap-3">
                    <Card>
                      <CardContent className="p-3">
                        <p className="text-xs text-muted-foreground mb-1">CL Balance</p>
                        <p className="text-xl font-bold">7</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3">
                        <p className="text-xs text-muted-foreground mb-1">SL Balance</p>
                        <p className="text-xl font-bold">6.5</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-3">
                        <p className="text-xs text-muted-foreground mb-1">EL Balance</p>
                        <p className="text-xl font-bold">12</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-2">
                    {leaveHistoryData.map((leave) => (
                      <Card key={leave.id} className="hover:bg-muted/50 cursor-pointer">
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-sm font-medium">{leave.leaveType}</p>
                              <p className="text-xs text-muted-foreground">
                                {leave.fromDate} – {leave.toDate} ({leave.duration})
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {leave.attachment && (
                                <Badge variant="outline" className="text-[10px] h-5">
                                  <FileTextIcon className="h-2.5 w-2.5 mr-1" />
                                  Attachment
                                </Badge>
                              )}
                              {getApprovalStatusBadge(leave.status)}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Applied: {leave.appliedOn}</span>
                            <span>Approved by: {leave.approvedBy}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={leaveDetailOpen} onOpenChange={setLeaveDetailOpen}>
        <DialogContent className="max-w-2xl">
          {selectedLeave && (
            <>
              <DialogHeader>
                <DialogTitle>Leave Request Details</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Employee</Label>
                    <p className="text-sm font-medium">{selectedLeave.employeeName}</p>
                    <p className="text-xs text-muted-foreground">{selectedLeave.employeeId}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Team</Label>
                    <p className="text-sm font-medium">{selectedLeave.team}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Leave Type</Label>
                    <p className="text-sm font-medium">{selectedLeave.leaveType}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Duration</Label>
                    <p className="text-sm font-medium">{selectedLeave.leaveDuration}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Date Range</Label>
                    <p className="text-sm font-medium">
                      {selectedLeave.fromDate} – {selectedLeave.toDate}
                    </p>
                    <p className="text-xs text-muted-foreground">{selectedLeave.leaveDays} days</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Leave Balance</Label>
                    <p className="text-sm font-medium">
                      {selectedLeave.currentBalance} → {selectedLeave.balanceAfter}
                    </p>
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Reason</Label>
                  <p className="text-sm mt-1 p-3 bg-muted/50 rounded-md">{selectedLeave.reason}</p>
                </div>

                {selectedLeave.attachment && (
                  <div>
                    <Label className="text-xs text-muted-foreground">Attachment</Label>
                    <Button variant="outline" size="sm" className="mt-1 bg-transparent">
                      <DownloadIcon className="h-3.5 w-3.5 mr-1.5" />
                      Download Attachment
                    </Button>
                  </div>
                )}

                {selectedLeave.supervisorRemarks && (
                  <div>
                    <Label className="text-xs text-muted-foreground">Supervisor Remarks</Label>
                    <p className="text-sm mt-1 p-3 bg-blue-500/5 rounded-md border border-blue-500/20">
                      {selectedLeave.supervisorRemarks}
                    </p>
                  </div>
                )}

                {selectedLeave.approvalStatus === "Pending" && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Add Remarks (Optional)</Label>
                    <Textarea
                      placeholder="Add your remarks here..."
                      className="min-h-[80px] text-sm"
                      value={supervisorRemarks}
                      onChange={(e) => setSupervisorRemarks(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                        <CheckCircleIcon className="h-4 w-4 mr-2" />
                        Approve Leave
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-red-500/20 text-red-700 hover:bg-red-500/10 bg-transparent"
                      >
                        <XCircleIcon className="h-4 w-4 mr-2" />
                        Reject Leave
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={projectDetailOpen} onOpenChange={setProjectDetailOpen}>
        <DialogContent className="max-w-2xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle>Project / Order Details</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Order ID</Label>
                    <p className="text-sm font-mono font-medium">{selectedProject.orderId}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Date</Label>
                    <p className="text-sm font-medium">{selectedProject.date}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Profile Name</Label>
                    <p className="text-sm font-medium">{selectedProject.profileName}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Client ID</Label>
                    <p className="text-sm font-mono font-medium">{selectedProject.clientId}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Assigned To</Label>
                    <p className="text-sm font-medium">{selectedProject.assignEmployeeName}</p>
                    <p className="text-xs text-muted-foreground">{selectedProject.assignEmployeeId}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Handled By</Label>
                    <p className="text-sm font-medium">{selectedProject.employeeName}</p>
                    <p className="text-xs text-muted-foreground">{selectedProject.employeeId}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Team</Label>
                  <p className="text-sm font-medium">{selectedProject.assignTeam}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Monetary Value</Label>
                    <p className="text-2xl font-bold text-emerald-600">
                      ₹{selectedProject.monetaryValue.toLocaleString()}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <Label className="text-xs text-muted-foreground">Sales Status</Label>
                      <div className="mt-1">{getSalesStatusBadge(selectedProject.salesStatus)}</div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Order Status</Label>
                      <div className="mt-1">{getOrderStatusBadge(selectedProject.orderStatus)}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
                    <a href={selectedProject.orderLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLinkIcon className="h-4 w-4 mr-2" />
                      View Order Link
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
                    <a href={selectedProject.instructionSheetLink} target="_blank" rel="noopener noreferrer">
                      <FileTextIcon className="h-4 w-4 mr-2" />
                      View Instruction Sheet
                    </a>
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Supervisor Notes (Internal)</Label>
                  <Textarea
                    placeholder="Add internal notes about this project/order..."
                    className="min-h-[80px] text-sm"
                  />
                  <Button size="sm" className="w-full">
                    Save Notes
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
