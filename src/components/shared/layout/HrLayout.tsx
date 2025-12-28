"use client";

import AdminLayout, { getItem, MenuItem } from "@/components/shared/layout/Layout";

import Link from "next/link";
import { ReactNode } from "react";
import { LuLayoutDashboard } from "react-icons/lu";

// import { SlCalender } from "react-icons/sl";
// import { LuClipboardList } from "react-icons/lu";
// // import { CiSettings } from "react-icons/ci";
// import { BsPeople } from "react-icons/bs";
// import { RiContactsBook2Line } from "react-icons/ri";
const navItems: MenuItem[] = [
  getItem(
    <Link href="/hr-dashboard"> Dashboard</Link>,
    "/hr-dashboard",
    <LuLayoutDashboard />
  ),
//   getItem(
//     <Link href="/dashboard/leave-management">Leave Management</Link>,
//     "/dashboard/leave-management",
// <SlCalender />
//   ),
//   getItem(
//     <Link href="/dashboard/profile">Profile</Link>,
//     "/dashboard/profile",
// <LuClipboardList />
//   ),
//   getItem(
//     <Link href="/dashboard/team-workspace">Team Workspace</Link>,
//     "/dashboard/team-workspace",
//     <LuLayoutDashboard />
//   ),
//   getItem(
//     <Link href="/dashboard/superviser-workspace">Super Viser Workspace</Link>,
//     "/dashboard/superviser-workspace",
// <BsPeople />
//   ),
//     getItem(
//     <Link href="/dashboard/hr-admin-dashboard">HR Admin Dashboard</Link>,
//     "/dashboard/hr-admin-dashboard",
//     <RiContactsBook2Line />
//   ),
//       getItem(
//     <Link href="/dashboard/setting">Setting</Link>,
//     "/dashboard/setting",
//     <CiSettings />
//   ),
];

const HRAdminLayout = ({ children }: { children: ReactNode }) => {
  return <AdminLayout menu={navItems}>{children}</AdminLayout>;
};

export default HRAdminLayout;
