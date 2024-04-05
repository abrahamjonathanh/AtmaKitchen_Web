"use client";
import React, { useState } from "react";
import PenitipForm from "../../_components/input-form";
import { useTitle } from "@/lib/hooks";
import { IPenitip } from "@/lib/interfaces";
import { updatePenitipById } from "@/lib/api/penitip";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";

export default function PenitipPage({ params }: { params: { id: number } }) {
  useTitle("AtmaKitchen | Ubah Penitip");

  const [isLoading, setIsLoading] = useState(false);

  const onUpdateHandler = async (values: IPenitip) => {
    try {
      setIsLoading(true);
      await updatePenitipById(params.id.toString(), values);
     
    } catch (error: any) {
      console.error("Error updating penitip: ", error);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Ubah Penitip">
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Penitip", link: "/penitip" }]}
        currentPage="Ubah"
      />

      <PenitipForm
        isEditable
        data={{
          nama: "budi",
          alamat: "Jln babarsari",
          telepon: "1825912",
          created_at: "",
        }}
        // onSubmit={onUpdateHandler}
        isLoading={isLoading}
      />
    </DashboardWrapper>
  );
}
