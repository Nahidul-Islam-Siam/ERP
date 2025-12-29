// components/TeamSection.tsx
"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import { Briefcase, Pencil, Trash2, Search } from "lucide-react"

// Full employee interface (same as EmployeeSection)
interface Employee {
  employeeId: string
  name: string
  email: string
  password: string // not used here, but kept for consistency
  position: string
  department: string
  employeeType: string
  dateOfJoining: string
  contactNumber: string
  address: string
}

interface Team {
  id: number
  name: string
  department: string
  leadId: string
  memberIds: string[]
  description?: string
}

// Employee data — matching your EmployeeSection structure
const employees: Employee[] = [
  {
    employeeId: "EMP-1001",
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    password: "hashed123",
    position: "Senior Developer",
    department: "CMS",
    employeeType: "Permanent",
    dateOfJoining: "2022-03-15",
    contactNumber: "+8801712345678",
    address: "123 Tech St, Dhaka"
  },
  {
    employeeId: "EMP-1002",
    name: "Michael Chen",
    email: "m.chen@company.com",
    password: "hashed456",
    position: "Product Manager",
    department: "Digital Marketing",
    employeeType: "Permanent",
    dateOfJoining: "2021-07-22",
    contactNumber: "+1234567890",
    address: "456 Product Ave, New York"
  },
  {
    employeeId: "EMP-1003",
    name: "Emily Rodriguez",
    email: "e.rodriguez@company.com",
    password: "hashed789",
    position: "UX Designer",
    department: "UI/UX Design",
    employeeType: "Permanent",
    dateOfJoining: "2023-01-10",
    contactNumber: "+9876543210",
    address: "789 Design Blvd, San Francisco"
  },
  {
    employeeId: "EMP-1004",
    name: "James Wilson",
    email: "j.wilson@company.com",
    password: "hashed101",
    position: "Data Analyst",
    department: "Analytics",
    employeeType: "Contract",
    dateOfJoining: "2022-11-05",
    contactNumber: "+5555555555",
    address: "321 Analytics Rd, Seattle"
  },
  {
    employeeId: "EMP-1005",
    name: "Aisha Patel",
    email: "a.patel@company.com",
    password: "hashed202",
    position: "HR Manager",
    department: "HR",
    employeeType: "Permanent",
    dateOfJoining: "2020-05-18",
    contactNumber: "+7777777777",
    address: "987 HR Blvd, Los Angeles"
  },
]

// Departments — exactly as you specified
const DEPARTMENTS = [
  { value: "CMS", label: "CMS (wordpress, shopify, wix, wix studio, webflow, squreapace)" },
  { value: "HR", label: "HR" },
  { value: "Finance", label: "Finance" },
  { value: "Digital Marketing", label: "Digital Marketing" },
  { value: "FSD", label: "FSD (Full Stack Development)" },
  { value: "Mobile App", label: "Mobile App (Flutter)" },
  { value: "Graphics Designer", label: "Graphics Designer" },
  { value: "UI/UX Design", label: "UI/UX Design" },
]

export function TeamSection() {
  const [teams, setTeams] = useState<Team[]>([
    {
      id: 1,
      name: "Frontend Squad",
      department: "CMS",
      leadId: "EMP-1001",
      memberIds: ["EMP-1003", "EMP-1004"],
      description: "Web UI/UX development",
    },
    {
      id: 2,
      name: "Product Vision",
      department: "Digital Marketing",
      leadId: "EMP-1002",
      memberIds: ["EMP-1001", "EMP-1005"],
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingTeamId, setEditingTeamId] = useState<number | null>(null)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  const [formData, setFormData] = useState<Omit<Team, "id">>({
    name: "",
    department: "",
    leadId: "",
    memberIds: [],
    description: "",
  })

  const [searchLead, setSearchLead] = useState("")
  const [searchMember, setSearchMember] = useState("")
  const [teamSearch, setTeamSearch] = useState("")

  // Modal handlers
  const openCreateModal = () => {
    setIsEditing(false)
    setFormData({ name: "", department: "", leadId: "", memberIds: [], description: "" })
    setSearchLead("")
    setSearchMember("")
    setIsModalOpen(true)
  }

  const openEditModal = (team: Team) => {
    setIsEditing(true)
    setEditingTeamId(team.id)
    setFormData({
      name: team.name,
      department: team.department,
      leadId: team.leadId,
      memberIds: [...team.memberIds],
      description: team.description || "",
    })
    setSearchLead("")
    setSearchMember("")
    setIsModalOpen(true)
  }

  const openProfileModal = (employeeId: string) => {
    const emp = employees.find(e => e.employeeId === employeeId)
    if (emp) {
      setSelectedEmployee(emp)
      setProfileModalOpen(true)
    }
  }

  // Form handlers
  const handleChange = (field: keyof typeof formData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleMember = (employeeId: string) => {
    setFormData(prev => ({
      ...prev,
      memberIds: prev.memberIds.includes(employeeId)
        ? prev.memberIds.filter(id => id !== employeeId)
        : [...prev.memberIds, employeeId],
    }))
  }

  const handleSave = () => {
    if (!formData.name.trim() || !formData.department || !formData.leadId) return

    setTeams(prev => {
      if (isEditing && editingTeamId !== null) {
        return prev.map(team =>
          team.id === editingTeamId ? { ...formData, id: editingTeamId } : team
        )
      } else {
        const nextId = prev.length ? Math.max(...prev.map(t => t.id)) + 1 : 1
        return [...prev, { ...formData, id: nextId }]
      }
    })

    setIsModalOpen(false)
  }

  // Filters
  const filteredLeads = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchLead.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchLead.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(searchLead.toLowerCase())
  )

  const filteredMembers = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchMember.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchMember.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(searchMember.toLowerCase())
  )

  const filteredTeams = useMemo(() => {
    if (!teamSearch.trim()) return teams
    const term = teamSearch.toLowerCase()
    return teams.filter(team =>
      team.name.toLowerCase().includes(term) ||
      team.department.toLowerCase().includes(term) ||
      employees.some(emp =>
        (team.leadId === emp.employeeId || team.memberIds.includes(emp.employeeId)) &&
        (emp.name.toLowerCase().includes(term) || emp.position.toLowerCase().includes(term))
      )
    )
  }, [teams, teamSearch, employees])

  const getDepartmentLabel = (value: string) =>
    DEPARTMENTS.find(d => d.value === value)?.label || value

  return (
    <>
      <section className="mb-8">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Teams</h2>
            <p className="text-sm text-muted-foreground">Organize and manage team structures</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search teams..."
                value={teamSearch}
                onChange={(e) => setTeamSearch(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            <Button onClick={openCreateModal} className="w-full sm:w-auto">
              <Briefcase className="mr-2 h-4 w-4" />
              Create Team
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0 overflow-x-auto">
            {filteredTeams.length === 0 ? (
              <div className="py-12 text-center text-sm text-muted-foreground">
                {teamSearch ? "No teams match your search." : "No teams created yet."}
              </div>
            ) : (
              <Table className="min-w-[900px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">ID</TableHead>
                    <TableHead className="w-1/5">Team Name</TableHead>
                    <TableHead className="w-1/4">Team Lead</TableHead>
                    <TableHead className="w-1/3">Team Members (IDs)</TableHead>
                    <TableHead className="text-right w-16">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeams.map((team) => {
                    const lead = employees.find(emp => emp.employeeId === team.leadId)
                    return (
                      <TableRow key={team.id} className="hover:bg-accent/50">
                        <TableCell className="font-mono text-sm">{team.id}</TableCell>
                        <TableCell className="font-medium">{team.name}</TableCell>
                        <TableCell>
                          {lead ? (
                            <div>
                              <div className="font-medium">{lead.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {lead.position} ({lead.employeeId})
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {team.memberIds.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {team.memberIds.map(empId => (
                                <Button
                                  key={empId}
                                  variant="outline"
                                  size="sm"
                                  className="h-7 px-2 text-xs font-mono hover:bg-accent"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    openProfileModal(empId)
                                  }}
                                >
                                  {empId}
                                </Button>
                              ))}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => openEditModal(team)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setTeams(prev => prev.filter(t => t.id !== team.id))}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Create/Edit Team Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Team" : "Create New Team"}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update the team details below."
                : "Assign a team lead and members from your employee directory."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-4">
            <div className="grid gap-2">
              <Label>Team Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g. Mobile App Team"
              />
            </div>

            <div className="grid gap-2">
              <Label>Department</Label>
              <Select value={formData.department} onValueChange={(val) => handleChange("department", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map(dept => (
                    <SelectItem key={dept.value} value={dept.value}>{dept.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Team Lead</Label>
              <Input
                placeholder="Search by name, position, or ID..."
                value={searchLead}
                onChange={(e) => setSearchLead(e.target.value)}
                className="mb-2"
              />
              <Select value={formData.leadId} onValueChange={(val) => handleChange("leadId", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a team lead" />
                </SelectTrigger>
                <SelectContent>
                  {filteredLeads.map(emp => (
                    <SelectItem key={emp.employeeId} value={emp.employeeId}>
                      <div>
                        <div className="font-medium">{emp.name}</div>
                        <div className="text-xs text-muted-foreground">{emp.position} • {emp.employeeId}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Team Members</Label>
              <Input
                placeholder="Search employees to add..."
                value={searchMember}
                onChange={(e) => setSearchMember(e.target.value)}
                className="mb-2"
              />
              <div className="max-h-48 overflow-y-auto border rounded-md p-2 bg-card">
                {filteredMembers.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-2">No employees found</p>
                ) : (
                  filteredMembers.map(emp => (
                    <div key={emp.employeeId} className="flex items-center gap-3 py-1.5">
                      <input
                        type="checkbox"
                        checked={formData.memberIds.includes(emp.employeeId)}
                        onChange={() => toggleMember(emp.employeeId)}
                        className="h-4 w-4 rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{emp.name}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {emp.position} • {emp.employeeId}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Description (Optional)</Label>
              <Input
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="e.g. Dashboard redesign team"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button
              onClick={handleSave}
              disabled={!formData.name.trim() || !formData.department || !formData.leadId}
            >
              {isEditing ? "Save Changes" : "Create Team"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Employee Profile Modal — matches EmployeeSection style */}
      <Dialog open={profileModalOpen} onOpenChange={setProfileModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
            <DialogDescription>Personal and contact information</DialogDescription>
          </DialogHeader>
          {selectedEmployee && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Employee ID</Label>
                  <div className="font-mono text-sm">{selectedEmployee.employeeId}</div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Type</Label>
                  <div className="text-sm">{selectedEmployee.employeeType}</div>
                </div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Full Name</Label>
                <div className="font-medium">{selectedEmployee.name}</div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Position</Label>
                <div>{selectedEmployee.position}</div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Department</Label>
                <div>{getDepartmentLabel(selectedEmployee.department)}</div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Email</Label>
                <div className="text-sm">{selectedEmployee.email}</div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Contact Number</Label>
                <div className="font-mono">{selectedEmployee.contactNumber}</div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Address</Label>
                <div>{selectedEmployee.address}</div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Joining Date</Label>
                <div>{new Date(selectedEmployee.dateOfJoining).toLocaleDateString()}</div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setProfileModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}