"use client";
import { useSWRConfig } from "swr";
import React, { useState } from "react";
import PengeluaranLainnyaForm from "../_components/input-form";
import { useTitle } from "@/lib/hooks";
import { createPengeluaranLainnya } from "@/lib/api/pengeluaranlainnya";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/api/auth";

export default function page() {
  useTitle("AtmaKitchen | Pengeluaran Lainnya");
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { data } = getCurrentUser();

  const onCreateHandler = async (values: any) => {
    // TODO: DATE FORMAT
    try {
      setIsLoading(true);
      const date = new Date(values.tanggal);

      const response = await createPengeluaranLainnya({
        ...values,
        tanggal: `${date.getUTCFullYear()}/${date.getUTCMonth()}/${date.getUTCDate() + 1}`,
        id_karyawan: data.id_karyawan,
      });

      if (response?.status === 200 || response?.status === 201) {
        mutate("/a/pengeluaran-lainnya");
        router.push("/a/pengeluaran-lainnya");
      }
    } catch (error: any) {
      console.error("Error creating pengeluaran lainnya: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Tambah Pengeluaran Lainnya">
      <BreadcrumbWithSeparator
        previousPage={[
          { title: "Pengeluaran Lainnya", link: "/a/pengeluaran-lainnya" },
        ]}
        currentPage="Tambah"
      />
      <PengeluaranLainnyaForm
        onSubmit={onCreateHandler}
        isLoading={isLoading}
      />
    </DashboardWrapper>
  );
}
