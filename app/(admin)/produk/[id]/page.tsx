"use client";

import React, { useState } from "react";
import ProdukForm from "../_components/input-form";
import { useTitle } from "@/lib/hooks";
import { IProduk } from "@/lib/interfaces";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";

export default function page({ params }: { params: { id: number } }) {
  useTitle("AtmaKitchen | Produk");

  const [isLoading, setIsLoading] = useState(false);

  // const onUpdateHandler = async (values: IProduk) => {
  //   try {
  //     setIsLoading(true);
  //     // await updateProdukById(params.id, values);
  //   } catch (error: any) {
  //     console.error("Error updating produk: ", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <DashboardWrapper navTitle="Ubah Produk">
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Produk", link: "/produk" }]}
        currentPage="Ubah"
      />

      <ProdukForm
        isEditable
        data={{
          id_produk: "1",
          nama: "Lapis Legit",
          id_kategori: "1",
          id_penitip: null,
          kapasitas: "20",
          ukuran: "20x20",
          harga_jual: "500000",
          image: [],
        }}
        // onSubmit={onUpdateHandler}
        isLoading={isLoading}
      />
    </DashboardWrapper>
  );
}
