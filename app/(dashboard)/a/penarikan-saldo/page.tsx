"use client";
import React from "react";
import { IPengeluaranLainnya } from "@/lib/interfaces";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { getAllPenarikanSaldo } from "@/lib/api/penarikansaldo";
import Loading from "@/components/ui/loading";
import { columns } from "./column";
import { DataTable } from "./data-table";

export default function page() {
  const { data, isLoading, mutate } = getAllPenarikanSaldo();

  return (
    <DashboardWrapper navTitle="Penarikan Saldo">
      <BreadcrumbWithSeparator currentPage="Penarikan Saldo" />
      {data && !isLoading ? (
        <DataTable columns={columns(mutate)} data={data} />
      ) : (
        <Loading />
      )}
    </DashboardWrapper>
  );
}
