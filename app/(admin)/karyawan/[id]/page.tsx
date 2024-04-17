"use client";

import React, { useState } from "react";
import KaryawanForm from "../_components/input-form";
import { useTitle } from "@/lib/hooks";
import { IKaryawan } from "@/lib/interfaces";
import { updateKaryawanById } from "@/lib/api/karyawan";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";

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
    <DashboardWrapper navTitle="Ubah Karyawan">
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
    </DashboardWrapper>
  );
}
