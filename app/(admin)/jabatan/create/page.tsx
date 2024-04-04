"use client";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React, { useState } from "react";
import JabatanForm from "../_components/input-form";
import { useTitle } from "@/lib/hooks";
import { deleteKaryawanById } from "@/lib/api/karyawan";

export default function page() {
  useTitle("AtmaKitchen | Jabatan");
  const [isLoading, setIsLoading] = useState(false);

  const onCreateHandler = async (values: any) => {
    try {
      setIsLoading(true);
      await deleteKaryawanById(1);
      console.log(values);
    } catch (error: any) {
      console.error("Error creating jabatan: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <DashboardWrapper navTitle="Tambah Jabatan">
      <BreadcrumbWithSeparator
        currentPage="Tambah"
        previousPage={[{ title: "Jabatan", link: "/jabatan" }]}
      />
      <JabatanForm onSubmit={onCreateHandler} isLoading={isLoading} />
    </DashboardWrapper>
  );
}
