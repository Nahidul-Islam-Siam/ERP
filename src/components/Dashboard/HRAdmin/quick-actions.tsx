"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  UserPlusIcon,
  LayersIcon,
  ShieldIcon,
  UsersIcon,
  TrendingUpIcon,
  ClipboardListIcon,
  SettingsIcon,
} from "lucide-react"

interface QuickActionsProps {
  onAction: (actionKey: string) => void
}

export function QuickActions({ onAction }: QuickActionsProps) {
  const actions = [
    { key: "create-employee", label: "Create Employee", icon: UserPlusIcon },
    { key: "create-team", label: "Create Team", icon: LayersIcon },
    { key: "assign-supervisor", label: "Assign Supervisor", icon: ShieldIcon },
    { key: "assign-leader", label: "Assign Team Leader", icon: UsersIcon },
    { key: "set-kpi", label: "Set KPI", icon: TrendingUpIcon },
    { key: "open-approval-center", label: "Open Approval Center", icon: ClipboardListIcon },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SettingsIcon className="h-5 w-5" />
          Quick Actions
        </CardTitle>
        <CardDescription>Shortcuts to common HR tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.key}
                variant="outline"
                className="justify-start gap-2 bg-transparent"
                onClick={() => onAction(action.key)}
              >
                <Icon className="h-4 w-4" />
                {action.label}
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
