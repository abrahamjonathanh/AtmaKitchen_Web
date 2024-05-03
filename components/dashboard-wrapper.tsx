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

        <div className="flex w-full flex-col">
          <NavbarDashboard title={navTitle} />
          <div className="w-full max-w-screen-2xl space-y-4 px-4 py-4 pl-4 lg:pr-16">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
