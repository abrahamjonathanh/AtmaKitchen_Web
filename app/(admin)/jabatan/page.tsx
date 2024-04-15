"use client";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getAllJabatan } from "@/lib/api/jabatan";
import Loading from "@/components/ui/loading";

export default function page() {
  const { data, isLoading, isValidating } = getAllJabatan();

  return (
    <DashboardWrapper navTitle="Jabatan">
      <BreadcrumbWithSeparator currentPage="Jabatan" />
      {data && !isLoading ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <Loading />
      )}
    </DashboardWrapper>
  );
}
