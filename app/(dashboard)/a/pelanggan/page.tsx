"use client";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { getAllPelanggan } from "@/lib/api/pelanggan";
import Loading from "@/components/ui/loading";
import { useTitle } from "@/lib/hooks";

export default function Page() {
  useTitle("AtmaKitchen | Pelanggan");
  const { data, isLoading, mutate } = getAllPelanggan();

  return (
    <DashboardWrapper navTitle="Pelanggan">
      <BreadcrumbWithSeparator currentPage="Pelanggan" />
      {data && !isLoading ? (
        <DataTable columns={columns(mutate)} data={data} />
      ) : (
        <Loading />
      )}
    </DashboardWrapper>
  );
}
