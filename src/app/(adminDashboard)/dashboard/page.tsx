import { AttendanceSection } from "@/components/Dashboard/CommonDashboard/AttendanceSection";
import { ChartsSection } from "@/components/Dashboard/CommonDashboard/ChartSelection";
// import { DashboardHeader } from "@/components/Dashboard/CommonDashboard/DashboardHeader";
import { QuickActions } from "@/components/Dashboard/CommonDashboard/QuickActions";
import { RecentLeavesTable } from "@/components/Dashboard/CommonDashboard/RecentLeaveTable";
import { RecentTasksTable } from "@/components/Dashboard/CommonDashboard/RecentTaskTable";
import { SummaryCards } from "@/components/Dashboard/CommonDashboard/SummryCards";


export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* <DashboardHeader /> */}

      <div className="px-6 py-6 space-y-6">
        <SummaryCards />
        <QuickActions />

        <AttendanceSection />

        <ChartsSection />
        <RecentTasksTable />
        <RecentLeavesTable />
      </div>
    </main>
  )
}
