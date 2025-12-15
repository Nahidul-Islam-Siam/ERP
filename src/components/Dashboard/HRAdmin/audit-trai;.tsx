"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileTextIcon } from "lucide-react"

interface AuditEntry {
  id: number
  dateTime: string
  hrAdminName: string
  action: string
  entity: string
  oldValue: string
  newValue: string
  reason: string
}

interface AuditTrailProps {
  entries: AuditEntry[]
}

export function AuditTrail({ entries }: AuditTrailProps) {
  const getActionColor = (action: string) => {
    switch (action) {
      case "Create":
        return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
      case "Update":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20"
      case "Delete":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
      case "Approve":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
      case "Reject":
        return "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20"
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileTextIcon className="h-5 w-5" />
          Audit Trail
        </CardTitle>
        <CardDescription>Complete history of all system actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>HR/Admin</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Changes</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No audit entries
                  </TableCell>
                </TableRow>
              ) : (
                entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-mono text-xs">{entry.dateTime}</TableCell>
                    <TableCell className="font-medium">{entry.hrAdminName}</TableCell>
                    <TableCell>
                      <Badge className={getActionColor(entry.action)}>{entry.action}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{entry.entity}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-muted-foreground">{entry.oldValue}</span>
                        <span>→</span>
                        <span className="font-medium">{entry.newValue}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">
                      {entry.reason}
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
