"use client";
import React, { useState } from "react";
import BahanBakuForm from "../../_components/input-form";
import { useTitle } from "@/lib/hooks";
import { IBahanBaku } from "@/lib/interfaces";
import { updateBahanBakuById } from "@/lib/api/bahanbaku";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";

export default function page({ params }: { params: { id: number } }) {
  useTitle("AtmaKitchen | Bahan Baku");
  
  const [isLoading, setIsLoading] = useState(false);
  
  const onUpdateHandler = async (values: IBahanBaku) => {
    try {
      setIsLoading(true);
      await updateBahanBakuById(params.id.toString(), values);
     
    } catch (error: any) {
      console.error("Error updating bahan baku: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Ubah Bahan Baku">
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Bahan Baku", link: "/bahanBaku" }]}
        currentPage="Ubah"
      />

      <BahanBakuForm
        isEditable
        data={{
          nama: "Tepung Terigu",
          stok: "100",
          stok_minimum:"10",
          satuan: "kg",
          updated_at: "",
        }}
        // onSubmit={onUpdateHandler}
        isLoading={isLoading}
      />
    </DashboardWrapper>
  );
}
