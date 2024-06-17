"use client";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import Loading from "@/components/ui/loading";
import { getAllProdukByDate } from "@/lib/api/produk";

// Function to format date to yyyy-mm-dd
function getFormattedDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function Page() {
  const formattedDate = getFormattedDate();
  const { data, isLoading, mutate } = getAllProdukByDate(formattedDate);

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
