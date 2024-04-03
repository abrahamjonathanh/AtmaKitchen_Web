import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React from "react";
import Brownies from "@/public/products/Brownies.png";
import ResepDetail from "../_components/resep-detail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AtmaKitchen | Resep",
  description: "AtmaKitchen Resep Dashboard",
};

export default function page({ params }: { params: { id: number } }) {
  const data = {
    id: params.id,
    title: "Brownies",
    image: Brownies,
    resep: [
      { id: 1, nama: "Coklat batang", jumlah: 250, satuan: "gr" },
      { id: 2, nama: "Butter", jumlah: 100, satuan: "gr" },
      { id: 3, nama: "Minyak goreng", jumlah: 50, satuan: "ml" },
      { id: 4, nama: "Telur", jumlah: 6, satuan: "butir" },
      { id: 5, nama: "Gula pasir", jumlah: 200, satuan: "gr" },
      { id: 6, nama: "Tepung terigu", jumlah: 150, satuan: "gr" },
      { id: 7, nama: "Coklat bubuk", jumlah: 60, satuan: "gr" },
    ],
  };

  return (
    <DashboardWrapper navTitle="Detail Resep">
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Resep", link: "/resep" }]}
        currentPage="Detail"
      />
      <ResepDetail data={data} />
    </DashboardWrapper>
  );
}
