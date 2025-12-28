"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Briefcase, UserPlus, CheckCircle2, Pencil, Trash2 } from "lucide-react"

// Mock data
const mockEmployees = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    position: "Senior Developer",
    department: "Engineering",
    hireDate: "2022-03-15",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@company.com",
    position: "Product Manager",
    department: "Product",
    hireDate: "2021-07-22",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "e.rodriguez@company.com",
    position: "UX Designer",
    department: "Design",
    hireDate: "2023-01-10",
  },
  {
    id: 4,
    name: "James Wilson",
    email: "j.wilson@company.com",
    position: "Data Analyst",
    department: "Analytics",
    hireDate: "2022-11-05",
  },
  {
    id: 5,
    name: "Aisha Patel",
    email: "a.patel@company.com",
    position: "HR Manager",
    department: "Human Resources",
    hireDate: "2020-05-18",
  },
]

const mockTeams = [
  { id: 1, name: "Engineering Team", lead: "Sarah Johnson", members: 12, department: "Engineering" },
  { id: 2, name: "Product Innovation", lead: "Michael Chen", members: 8, department: "Product" },
  { id: 3, name: "Design Studio", lead: "Emily Rodriguez", members: 6, department: "Design" },
  { id: 4, name: "Data Analytics", lead: "James Wilson", members: 5, department: "Analytics" },
]

const mockAssignments = [
  { id: 1, employeeName: "Sarah Johnson", teamName: "Engineering Team", role: "Team Lead", startDate: "2023-06-01" },
  {
    id: 2,
    employeeName: "Michael Chen",
    teamName: "Product Innovation",
    role: "Product Manager",
    startDate: "2023-04-15",
  },
  { id: 3, employeeName: "Emily Rodriguez", teamName: "Design Studio", role: "Lead Designer", startDate: "2023-07-01" },
  { id: 4, employeeName: "James Wilson", teamName: "Data Analytics", role: "Senior Analyst", startDate: "2023-05-20" },
]

export default function HRDashboard() {
  const [employeeModalOpen, setEmployeeModalOpen] = useState(false)
  const [teamModalOpen, setTeamModalOpen] = useState(false)
  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">HR Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage employees, teams, and assignments</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                View Reports
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{mockEmployees.length}</div>
              <p className="text-xs text-muted-foreground">Active in system</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Teams</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{mockTeams.length}</div>
              <p className="text-xs text-muted-foreground">Across departments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">New Hires</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">3</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Assignments</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{mockAssignments.length}</div>
              <p className="text-xs text-muted-foreground">Active placements</p>
            </CardContent>
          </Card>
        </div>

        {/* Employee Section */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Employees</h2>
              <p className="text-sm text-muted-foreground">Manage employee records and information</p>
            </div>
            <Button onClick={() => setEmployeeModalOpen(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Hire Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{new Date(employee.hireDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => setEmployeeModalOpen(true)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        {/* Teams Section */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Teams</h2>
              <p className="text-sm text-muted-foreground">Organize and manage team structures</p>
            </div>
            <Button onClick={() => setTeamModalOpen(true)}>
              <Briefcase className="mr-2 h-4 w-4" />
              Create Team
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team Name</TableHead>
                    <TableHead>Team Lead</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTeams.map((team) => (
                    <TableRow key={team.id}>
                      <TableCell className="font-medium">{team.name}</TableCell>
                      <TableCell>{team.lead}</TableCell>
                      <TableCell>{team.members} members</TableCell>
                      <TableCell>{team.department}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => setTeamModalOpen(true)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        {/* Assignments Section */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Team Assignments</h2>
              <p className="text-sm text-muted-foreground">Track employee-team assignments and roles</p>
            </div>
            <Button onClick={() => setAssignmentModalOpen(true)}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              New Assignment
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAssignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">{assignment.employeeName}</TableCell>
                      <TableCell>{assignment.teamName}</TableCell>
                      <TableCell>{assignment.role}</TableCell>
                      <TableCell>{new Date(assignment.startDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => setAssignmentModalOpen(true)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Employee Modal */}
      <Dialog open={employeeModalOpen} onOpenChange={setEmployeeModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Employee</DialogTitle>
            <DialogDescription>Enter the employee details below. All fields are required.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john.doe@company.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="position">Position</Label>
              <Input id="position" placeholder="Software Engineer" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hireDate">Hire Date</Label>
              <Input id="hireDate" type="date" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmployeeModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setEmployeeModalOpen(false)}>Save Employee</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Team Modal */}
      <Dialog open={teamModalOpen} onOpenChange={setTeamModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Team</DialogTitle>
            <DialogDescription>Set up a new team with a lead and department.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="teamName">Team Name</Label>
              <Input id="teamName" placeholder="Marketing Team" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="teamLead">Team Lead</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select team lead" />
                </SelectTrigger>
                <SelectContent>
                  {mockEmployees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id.toString()}>
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="teamDepartment">Department</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTeamModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setTeamModalOpen(false)}>Create Team</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assignment Modal */}
      <Dialog open={assignmentModalOpen} onOpenChange={setAssignmentModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>New Assignment</DialogTitle>
            <DialogDescription>Assign an employee to a team with a specific role.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="assignEmployee">Employee</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {mockEmployees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id.toString()}>
                      {employee.name} - {employee.position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assignTeam">Team</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  {mockTeams.map((team) => (
                    <SelectItem key={team.id} value={team.id.toString()}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assignRole">Role in Team</Label>
              <Input id="assignRole" placeholder="Team Member" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignmentModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setAssignmentModalOpen(false)}>Create Assignment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
