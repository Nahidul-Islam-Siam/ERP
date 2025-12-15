"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  UserIcon,
  MailIcon,
  CalendarIcon,
  BriefcaseIcon,
  UsersIcon,
  ShieldIcon,
  EyeIcon,
  EyeOffIcon,
  EditIcon,
  BuildingIcon,
  ClockIcon,
  BellIcon,
  GlobeIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react"

// Sample data - replace with real data in production
const employeeData = {
  id: "EMP-2024-001",
  fullName: "Sarah Johnson",
  email: "sarah.johnson@company.com",
  mobile: "+1 (555) 123-4567",
  role: "Senior Software Engineer",
  department: "Engineering",
  teamName: "Backend Development",
  teamLeader: "Michael Brown",
  supervisor: "David Wilson",
  joiningDate: "2022-03-15",
  bloodGroup: "O+",
  lastBloodDonation: "2024-01-15",
  address: "123 Main Street, Apartment 4B, New York, NY 10001",
  workHistory:
    "5+ years of experience in full-stack development. Previously worked at TechCorp as a Software Engineer for 3 years.",
  lastLogin: "2024-12-14, 09:30 AM",
}

const EmployeeProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Form states
  const [fullName, setFullName] = useState(employeeData.fullName)
  const [email, setEmail] = useState(employeeData.email)
  const [mobile, setMobile] = useState(employeeData.mobile)
  const [bloodGroup, setBloodGroup] = useState(employeeData.bloodGroup)
  const [lastBloodDonation, setLastBloodDonation] = useState(employeeData.lastBloodDonation)
  const [address, setAddress] = useState(employeeData.address)
  const [workHistory, setWorkHistory] = useState(employeeData.workHistory)

  // Password states
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Preferences states
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [systemNotifications, setSystemNotifications] = useState(true)
  const [theme, setTheme] = useState("light")
  const [language, setLanguage] = useState("en")

  const handleSave = () => {
    // Handle save logic
    console.log("Profile saved")
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reset to original values
    setFullName(employeeData.fullName)
    setEmail(employeeData.email)
    setMobile(employeeData.mobile)
    setBloodGroup(employeeData.bloodGroup)
    setLastBloodDonation(employeeData.lastBloodDonation)
    setAddress(employeeData.address)
    setWorkHistory(employeeData.workHistory)
    setIsEditing(false)
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password change logic
    console.log("Password change requested")
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Profile & Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your personal information and account preferences</p>
        </div>

        {/* Profile Summary Section */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              {/* Left: Avatar and Basic Info */}
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20 border-2 border-border">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt={employeeData.fullName} />
                  <AvatarFallback className="text-lg">
                    {employeeData.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold text-foreground">{employeeData.fullName}</h2>
                  <p className="text-sm text-muted-foreground">{employeeData.role}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="font-normal">
                      {employeeData.id}
                    </Badge>
                    <Badge variant="outline" className="font-normal">
                      {employeeData.department}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Right: Edit Button */}
              <Button
                variant={isEditing ? "secondary" : "default"}
                size="sm"
                className="gap-2 self-start"
                onClick={() => setIsEditing(!isEditing)}
              >
                <EditIcon className="h-4 w-4" />
                {isEditing ? "Cancel Edit" : "Edit Profile"}
              </Button>
            </div>

            <Separator className="my-6" />

            {/* Team Hierarchy Info */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-muted p-2">
                  <UsersIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Team Name</p>
                  <p className="text-sm font-medium text-foreground mt-0.5">{employeeData.teamName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-muted p-2">
                  <ShieldIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Team Leader</p>
                  <p className="text-sm font-medium text-foreground mt-0.5">{employeeData.teamLeader}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-muted p-2">
                  <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Reporting To</p>
                  <p className="text-sm font-medium text-foreground mt-0.5">{employeeData.supervisor}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Organizational Information Section */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Organizational Information</CardTitle>
            <CardDescription>Read-only organizational details and hierarchy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Department</Label>
                <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2">
                  <BuildingIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{employeeData.department}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground">Team Name</Label>
                <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2">
                  <UsersIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{employeeData.teamName}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground">Team Leader</Label>
                <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2">
                  <ShieldIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{employeeData.teamLeader}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground">Supervisor / Manager</Label>
                <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2">
                  <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{employeeData.supervisor}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground">Employee Role</Label>
                <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{employeeData.role}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground">Reporting To</Label>
                <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2">
                  <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{employeeData.supervisor}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information Section */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name *</Label>
                <Input
                  id="full-name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted/50" : ""}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted/50" : ""}
                />
              </div>

              {/* Mobile */}
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted/50" : ""}
                />
              </div>

              {/* Employee ID (Read-only) */}
              <div className="space-y-2">
                <Label htmlFor="emp-id" className="text-muted-foreground">
                  Employee ID
                </Label>
                <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{employeeData.id}</span>
                </div>
              </div>

              {/* Blood Group */}
              <div className="space-y-2">
                <Label htmlFor="blood-group">Blood Group</Label>
                <Select value={bloodGroup} onValueChange={setBloodGroup} disabled={!isEditing}>
                  <SelectTrigger id="blood-group" className={!isEditing ? "bg-muted/50" : ""}>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Last Blood Donation */}
              <div className="space-y-2">
                <Label htmlFor="last-donation">Last Blood Donation Date</Label>
                <Input
                  id="last-donation"
                  type="date"
                  value={lastBloodDonation}
                  onChange={(e) => setLastBloodDonation(e.target.value)}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted/50" : ""}
                />
              </div>

              {/* Joining Date (Read-only) */}
              <div className="space-y-2">
                <Label className="text-muted-foreground">Joining Date</Label>
                <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{employeeData.joiningDate}</span>
                </div>
              </div>

              {/* Address - Full Width */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  className={!isEditing ? "bg-muted/50" : ""}
                />
              </div>

              {/* Work History - Full Width */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="work-history">Work History / Experience</Label>
                <Textarea
                  id="work-history"
                  value={workHistory}
                  onChange={(e) => setWorkHistory(e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                  className={!isEditing ? "bg-muted/50" : ""}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account & Security Section */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Account & Security</CardTitle>
            <CardDescription>Update your password and manage security settings</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Current Password */}
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password *</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Last Login Info */}
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Last Login</Label>
                  <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-2">
                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{employeeData.lastLogin}</span>
                  </div>
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password *</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password *</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special
                characters.
              </p>

              <Button type="submit" variant="secondary" className="min-w-[160px]">
                Change Password
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Preferences & Settings Section */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Preferences & Settings</CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Notification Preferences */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-muted p-2">
                      <MailIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <Label htmlFor="email-notif" className="font-medium cursor-pointer">
                        Email Notifications
                      </Label>
                      <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                    </div>
                  </div>
                  <Switch id="email-notif" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-muted p-2">
                      <BellIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <Label htmlFor="sys-notif" className="font-medium cursor-pointer">
                        System Notifications
                      </Label>
                      <p className="text-xs text-muted-foreground">Receive in-app notifications</p>
                    </div>
                  </div>
                  <Switch id="sys-notif" checked={systemNotifications} onCheckedChange={setSystemNotifications} />
                </div>
              </div>
            </div>

            <Separator />

            {/* Theme Preference */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Theme Preference</h3>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={theme === "light" ? "default" : "outline"}
                  className="flex-1 gap-2"
                  onClick={() => setTheme("light")}
                >
                  <SunIcon className="h-4 w-4" />
                  Light
                </Button>
                <Button
                  type="button"
                  variant={theme === "dark" ? "default" : "outline"}
                  className="flex-1 gap-2"
                  onClick={() => setTheme("dark")}
                >
                  <MoonIcon className="h-4 w-4" />
                  Dark
                </Button>
              </div>
            </div>

            <Separator />

            {/* Language Preference */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Language Preference</h3>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-muted p-2">
                  <GlobeIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Actions Section */}
        {isEditing && (
          <Card className="shadow-sm border-primary/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">You have unsaved changes</p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="min-w-[140px]">
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default EmployeeProfile



