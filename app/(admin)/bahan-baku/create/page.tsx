"use client";

import React, { useState } from "react";
import BahanBakuForm from "../_components/input-form";
import { useTitle } from "@/lib/hooks";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";

export default function page() {
  useTitle("AtmaKitchen | Karyawan");
  const [isLoading, setIsLoading] = useState(false);

  const onCreateHandler = async (values: any) => {
    try {
      setIsLoading(true);
      // await createBahanBaku(values);
      console.log(values);
    } catch (error: any) {
      console.error("Error creating bahan baku: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Tambah Bahan Baku">
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Bahan Baku", link: "/bahan-baku" }]}
        currentPage="Tambah"
      />
      <BahanBakuForm onSubmit={onCreateHandler} isLoading={isLoading} />
    </DashboardWrapper>
  );
}
