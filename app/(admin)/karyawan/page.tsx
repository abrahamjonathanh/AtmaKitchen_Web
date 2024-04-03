import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Metadata } from "next";
import { IKaryawan } from "@/lib/interfaces";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";

export const metadata: Metadata = {
  title: "AtmaKitchen | Karyawan",
  description: "AtmaKitchen Karyawan Dashboard",
};

async function getData(): Promise<IKaryawan[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      nama: "Albert",
      alamat: "Jln. Babarsari No. 81, Yogyakarta",
      telepon: "08734867348",
      gaji_harian: "100000",
      bonus: "",
      id_role: "2",
    },
    {
      id: 2,
      nama: "Budi Setiawan",
      alamat: "Jln. Babarsari No. 81, Yogyakarta",
      telepon: "08734867348",
      gaji_harian: "150000",
      bonus: "150000",
      id_role: "2",
    },
    {
      id: 3,
      nama: "Cindy Yugoslavia",
      alamat: "Jln. Babarsari No. 81, Yogyakarta",
      telepon: "08734867348",
      gaji_harian: "188000",
      bonus: "",
      id_role: "1",
    },
    {
      id: 4,
      nama: "Gerald",
      alamat: "Jln. Babarsari No. 81, Yogyakarta",
      telepon: "08734867348",
      gaji_harian: "188000",
      bonus: "",
      id_role: "3",
    },
    // ...
  ];
}

export default async function page() {
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
