import Footer from "@/components/footer";
import { NavbarDashboard } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";
import PromoForm from "../_components/input-form";

export default function page() {
  return (
    <div>
      <div className="flex">
        <Sidebar />

        <div className="flex flex-col w-full">
          <NavbarDashboard title="Tambah Karyawan" />
          <div className="w-full px-4 pl-4 lg:pr-16 py-4">
            {/* <div className="border border-slate-500 border-dashed">
              <p>Content</p> */}
            <PromoForm />
            {/* </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
