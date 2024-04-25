"use client";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { IJarakKirim } from "@/lib/interfaces";
import { getAllJarakKirim } from "@/lib/api/jarak-kirim";
import Loading from "@/components/ui/loading";

// async function getData(): Promise<IJarakKirim[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: 1,
//       nama: "Andrew",
//       alamat: {
//         id: "1",
//         nama: "Rumah Utama",
//         alamat: "Jln. Babarsari No 192",
//         telepon: "08129751278",
//       },
//       status: "Menunggu",
//     },
//     {
//       id: 2,
//       nama: "Brew",
//       alamat: {
//         id: "1",
//         nama: "Rumah Utama",
//         alamat: "Jln. Babarsari No 192",
//         telepon: "08129751278",
//       },
//       status: "Menunggu",
//     },
//     {
//       id: 3,
//       nama: "Crew",
//       alamat: {
//         id: "1",
//         nama: "Rumah Utama",
//         alamat: "Jln. Babarsari No 192",
//         telepon: "08129751278",
//       },
//       status: "Menunggu",
//     },
//     {
//       id: 4,
//       nama: "Andrew",
//       alamat: {
//         id: "2",
//         nama: "Kos",
//         alamat:
//           "Jln. Yos Soedarso No. 221 , Depok, Kab. Sleman, D.I. Yogyakarta",
//         telepon: "01828571827",
//       },
//       status: "Selesai",
//       jarak: "15",
//       harga: "20000",
//     },
//     {
//       id: 5,
//       nama: "Andrew",
//       alamat: {
//         id: "2",
//         nama: "Kos",
//         alamat:
//           "Jln. Yos Soedarso No. 221 , Depok, Kab. Sleman, D.I. Yogyakarta",
//         telepon: "01828571827",
//       },
//       status: "Selesai",
//       jarak: "15",
//       harga: "20000",
//     },
//     {
//       id: 6,
//       nama: "Andrew",
//       alamat: {
//         id: "1",
//         nama: "Rumah Utama",
//         alamat: "Jln. Babarsari No 192",
//         telepon: "08129751278",
//       },
//       status: "Menunggu",
//     },
//     {
//       id: 7,
//       nama: "Brew",
//       alamat: {
//         id: "1",
//         nama: "Rumah Utama",
//         alamat: "Jln. Babarsari No 192",
//         telepon: "08129751278",
//       },
//       status: "Menunggu",
//     },
//     {
//       id: 8,
//       nama: "Crew",
//       alamat: {
//         id: "1",
//         nama: "Rumah Utama",
//         alamat: "Jln. Babarsari No 192",
//         telepon: "08129751278",
//       },
//       status: "Menunggu",
//     },
//     {
//       id: 9,
//       nama: "Andrew",
//       alamat: {
//         id: "2",
//         nama: "Kos",
//         alamat:
//           "Jln. Yos Soedarso No. 221 , Depok, Kab. Sleman, D.I. Yogyakarta",
//         telepon: "01828571827",
//       },
//       status: "Selesai",
//       jarak: "15",
//       harga: "20000",
//     },
//     {
//       id: 10,
//       nama: "Andrew",
//       alamat: {
//         id: "2",
//         nama: "Kos",
//         alamat:
//           "Jln. Yos Soedarso No. 221 , Depok, Kab. Sleman, D.I. Yogyakarta",
//         telepon: "01828571827",
//       },
//       status: "Selesai",
//       jarak: "15",
//       harga: "20000",
//     },
//     {
//       id: 11,
//       nama: "Andrew",
//       alamat: {
//         id: "1",
//         nama: "Rumah Utama",
//         alamat: "Jln. Babarsari No 192",
//         telepon: "08129751278",
//       },
//       status: "Menunggu",
//     },
//     {
//       id: 12,
//       nama: "Brew",
//       alamat: {
//         id: "1",
//         nama: "Rumah Utama",
//         alamat: "Jln. Babarsari No 192",
//         telepon: "08129751278",
//       },
//       status: "Menunggu",
//     },
//     {
//       id: 13,
//       nama: "Crew",
//       alamat: {
//         id: "1",
//         nama: "Rumah Utama",
//         alamat: "Jln. Babarsari No 192",
//         telepon: "08129751278",
//       },
//       status: "Menunggu",
//     },
//     {
//       id: 14,
//       nama: "Andrew",
//       alamat: {
//         id: "2",
//         nama: "Kos",
//         alamat:
//           "Jln. Yos Soedarso No. 221 , Depok, Kab. Sleman, D.I. Yogyakarta",
//         telepon: "01828571827",
//       },
//       status: "Selesai",
//       jarak: "15",
//       harga: "20000",
//     },
//     {
//       id: 15,
//       nama: "Andrew",
//       alamat: {
//         id: "2",
//         nama: "Kos",
//         alamat:
//           "Jln. Yos Soedarso No. 221 , Depok, Kab. Sleman, D.I. Yogyakarta",
//         telepon: "01828571827",
//       },
//       status: "Selesai",
//       jarak: "15",
//       harga: "20000",
//     },
//     // ...
//   ];
// }

export default function page() {
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
