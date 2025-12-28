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
import { Briefcase, Pencil, Trash2, Search, Image as ImageIcon, Upload } from "lucide-react";
import Image from "next/image";

// Mock employees
const mockEmployees = [
  { id: 1, name: "Sarah Johnson", position: "Senior Developer", employeeId: "EMP-2022-001" },
  { id: 2, name: "Michael Chen", position: "Product Manager", employeeId: "EMP-2021-002" },
  { id: 3, name: "Emily Rodriguez", position: "UX Designer", employeeId: "EMP-2023-003" },
  { id: 4, name: "James Wilson", position: "Data Analyst", employeeId: "EMP-2022-004" },
  { id: 5, name: "Aisha Patel", position: "HR Manager", employeeId: "EMP-2020-005" },
];

// Mock teams WITH editable teamId
const mockTeams = [
  { 
    id: 1, 
    teamId: "ENG-FRONTEND",      // ← Customizable ID
    name: "Engineering Team", 
    description: "Owns core platform infrastructure",
    logo: "https://placehold.co/100x100/4f46e5/white?text=ET",
    leadId: 1,
    coLeadId: 4,
    department: "Engineering",
    status: "active",
    members: 12
  },
  { 
    id: 2, 
    teamId: "PROD-INNOVATION",
    name: "Product Innovation", 
    description: "Drives new product features",
    logo: null,
    leadId: 2,
    coLeadId: null,
    department: "Product",
    status: "active",
    members: 8
  },
];

const departments = ["Engineering", "Product", "Design", "Analytics", "Human Resources"];
const statuses = ["active", "inactive"];

const getEmployeeName = (id: number | null) => {
  if (id === null) return "—";
  const emp = mockEmployees.find(e => e.id === id);
  return emp ? emp.name : "Unknown";
};

// Smart auto-generation (can be customized)
const generateSmartTeamId = (name: string, department: string) => {
  const deptCode = department.substring(0, 3).toUpperCase();
  const nameCode = name.split(' ')
    .map(word => word.substring(0, 3).toUpperCase())
    .join('');
  return `${deptCode}-${nameCode}`;
};

export default function TeamSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<typeof mockTeams[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [teamIdInput, setTeamIdInput] = useState(""); // For form control
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle edit team
  const handleEdit = (team: typeof mockTeams[0]) => {
    setCurrentTeam(team);
    setTeamIdInput(team.teamId);
    setPreviewLogo(team.logo);
    setIsEditing(true);
    setModalOpen(true);
  };

  // Handle create team
  const handleCreate = () => {
    setCurrentTeam(null);
    setPreviewLogo(null);
    
    // Auto-generate smart ID for new teams
    const defaultId = generateSmartTeamId("New Team", "Engineering");
    setTeamIdInput(defaultId);
    
    setIsEditing(false);
    setModalOpen(true);
  };

  // Handle logo upload
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const resetLogo = () => {
    setPreviewLogo(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Filter teams
  const filteredTeams = mockTeams.filter(team => {
    const query = searchTerm.toLowerCase();
    const teamName = team.name.toLowerCase();
    const teamId = team.teamId.toLowerCase();
    const leadName = getEmployeeName(team.leadId).toLowerCase();
    const coLeadName = getEmployeeName(team.coLeadId).toLowerCase();
    
    return (
      teamName.includes(query) ||
      teamId.includes(query) ||
      leadName.includes(query) ||
      coLeadName.includes(query)
    );
  });

  return (
    <>
      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Teams</h2>
            <p className="text-sm text-muted-foreground">Manage team structures and leadership</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search teams..."
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleCreate}>
              <Briefcase className="mr-2 h-4 w-4" />
              Create Team
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Lead</TableHead>
                  <TableHead>Co-Lead</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeams.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {team.logo ? (
                          <Image
                            width={32}
                            height={32}
                            src={team.logo}
                            alt={team.name}
                            className="h-8 w-8 rounded object-cover"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-medium text-primary">
                              {team.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{team.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">{team.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{team.teamId}</TableCell>
                    <TableCell>{getEmployeeName(team.leadId)}</TableCell>
                    <TableCell>{getEmployeeName(team.coLeadId)}</TableCell>
                    <TableCell>{team.department}</TableCell>
                    <TableCell>{team.members} members</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                        team.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}>
                        {team.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEdit(team)}
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

      {/* Team Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Team" : "Create Team"}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? "Update team details and leadership." 
                : "Set up a new team with leadership and department."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
            {/* Team Logo Upload */}
            <div className="grid gap-2">
              <Label>Team Logo</Label>
              <div className="flex items-start gap-4">
                <div className="relative">
                  {previewLogo ? (
                    <Image
                      width={64}
                      height={64}
                      src={previewLogo}
                      alt="Preview"
                      className="h-16 w-16 rounded object-cover border"
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
                    onChange={handleLogoChange}
                    accept="image/png, image/jpeg, image/jpg"
                    className="hidden"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={triggerFileInput}>
                    <Upload className="mr-2 h-4 w-4" />
                    Choose Image
                  </Button>
                  {(previewLogo || (isEditing && currentTeam?.logo)) && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={resetLogo}
                      className="text-destructive"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">JPG or PNG, shown in team listings</p>
            </div>

            {/* Team Name */}
            <div className="grid gap-2">
              <Label htmlFor="teamName">Team Name *</Label>
              <Input 
                id="teamName" 
                placeholder="Frontend Platform" 
                defaultValue={currentTeam?.name || ""}
                required
              />
            </div>

            {/* Team ID — Editable! */}
            <div className="grid gap-2">
              <Label htmlFor="teamId">Team ID *</Label>
              <Input 
                id="teamId"
                value={teamIdInput}
                onChange={(e) => setTeamIdInput(e.target.value)}
                placeholder="e.g. ENG-FRONTEND"
                required
              />
              <p className="text-xs text-muted-foreground">
                {isEditing ? "Edit team identifier" : "Auto-generated, but editable"}
              </p>
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description" 
                placeholder="Owns core platform infrastructure" 
                defaultValue={currentTeam?.description || ""}
              />
            </div>

            {/* Team Lead */}
            <div className="grid gap-2">
              <Label htmlFor="teamLead">Team Lead *</Label>
              <Select 
                defaultValue={currentTeam?.leadId?.toString() || ""}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select team lead" />
                </SelectTrigger>
                <SelectContent>
                  {mockEmployees.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id.toString()}>
                      {emp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Co-Lead */}
            <div className="grid gap-2">
              <Label htmlFor="coLead">Co-Lead (Optional)</Label>
              <Select defaultValue={currentTeam?.coLeadId?.toString() || ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Select co-lead (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {mockEmployees.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id.toString()}>
                      {emp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Department */}
            <div className="grid gap-2">
              <Label htmlFor="teamDepartment">Department *</Label>
              <Select 
                defaultValue={currentTeam?.department.toLowerCase() || ""}
                required
              >
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

            {/* Status */}
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue={currentTeam?.status || "active"}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button>
              {isEditing ? "Save Changes" : "Create Team"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}