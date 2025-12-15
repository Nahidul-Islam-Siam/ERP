/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ApprovalQueue } from "@/components/Dashboard/HRAdmin/approval-queue"
import { QuickActions } from "@/components/Dashboard/HRAdmin/quick-actions"
import { OrganizationHealth } from "@/components/Dashboard/HRAdmin/organization-health"
import { KPISystemControls } from "@/components/Dashboard/HRAdmin/kpi-system-controls"
import { SummaryCards } from "@/components/Dashboard/HRAdmin/summery-cards"

import { toast } from "sonner"
import { AuditTrail } from "@/components/Dashboard/HRAdmin/audit-trai;"


const initialSummaryData = {
  totalEmployees: 247,
  activeEmployees: 235,
  totalSupervisors: 18,
  totalTeams: 42,
  totalTeamLeaders: 42,
  inactiveOnboarding: 12,
}

const initialApprovalItems = [
  {
    id: 1,
    type: "Leave" as const,
    employeeName: "Sarah Johnson",
    team: "Operations Team A",
    requestedAction: "5-day casual leave (Dec 20-24)",
    requestDate: "2024-12-14",
    priority: "High" as const,
    status: "Pending" as const,
  },
  {
    id: 2,
    type: "Attendance" as const,
    employeeName: "Michael Chen",
    team: "Engineering Team B",
    requestedAction: "Mark attendance for Dec 12 (system error)",
    requestDate: "2024-12-13",
    priority: "Medium" as const,
    status: "Under Review" as const,
  },
  {
    id: 3,
    type: "KPI" as const,
    employeeName: "Priya Sharma",
    team: "Sales Team C",
    requestedAction: "Override KPI for November (medical emergency)",
    requestDate: "2024-12-14",
    priority: "High" as const,
    status: "Pending" as const,
  },
  {
    id: 4,
    type: "Employee Change" as const,
    employeeName: "James Wilson",
    team: "Support Team D",
    requestedAction: "Transfer to Operations Team A",
    requestDate: "2024-12-15",
    priority: "Low" as const,
    status: "Pending" as const,
  },
]

const initialHealthData = {
  teamsWithoutSupervisor: 3,
  teamsWithoutTeamLeader: 2,
  employeesWithoutTeam: 7,
  employeesWithoutKPI: 15,
  employeesExpiredLeave: 9,
}

const initialSystemStatus = {
  kpiMonthStatus: "Open" as "Open"  | "Locked",
  currentMonth: "December 2024",
  attendanceOverrideEnabled: false,
}

const initialAuditEntries = [
  {
    id: 1,
    dateTime: "2024-12-15, 10:15 AM",
    hrAdminName: "HR Admin",
    action: "Approve",
    entity: "Leave Request",
    oldValue: "Pending",
    newValue: "Approved",
    reason: "Verified with supervisor",
  },
  {
    id: 2,
    dateTime: "2024-12-15, 09:45 AM",
    hrAdminName: "HR Admin",
    action: "Create",
    entity: "Employee",
    oldValue: "-",
    newValue: "EMP-248",
    reason: "New hire onboarding",
  },
  {
    id: 3,
    dateTime: "2024-12-15, 09:30 AM",
    hrAdminName: "HR Admin",
    action: "Update",
    entity: "Team Structure",
    oldValue: "10 members",
    newValue: "12 members",
    reason: "Team restructuring",
  },
]

export function HRAdminDashboard() {

  const [filterMonth, setFilterMonth] = useState("december")
  const [filterYear, setFilterYear] = useState("2024")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [filterTeam, setFilterTeam] = useState("all")
  const [filterEmployeeStatus, setFilterEmployeeStatus] = useState("all")

  const [approvalItems, setApprovalItems] = useState(initialApprovalItems)
  const [systemStatus, setSystemStatus] = useState<{
    kpiMonthStatus: "Open" | "Locked"
    currentMonth: string
    attendanceOverrideEnabled: boolean
  }>(initialSystemStatus)

  const handleCardClick = (action: string) => {
    console.log("[v0] Card action:", action)
toast("Opening modal")
  }

  const handleApprove = (id: number) => {
    setApprovalItems((items) => items.filter((item) => item.id !== id))

  }

  const handleReject = (id: number) => {
    setApprovalItems((items) => items.filter((item) => item.id !== id))
    toast.error("The request has been rejected")
  }

  const handleViewDetails = (item: any) => {
    console.log("[v0] View details for:", item)
    toast.success(`Viewing details for ${item.employeeName}`)
  }

  const handleFixIssue = (issueType: string) => {
    console.log("[v0] Fix issue:", issueType)
    toast.success(`Fixing ${issueType} issue`)
  }

  const handleLockMonth = () => {
    setSystemStatus((prev) => ({ ...prev, kpiMonthStatus: "Locked" as const }))
    toast.success("KPI month has been locked successfully")
  }

  const handleUnlockMonth = () => {
    setSystemStatus((prev) => ({ ...prev, kpiMonthStatus: "Open" as const }))
    toast.success("KPI month has been unlocked")
  }

  const handleToggleAttendanceOverride = (enabled: boolean) => {
    setSystemStatus((prev) => ({ ...prev, attendanceOverrideEnabled: enabled }))
    toast.success(`Attendance manual override is now ${enabled ? "enabled" : "disabled"}`)
  }

  const handleResetLeaveCycle = () => {
    toast.success("This action requires confirmation")
  }

  const handleQuickAction = (actionKey: string) => {
    console.log("[v0] Quick action:", actionKey)
    toast.success(`Action: ${actionKey}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">HR / Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Action-driven control center for employee management</p>
            </div>

            {/* Global Filters */}
            <div className="flex flex-wrap gap-2">
              <Select value={filterMonth} onValueChange={setFilterMonth}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="january">January</SelectItem>
                  <SelectItem value="february">February</SelectItem>
                  <SelectItem value="december">December</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterTeam} onValueChange={setFilterTeam}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  <SelectItem value="team-a">Team A</SelectItem>
                  <SelectItem value="team-b">Team B</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterEmployeeStatus} onValueChange={setFilterEmployeeStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6 space-y-6">
        {/* Summary Cards */}
        <SummaryCards data={initialSummaryData} onCardClick={handleCardClick} />

        {/* Two Column Layout */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Side - Main Actions (2/3 width) */}
          <div className="space-y-6 lg:col-span-2">
            <ApprovalQueue
              items={approvalItems}
              onApprove={handleApprove}
              onReject={handleReject}
              onViewDetails={handleViewDetails}
            />
            <QuickActions onAction={handleQuickAction} />
          </div>

          {/* Right Side - System Controls (1/3 width) */}
          <div className="space-y-6">
            <OrganizationHealth data={initialHealthData} onFixIssue={handleFixIssue} />
            <KPISystemControls
              status={systemStatus}
              onLockMonth={handleLockMonth}
              onUnlockMonth={handleUnlockMonth}
              onToggleAttendanceOverride={handleToggleAttendanceOverride}
              onResetLeaveCycle={handleResetLeaveCycle}
            />
          </div>
        </div>

        {/* Audit Trail */}
        <AuditTrail entries={initialAuditEntries} />
      </div>
    </div>
  )
}
