"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

export default function AttendanceCheckin() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex items-center justify-center w-14 h-14 bg-green-50 rounded-full">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Today Working Period</h3>
              <p className="text-sm text-slate-600 mt-1">Morning 7:00AM to 3:30 PM</p>
              <p className="text-sm font-semibold text-slate-900 mt-2">07:00 AM – 03:30 PM</p>
            </div>
          </div>
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Please check-in</Button>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-600 font-medium">Length of Service</p>
              <p className="text-lg font-semibold text-slate-900">8 months 22 days</p>
            </div>
            <div>
              <p className="text-xs text-slate-600 font-medium">Joining Date</p>
              <p className="text-lg font-semibold text-slate-900">19 Mar, 2025</p>
            </div>
            <div>
              <p className="text-xs text-slate-600 font-medium">Confirmation Date</p>
              <p className="text-lg font-semibold text-slate-900">16 Jun, 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
