"use client";

import React, { useState } from "react";
import PengeluaranLainnyaForm from "../_components/input-form";
import { useTitle } from "@/lib/hooks";
import { updatePengeluaranLainnyaById } from "@/lib/api/pengeluaranlainnya";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";

export default function page({ params }: { params: { id: number } }) {
  useTitle("AtmaKitchen | Pengeluaran Lainnya");

  const [isLoading, setIsLoading] = useState(false);

  const onUpdateHandler = async (values: any) => {
    try {
      setIsLoading(true);
      await updatePengeluaranLainnyaById(params.id, values);
    } catch (error: any) {
      console.error("Error updating pengeluaran lainnya: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Ubah pengeluaran lainnya">
      <BreadcrumbWithSeparator
        previousPage={[
          { title: "Pengeluaran Lainnya", link: "/pengeluaran-lainnya" },
        ]}
        currentPage="Ubah"
      />

      <PengeluaranLainnyaForm
        isEditable
        data={{
          id_pengeluaran_lainnya: params.id,
          nama: "listrik",
          biaya: "1000",
          tanggal: "2024-04-13",
          kategori: "Pengeluaran",
          karyawan: {
            id_karyawan: 1,
            nama: "Linda",
            alamat: "Jl. Anggur",
            telepon: "0812346788",
            gaji_harian: "70000",
            id_role: "1",
            akun: {
              id_akun: "1",
              role: {
                id_role: "1",
                role: "Admin",
              },
            },
          },
        }}
        onSubmit={onUpdateHandler}
        isLoading={isLoading}
      />
    </DashboardWrapper>
  );
}
