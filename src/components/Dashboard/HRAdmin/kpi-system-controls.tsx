"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { LockIcon, UnlockIcon, RefreshCwIcon, SettingsIcon } from "lucide-react"

interface SystemStatus {
  kpiMonthStatus: "Open" | "Locked"
  currentMonth: string
  attendanceOverrideEnabled: boolean
}

interface KPISystemControlsProps {
  status: SystemStatus
  onLockMonth: () => void
  onUnlockMonth: () => void
  onToggleAttendanceOverride: (enabled: boolean) => void
  onResetLeaveCycle: () => void
}

export function KPISystemControls({
  status,
  onLockMonth,
  onUnlockMonth,
  onToggleAttendanceOverride,
  onResetLeaveCycle,
}: KPISystemControlsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SettingsIcon className="h-5 w-5" />
          KPI & System Lock Controls
        </CardTitle>
        <CardDescription>Manage system-wide settings and locks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* KPI Month Control */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">KPI Month: {status.currentMonth}</p>
              <p className="text-xs text-muted-foreground">Current status</p>
            </div>
            <Badge
              className={
                status.kpiMonthStatus === "Locked"
                  ? "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
                  : "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
              }
            >
              {status.kpiMonthStatus === "Locked" ? (
                <>
                  <LockIcon className="h-3 w-3 mr-1" /> Locked
                </>
              ) : (
                <>
                  <UnlockIcon className="h-3 w-3 mr-1" /> Open
                </>
              )}
            </Badge>
          </div>
          <div className="flex gap-2">
            {status.kpiMonthStatus === "Open" ? (
              <Button size="sm" variant="destructive" className="flex-1" onClick={onLockMonth}>
                <LockIcon className="h-4 w-4 mr-2" />
                Lock Month
              </Button>
            ) : (
              <Button size="sm" variant="outline" className="flex-1 bg-transparent" onClick={onUnlockMonth}>
                <UnlockIcon className="h-4 w-4 mr-2" />
                Unlock Month
              </Button>
            )}
          </div>
        </div>

        {/* Attendance Override Toggle */}
        <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/50">
          <div className="space-y-0.5">
            <Label htmlFor="attendance-override" className="text-sm font-medium">
              Attendance Manual Override
            </Label>
            <p className="text-xs text-muted-foreground">Allow manual attendance adjustments</p>
          </div>
          <Switch
            id="attendance-override"
            checked={status.attendanceOverrideEnabled}
            onCheckedChange={onToggleAttendanceOverride}
          />
        </div>

        {/* Leave Cycle Reset */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Leave Cycle Management</p>
          <Button size="sm" variant="outline" className="w-full bg-transparent" onClick={onResetLeaveCycle}>
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Reset Leave Cycle
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
