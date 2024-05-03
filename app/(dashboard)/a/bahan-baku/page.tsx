"use client";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getAllBahanBaku } from "@/lib/api/bahan-baku";
import Loading from "@/components/ui/loading";

export default function page() {
  const { data, isLoading, mutate } = getAllBahanBaku();

  return (
    <DashboardWrapper navTitle="Bahan Baku">
      <BreadcrumbWithSeparator currentPage="Bahan Baku" />

      {data && !isLoading ? (
        <DataTable columns={columns(mutate)} data={data} />
      ) : (
        <Loading />
      )}
    </DashboardWrapper>
  );
}
