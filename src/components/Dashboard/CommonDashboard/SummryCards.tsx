import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarCheck, Umbrella, Target, ListTodo } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Attendance Card */}
      <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-slate-700">Today&rsquo;s Attendance</CardTitle>
            <div className="p-2 bg-blue-50 rounded-lg">
              <CalendarCheck size={18} className="text-blue-600" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Present / Absent</span>
              <span className="font-semibold text-slate-900">87 / 13</span>
            </div>
            <Progress value={87} className="h-1.5" />
          </div>
          <div className="flex gap-4 text-xs text-slate-600">
            <div>
              <span className="block font-medium text-slate-900">87</span>
              <span>Present</span>
            </div>
            <div>
              <span className="block font-medium text-slate-900">10</span>
              <span>Late</span>
            </div>
            <div>
              <span className="block font-medium text-slate-900">3</span>
              <span>Absent</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leave Balance Card */}
      <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-slate-700">Leave Balance</CardTitle>
            <div className="p-2 bg-green-50 rounded-lg">
              <Umbrella size={18} className="text-green-600" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Casual Leave (CL)</span>
              <span className="font-semibold text-slate-900">8 / 12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Sick Leave (SL)</span>
              <span className="font-semibold text-slate-900">3 / 5</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Earned Leave (EL)</span>
              <span className="font-semibold text-slate-900">15 / 20</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">LWP</span>
              <span className="font-semibold text-slate-900">0 / 5</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Snapshot Card */}
      <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-slate-700">Performance KPI</CardTitle>
            <div className="p-2 bg-purple-50 rounded-lg">
              <Target size={18} className="text-purple-600" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Target vs Achieved</span>
              <span className="font-semibold text-slate-900">92%</span>
            </div>
            <Progress value={92} className="h-1.5" />
          </div>
          <div className="flex gap-4 text-xs text-slate-600">
            <div>
              <span className="block font-medium text-slate-900">100</span>
              <span>Target</span>
            </div>
            <div>
              <span className="block font-medium text-slate-900">92</span>
              <span>Achieved</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Overview Card */}
      <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-slate-700">Tasks Overview</CardTitle>
            <div className="p-2 bg-orange-50 rounded-lg">
              <ListTodo size={18} className="text-orange-600" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Pending</span>
              <span className="font-semibold text-slate-900">12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Completed</span>
              <span className="font-semibold text-slate-900">28</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Overdue</span>
              <span className="font-semibold text-orange-600">3</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
