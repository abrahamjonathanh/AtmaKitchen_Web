"use client";
import { useSWRConfig } from "swr";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React, { useState } from "react";
import JabatanForm from "../_components/input-form";
import { useTitle } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { createJabatan } from "@/lib/api/jabatan";

export default function page() {
  useTitle("AtmaKitchen | Jabatan");
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Create handler
  const onCreateHandler = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await createJabatan(values);

      if (response?.status === 200 || response?.status === 201) {
        mutate("/a/jabatan"); // For auto refresh
        router.push("/a/jabatan"); // For redirect route
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
        previousPage={[{ title: "Jabatan", link: "/a/jabatan" }]}
      />
      <JabatanForm onSubmit={onCreateHandler} isLoading={isLoading} />
    </DashboardWrapper>
  );
}
