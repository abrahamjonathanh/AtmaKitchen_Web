import React, { ReactNode } from "react";
import Sidebar from "./sidebar";
import { NavbarDashboard } from "./navbar";
import Footer from "./footer";

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
            {/* <div className="border border-slate-500 border-dashed">
            <p>Content </p>
          </div> */}
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}