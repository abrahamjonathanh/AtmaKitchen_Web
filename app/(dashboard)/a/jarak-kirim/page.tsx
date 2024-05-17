"use client";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getAllJarakKirim } from "@/lib/api/jarak-kirim";
import Loading from "@/components/ui/loading";
import { useTitle } from "@/lib/hooks";

export default function page() {
  useTitle("AtmaKitchen | Jarak Kirim");
  const { data, isLoading } = getAllJarakKirim();
  return (
    <DashboardWrapper navTitle="Jarak Kirim">
      <BreadcrumbWithSeparator currentPage="Jarak Kirim" />
      {data && !isLoading ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <Loading />
      )}
    </DashboardWrapper>
  );
}
