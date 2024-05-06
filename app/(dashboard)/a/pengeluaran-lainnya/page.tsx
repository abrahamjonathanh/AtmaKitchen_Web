"use client";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { IPengeluaranLainnya } from "@/lib/interfaces";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { getAllPengeluaranLainnya } from "@/lib/api/pengeluaranlainnya";
import Loading from "@/components/ui/loading";

export default function page() {
  const { data, isLoading, mutate } = getAllPengeluaranLainnya();

  return (
    <DashboardWrapper navTitle="Pengeluaran Lainnya">
      <BreadcrumbWithSeparator currentPage="Pengeluaran Lainnya" />
      {data && !isLoading ? (
        <DataTable columns={columns(mutate)} data={data} />
      ) : (
        <Loading />
      )}
    </DashboardWrapper>
  );
}
