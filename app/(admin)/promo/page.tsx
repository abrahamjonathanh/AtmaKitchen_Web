import Footer from "@/components/footer";
import { NavbarDashboard } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";

export default function page() {
  return (
    // Boiler template for dashboard
    // Please do not change nor delete it unless you know what you are doing
    <div>
      <div className="flex">
        <Sidebar />

        <div className="flex gap-4 flex-col w-full">
          <NavbarDashboard title="Karyawan" />
          <div className="w-full px-4 pl-4 lg:pr-16">
            <div className="border border-slate-500 border-dashed">
              <p>Content</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
