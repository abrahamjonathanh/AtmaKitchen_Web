"use client"; // // Copy this for create, update, delete
import { useSWRConfig } from "swr"; // // Copy this for create, update, delete
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React, { useState } from "react";
import JabatanForm from "../_components/input-form";
import { useTitle } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { createJabatan } from "@/lib/api/jabatan";

export default function page() {
  useTitle("AtmaKitchen | Jabatan");
  const { mutate } = useSWRConfig(); // // Copy this for create, update, delete
  const router = useRouter(); // // Copy this for create, update, delete
  const [isLoading, setIsLoading] = useState(false); // // Copy this for create, update, delete

  // Create handler
  const onCreateHandler = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await createJabatan(values);

      if (response?.status === 200 || response?.status === 201) {
        mutate("/jabatan"); // For auto refresh
        router.push("/jabatan"); // For redirect route
      }
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
