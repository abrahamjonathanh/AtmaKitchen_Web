"use client";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { getAllPenitip } from "@/lib/api/penitip";
import Loading from "@/components/ui/loading";
import { useTitle } from "@/lib/hooks";

export default function page() {
  useTitle("AtmaKitchen | Penitip");
  const { data, isLoading, mutate } = getAllPenitip();

  return (
    <DashboardWrapper navTitle="Penitip">
      <BreadcrumbWithSeparator currentPage="Penitip" />
      {data && !isLoading ? (
        <DataTable columns={columns(mutate)} data={data} />
      ) : (
        <Loading />
      )}
    </DashboardWrapper>
  );
}
