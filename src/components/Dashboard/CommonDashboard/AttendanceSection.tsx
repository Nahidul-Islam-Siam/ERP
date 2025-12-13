"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Calendar as CalendarIcon, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export function AttendanceSection() {
  // Initialize to December 2025
  const [currentMonth, setCurrentMonth] = useState(11) // December = 11
  const [currentYear, setCurrentYear] = useState(2025)

  // Navigate to previous month
  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  // Navigate to next month
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // Format month name
  const monthName = new Date(currentYear, currentMonth).toLocaleDateString("en-US", { month: "long" })

  // Generate calendar grid for current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay() // 0=Sun → 6=Sat

  const calendarDays = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  // ✏️ MANUAL DATA BY MONTH — Use correct zero-based month keys
  const monthlyAttendanceData: Record<string, Record<number, string>> = {
    "2025-10": {}, // November 2025? No — this is October
    "2025-11": {   // ✅ December 2025 (month 11)
      1: "Late",
      2: "Late",
      3: "Late",
      4: "Late",
      5: "Late",
      6: "Late",
      8: "Absent",
      9: "Absent",
      10: "Late",
      11: "Present",
      12: "Manual Present",
    },
    "2026-0": {    // ✅ January 2026 (month 0)
      5: "Present",
      6: "Present",
      7: "Late",
      10: "Absent",
    },
  }

  // 🔑 Build key with zero-based month (e.g., "2025-11" for Dec 2025)
  const key = `${currentYear}-${currentMonth}`
  const statusMap = monthlyAttendanceData[key] || {}

  const getDateStatus = (day: number) => {
    return statusMap[day] || null
  }

  const getStatusColor = (status: string | null) => {
    if (!status) return "bg-slate-50"
    if (status === "Late") return "bg-yellow-50"
    if (status === "Absent") return "bg-red-50"
    if (status === "Offday") return "bg-gray-50"
    if (status === "Manual Present") return "bg-green-50"
    return "bg-slate-50"
  }

  const getStatusBadgeColor = (status: string | null) => {
    if (!status) return ""
    if (status === "Late") return "bg-yellow-200 text-yellow-800"
    if (status === "Absent") return "bg-red-200 text-red-800"
    if (status === "Offday") return "bg-gray-200 text-gray-800"
    if (status === "Manual Present") return "bg-purple-200 text-purple-800"
    if (status === "Present") return "bg-green-200 text-green-800"
    return ""
  }

  // ✅ Calculate Stats Dynamically
  const statuses = Object.values(statusMap)
  const stats = {
    present: statuses.filter((s) => s === "Present" || s === "Manual Present").length,
    late: statuses.filter((s) => s === "Late").length,
    absent: statuses.filter((s) => s === "Absent").length,
  }

  // Mock check-in history
  const rawCheckInHistory = [
    { date: "10 Dec, 2025", checkIn: "02:57 PM", checkOut: "02:57 PM", duration: "8hr 3min" },
    { date: "09 Dec, 2025", checkIn: null, checkOut: null, duration: null },
    { date: "08 Dec, 2025", checkIn: null, checkOut: null, duration: null },
    { date: "07 Dec, 2025", checkIn: null, checkOut: null, duration: null },
    { date: "05 Jan, 2026", checkIn: "07:10 AM", checkOut: "03:25 PM", duration: "8hr 15min" },
  ]

  // Filter history by current month/year
  const checkInHistory = rawCheckInHistory.filter((entry) => {
    const entryDate = new Date(entry.date)
    return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear
  })

  const today = new Date()
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-lg p-4 border border-slate-200">
        <p className="text-xs text-slate-600">
          {dateStr} • Company: Bdcalling [BD] • Address: 14 Daisy Garden, Banasree Main Rd, Dhaka 1219
        </p>
      </div>

      {/* Today Working Period & Employee Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Clock size={20} className="text-blue-600" />
              Today Working Period
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-slate-600 mb-1">Status</p>
              <p className="text-green-600 font-medium">Please check-in</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Shift</p>
              <p className="font-medium text-slate-900">Morning 7:00 AM to 3:30 PM</p>
              <p className="text-sm text-slate-600">07:00 AM – 03:30 PM</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-slate-900">Employment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Length of Service</span>
              <span className="font-medium text-slate-900">8 months 22 days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Joining Date</span>
              <span className="font-medium text-slate-900">19 Mar, 2025</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Confirmation Date</span>
              <span className="font-medium text-slate-900">16 Jun, 2025</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Calendar */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <CalendarIcon size={20} className="text-blue-600" />
              Attendance Calendar - {monthName} {currentYear}
            </CardTitle>

            {/* Month Navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrevMonth}
                className="p-1 hover:bg-slate-100 rounded transition"
                aria-label="Previous month"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={goToNextMonth}
                className="p-1 hover:bg-slate-100 rounded transition"
                aria-label="Next month"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 md:grid-cols-6 gap-2">
            <div className="text-center">
              <p className="text-lg font-bold text-slate-900">10</p>
              <p className="text-xs text-slate-600">Payable Days</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-green-600">{stats.present}</p>
              <p className="text-xs text-slate-600">Present</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-yellow-600">{stats.late}</p>
              <p className="text-xs text-slate-600">Late</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-purple-600">0</p>
              <p className="text-xs text-slate-600">Movement</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-blue-600">0</p>
              <p className="text-xs text-slate-600">Leave</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-red-600">{stats.absent}</p>
              <p className="text-xs text-slate-600">Absent</p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Weekdays Header */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-slate-600">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, idx) => {
              if (!day) {
                return <div key={`empty-${idx}`} className="aspect-square" />
              }

              const status = getDateStatus(day)
              return (
                <div
                  key={day}
                  className={`aspect-square rounded-lg p-2 flex flex-col items-center justify-center text-center border border-slate-200 ${getStatusColor(status)}`}
                >
                  <p className="text-sm font-medium text-slate-900">{day}</p>
                  {status && (
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded mt-0.5 whitespace-nowrap ${getStatusBadgeColor(status)}`}
                    >
                      {status}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Check-in History */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-slate-900">Check-in/Check-out History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {checkInHistory.length > 0 ? (
              checkInHistory.map((entry, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">{entry.date}</p>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    {entry.checkIn ? (
                      <>
                        <div className="flex items-center gap-1">
                          <ArrowUp size={16} className="text-blue-600" />
                          <span className="text-blue-600">Check In</span>
                          <span className="text-slate-900 font-medium">{entry.checkIn}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ArrowDown size={16} className="text-orange-600" />
                          <span className="text-orange-600">Check Out</span>
                          <span className="text-slate-900 font-medium">{entry.checkOut}</span>
                        </div>
                        <span className="text-slate-600 font-medium">{entry.duration}</span>
                      </>
                    ) : (
                      <span className="text-slate-400">No attendance record</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No records available for this month.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}