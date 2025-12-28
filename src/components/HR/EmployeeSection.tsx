// components/EmployeeSection.tsx
"use client"

import { useState } from "react"
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
import { UserPlus, Pencil, Trash2, Eye, EyeOff, ChevronUp, ChevronDown } from "lucide-react"

interface Employee {
  id: number
  employeeId: string
  name: string
  email: string
  password: string
  position: string
  department: string
  employeeType: string
  dateOfJoining: string
}

type SortField = "employeeId" | "name" | "department" | null
type SortDirection = "asc" | "desc" | null

export function EmployeeSection() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      employeeId: "EMP-1001",
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      password: "hashedpassword1",
      position: "Senior Developer",
      department: "Engineering",
      employeeType: "Permanent",
      dateOfJoining: "2022-03-15",
    },
    {
      id: 2,
      employeeId: "EMP-1002",
      name: "Michael Chen",
      email: "m.chen@company.com",
      password: "hashedpassword2",
      position: "Product Manager",
      department: "Product",
      employeeType: "Permanent",
      dateOfJoining: "2021-07-22",
    },
  ])

  const [employeeModalOpen, setEmployeeModalOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const [newEmployee, setNewEmployee] = useState<Employee>({
    id: 0,
    employeeId: "",
    name: "",
    email: "",
    password: "",
    position: "",
    department: "",
    employeeType: "Permanent",
    dateOfJoining: "",
  })

  const handleChange = (field: keyof Employee, value: string) => {
    setNewEmployee((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    if (editingEmployee) {
      setEmployees(
        employees.map((emp) => (emp.id === editingEmployee.id ? { ...editingEmployee, ...newEmployee } : emp))
      )
      setEditingEmployee(null)
    } else {
      const nextId = employees.length ? employees[employees.length - 1].id + 1 : 1
      setEmployees([...employees, { ...newEmployee, id: nextId }])
    }

    setEmployeeModalOpen(false)
    setNewEmployee({
      id: 0,
      employeeId: "",
      name: "",
      email: "",
      password: "",
      position: "",
      department: "",
      employeeType: "Permanent",
      dateOfJoining: "",
    })
    setShowPassword(false)
  }

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee)
    setNewEmployee(employee)
    setEmployeeModalOpen(true)
  }

  const handleDelete = (id: number) => {
    setEmployees(employees.filter((e) => e.id !== id))
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Cycle asc -> desc -> null
      setSortDirection(sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedEmployees = [...employees]
    .filter(
      (e) =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField || !sortDirection) return 0
      const valA = a[sortField] || ""
      const valB = b[sortField] || ""
      if (valA < valB) return sortDirection === "asc" ? -1 : 1
      if (valA > valB) return sortDirection === "asc" ? 1 : -1
      return 0
    })

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null
    if (sortDirection === "asc") return <ChevronUp className="inline-block ml-1 w-3 h-3" />
    if (sortDirection === "desc") return <ChevronDown className="inline-block ml-1 w-3 h-3" />
    return null
  }

  return (
    <>
      <section className="mb-8">
        <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-semibold">Employees</h2>
            <p className="text-sm text-muted-foreground">Manage employee records and information</p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <Input
              placeholder="Search by name, email or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
            <Button
              onClick={() => {
                setEditingEmployee(null)
                setNewEmployee({
                  id: 0,
                  employeeId: "",
                  name: "",
                  email: "",
                  password: "",
                  position: "",
                  department: "",
                  employeeType: "Permanent",
                  dateOfJoining: "",
                })
                setEmployeeModalOpen(true)
              }}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <Table className="min-w-[1000px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("employeeId")}>
                    Employee ID {renderSortIcon("employeeId")}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                    Name {renderSortIcon("name")}
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Password</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("department")}>
                    Department {renderSortIcon("department")}
                  </TableHead>
                  <TableHead>Hire Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.employeeId}</TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell className="flex items-center gap-1">
                      {showPassword ? employee.password : "••••••••"}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    </TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{new Date(employee.dateOfJoining).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(employee)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(employee.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* Employee Modal */}
      <Dialog open={employeeModalOpen} onOpenChange={setEmployeeModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingEmployee ? "Edit Employee" : "Add Employee"}</DialogTitle>
            <DialogDescription>
              {editingEmployee
                ? "Update the employee details below."
                : "Enter the employee details below. All fields are required."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Employee ID</Label>
              <Input
                value={newEmployee.employeeId}
                onChange={(e) => handleChange("employeeId", e.target.value)}
                placeholder="EMP-1004"
              />
            </div>
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input value={newEmployee.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="John Doe" />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input type="email" value={newEmployee.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="john.doe@company.com" />
            </div>
            <div className="grid gap-2 relative">
              <Label>Password</Label>
              <Input
                type={showPassword ? "text" : "password"}
                value={newEmployee.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="********"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-9"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
            <div className="grid gap-2">
              <Label>Position</Label>
              <Input value={newEmployee.position} onChange={(e) => handleChange("position", e.target.value)} placeholder="Software Engineer" />
            </div>
            <div className="grid gap-2">
              <Label>Department</Label>
              <Select onValueChange={(val) => handleChange("department", val)}>
                <SelectTrigger>
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
              <Label>Employee Type</Label>
              <Select onValueChange={(val) => handleChange("employeeType", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Permanent">Permanent</SelectItem>
                  <SelectItem value="Intern">Intern</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Probation">Probation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Date of Joining</Label>
              <Input type="date" value={newEmployee.dateOfJoining} onChange={(e) => handleChange("dateOfJoining", e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmployeeModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editingEmployee ? "Update Employee" : "Save Employee"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
