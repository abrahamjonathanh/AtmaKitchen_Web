"use client";

import React, { useState } from "react";
import PenitipForm from "../_components/input-form";
import { useTitle } from "@/lib/hooks";
import { createPenitip } from "@/lib/api/penitip";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";

export default function page() {
  useTitle("AtmaKitchen | Penitip");
  const [isLoading, setIsLoading] = useState(false);

  const onCreateHandler = async (values: any) => {
    try {
      setIsLoading(true);
      await createPenitip(values);
    } catch (error: any) {
      console.error("Error creating penitip: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Tambah Penitip">
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Penitip", link: "/penitip" }]}
        currentPage="Tambah"
      />
      <PenitipForm onSubmit={onCreateHandler} isLoading={isLoading} />
    </DashboardWrapper>
  );
}
