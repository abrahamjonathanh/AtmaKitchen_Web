import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { IPelanggan } from "@/lib/interfaces";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { getAllPelanggan } from "@/lib/api/pelanggan";


async function getData(): Promise<IPelanggan[]> {
  // Dummy data for pengeluaran lainnya
  return [
      {
        id_pelanggan: 1,
        nama: "Sasa",
        tgl_lahir: "1990-01-01",
        status: "1",
        akun:{
          email: "sasa@gmail.com",
        }
      },
      {
        id_pelanggan: 2,
        nama: "Sisi",
        tgl_lahir: "1995-05-15",
        status: "1",
        akun:{
          email: "sisi@gmail.com",
        }
      },
  ];
}

export default async function Page() {
  // Turn on this when you're offline from the database server
  const data = await getData();

  return (
    // Dashboard boilerplate template
    // Please do not change or delete it unless you know what you are doing
    <DashboardWrapper navTitle="Pelanggan">
      <BreadcrumbWithSeparator currentPage="Pelanggan" />
      <DataTable columns={columns} data={data} />
    </DashboardWrapper>
  );
}
