"use client";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React, { useState } from "react";
import ResepForm from "../_components/input-form";
import { useTitle } from "@/lib/hooks";
import { createResep } from "@/lib/api/resep";
import { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";

export default function page() {
  useTitle("AtmaKitchen | Resep");
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useSWRConfig(); // // Copy this for create, update, delete
  const router = useRouter();

  const onCreateHandler = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await createResep(values);

      if (response?.status === 200 || response?.status === 201) {
        mutate("/resep"); // For auto refresh
        router.push("/resep"); // For redirect route
      }
      console.log(values);
    } catch (error: any) {
      console.error("Error creating resep: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Tambah Resep">
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Resep", link: "/resep" }]}
        currentPage="Tambah"
      />

      <ResepForm onSubmit={onCreateHandler} isLoading={isLoading} />
    </DashboardWrapper>
  );
}
