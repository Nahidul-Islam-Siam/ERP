// // components/dashboard/TeamMembersTable.tsx
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// type TeamMember = {
//   id: string;
//   name: string;
//   role: string;
//   status: string;
//   targetKPI: number;
//   achievedKPI: number;
//   assignments: number;
// };

// export default function TeamMembersTable({ members }: { members: TeamMember[] }) {
//   const getStatusBadgeVariant = (status: string) =>
//     status === "Active" ? "success" : "secondary";

//   const getKPIColor = (achieved: number, target: number) => {
//     const pct = (achieved / target) * 100;
//     if (pct >= 90) return "text-success";
//     if (pct >= 70) return "text-warning";
//     return "text-destructive";
//   };

//   return (
//     <section>
//       <div className="mb-4">
//         <h2 className="text-xl font-semibold">Team Members Overview</h2>
//         <p className="text-sm text-muted-foreground">Monitor individual performance</p>
//       </div>
//       <Card>
//         <CardContent className="p-0">
//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>ID</TableHead>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Role</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Target KPI</TableHead>
//                   <TableHead>Achieved</TableHead>
//                   <TableHead>KPI %</TableHead>
//                   <TableHead>Assignments</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {members.map((m) => {
//                   const pct = ((m.achievedKPI / m.targetKPI) * 100).toFixed(0);
//                   return (
//                     <TableRow key={m.id}>
//                       <TableCell className="font-medium">{m.id}</TableCell>
//                       <TableCell>{m.name}</TableCell>
//                       <TableCell>{m.role}</TableCell>
//                       <TableCell>
//                         <Badge variant={getStatusBadgeVariant(m.status)}>{m.status}</Badge>
//                       </TableCell>
//                       <TableCell>{m.targetKPI}%</TableCell>
//                       <TableCell>{m.achievedKPI}%</TableCell>
//                       <TableCell>
//                         <span className={getKPIColor(m.achievedKPI, m.targetKPI)}>{pct}%</span>
//                       </TableCell>
//                       <TableCell>{m.assignments}</TableCell>
//                       <TableCell className="text-right">
//                         <Button variant="ghost" size="sm">Update KPI</Button>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
//     </section>
//   );
// }

import React from 'react'

export default function TeamMembersTable() {
  return (
    <div>TeamMembersTable</div>
  )
}
