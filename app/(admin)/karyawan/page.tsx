"use client"; // Copy this for create, update, delete
import React from "react";
import { DataTable } from "./data-table";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { columns } from "./columns";
import Loading from "@/components/ui/loading";
import { getAllKaryawan } from "@/lib/api/karyawan";

export default function page() {
  const { data, isLoading } = getAllKaryawan();

  return (
    // Boiler template for dashboard
    // Please do not change nor delete it unless you know what you are doing
    <DashboardWrapper navTitle="Karyawan">
      <BreadcrumbWithSeparator currentPage="Karyawan" />
      {data && !isLoading ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <Loading />
      )}
    </DashboardWrapper>
  );
}
