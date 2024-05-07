"use client";
import { useSWRConfig } from "swr";

import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React, { useState } from "react";
import { useTitle } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import HampersForm from "../_components/input-form";
import { createHampers } from "@/lib/api/hampers";

export default function page() {
  useTitle("AtmaKitchen | Hampers");
  const { mutate } = useSWRConfig(); // // Copy this for create, update, delete
  const router = useRouter(); // // Copy this for create, update, delete
  const [isLoading, setIsLoading] = useState(false); // // Copy this for create, update, delete

  const onCreateHandler = async (values: any) => {
    try {
      setIsLoading(true);
      console.log(values);
      const response = await createHampers(values);

      if (response?.status === 200 || response?.status === 201) {
        mutate("/a/hampers"); // For auto refresh
        router.push("/a/hampers"); // For redirect route
      }
    } catch (error: any) {
      console.error("Error creating karyawan: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Tambah Hampers">
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Hampers", link: "/a/hampers" }]}
        currentPage="Tambah"
      />

      <HampersForm onSubmit={onCreateHandler} isLoading={isLoading} />
    </DashboardWrapper>
  );
}
