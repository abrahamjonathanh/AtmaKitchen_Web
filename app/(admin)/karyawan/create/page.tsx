"use client"; // // Copy this for create, update, delete
import { useSWRConfig } from "swr"; // // Copy this for create, update, delete

import React, { useState } from "react";
import KaryawanForm from "../_components/input-form";
import { useTitle } from "@/lib/hooks";
import { createKaryawan } from "@/lib/api/karyawan";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { useRouter } from "next/navigation";

export default function page() {
  useTitle("AtmaKitchen | Karyawan");
  const { mutate } = useSWRConfig(); // // Copy this for create, update, delete
  const router = useRouter(); // // Copy this for create, update, delete
  const [isLoading, setIsLoading] = useState(false); // // Copy this for create, update, delete

  // Create handler
  const onCreateHandler = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await createKaryawan(values);

      if (response?.status === 200 || response?.status === 201) {
        mutate("/karyawan"); // For auto refresh
        router.push("/karyawan"); // For redirect route
      }
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
