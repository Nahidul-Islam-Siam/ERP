"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UsersIcon, UserCheckIcon, ShieldIcon, LayersIcon, UserPlusIcon, UserXIcon } from "lucide-react"

interface SummaryData {
  totalEmployees: number
  activeEmployees: number
  totalSupervisors: number
  totalTeams: number
  totalTeamLeaders: number
  inactiveOnboarding: number
}

interface SummaryCardsProps {
  data: SummaryData
  onCardClick: (action: string) => void
}

export function SummaryCards({ data, onCardClick }: SummaryCardsProps) {
  const cards = [
    {
      icon: UsersIcon,
      value: data.totalEmployees,
      label: "Employees",
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      actions: ["Create Employee", "Bulk Upload", "Import CSV"],
      actionKey: "employees",
    },
    {
      icon: UserCheckIcon,
      value: data.activeEmployees,
      label: "Active Employees",
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      actions: [],
      actionKey: "active",
    },
    {
      icon: ShieldIcon,
      value: data.totalSupervisors,
      label: "Supervisors",
      color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
      actions: ["Create Supervisor", "Assign Teams"],
      actionKey: "supervisors",
    },
    {
      icon: LayersIcon,
      value: data.totalTeams,
      label: "Teams",
      color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
      actions: ["Create Team", "Assign Supervisor", "Assign Leader"],
      actionKey: "teams",
    },
    {
      icon: UserPlusIcon,
      value: data.totalTeamLeaders,
      label: "Team Leaders",
      color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
      actions: [],
      actionKey: "leaders",
    },
    {
      icon: UserXIcon,
      value: data.inactiveOnboarding,
      label: "Inactive/Onboarding",
      color: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
      actions: ["Review"],
      actionKey: "inactive",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <Card
            key={card.actionKey}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => card.actions.length > 0 && onCardClick(card.actionKey)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`rounded-lg p-2 ${card.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">{card.value}</p>
                  <p className="text-xs text-muted-foreground">{card.label}</p>
                </div>
              </div>
              {card.actions.length > 0 && (
                <div className="space-y-1">
                  {card.actions.map((action) => (
                    <Button
                      key={action}
                      size="sm"
                      variant="ghost"
                      className="w-full h-7 text-xs justify-start"
                      onClick={(e) => {
                        e.stopPropagation()
                        onCardClick(`${card.actionKey}-${action.toLowerCase().replace(/\s+/g, "-")}`)
                      }}
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
