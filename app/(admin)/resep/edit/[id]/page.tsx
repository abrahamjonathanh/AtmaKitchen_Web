"use client";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React, { useState } from "react";
import ResepForm from "../../_components/input-form";
import { IResep } from "@/lib/interfaces";
import { useTitle } from "@/lib/hooks";

export default function page() {
  useTitle("AtmaKitchen | Resep");

  const [isLoading, setIsLoading] = useState(false);

  const data: IResep = {
    id: "1",
    nama: "Lapis Legit",
    bahan_baku: [
      { id: "1", nama: "Coklat batang", jumlah: "250", satuan: "gr" },
      { id: "2", nama: "Butter", jumlah: "100", satuan: "gr" },
      { id: "3", nama: "Minyak goreng", jumlah: "50", satuan: "ml" },
      { id: "4", nama: "Telur", jumlah: "6", satuan: "butir" },
      { id: "5", nama: "Gula pasir", jumlah: "200", satuan: "gr" },
      { id: "6", nama: "Tepung terigu", jumlah: "150", satuan: "gr" },
      { id: "7", nama: "Coklat bubuk", jumlah: "60", satuan: "gr" },
    ],
  };

  const onUpdateHandler = async (values: any) => {
    try {
      setIsLoading(true);
      //   await updateResepById(id, values)
      console.log(values);
    } catch (error: any) {
      console.error("Error updating resep: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Ubah Resep">
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Resep", link: "/resep" }]}
        currentPage="Ubah"
      />

      <ResepForm
        isEditable
        isLoading={isLoading}
        data={data}
        onSubmit={onUpdateHandler}
      />
    </DashboardWrapper>
  );
}
