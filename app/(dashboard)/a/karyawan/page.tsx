"use client"; // Copy this for create, update, delete
import React from "react";
import { DataTable } from "./data-table";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { columns } from "./columns";
import Loading from "@/components/ui/loading";
import { getAllKaryawan } from "@/lib/api/karyawan";
import { useTitle } from "@/lib/hooks";

export default function page() {
  useTitle("AtmaKitchen | Karyawan");
  const { data, isLoading, mutate } = getAllKaryawan();

  return (
    <DashboardWrapper navTitle="Karyawan">
      <BreadcrumbWithSeparator currentPage="Karyawan" />
      {data && !isLoading ? (
        <DataTable columns={columns(mutate)} data={data} />
      ) : (
        <Loading />
      )}
    </DashboardWrapper>
  );
}
