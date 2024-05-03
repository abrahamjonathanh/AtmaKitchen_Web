"use client";
import { useSWRConfig } from "swr";

import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React, { useState } from "react";
import { useTitle } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import HampersForm from "../_components/input-form";

export default function page() {
  useTitle("AtmaKitchen | Produk");
  const { mutate } = useSWRConfig(); // // Copy this for create, update, delete
  const router = useRouter(); // // Copy this for create, update, delete
  const [isLoading, setIsLoading] = useState(false); // // Copy this for create, update, delete

  const onCreateHandler = async (values: any) => {
    try {
      setIsLoading(true);
      //   const response = await createProduk(values);
      console.log(values);

      //   if (response?.status === 200 || response?.status === 201) {
      //     mutate("/hampers"); // For auto refresh
      //     router.push("/hampers"); // For redirect route
      //   }
    } catch (error: any) {
      console.error("Error creating karyawan: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Tambah Hampers">
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Hampers", link: "/hampers" }]}
        currentPage="Tambah"
      />

      <HampersForm onSubmit={onCreateHandler} isLoading={isLoading} />
    </DashboardWrapper>
  );
}
