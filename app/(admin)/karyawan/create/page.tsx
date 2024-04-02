"use client";
import Footer from "@/components/footer";
import { NavbarDashboard } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React, { useState } from "react";
import KaryawanForm from "../_components/input-form";
import { useTitle } from "@/lib/hooks";
import { IKaryawan } from "@/lib/interfaces";
import { createKaryawan } from "@/lib/api/karyawan";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";

export default function page() {
  useTitle("AtmaKitchen | Karyawan");
  const [isLoading, setIsLoading] = useState(false);

  const onCreateHandler = async (values: IKaryawan) => {
    try {
      setIsLoading(true);
      await createKaryawan(values);
    } catch (error: any) {
      console.error("Error creating karyawan: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex">
        <Sidebar />

        <div className="flex flex-col w-full">
          <NavbarDashboard title="Tambah Karyawan" />
          <div className="w-full px-4 pl-4 lg:pr-16 py-4 space-y-4">
            <BreadcrumbWithSeparator
              previousPage={[{ title: "Karyawan", link: "/karyawan" }]}
              currentPage="Tambah"
            />
            <KaryawanForm onSubmit={onCreateHandler} isLoading={isLoading} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
