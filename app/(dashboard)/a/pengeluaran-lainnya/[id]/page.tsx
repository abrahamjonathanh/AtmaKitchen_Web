"use client";
import { useSWRConfig } from "swr";
import React, { useState } from "react";
import PengeluaranLainnyaForm from "../_components/input-form";
import { useTitle } from "@/lib/hooks";
import { IPengeluaranLainnya } from "@/lib/interfaces";
import {
  getPengeluaranLainnyaById,
  updatePengeluaranLainnyaById,
} from "@/lib/api/pengeluaranlainnya";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { useRouter } from "next/navigation";
import Loading from "@/components/ui/loading";
import { getCurrentUser } from "@/lib/api/auth";

export default function page({ params }: { params: { id: number } }) {
  useTitle("AtmaKitchen | Pengeluaran Lainnya");
  const { mutate } = useSWRConfig(); // // Copy this for create, update, delete
  const router = useRouter(); // // Copy this for create, update, delete
  const [isLoading, setIsLoading] = useState(false);

  const { data, isValidating } = getPengeluaranLainnyaById(params.id); // Copy this only for update or delete screen to get data by id

  const user = getCurrentUser();

  const onUpdateHandler = async (values: any) => {
    // TODO: DATE FORMAT
    try {
      setIsLoading(true);
      const date = new Date(values.tanggal);

      console.log(
        `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate() + 1}`,
      );
      const response = await updatePengeluaranLainnyaById(params.id, {
        ...values,
        id_karyawan: user.data.id_karyawan,
        tanggal: `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate() + 1}`,
      });

      if (response?.status === 200 || response?.status === 201) {
        mutate("/a/pengeluaran-lainnya");
        router.push("/a/pengeluaran-lainnya");
      }
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
          { title: "Pengeluaran Lainnya", link: "/a/pengeluaran-lainnya" },
        ]}
        currentPage="Ubah"
      />

      {data && !isValidating ? (
        <PengeluaranLainnyaForm
          isEditable
          data={data}
          onSubmit={onUpdateHandler}
          isLoading={isLoading}
        />
      ) : (
        <Loading />
      )}
    </DashboardWrapper>
  );
}
