import { EmployeeAttendanceSheet } from '@/components/Dashboard/TeamWorkSpace/TeamEmployeeAttendenceSheet'
import TeamWorkspace from '@/components/Dashboard/TeamWorkSpace/TeamworkSpace'
import React from 'react'

export default function page() {
  return (
    <div>
      <TeamWorkspace/>
      <EmployeeAttendanceSheet/>
    </div>
  )
}
