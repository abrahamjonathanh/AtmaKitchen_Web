"use client";
import { useSWRConfig } from "swr";

import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React, { useState } from "react";
import ProdukForm from "../_components/input-form";
import { useTitle } from "@/lib/hooks";
import { createProduk } from "@/lib/api/produk";
import { useRouter } from "next/navigation";

export default function page() {
  useTitle("AtmaKitchen | Produk");
  const { mutate } = useSWRConfig(); // // Copy this for create, update, delete
  const router = useRouter(); // // Copy this for create, update, delete
  const [isLoading, setIsLoading] = useState(false); // // Copy this for create, update, delete

  const onCreateHandler = async (values: any) => {
    try {
      setIsLoading(true);
      console.log(values);
      const response = await createProduk(values);

      if (response?.status === 200 || response?.status === 201) {
        console.log(response.data);
        mutate("/a/produk"); // For auto refresh
        router.push("/a/produk"); // For redirect route
      }
    } catch (error: any) {
      console.error("Error creating produk: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Tambah Produk">
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Produk", link: "/a/produk" }]}
        currentPage="Tambah"
      />

      <ProdukForm onSubmit={onCreateHandler} isLoading={isLoading} />
    </DashboardWrapper>
  );
}
