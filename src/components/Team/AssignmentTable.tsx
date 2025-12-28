// // components/dashboard/AssignmentTable.tsx
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
// import { Pencil, Plus } from "lucide-react";

// type Assignment = {
//   id: string;
//   date: string;
//   assignEmployee: string;
//   employeeId: string;
//   employeeName: string;
//   assignTeam: string;
//   profileName: string;
//   orderId: string;
//   monetaryValue: number;
//   clientId: string;
//   orderLink: string;
//   salesStatus: string;
//   instructionSheet: string;
//   orderStatus: string;
//   remarks: string;
// };

// export default function AssignmentTable({
//   assignments,
//   onEdit,
//   onCreate,
// }: {
//   assignments: Assignment[];
//   onEdit: (a: Assignment) => void;
//   onCreate: () => void;
// }) {
//   const getStatusBadgeVariant = (status: string) => {
//     if (["Delivered", "Complete", "Active"].includes(status)) return "success";
//     if (["Pending", "In Progress"].includes(status)) return "warning";
//     if (["Revisions", "On Leave"].includes(status)) return "secondary";
//     return "default";
//   };

//   return (
//     <section className="mb-8">
//       <div className="mb-4 flex items-center justify-between">
//         <div>
//           <h2 className="text-xl font-semibold">Assignment Management</h2>
//           <p className="text-sm text-muted-foreground">Track and manage team assignments</p>
//         </div>
//         <Button onClick={onCreate}>
//           <Plus className="mr-2 h-4 w-4" />
//           Create Assignment
//         </Button>
//       </div>

//       <Card>
//         <CardContent className="p-0">
//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead className="sticky left-0 z-10 bg-card">ID</TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead className="sticky left-[80px] z-10 bg-card">Employee</TableHead>
//                   <TableHead>Profile</TableHead>
//                   <TableHead>Order ID</TableHead>
//                   <TableHead>Value</TableHead>
//                   <TableHead>Sales Status</TableHead>
//                   <TableHead>Order Status</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {assignments.map((a) => (
//                   <TableRow key={a.id}>
//                     <TableCell className="sticky left-0 bg-card font-medium">{a.id}</TableCell>
//                     <TableCell>{new Date(a.date).toLocaleDateString()}</TableCell>
//                     <TableCell className="sticky left-[80px] bg-card">{a.employeeName}</TableCell>
//                     <TableCell>{a.profileName}</TableCell>
//                     <TableCell>{a.orderId}</TableCell>
//                     <TableCell>${a.monetaryValue.toLocaleString()}</TableCell>
//                     <TableCell>
//                       <Badge variant={getStatusBadgeVariant(a.salesStatus)}>
//                         {a.salesStatus}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant={getStatusBadgeVariant(a.orderStatus)}>
//                         {a.orderStatus}
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <Button variant="ghost" size="icon" onClick={() => onEdit(a)}>
//                         <Pencil className="h-4 w-4" />
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
//     </section>
//   );
// }


import React from 'react'

export default function AssignmentTable() {
  return (
    <div>AssignmentTable</div>
  )
}
