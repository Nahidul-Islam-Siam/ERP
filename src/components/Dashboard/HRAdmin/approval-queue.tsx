"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircleIcon, XCircleIcon, EyeIcon, ClockIcon } from "lucide-react"

interface ApprovalItem {
  id: number
  type: "Leave" | "Attendance" | "KPI" | "Employee Change"
  employeeName: string
  team: string
  requestedAction: string
  requestDate: string
  priority: "High" | "Medium" | "Low"
  status: "Pending" | "Under Review"
}

interface ApprovalQueueProps {
  items: ApprovalItem[]
  onApprove: (id: number) => void
  onReject: (id: number) => void
  onViewDetails: (item: ApprovalItem) => void
}

export function ApprovalQueue({ items, onApprove, onReject, onViewDetails }: ApprovalQueueProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
      case "Medium":
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
      default:
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Leave":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20"
      case "Attendance":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20"
      case "KPI":
        return "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20"
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Central Approval & Action Queue</CardTitle>
        <CardDescription>All pending items requiring action</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Type</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Requested Action</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead className="w-[100px]">Priority</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="text-right w-[200px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No pending approvals
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Badge className={getTypeColor(item.type)}>{item.type}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{item.employeeName}</TableCell>
                    <TableCell className="text-muted-foreground">{item.team}</TableCell>
                    <TableCell>{item.requestedAction}</TableCell>
                    <TableCell className="text-muted-foreground">{item.requestDate}</TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="gap-1">
                        <ClockIcon className="h-3 w-3" />
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="sm" variant="ghost" className="h-8 px-2" onClick={() => onViewDetails(item)}>
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-2 text-green-600 hover:text-green-700 hover:bg-green-500/10"
                          onClick={() => onApprove(item.id)}
                        >
                          <CheckCircleIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-500/10"
                          onClick={() => onReject(item.id)}
                        >
                          <XCircleIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
