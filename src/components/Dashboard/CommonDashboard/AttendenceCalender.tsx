"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function AttendanceCalendar() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const calendarDays = [
    null,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
  ]

  const statuses: Record<number, string> = {
    1: "late",
    2: "late",
    3: "late",
    4: "late",
    5: "late",
    6: "late",
    7: "offday",
    8: "absent",
    9: "absent",
    10: "late",
    11: "present"
  }

  const getStatusStyles = (day: number) => {
    const status = statuses[day]
    if (status === "late") return "bg-yellow-50 text-yellow-700 border border-yellow-200"
    if (status === "absent") return "bg-red-50 text-red-700 border border-red-200"
    if (status === "offday") return "bg-gray-50 text-gray-700 border border-gray-200"
    return "text-slate-900"
  }

  const getStatusLabel = (day: number) => {
    const status = statuses[day]
    if (status === "late") return "Late"
    if (status === "absent") return "Absent"
    if (status === "offday") return "Offday"
    return ""
  }

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Attendance Calendar</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium text-slate-700">December 2025</span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {days.map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-slate-600 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, idx) => (
            <div
              key={idx}
              className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm font-medium ${
                day ? `${getStatusStyles(day)} cursor-pointer hover:opacity-80` : ""
              }`}
            >
              {day && (
                <>
                  <span className="text-base">{day}</span>
                  {getStatusLabel(day) && <span className="text-xs mt-0.5">{getStatusLabel(day)}</span>}
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
