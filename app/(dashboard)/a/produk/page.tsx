"use client";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import Loading from "@/components/ui/loading";
import { getAllProduk } from "@/lib/api/produk";

export default function page() {
  const { data, isLoading, mutate } = getAllProduk();

  return (
    // Boiler template for dashboard
    // Please do not change nor delete it unless you know what you are doing
    <DashboardWrapper navTitle="Produk">
      <BreadcrumbWithSeparator currentPage="Produk" />
      {data && !isLoading ? (
        <DataTable columns={columns(mutate)} data={data} />
      ) : (
        <Loading />
      )}
    </DashboardWrapper>
  );
}
