"use client";
import { useSWRConfig } from "swr";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React, { useState } from "react";
import { useTitle } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import PemesananBahanBakuForm from "../_components/input-form";
import { createPemesananBahanBaku } from "@/lib/api/pemesanan-bahan-baku";

export default function page() {
  useTitle("AtmaKitchen | Pemesanan Bahan Baku");
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onCreateHandler = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await createPemesananBahanBaku({
        ...values,
        total: values.jumlah * values.harga_beli,
      });
      console.log(values);

      if (response?.status === 200 || response?.status === 201) {
        mutate("/a/pemesanan-bahan-baku"); // For auto refresh
        router.push("/a/pemesanan-bahan-baku"); // For redirect route
      }
    } catch (error: any) {
      console.error("Error creating karyawan: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Tambah Pemesanan Bahan Baku">
      <BreadcrumbWithSeparator
        previousPage={[
          { title: "Pemesanan Bahan Baku", link: "/a/pemesanan-bahan-baku" },
        ]}
        currentPage="Tambah"
      />

      <PemesananBahanBakuForm
        onSubmit={onCreateHandler}
        isLoading={isLoading}
      />
    </DashboardWrapper>
  );
}
