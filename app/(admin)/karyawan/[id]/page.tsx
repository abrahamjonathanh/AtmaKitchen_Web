"use client";
import Footer from "@/components/footer";
import { NavbarDashboard } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React, { useState } from "react";
import KaryawanForm from "../_components/input-form";
import { useTitle } from "@/lib/hooks";
import { toast } from "sonner";
import { IKaryawan } from "@/lib/interfaces";
import { updateKaryawanById } from "@/lib/api/karyawan";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";

export default function page({ params }: { params: { id: number } }) {
  useTitle("AtmaKitchen | Karyawan");

  const [isLoading, setIsLoading] = useState(false);

  const onUpdateHandler = async (values: IKaryawan) => {
    try {
      setIsLoading(true);
      await updateKaryawanById(params.id, values);
    } catch (error: any) {
      console.error("Error updating karyawan: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex">
        <Sidebar />

        <div className="flex flex-col w-full">
          <NavbarDashboard title="Ubah Karyawan" />
          <div className="w-full px-4 pl-4 lg:pr-16 py-4 space-y-4">
            <BreadcrumbWithSeparator
              previousPage={[{ title: "Karyawan", link: "/karyawan" }]}
              currentPage="Ubah"
            />

            <KaryawanForm
              isEditable
              data={{
                nama: "budi",
                alamat: "Jln babarsari",
                gaji_harian: "1000",
                id_role: "2",
                telepon: "1825912",
              }}
              onSubmit={onUpdateHandler}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
