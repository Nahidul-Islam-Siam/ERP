
// import HRAdminLayout from "@/components/shared/layout/HrLayout";
import TeamLayout from "@/components/shared/layout/TeamLayout";
import React from "react";
interface AdminLayoutProps {
  children: React.ReactNode;
}

const HrLayout = ({ children }: AdminLayoutProps) => {
  return <TeamLayout>{children}</TeamLayout>;
};

export default HrLayout;
