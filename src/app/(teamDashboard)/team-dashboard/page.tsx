/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, TrendingUp, Users, Target, Calendar, Pencil } from "lucide-react"

// Mock data for team members
const teamMembers = [
  {
    id: "EMP-001",
    name: "Alice Cooper",
    role: "Senior Developer",
    status: "Active",
    targetKPI: 85,
    achievedKPI: 88,
    assignments: 12,
  },
  {
    id: "EMP-002",
    name: "Bob Martinez",
    role: "Developer",
    status: "Active",
    targetKPI: 75,
    achievedKPI: 72,
    assignments: 10,
  },
  {
    id: "EMP-003",
    name: "Carol White",
    role: "QA Engineer",
    status: "Active",
    targetKPI: 80,
    achievedKPI: 85,
    assignments: 15,
  },
  {
    id: "EMP-004",
    name: "David Kim",
    role: "Designer",
    status: "On Leave",
    targetKPI: 70,
    achievedKPI: 68,
    assignments: 8,
  },
  {
    id: "EMP-005",
    name: "Emma Davis",
    role: "Developer",
    status: "Active",
    targetKPI: 75,
    achievedKPI: 79,
    assignments: 11,
  },
]

// Mock data for assignments
const mockAssignments = [
  {
    id: "ASG-001",
    date: "2024-01-15",
    assignEmployeeId: "EMP-001",
    assignEmployee: "Alice Cooper",
    employeeId: "EMP-001",
    employeeName: "Alice Cooper",
    assignTeam: "Dark Pharos",
    profileName: "E-Commerce Site",
    orderId: "ORD-2024-001",
    monetaryValue: 5000,
    clientId: "CLI-001",
    orderLink: "https://example.com/order/001",
    salesStatus: "Delivered",
    instructionSheet: "https://example.com/instructions/001",
    orderStatus: "Complete",
    remarks: "Completed ahead of schedule",
  },
  {
    id: "ASG-002",
    date: "2024-01-16",
    assignEmployeeId: "EMP-002",
    assignEmployee: "Bob Martinez",
    employeeId: "EMP-002",
    employeeName: "Bob Martinez",
    assignTeam: "Dark Pharos",
    profileName: "Mobile App",
    orderId: "ORD-2024-002",
    monetaryValue: 7500,
    clientId: "CLI-002",
    orderLink: "https://example.com/order/002",
    salesStatus: "Pending",
    instructionSheet: "https://example.com/instructions/002",
    orderStatus: "In Progress",
    remarks: "Awaiting client feedback",
  },
  {
    id: "ASG-003",
    date: "2024-01-17",
    assignEmployeeId: "EMP-003",
    assignEmployee: "Carol White",
    employeeId: "EMP-003",
    employeeName: "Carol White",
    assignTeam: "Dark Pharos",
    profileName: "Dashboard UI",
    orderId: "ORD-2024-003",
    monetaryValue: 3500,
    clientId: "CLI-003",
    orderLink: "https://example.com/order/003",
    salesStatus: "Revisions",
    instructionSheet: "https://example.com/instructions/003",
    orderStatus: "Delivered",
    remarks: "Minor revisions requested",
  },
]

export default function TeamLeaderDashboard() {
  const [selectedMonth, setSelectedMonth] = useState("january")
  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false)
  const [editingAssignment, setEditingAssignment] = useState<any>(null)

  // Calculate KPIs
  const teamAverageKPI = 82
  const targetKPI = 75
  const achievedKPI = 82
  const activeMembers = teamMembers.filter((m) => m.status === "Active").length
  const totalMembers = teamMembers.length
  const myKPI = 88

  const getKPIColor = (kpi: number, target: number) => {
    const percentage = (kpi / target) * 100
    if (percentage >= 90) return "text-success"
    if (percentage >= 70) return "text-warning"
    return "text-destructive"
  }

// const getStatusBadgeVariant = (status: string): "secondary" | "default" | "destructive" | "outline" | "success" | "warning" | null => {
//   if (status === "Delivered" || status === "Complete" || status === "Active") return "success";
//   if (status === "Pending" || status === "In Progress") return "warning";
//   if (status === "Revisions" || status === "On Leave") return "secondary";
//   return null;
// };
  const handleEditAssignment = (assignment: any) => {
    setEditingAssignment(assignment)
    setAssignmentModalOpen(true)
  }

  const handleCloseModal = () => {
    setAssignmentModalOpen(false)
    setEditingAssignment(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b bg-card backdrop-blur supports-[backdrop-filter]:bg-card/95">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Dark Pharos</h1>
                <p className="text-sm text-muted-foreground">TEAM-DP-001</p>
              </div>
              <Badge variant="default" className="h-fit">
                Team Leader
              </Badge>
              <Badge variant="destructive" className="h-fit">
                Active
              </Badge>
            </div>
            <div className="flex items-center gap-3">
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
          <p className="mt-2 text-xs text-muted-foreground">You can assign tasks, update KPI, and edit orders</p>
        </div>
      </header>

      {/* Sticky KPI Cards */}
      <div className="sticky top-[104px] z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95">
        <div className="container mx-auto px-6 py-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Team Average KPI</p>
                    <p className={`text-3xl font-bold ${getKPIColor(teamAverageKPI, targetKPI)}`}>{teamAverageKPI}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Target vs Achieved</p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-xl font-semibold">{achievedKPI}%</span>
                    <span className="text-sm text-muted-foreground">/ {targetKPI}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${Math.min((achievedKPI / targetKPI) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Team Members</p>
                    <p className="text-3xl font-bold">{totalMembers}</p>
                    <p className="text-xs text-muted-foreground">{activeMembers} active</p>
                  </div>
                  <Users className="h-8 w-8 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">My KPI</p>
                    <p className={`text-3xl font-bold ${getKPIColor(myKPI, targetKPI)}`}>{myKPI}%</p>
                    <p className="text-xs text-muted-foreground">Team Leader</p>
                  </div>
                  <Target className="h-8 w-8 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-8">
        {/* Assignment Table Section */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Assignment Management</h2>
              <p className="text-sm text-muted-foreground">Track and manage team assignments</p>
            </div>
            <Button onClick={() => setAssignmentModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Assignment
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="sticky left-0 z-10 bg-card">ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="sticky left-[80px] z-10 bg-card">Employee Name</TableHead>
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Team</TableHead>
                      <TableHead>Profile Name</TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Client ID</TableHead>
                      <TableHead>Order Link</TableHead>
                      <TableHead>Sales Status</TableHead>
                      <TableHead>Instruction Sheet</TableHead>
                      <TableHead>Order Status</TableHead>
                      <TableHead>Remarks</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAssignments.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell className="sticky left-0 bg-card font-medium">{assignment.id}</TableCell>
                        <TableCell>{new Date(assignment.date).toLocaleDateString()}</TableCell>
                        <TableCell className="sticky left-[80px] bg-card font-medium">
                          {assignment.employeeName}
                        </TableCell>
                        <TableCell>{assignment.employeeId}</TableCell>
                        <TableCell>{assignment.assignTeam}</TableCell>
                        <TableCell>{assignment.profileName}</TableCell>
                        <TableCell>{assignment.orderId}</TableCell>
                        <TableCell>${assignment.monetaryValue.toLocaleString()}</TableCell>
                        <TableCell>{assignment.clientId}</TableCell>
                        <TableCell>
                          <a
                            href={assignment.orderLink}
                            className="text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </TableCell>
                        <TableCell>
                          <Badge >
                            {assignment.salesStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <a
                            href={assignment.instructionSheet}
                            className="text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </TableCell>
                        <TableCell>
                          <Badge >
                            {assignment.orderStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">{assignment.remarks}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleEditAssignment(assignment)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team Member Table Section */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Team Members Overview</h2>
            <p className="text-sm text-muted-foreground">Monitor individual performance and KPI metrics</p>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Employee Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Monthly Target KPI</TableHead>
                      <TableHead>Achieved KPI</TableHead>
                      <TableHead>KPI %</TableHead>
                      <TableHead>Assignments</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamMembers.map((member) => {
                      const kpiPercentage = ((member.achievedKPI / member.targetKPI) * 100).toFixed(0)
                      return (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium">{member.id}</TableCell>
                          <TableCell className="font-medium">{member.name}</TableCell>
                          <TableCell>{member.role}</TableCell>
                          <TableCell>
                            <Badge>{member.status}</Badge>
                          </TableCell>
                          <TableCell>{member.targetKPI}%</TableCell>
                          <TableCell>{member.achievedKPI}%</TableCell>
                          <TableCell>
                            <span className={getKPIColor(member.achievedKPI, member.targetKPI)}>{kpiPercentage}%</span>
                          </TableCell>
                          <TableCell>{member.assignments}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Update KPI
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Create/Edit Assignment Modal */}
      <Dialog open={assignmentModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingAssignment ? "Edit Assignment" : "Create Assignment"}</DialogTitle>
            <DialogDescription>
              {editingAssignment ? "Update assignment details below" : "Fill in the assignment details below"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="assignEmployee">Assign Employee *</Label>
              <Select defaultValue={editingAssignment?.assignEmployeeId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers
                    .filter((m) => m.status === "Active")
                    .map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name} - {member.role}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="profileName">Profile Name *</Label>
                <Input id="profileName" placeholder="E-Commerce Site" defaultValue={editingAssignment?.profileName} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="orderId">Order ID *</Label>
                <Input id="orderId" placeholder="ORD-2024-001" defaultValue={editingAssignment?.orderId} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="monetaryValue">Monetary Value *</Label>
                <Input
                  id="monetaryValue"
                  type="number"
                  placeholder="5000"
                  defaultValue={editingAssignment?.monetaryValue}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="clientId">Client ID</Label>
                <Input id="clientId" placeholder="CLI-001" defaultValue={editingAssignment?.clientId} />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="orderLink">Order Link</Label>
              <Input
                id="orderLink"
                type="url"
                placeholder="https://example.com/order"
                defaultValue={editingAssignment?.orderLink}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="instructionSheet">Instruction Sheet Link</Label>
              <Input
                id="instructionSheet"
                type="url"
                placeholder="https://example.com/instructions"
                defaultValue={editingAssignment?.instructionSheet}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="salesStatus">Sales Status *</Label>
                <Select defaultValue={editingAssignment?.salesStatus || "Pending"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Revisions">Revisions</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="orderStatus">Order Status *</Label>
                <Select defaultValue={editingAssignment?.orderStatus || "In Progress"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Complete">Complete</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="remarks">Special Remarks</Label>
              <Textarea
                id="remarks"
                placeholder="Any special notes or instructions..."
                defaultValue={editingAssignment?.remarks}
              />
            </div>

            <details className="rounded-lg border p-3">
              <summary className="cursor-pointer text-sm font-medium">Advanced Options</summary>
              <div className="mt-4 grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="assignmentDate">Assignment Date</Label>
                  <Input
                    id="assignmentDate"
                    type="date"
                    defaultValue={editingAssignment?.date || new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority / Urgency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="completionDate">Estimated Completion Date</Label>
                  <Input id="completionDate" type="date" />
                </div>
              </div>
            </details>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleCloseModal}>{editingAssignment ? "Update Assignment" : "Save Assignment"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
