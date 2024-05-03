"use client";

import React, { useState } from "react";
import BahanBakuForm from "../_components/input-form";
import { useTitle } from "@/lib/hooks";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";
import { createBahanBaku } from "@/lib/api/bahan-baku";

export default function page() {
  useTitle("AtmaKitchen | Bahan Baku");
  const { mutate } = useSWRConfig(); // // Copy this for create, update, delete
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onCreateHandler = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await createBahanBaku(values);

      if (response?.status === 200 || response?.status === 201) {
        mutate("/a/bahan-baku");
        router.push("/a/bahan-baku");
      }
    } catch (error: any) {
      console.error("Error creating bahan baku: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Tambah Bahan Baku">
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Bahan Baku", link: "/a/bahan-baku" }]}
        currentPage="Tambah"
      />
      <BahanBakuForm onSubmit={onCreateHandler} isLoading={isLoading} />
    </DashboardWrapper>
  );
}
