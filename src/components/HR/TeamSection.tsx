/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
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

interface Employee {
  employeeId: string
  name: string
  position: string
}

interface Team {
  id: number
  name: string
  department: string
  leadId: string
  memberIds: string[]
  description?: string
}

// Sample employee data
const employees: Employee[] = [
  { employeeId: "EMP-1001", name: "Sarah Johnson", position: "Senior Developer" },
  { employeeId: "EMP-1002", name: "Michael Chen", position: "Product Manager" },
  { employeeId: "EMP-1003", name: "Emily Rodriguez", position: "UX Designer" },
  { employeeId: "EMP-1004", name: "James Wilson", position: "Data Analyst" },
  { employeeId: "EMP-1005", name: "Aisha Patel", position: "HR Manager" },
]

export function TeamSection() {
  const [teams, setTeams] = useState<Team[]>([
    {
      id: 1,
      name: "Frontend Squad",
      department: "Engineering",
      leadId: "EMP-1001",
      memberIds: ["EMP-1003", "EMP-1004"],
      description: "Web UI/UX development",
    },
    {
      id: 2,
      name: "Product Vision",
      department: "Product",
      leadId: "EMP-1002",
      memberIds: ["EMP-1001", "EMP-1005"],
    },
  ])
  const [teamModalOpen, setTeamModalOpen] = useState(false)
  const [newTeam, setNewTeam] = useState<Omit<Team, "id">>({
    name: "",
    department: "",
    leadId: "",
    memberIds: [],
    description: "",
  })

  const [searchLead, setSearchLead] = useState("")
  const [searchMember, setSearchMember] = useState("")
  const [teamSearch, setTeamSearch] = useState("")

  const handleChange = (field: keyof typeof newTeam, value: any) => {
    setNewTeam((prev) => ({ ...prev, [field]: value }))
  }

  const toggleMember = (employeeId: string) => {
    setNewTeam((prev) => ({
      ...prev,
      memberIds: prev.memberIds.includes(employeeId)
        ? prev.memberIds.filter((id) => id !== employeeId)
        : [...prev.memberIds, employeeId],
    }))
  }

  const handleSaveTeam = () => {
    const nextId = teams.length ? Math.max(...teams.map(t => t.id)) + 1 : 1
    setTeams([...teams, { ...newTeam, id: nextId }])
    setTeamModalOpen(false)
    setNewTeam({ name: "", department: "", leadId: "", memberIds: [], description: "" })
    setSearchLead("")
    setSearchMember("")
  }

  // Filter employees for lead select
  const filteredLeads = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchLead.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchLead.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchLead.toLowerCase())
  )

  // Filter employees for member list
  const filteredMembers = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchMember.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchMember.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchMember.toLowerCase())
  )

  // Filter teams based on search
  const filteredTeams = useMemo(() => {
    if (!teamSearch.trim()) return teams
    const term = teamSearch.toLowerCase()
    return teams.filter(
      (team) =>
        team.name.toLowerCase().includes(term) ||
        team.department.toLowerCase().includes(term) ||
        employees.some(emp => 
          (team.leadId === emp.employeeId || team.memberIds.includes(emp.employeeId)) &&
          (emp.name.toLowerCase().includes(term) || emp.position.toLowerCase().includes(term))
        )
    )
  }, [teams, teamSearch, employees])

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
            <Button onClick={() => setTeamModalOpen(true)} className="w-full sm:w-auto">
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
              <Table className="min-w-[700px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/4">Team Name</TableHead>
                    <TableHead className="w-1/5">Department</TableHead>
                    <TableHead className="w-1/4">Team Lead</TableHead>
                    <TableHead className="w-1/4">Members</TableHead>
                    <TableHead className="text-right w-16">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeams.map((team) => {
                    const lead = employees.find((emp) => emp.employeeId === team.leadId)
                    const members = team.memberIds
                      .map(id => employees.find(e => e.employeeId === id)?.name || "")
                      .filter(Boolean)
                    return (
                      <TableRow key={team.id} className="hover:bg-accent/50 transition-colors">
                        <TableCell className="font-medium">{team.name}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full bg-secondary text-xs">
                            {team.department}
                          </span>
                        </TableCell>
                        <TableCell>
                          {lead ? (
                            <div>
                              <div className="font-medium">{lead.name}</div>
                              <div className="text-xs text-muted-foreground">{lead.position}</div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {members.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {members.slice(0, 2).map((name, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 rounded-full bg-accent text-xs text-accent-foreground"
                                >
                                  {name}
                                </span>
                              ))}
                              {members.length > 2 && (
                                <span className="text-xs text-muted-foreground">
                                  +{members.length - 2} more
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setTeams(teams.filter((t) => t.id !== team.id))}
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

      {/* Team Modal */}
      <Dialog open={teamModalOpen} onOpenChange={setTeamModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Team</DialogTitle>
            <DialogDescription>
              Assign a team lead and members from your employee directory.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-4">
            <div className="grid gap-2">
              <Label htmlFor="teamName">Team Name</Label>
              <Input
                id="teamName"
                value={newTeam.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g. Mobile App Team"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Select onValueChange={(val) => handleChange("department", val)} value={newTeam.department}>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Analytics">Analytics</SelectItem>
                  <SelectItem value="HR">Human Resources</SelectItem>
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
              <Select onValueChange={(val) => handleChange("leadId", val)} value={newTeam.leadId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a team lead" />
                </SelectTrigger>
                <SelectContent>
                  {filteredLeads.map((emp) => (
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
                  filteredMembers.map((emp) => (
                    <div key={emp.employeeId} className="flex items-center gap-3 py-1.5">
                      <input
                        type="checkbox"
                        checked={newTeam.memberIds.includes(emp.employeeId)}
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
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                value={newTeam.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="e.g. Responsible for dashboard redesign"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setTeamModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveTeam}
              disabled={!newTeam.name || !newTeam.department || !newTeam.leadId}
            >
              Create Team
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}