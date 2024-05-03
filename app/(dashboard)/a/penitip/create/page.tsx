"use client";

import React, { useState } from "react";
import PenitipForm from "../_components/input-form";
import { useTitle } from "@/lib/hooks";
import { createPenitip } from "@/lib/api/penitip";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";

export default function page() {
  useTitle("AtmaKitchen | Penitip");
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);

  const onCreateHandler = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await createPenitip(values);

      if (response?.status === 200 || response?.status === 201) {
        mutate("/a/penitip");
        router.push("/a/penitip");
      }
    } catch (error: any) {
      console.error("Error creating penitip: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Tambah Penitip">
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Penitip", link: "/a/penitip" }]}
        currentPage="Tambah"
      />
      <PenitipForm onSubmit={onCreateHandler} isLoading={isLoading} />
    </DashboardWrapper>
  );
}
