// app/HRDashboard.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import { SummaryCards } from "./HRSummaryCards"
import { EmployeeSection } from "./EmployeeSection"
import { TeamSection } from "./TeamSection"

export default function HRDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">HR Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage employees, teams, and assignments</p>
            </div>
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              View Reports
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <SummaryCards />
        <EmployeeSection />
        <TeamSection />
      </main>
    </div>
  )
}