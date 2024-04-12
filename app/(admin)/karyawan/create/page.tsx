"use client";

import React, { useState } from "react";
import KaryawanForm from "../_components/input-form";
import { useTitle } from "@/lib/hooks";
import { IKaryawan } from "@/lib/interfaces";
import { createKaryawan } from "@/lib/api/karyawan";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";

export default function page() {
  useTitle("AtmaKitchen | Karyawan");
  const [isLoading, setIsLoading] = useState(false);

  const onCreateHandler = async (values: any) => {
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
    <DashboardWrapper navTitle="Tambah Karyawan">
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Karyawan", link: "/karyawan" }]}
        currentPage="Tambah"
      />
      <KaryawanForm onSubmit={onCreateHandler} isLoading={isLoading} />
    </DashboardWrapper>
  );
}
