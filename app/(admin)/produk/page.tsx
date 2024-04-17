import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Metadata } from "next";
import { IProduk } from "@/lib/interfaces";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";

export const metadata: Metadata = {
  title: "AtmaKitchen | Produk",
  description: "AtmaKitchen Produk Dashboard",
};

async function getData(): Promise<IProduk[]> {
  // Fetch data from your API here.
  return [
    {
      id_produk: 1,
      nama: "Lapis Legit",
      id_kategori: "1",
      id_penitip: null,
      kapasitas: "20",
      ukuran: "20x20",
      harga: "500000",
      image: [],
    },
    {
      id_produk: 2,
      nama: "Lapis Surabaya",
      id_kategori: "1",
      id_penitip: null,
      kapasitas: "20",
      ukuran: "20x20",
      harga: "400000",
      image: [],
    },
    {
      id_produk: 3,
      nama: "Roti Sobek",
      id_kategori: "3",
      id_penitip: null,
      kapasitas: "20",
      ukuran: "10x10",
      harga: "30000",
      image: [],
    },
    {
      id_produk: 4,
      nama: "Boba Milk Tea",
      id_kategori: "2",
      id_penitip: 1,
      kapasitas: "20",
      ukuran: "500ml",
      harga: "20000",
      image: [],
    },
    // ...
  ];
}

export default async function page() {
  const data = await getData();

  return (
    // Boiler template for dashboard
    // Please do not change nor delete it unless you know what you are doing
    <DashboardWrapper navTitle="Produk">
      <BreadcrumbWithSeparator currentPage="Produk" />
      <DataTable columns={columns} data={data} />
    </DashboardWrapper>
  );
}
