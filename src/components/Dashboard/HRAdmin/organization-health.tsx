"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangleIcon, CheckCircleIcon, ActivityIcon } from "lucide-react"

interface HealthData {
  teamsWithoutSupervisor: number
  teamsWithoutTeamLeader: number
  employeesWithoutTeam: number
  employeesWithoutKPI: number
  employeesExpiredLeave: number
}

interface OrganizationHealthProps {
  data: HealthData
  onFixIssue: (issueType: string) => void
}

export function OrganizationHealth({ data, onFixIssue }: OrganizationHealthProps) {
  const issues = [
    {
      key: "supervisor",
      label: "Teams without Supervisor",
      count: data.teamsWithoutSupervisor,
      action: "Assign Now",
      severity: "high",
    },
    {
      key: "leader",
      label: "Teams without Leader",
      count: data.teamsWithoutTeamLeader,
      action: "Assign Leader",
      severity: "medium",
    },
    {
      key: "team",
      label: "Employees without Team",
      count: data.employeesWithoutTeam,
      action: "Assign Team",
      severity: "high",
    },
    {
      key: "kpi",
      label: "Employees without KPI",
      count: data.employeesWithoutKPI,
      action: "Assign KPI",
      severity: "medium",
    },
    {
      key: "leave",
      label: "Employees with Expired Leave",
      count: data.employeesExpiredLeave,
      action: "Review",
      severity: "low",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ActivityIcon className="h-5 w-5" />
          Organization Health
        </CardTitle>
        <CardDescription>Actionable warnings and issues</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {issues.map((issue) => {
          const hasIssue = issue.count > 0
          const severityColor =
            issue.severity === "high"
              ? "bg-red-500/5 border-red-500/20"
              : issue.severity === "medium"
                ? "bg-amber-500/5 border-amber-500/20"
                : "bg-blue-500/5 border-blue-500/20"

          return (
            <div
              key={issue.key}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                hasIssue ? severityColor : "bg-green-500/5 border-green-500/20"
              }`}
            >
              <div className="flex items-center gap-2 flex-1">
                {hasIssue ? (
                  <AlertTriangleIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
                ) : (
                  <CheckCircleIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium">{issue.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {hasIssue ? `${issue.count} items need attention` : "All clear"}
                  </p>
                </div>
              </div>
              {hasIssue && (
                <Button size="sm" variant="outline" onClick={() => onFixIssue(issue.key)}>
                  {issue.action}
                </Button>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
