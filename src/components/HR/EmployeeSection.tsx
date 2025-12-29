// components/EmployeeSection.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UserPlus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface Employee {
  id: number;
  employeeId: string;
  name: string;
  email: string;
  password: string;
  position: string;
  department: string;
  employeeType: string;
  dateOfJoining: string;
  contactNumber: string;
  address: string;
}

type SortField = "employeeId" | "name" | "department" | null;
type SortDirection = "asc" | "desc" | null;

// Departments as per your list
const DEPARTMENTS = [
  { value: "CMS", label: "CMS (wordpress, shopify, wix, wix studio, webflow, squreapace)" },
  { value: "HR", label: "HR" },
  { value: "Finance", label: "Finance" },
  { value: "Digital Marketing", label: "Digital Marketing" },
  { value: "FSD", label: "FSD (Full Stack Development)" },
  { value: "Mobile App", label: "Mobile App (Flutter)" },
  { value: "Graphics Designer", label: "Graphics Designer" },
  { value: "UI/UX Design", label: "UI/UX Design" },
];

// Employee types (corrected spelling)
const EMPLOYEE_TYPES = ["Intern", "Probation", "Permanent"];

export function EmployeeSection() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      employeeId: "EMP-1001",
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      password: "securePass123!",
      position: "Senior Developer",
      department: "CMS",
      employeeType: "Permanent",
      dateOfJoining: "2022-03-15",
      contactNumber: "+8801712345678",
      address: "123 Tech St, Dhaka",
    },
    {
      id: 2,
      employeeId: "EMP-1002",
      name: "Michael Chen",
      email: "m.chen@company.com",
      password: "productLead2021",
      position: "Product Manager",
      department: "Digital Marketing",
      employeeType: "Permanent",
      dateOfJoining: "2021-07-22",
      contactNumber: "+1234567890",
      address: "456 Product Ave, New York",
    },
  ]);

  const [employeeModalOpen, setEmployeeModalOpen] = useState(false);
  const [showPasswordMap, setShowPasswordMap] = useState<Record<number, boolean>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const [newEmployee, setNewEmployee] = useState<Omit<Employee, "id">>({
    employeeId: "",
    name: "",
    email: "",
    password: "",
    position: "",
    department: "",
    employeeType: "Permanent",
    dateOfJoining: "",
    contactNumber: "",
    address: "",
  });

  // Toggle password visibility per employee row
  const togglePasswordVisibility = (id: number) => {
    setShowPasswordMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Handle form input changes
  const handleChange = (field: keyof typeof newEmployee, value: string) => {
    setNewEmployee(prev => ({ ...prev, [field]: value }));
  };

  // Save or update employee
  const handleSave = () => {
    if (editingEmployee) {
      // Update existing
      setEmployees(prev =>
        prev.map(emp =>
          emp.id === editingEmployee.id ? { ...emp, ...newEmployee } : emp
        )
      );
    } else {
      // Create new — use functional update to avoid stale state
      setEmployees(prev => {
        const nextId = prev.length > 0 ? Math.max(...prev.map(e => e.id)) + 1 : 1;
        return [...prev, { ...newEmployee, id: nextId }];
      });
    }

    // Reset modal
    setEmployeeModalOpen(false);
    setEditingEmployee(null);
    setNewEmployee({
      employeeId: "",
      name: "",
      email: "",
      password: "",
      position: "",
      department: "",
      employeeType: "Permanent",
      dateOfJoining: "",
      contactNumber: "",
      address: "",
    });
  };

  // Open modal in edit mode
  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setNewEmployee({
      employeeId: employee.employeeId,
      name: employee.name,
      email: employee.email,
      password: employee.password,
      position: employee.position,
      department: employee.department,
      employeeType: employee.employeeType,
      dateOfJoining: employee.dateOfJoining,
      contactNumber: employee.contactNumber,
      address: employee.address,
    });
    setEmployeeModalOpen(true);
  };

  // Delete employee
  const handleDelete = (id: number) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  // Sorting logic
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(
        sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc"
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort employees
  const sortedEmployees = [...employees]
    .filter(emp =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.contactNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField || !sortDirection) return 0;
      const valA = a[sortField] || "";
      const valB = b[sortField] || "";
      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  // Render sort indicator
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="inline-block ml-1 w-3 h-3" />
    ) : (
      <ChevronDown className="inline-block ml-1 w-3 h-3" />
    );
  };

  return (
    <>
      <section className="mb-8">
        <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-semibold">Employees</h2>
            <p className="text-sm text-muted-foreground">
              Manage employee records and information
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <Input
              placeholder="Search by name, email, ID or contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
            <Button
              onClick={() => {
                setEditingEmployee(null);
                setNewEmployee({
                  employeeId: "",
                  name: "",
                  email: "",
                  password: "",
                  position: "",
                  department: "",
                  employeeType: "Permanent",
                  dateOfJoining: "",
                  contactNumber: "",
                  address: "",
                });
                setEmployeeModalOpen(true);
              }}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0 overflow-x-auto">
            {sortedEmployees.length === 0 ? (
              <div className="py-12 text-center text-sm text-muted-foreground">
                {searchTerm ? "No employees match your search." : "No employees added yet."}
              </div>
            ) : (
              <Table className="min-w-[1000px]">
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("employeeId")}
                    >
                      Employee ID {renderSortIcon("employeeId")}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      Name {renderSortIcon("name")}
                    </TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="w-32">Password</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => handleSort("department")}
                    >
                      Department {renderSortIcon("department")}
                    </TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Hire Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedEmployees.map((employee) => (
                    <TableRow key={employee.id} className="hover:bg-accent/30">
                      <TableCell className="font-mono">{employee.employeeId}</TableCell>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell className="flex items-center gap-1">
                        {showPasswordMap[employee.id] ? employee.password : "••••••••"}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => togglePasswordVisibility(employee.id)}
                        >
                          {showPasswordMap[employee.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                        </Button>
                      </TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>
                        {DEPARTMENTS.find(d => d.value === employee.department)?.label || employee.department}
                      </TableCell>
                      <TableCell className="font-mono">{employee.contactNumber}</TableCell>
                      <TableCell>
                        {new Date(employee.dateOfJoining).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleEdit(employee)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleDelete(employee.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Employee Modal: Create or Edit */}
      <Dialog open={employeeModalOpen} onOpenChange={setEmployeeModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingEmployee ? "Edit Employee" : "Add New Employee"}
            </DialogTitle>
            <DialogDescription>
              {editingEmployee
                ? "Update the employee details below."
                : "Fill in all required information for the new employee."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Employee ID</Label>
              <Input
                value={newEmployee.employeeId}
                onChange={(e) => handleChange("employeeId", e.target.value)}
                placeholder="e.g. EMP-1005"
              />
            </div>

            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input
                value={newEmployee.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="John Doe"
              />
            </div>

            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={newEmployee.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="john.doe@company.com"
              />
            </div>

            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={newEmployee.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Enter secure password"
              />
            </div>

            <div className="grid gap-2">
              <Label>Position</Label>
              <Input
                value={newEmployee.position}
                onChange={(e) => handleChange("position", e.target.value)}
                placeholder="e.g. Frontend Developer"
              />
            </div>

            <div className="grid gap-2">
              <Label>Department</Label>
              <Select
                value={newEmployee.department}
                onValueChange={(val) => handleChange("department", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((dept) => (
                    <SelectItem key={dept.value} value={dept.value}>
                      {dept.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Employee Type</Label>
              <Select
                value={newEmployee.employeeType}
                onValueChange={(val) => handleChange("employeeType", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {EMPLOYEE_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Contact Number</Label>
              <Input
                value={newEmployee.contactNumber}
                onChange={(e) => handleChange("contactNumber", e.target.value)}
                placeholder="+8801XXXXXXXX"
              />
            </div>

            <div className="grid gap-2">
              <Label>Address</Label>
              <Input
                value={newEmployee.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="123 Main St, City"
              />
            </div>

            <div className="grid gap-2">
              <Label>Date of Joining</Label>
              <Input
                type="date"
                value={newEmployee.dateOfJoining}
                onChange={(e) => handleChange("dateOfJoining", e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEmployeeModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={
                !newEmployee.name.trim() ||
                !newEmployee.email.trim() ||
                !newEmployee.employeeId.trim()
              }
            >
              {editingEmployee ? "Update Employee" : "Save Employee"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}