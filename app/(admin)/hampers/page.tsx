"use client";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import Loading from "@/components/ui/loading";
import { getAllHampers } from "@/lib/api/hampers";

export default function page() {
  const { data, isLoading } = getAllHampers();

  return (
    // Boiler template for dashboard
    // Please do not change nor delete it unless you know what you are doing
    <DashboardWrapper navTitle="Hampers">
      <BreadcrumbWithSeparator currentPage="Hampers" />
      {data && !isLoading ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <Loading />
      )}
    </DashboardWrapper>
  );
}
