"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  CalendarIcon,
  FileIcon,
  PlusIcon,
  CalendarDaysIcon,
  HeartPulseIcon,
  PiggyBankIcon,
  BanknoteIcon,
} from "lucide-react"

// Sample data - replace with real data in production
const leaveBalances = [
  {
    id: "CL",
    name: "Casual Leave",
    icon: CalendarDaysIcon,
    total: 12,
    taken: 5,
    remaining: 7,
    status: "Active",
    bgColor: "bg-white",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "SL",
    name: "Sick Leave",
    icon: HeartPulseIcon,
    total: 10,
    taken: 3,
    remaining: 7,
    status: "Active",
    bgColor: "bg-white",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  {
    id: "EL",
    name: "Earn Leave",
    icon: PiggyBankIcon,
    total: 15,
    taken: 8,
    remaining: 7,
    status: "Active",
     bgColor: "bg-white",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "LWP",
    name: "Leave Without Pay",
    icon: BanknoteIcon,
    total: 0,
    taken: 0,
    remaining: 0,
    status: "Inactive",
    bgColor: "bg-white",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
]

const leaveHistory = [
  {
    id: 1,
    leaveType: "Casual Leave",
    startDate: "2024-01-15",
    endDate: "2024-01-17",
    totalDays: 3,
    location: "Mumbai",
    reliever: "John Smith",
    reason: "Family function",
    attachment: true,
    applicationDate: "2024-01-10",
    status: "Approved",
  },
  {
    id: 2,
    leaveType: "Sick Leave",
    startDate: "2024-02-05",
    endDate: "2024-02-05",
    totalDays: 1,
    location: "Mumbai",
    reliever: "Sarah Johnson",
    reason: "Medical checkup",
    attachment: true,
    applicationDate: "2024-02-04",
    status: "Approved",
  },
  {
    id: 3,
    leaveType: "Earn Leave",
    startDate: "2024-03-20",
    endDate: "2024-03-25",
    totalDays: 6,
    location: "Goa",
    reliever: "Michael Brown",
    reason: "Vacation",
    attachment: false,
    applicationDate: "2024-03-15",
    status: "Pending",
  },
]

const teamMembers = ["John Smith", "Sarah Johnson", "Michael Brown", "Emily Davis", "David Wilson"]

export function LeaveManagement() {
  const [leaveType, setLeaveType] = useState("")
  const [duration, setDuration] = useState("full-day")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [location, setLocation] = useState("")
  const [reliever, setReliever] = useState("")
  const [reason, setReason] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted")
  }

  const handleReset = () => {
    setLeaveType("")
    setDuration("full-day")
    setFromDate("")
    setToDate("")
    setLocation("")
    setReliever("")
    setReason("")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20">
            Approved
          </Badge>
        )
      case "Pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 border-amber-500/20">
            Pending
          </Badge>
        )
      case "Rejected":
        return (
          <Badge className="bg-red-500/10 text-red-700 dark:text-red-400 hover:bg-red-500/20 border-red-500/20">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen  p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Leave Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your leave applications and view your leave balance
          </p>
        </div>

        {/* Leave Balance Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {leaveBalances.map((leave) => {
            const Icon = leave.icon
            return (
              <Card key={leave.id} className={`${leave.bgColor} border-0 shadow-sm`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">{leave.name}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-semibold text-foreground">{leave.remaining}</span>
                        <span className="text-sm text-muted-foreground">/ {leave.total} days</span>
                      </div>
                    </div>
                    <div className={`rounded-lg bg-background/60 p-2.5 ${leave.iconColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Taken: <span className="font-medium text-foreground">{leave.taken}</span>
                    </p>
                    <Badge variant={leave.status === "Active" ? "default" : "secondary"} className="text-xs">
                      {leave.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Leave Application Form */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Apply for Leave</CardTitle>
            <CardDescription>Submit a new leave request</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Leave Type */}
                <div className="space-y-2">
                  <Label htmlFor="leave-type">Leave Type *</Label>
                  <Select value={leaveType} onValueChange={setLeaveType}>
                    <SelectTrigger id="leave-type">
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CL">Casual Leave (CL)</SelectItem>
                      <SelectItem value="SL">Sick Leave (SL)</SelectItem>
                      <SelectItem value="EL">Earn Leave (EL)</SelectItem>
                      <SelectItem value="LWP">Leave Without Pay (LWP)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Leave Duration */}
                <div className="space-y-2">
                  <Label>Leave Duration *</Label>
                  <RadioGroup value={duration} onValueChange={setDuration} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="half-day" id="half-day" />
                      <Label htmlFor="half-day" className="font-normal cursor-pointer">
                        Half Day
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="full-day" id="full-day" />
                      <Label htmlFor="full-day" className="font-normal cursor-pointer">
                        Full Day
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* From Date */}
                <div className="space-y-2">
                  <Label htmlFor="from-date">From Date *</Label>
                  <div className="relative">
                    <Input
                      id="from-date"
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="pl-3"
                    />
                  </div>
                </div>

                {/* To Date */}
                <div className="space-y-2">
                  <Label htmlFor="to-date">To Date *</Label>
                  <div className="relative">
                    <Input
                      id="to-date"
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="pl-3"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                {/* Leave Reliever */}
                <div className="space-y-2">
                  <Label htmlFor="reliever">Leave Reliever *</Label>
                  <Select value={reliever} onValueChange={setReliever}>
                    <SelectTrigger id="reliever">
                      <SelectValue placeholder="Select team member" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map((member) => (
                        <SelectItem key={member} value={member}>
                          {member}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Reason */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="reason">Reason *</Label>
                  <Textarea
                    id="reason"
                    placeholder="Enter reason for leave"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Attachment */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="attachment">Attachment (Optional)</Label>
                  <Input id="attachment" type="file" className="cursor-pointer" />
                  <p className="text-xs text-muted-foreground">Upload any supporting documents (Max 5MB)</p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3">
                <Button type="submit" className="min-w-[140px]">
                  Submit Request
                </Button>
                <Button type="button" variant="outline" onClick={handleReset}>
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Leave History */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Leave History</CardTitle>
            <CardDescription>View all your past leave applications</CardDescription>
          </CardHeader>
          <CardContent>
            {leaveHistory.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">SL</TableHead>
                      <TableHead>Leave Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead className="w-20">Days</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Reliever</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead className="w-16">File</TableHead>
                      <TableHead>Applied On</TableHead>
                      <TableHead className="w-24">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveHistory.map((leave, index) => (
                      <TableRow key={leave.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell className="font-medium">{leave.leaveType}</TableCell>
                        <TableCell className="text-sm">
                          {leave.startDate} to {leave.endDate}
                        </TableCell>
                        <TableCell className="text-center">{leave.totalDays}</TableCell>
                        <TableCell>{leave.location}</TableCell>
                        <TableCell>{leave.reliever}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{leave.reason}</TableCell>
                        <TableCell>
                          {leave.attachment ? (
                            <FileIcon className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <span className="text-xs text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm">{leave.applicationDate}</TableCell>
                        <TableCell>{getStatusBadge(leave.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <CalendarIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">No leave applications found</h3>
                <p className="text-sm text-muted-foreground mb-6">Your submitted leave requests will appear here</p>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <PlusIcon className="h-4 w-4" />
                  Apply for Leave
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
