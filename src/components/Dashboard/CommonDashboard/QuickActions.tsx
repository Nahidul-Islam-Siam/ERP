import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, CheckCircle, Eye } from "lucide-react"

export function QuickActions() {
  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-slate-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" className="gap-2 border-slate-200 h-10 bg-transparent">
            <Plus size={18} />
            <span className="hidden sm:inline">Apply Leave</span>
          </Button>
          <Button variant="outline" className="gap-2 border-slate-200 h-10 bg-transparent">
            <FileText size={18} />
            <span className="hidden sm:inline">Attendance</span>
          </Button>
          <Button variant="outline" className="gap-2 border-slate-200 h-10 bg-transparent">
            <CheckCircle size={18} />
            <span className="hidden sm:inline">Submit KPI</span>
          </Button>
          <Button variant="outline" className="gap-2 border-slate-200 h-10 bg-transparent">
            <Eye size={18} />
            <span className="hidden sm:inline">View Tasks</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
