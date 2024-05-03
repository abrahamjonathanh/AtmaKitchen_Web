"use client";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getAllJabatan } from "@/lib/api/jabatan";
import Loading from "@/components/ui/loading";
import { useTitle } from "@/lib/hooks";

export default function page() {
  useTitle("AtmaKitchen | Jabatan");
  const { data, isLoading, mutate } = getAllJabatan();

  return (
    <DashboardWrapper navTitle="Jabatan">
      <BreadcrumbWithSeparator currentPage="Jabatan" />
      {data && !isLoading ? (
        <DataTable columns={columns(mutate)} data={data} />
      ) : (
        <Loading />
      )}
    </DashboardWrapper>
  );
}
