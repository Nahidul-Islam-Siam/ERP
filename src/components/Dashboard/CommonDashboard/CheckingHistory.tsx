"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"
import { format, isThisMonth} from "date-fns"

export default function CheckinHistory() {
  // Generate dummy data for the current month (you'd replace this with real data)
  const today = new Date()
  const year = 2025
  const month = 11 // December (0-indexed: Nov = 10, Dec = 11)

  const records = []

  // Simulate generating one record per day for December 2025
  for (let i = 0; i < 31; i++) {
    const date = new Date(year, month, i + 1)
    if (date > today) break // Only show up to today
    if (!isThisMonth(date)) continue

    const hour = 15 + Math.floor(Math.random() * 2) // Between 3-4 PM
    const minute = Math.floor(Math.random() * 60)
    const checkin = `${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`

    const checkoutHour = hour + 7 + Math.floor(Math.random() * 2)
    const checkoutMinute = Math.floor(Math.random() * 60)
    const checkout = `${checkoutHour % 12 || 12}:${checkoutMinute.toString().padStart(2, '0')} ${checkoutHour >= 12 ? 'PM' : 'AM'}`

    const durationHours = 8 + Math.floor(Math.random() * 2)
    const durationMinutes = Math.floor(Math.random() * 30)
    const duration = `${durationHours} hr ${durationMinutes} min`

    records.push({
      date: format(date, "dd MMM, yyyy"),
      checkin,
      checkout,
      duration,
    })
  }

  // Reverse to show latest on top
  records.reverse()

  return (
    <Card className="border-0 shadow-sm bg-white h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Check-in History</CardTitle>
      </CardHeader>

      <CardContent
        className="space-y-4 overflow-y-auto max-h-[400px] px-1"
        style={{ scrollbarWidth: "thin" }}
      >
        {records.length === 0 ? (
          <p className="text-sm text-slate-500">No check-in records this month.</p>
        ) : (
          records.map((record, idx) => (
            <div
              key={idx}
              className="pb-4 border-b border-slate-100 last:border-0 last:pb-0"
            >
              <p className="text-xs text-slate-600 font-medium mb-2">
                {record.date}
              </p>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm">
                  <ArrowUp className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-600 font-medium">Check In</span>
                  <span className="text-slate-900 font-semibold ml-auto">
                    {record.checkin}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <ArrowDown className="w-4 h-4 text-orange-600" />
                  <span className="text-orange-600 font-medium">Check Out</span>
                  <span className="text-slate-900 font-semibold ml-auto">
                    {record.checkout}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="ml-6">Total Duration:</span>
                  <span className="font-semibold text-slate-900 ml-auto">
                    {record.duration}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}