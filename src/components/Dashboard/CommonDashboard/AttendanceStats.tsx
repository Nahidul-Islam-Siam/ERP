"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "lucide-react"

export default function AttendanceStats() {
  const stats = [
    { label: "Payable Days", value: "10", color: "bg-blue-500" },
    { label: "Present", value: "0", color: "bg-green-500" },
    { label: "Late", value: "7", color: "bg-yellow-500" },
    { label: "Movement", value: "0", color: "bg-pink-500" },
    { label: "Leave", value: "0", color: "bg-purple-500" },
    { label: "Absent", value: "2", color: "bg-red-500" },
  ]

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-5 h-5 text-slate-600" />
          <h3 className="font-semibold text-slate-900">Attendance Summary</h3>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <div className={`w-3 h-8 rounded ${stat.color}`} />
              <div className="text-right">
                <p className="text-lg font-semibold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
