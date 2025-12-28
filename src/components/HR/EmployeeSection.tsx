"use client";

import { useState, useRef } from "react";
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
import { UserPlus, Pencil, Trash2, Image as ImageIcon, Upload } from "lucide-react";
import Image from "next/image";

// Mock data
const mockEmployees = [
  {
    id: 1,
    employeeId: "EMP-2025-001",
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    phone: "+8801712345678",
    position: "Senior Developer",
    department: "Engineering",
    hireDate: "2022-03-15",
    status: "Active",
    workMode: "Hybrid",
    profilePic: "https://i.pravatar.cc/150?img=1",
    address: "123 Tech St, Dhaka",
    emergencyContact: "+8801712345679",
    contractType: "Full-time",
    dob: "1990-05-15",
  },
  {
    id: 2,
    employeeId: "EMP-2025-002",
    name: "Michael Chen",
    email: "m.chen@company.com",
    phone: "+8801812345678",
    position: "Product Manager",
    department: "Product",
    hireDate: "2021-07-22",
    status: "Active",
    workMode: "Remote",
    profilePic: "",
    address: "456 Innovation Ave, Dhaka",
    emergencyContact: "+8801812345679",
    contractType: "Full-time",
    dob: "1988-11-30",
  },
];

const departments = ["Engineering", "Product", "Design", "Analytics", "Human Resources"];
const workModes = ["on-site", "remote", "hybrid"];
const statuses = ["active", "inactive", "on-leave"];
const contractTypes = ["Full-time", "Part-time", "Contract", "Intern"];

export default function EmployeeSection() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<typeof mockEmployees[0] | null>(null);

  // For image upload
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateEmployeeId = () => {
    const year = new Date().getFullYear();
    const nextNumber = String(mockEmployees.length + 1).padStart(3, '0');
    return `EMP-${year}-${nextNumber}`;
  };

  const handleEditClick = (employee: typeof mockEmployees[0]) => {
    setEditingEmployee(employee);
    setPreviewImage(employee.profilePic || null);
    setIsEditModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const resetImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      {/* Main Section */}
      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Employees</h2>
            <p className="text-sm text-muted-foreground">Manage employee accounts and HR records</p>
          </div>
          <Button onClick={() => {
            setIsAddModalOpen(true);
            setPreviewImage(null);
          }}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Photo</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Hire Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      {employee.profilePic ? (
                        <Image
                          width={32}
                          height={32}
                          src={employee.profilePic}
                          alt={employee.name}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-sm">{employee.employeeId}</TableCell>
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.phone || "—"}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{new Date(employee.hireDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                        employee.status === "active" ? "bg-green-100 text-green-800" :
                        employee.status === "on-leave" ? "bg-yellow-100 text-yellow-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {employee.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditClick(employee)}
                        >
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

      {/* ➕ ADD EMPLOYEE MODAL */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Create New Employee Account</DialogTitle>
            <DialogDescription>
              Set initial credentials and upload a profile photo.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
            {/* Employee ID */}
            <div className="grid gap-2">
              <Label>Employee ID</Label>
              <Input value={generateEmployeeId()} readOnly className="bg-muted" />
            </div>

            {/* Name, Email, Password */}
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input placeholder="John Doe" />
            </div>
            <div className="grid gap-2">
              <Label>Work Email (Login)</Label>
              <Input type="email" placeholder="john.doe@company.com" />
            </div>
            <div className="grid gap-2">
              <Label>Initial Password</Label>
              <Input type="password" placeholder="••••••••" />
            </div>

            {/* 🖼️ PROFILE PICTURE UPLOAD */}
            <div className="grid gap-2">
              <Label>Profile Picture</Label>
              <div className="flex items-start gap-4">
                {/* Preview */}
                <div className="relative">
                  {previewImage ? (
                    <Image
                      width={64}
                      height={64}
                      src={previewImage}
                      alt="Preview"
                      className="h-16 w-16 rounded-full object-cover border"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center border-2 border-dashed">
                      <ImageIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Upload Controls */}
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/png, image/jpeg, image/jpg"
                    className="hidden"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={triggerFileInput}>
                    <Upload className="mr-2 h-4 w-4" />
                    Choose Image
                  </Button>
                  {previewImage && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={resetImage}
                      className="text-destructive"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                JPG or PNG, max 2MB (mock upload – no real storage)
              </p>
            </div>

            {/* Other Fields */}
            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input placeholder="+8801XXXXXXXX" />
            </div>
            <div className="grid gap-2">
              <Label>Position</Label>
              <Input placeholder="Software Engineer" />
            </div>
            <div className="grid gap-2">
              <Label>Department</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept.toLowerCase()}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Work Mode</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select work mode" />
                </SelectTrigger>
                <SelectContent>
                  {workModes.map((mode) => (
                    <SelectItem key={mode} value={mode}>
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Contract Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select contract" />
                </SelectTrigger>
                <SelectContent>
                  {contractTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select defaultValue="active">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((stat) => (
                    <SelectItem key={stat} value={stat}>
                      {stat.charAt(0).toUpperCase() + stat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Hire Date</Label>
              <Input type="date" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button>Create Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ✏️ EDIT MODAL (same upload logic) */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>Update details and profile photo.</DialogDescription>
          </DialogHeader>
          {editingEmployee && (
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
              {/* ID (read-only) */}
              <div className="grid gap-2">
                <Label>Employee ID</Label>
                <Input value={editingEmployee.employeeId} readOnly className="bg-muted" />
              </div>

              <div className="grid gap-2">
                <Label>Full Name</Label>
                <Input defaultValue={editingEmployee.name} />
              </div>
              <div className="grid gap-2">
                <Label>Work Email</Label>
                <Input type="email" defaultValue={editingEmployee.email} readOnly className="bg-muted" />
              </div>

              {/* 🖼️ PROFILE PICTURE UPLOAD (Edit) */}
              <div className="grid gap-2">
                <Label>Profile Picture</Label>
                <div className="flex items-start gap-4">
                  <div className="relative">
                    {previewImage ? (
                      <Image
                        width={64}
                        height={64}
                        src={previewImage}
                        alt="Preview"
                        className="h-16 w-16 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center border-2 border-dashed">
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/png, image/jpeg"
                      className="hidden"
                    />
                    <Button type="button" variant="outline" size="sm" onClick={triggerFileInput}>
                      <Upload className="mr-2 h-4 w-4" />
                      Choose Image
                    </Button>
                    {(previewImage || editingEmployee.profilePic) && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={resetImage}
                        className="text-destructive"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">JPG or PNG only</p>
              </div>

              {/* Other fields (same as add modal) */}
              <div className="grid gap-2">
                <Label>Phone</Label>
                <Input defaultValue={editingEmployee.phone} />
              </div>
              <div className="grid gap-2">
                <Label>Position</Label>
                <Input defaultValue={editingEmployee.position} />
              </div>
              <div className="grid gap-2">
                <Label>Department</Label>
                <Select defaultValue={editingEmployee.department.toLowerCase()}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {departments.map((d) => (
                      <SelectItem key={d} value={d.toLowerCase()}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Work Mode</Label>
                <Select defaultValue={editingEmployee.workMode}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {workModes.map((m) => (
                      <SelectItem key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Contract Type</Label>
                <Select defaultValue={editingEmployee.contractType.toLowerCase()}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {contractTypes.map((c) => (
                      <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Status</Label>
                <Select defaultValue={editingEmployee.status.toLowerCase()}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {statuses.map((s) => (
                      <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Hire Date</Label>
                <Input type="date" defaultValue={editingEmployee.hireDate} />
              </div>

              {/* Advanced Fields */}
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-2">Additional Details</h3>
                <div className="grid gap-2">
                  <Label>Address</Label>
                  <Input defaultValue={editingEmployee.address} placeholder="123 Main St" />
                </div>
                <div className="grid gap-2">
                  <Label>Emergency Contact</Label>
                  <Input defaultValue={editingEmployee.emergencyContact} />
                </div>
                <div className="grid gap-2">
                  <Label>Date of Birth</Label>
                  <Input type="date" defaultValue={editingEmployee.dob} />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}