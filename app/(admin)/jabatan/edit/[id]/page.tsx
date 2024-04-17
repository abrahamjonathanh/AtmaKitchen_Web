"use client";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React, { useState } from "react";
import JabatanForm from "../../_components/input-form";
import { deleteKaryawanById } from "@/lib/api/karyawan";
import { IJabatan } from "@/lib/interfaces";
import { useTitle } from "@/lib/hooks";

export default function page() {
  useTitle("AtmaKitchen | Jabatan");
  const [isLoading, setIsLoading] = useState(false);

  const data: IJabatan = {
    id: 1,
    role: "Admin",
  };

  const onUpdateHandler = async (values: any) => {
    try {
      setIsLoading(true);
      await deleteKaryawanById(1);
      console.log(values);
    } catch (error: any) {
      console.error("Error updating jabatan: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Ubah Jabatan">
      <BreadcrumbWithSeparator
        currentPage="Ubah"
        previousPage={[{ title: "Jabatan", link: "/jabatan" }]}
      />
      <JabatanForm
        isEditable
        onSubmit={onUpdateHandler}
        data={data}
        isLoading={isLoading}
      />
    </DashboardWrapper>
  );
}
