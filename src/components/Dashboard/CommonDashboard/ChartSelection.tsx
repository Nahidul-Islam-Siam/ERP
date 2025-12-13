import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Monthly Attendance Trend */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-slate-900">Monthly Attendance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-1 px-2">
            {[72, 85, 78, 92, 88, 94, 81, 89, 95, 87, 90, 93].map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-blue-500 rounded-t" style={{ height: `${(value / 100) * 240}px` }} />
                <span className="text-xs text-slate-500">{i + 1}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 justify-center mt-4 text-xs text-slate-600">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded" />
              <span>Attendance %</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Target vs Achieved */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-slate-900">KPI Target vs Achieved</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-center gap-12">
            {/* Target Bar */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 bg-slate-300 rounded-t" style={{ height: "240px" }} />
              <span className="text-sm font-medium text-slate-900">Target</span>
              <span className="text-xs text-slate-600">100</span>
            </div>

            {/* Achieved Bar */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 bg-green-500 rounded-t" style={{ height: `${(92 / 100) * 240}px` }} />
              <span className="text-sm font-medium text-slate-900">Achieved</span>
              <span className="text-xs text-slate-600">92</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
