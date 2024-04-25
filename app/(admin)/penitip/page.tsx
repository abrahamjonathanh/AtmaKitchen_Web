"use client";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { getAllPenitip } from "@/lib/api/penitip";
import Loading from "@/components/ui/loading";

// export const metadata: Metadata = {
//   title: "AtmaKitchen | Penitip",
//   description: "AtmaKitchen Penitip Dashboard",
// };

// async function getData(): Promise<IPenitip[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "1",
//       nama: "Albert",
//       alamat: "Jln. Babarsari No. 81, Yogyakarta",
//       telepon: "08734867348",
//       created_at: "03 April 24",
//     },
//     {
//       id: "2",
//       nama: "Budi Setiawan",
//       alamat: "Jln. Babarsari No. 81, Yogyakarta",
//       telepon: "08734867348",
//       created_at: "01 April 24",
//     },
//     {
//       id: "3",
//       nama: "Cindy Yugoslavia",
//       alamat: "Jln. Babarsari No. 81, Yogyakarta",
//       telepon: "08734867348",
//       created_at: "01 April 24",
//     },
//     {
//       id: "4",
//       nama: "Gerald",
//       alamat: "Jln. Babarsari No. 81, Yogyakarta",
//       telepon: "08734867348",
//       created_at: "01 April 24",
//     },
//     // ...
//   ];
// }

export default function page() {
  const { data, isLoading } = getAllPenitip();

  return (
    // Boiler template for dashboard
    // Please do not change nor delete it unless you know what you are doing
    <DashboardWrapper navTitle="Penitip">
      <BreadcrumbWithSeparator currentPage="Penitip" />
      {data && !isLoading ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <Loading />
      )}
    </DashboardWrapper>
  );
}
