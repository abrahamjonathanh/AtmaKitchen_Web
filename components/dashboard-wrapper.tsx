import React, { ReactNode } from "react";
import { NavbarDashboard } from "./navbar";
import Footer from "./footer";
import { Sidebar } from "./sidebar";

export default function DashboardWrapper({
  navTitle = "navTitle have no title...",
  children,
}: {
  navTitle?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex">
        <Sidebar />

        <div className="flex flex-col w-full">
          <NavbarDashboard title={navTitle} />
          <div className="w-full px-4 pl-4 lg:pr-16 py-4 space-y-4">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
