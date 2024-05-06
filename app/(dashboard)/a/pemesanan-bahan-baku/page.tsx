"use client";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import Loading from "@/components/ui/loading";
import { useTitle } from "@/lib/hooks";
import { getAllPemesananBahanBaku } from "@/lib/api/pemesanan-bahan-baku";

export default function page() {
  useTitle("AtmaKitchen | Pemesanan Bahan Baku");
  const { data, isLoading, mutate } = getAllPemesananBahanBaku();

  return (
    <DashboardWrapper navTitle="Pemesanan Bahan Baku">
      <BreadcrumbWithSeparator currentPage="Pemesanan Bahan Baku" />
      {data && !isLoading ? (
        <DataTable columns={columns(mutate)} data={data} />
      ) : (
        <Loading />
      )}
    </DashboardWrapper>
  );
}
