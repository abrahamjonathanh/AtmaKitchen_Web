import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { IJabatan } from "@/lib/interfaces";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

async function getData(): Promise<IJabatan[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      role: "Customer",
    },
    {
      id: 2,
      role: "Admin",
    },
    {
      id: 3,
      role: "Manager",
    },
    {
      id: 4,
      role: "Owner",
    },
    // ...
  ];
}

export default async function page() {
  const data = await getData();

  return (
    <DashboardWrapper navTitle="Jabatan">
      <BreadcrumbWithSeparator currentPage="Jabatan" />
      <DataTable data={data} columns={columns} />
    </DashboardWrapper>
  );
}
