"use client";
import { useSWRConfig } from "swr";
import React, { useState } from "react";
import PengeluaranLainnyaForm from "../_components/input-form";
import { useTitle } from "@/lib/hooks";
import { createPengeluaranLainnya } from "@/lib/api/pengeluaranlainnya";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { useRouter } from "next/navigation";

export default function page() {
  useTitle("AtmaKitchen | Pengeluaran Lainnya");
  const { mutate } = useSWRConfig(); // // Copy this for create, update, delete
  const router = useRouter(); // // Copy this for create, update, delete
  const [isLoading, setIsLoading] = useState(false);

  const onCreateHandler = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await createPengeluaranLainnya(values);
    } catch (error: any) {
      console.error("Error creating pengeluaran lainnya: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Tambah Pengeluaran Lainnya">
      <BreadcrumbWithSeparator
        previousPage={[
          { title: "Pengeluaran Lainnya", link: "/pengeluaran-lainnya" },
        ]}
        currentPage="Tambah"
      />
      <PengeluaranLainnyaForm
        onSubmit={onCreateHandler}
        isLoading={isLoading}
      />
    </DashboardWrapper>
  );
}
