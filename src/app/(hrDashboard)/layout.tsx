
import HRAdminLayout from "@/components/shared/layout/HrLayout";
import React from "react";
interface AdminLayoutProps {
  children: React.ReactNode;
}

const HrLayout = ({ children }: AdminLayoutProps) => {
  return <HRAdminLayout>{children}</HRAdminLayout>;
};

export default HrLayout;
