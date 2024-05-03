"use client";
import { useSWRConfig } from "swr";

import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React, { useState } from "react";
import { useTitle } from "@/lib/hooks";
import { createProduk } from "@/lib/api/produk";
import { useRouter } from "next/navigation";
import PemesananBahanBakuForm from "../_components/input-form";

export default function page() {
  useTitle("AtmaKitchen | Pemesanan Bahan Baku");
  const { mutate } = useSWRConfig(); // // Copy this for create, update, delete
  const router = useRouter(); // // Copy this for create, update, delete
  const [isLoading, setIsLoading] = useState(false); // // Copy this for create, update, delete

  const onCreateHandler = async (values: any) => {
    try {
      setIsLoading(true);
      // const response = await createProduk(values);
      console.log(values);

      // if (response?.status === 200 || response?.status === 201) {
      //   mutate("/produk"); // For auto refresh
      //   router.push("/produk"); // For redirect route
      // }
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
          { title: "Pemesanan Bahan Baku", link: "/pemesanan-bahan-baku" },
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
