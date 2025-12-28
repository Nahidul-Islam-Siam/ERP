// // components/dashboard/AssignmentModal.tsx
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// import { Label } from "@/components/ui/label";


// type Props = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   // editingAssignment: Assignment | null;
//   // teamMembers: TeamMember[];
//   // onSave: (data: Partial<Assignment>) => void;
// };

// export default function AssignmentModal({
//   open,
//   onOpenChange,
//   // editingAssignment,
//   // teamMembers,
//   // onSave,
// }: Props) {
//   // You can connect form state with `useState` or use a form lib like react-hook-form
//   // For brevity, we’ll keep logic minimal and emit onSave with mock data

//   const handleSubmit = () => {
//     // In real app: collect form values and call onSave()
//     // onSave({}); // placeholder
//     onOpenChange(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
//         <DialogHeader>
//           <DialogTitle>{editingAssignment ? "Edit Assignment" : "Create Assignment"}</DialogTitle>
//           <DialogDescription>
//             {editingAssignment ? "Update details below." : "Fill in assignment details."}
//           </DialogDescription>
//         </DialogHeader>

//         {/* Simple version – you can expand with full form */}
//         <div className="grid gap-4 py-4">
//           <Label>Form content would go here (reuse your existing fields)</Label>
//         </div>

//         <DialogFooter>
//           <Button variant="outline" onClick={() => onOpenChange(false)}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit}>
//             {editingAssignment ? "Update" : "Save"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }


import React from 'react'

export default function AssignmentModal() {
  return (
    <div>AssignmentModal</div>
  )
}
