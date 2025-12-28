
import EmployeLayout from "@/components/shared/layout/EmployeeLayout";

import React from "react";
interface AdminLayoutProps {
  children: React.ReactNode;
}

const EmployeeLayout = ({ children }: AdminLayoutProps) => {
  return <EmployeLayout>{children}</EmployeLayout>;
};

export default EmployeeLayout;
