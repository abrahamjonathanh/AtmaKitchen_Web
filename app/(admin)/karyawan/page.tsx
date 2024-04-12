import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { IKaryawan } from "@/lib/interfaces";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { getAllKaryawan } from "@/lib/api/karyawan";

async function getData(): Promise<IKaryawan[]> {
  // Fetch data from your API here.
  return [
    {
      id_karyawan: 1,
      nama: "Agus",
      alamat: "Jln. Babarsari",
      gaji_harian: "10000",
      telepon: "012912598",
      akun: { role: { id_role: "1", role: "Admin" } },
    },
  ];
}

export default async function page() {
  // Turn on this when you're running local database server
  // const response = await getAllKaryawan();
  // const data = response?.data.data;

  // Turn on this when you're offline from database server
  const data = await getData();

  return (
    // Boiler template for dashboard
    // Please do not change nor delete it unless you know what you are doing
    <DashboardWrapper navTitle="Karyawan">
      <BreadcrumbWithSeparator currentPage="Karyawan" />
      <DataTable columns={columns} data={data} />
    </DashboardWrapper>
  );
}
