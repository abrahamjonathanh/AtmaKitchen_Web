"use client"; // // Copy this for create, update, delete
import { useSWRConfig } from "swr"; // // Copy this for create, update, delete

import React, { useState } from "react";
import { getKaryawanById, updateKaryawanById } from "@/lib/api/karyawan";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import Loading from "@/components/ui/loading";
import { useRouter } from "next/navigation";
import KaryawanForm from "../_components/input-form";
import { useTitle } from "@/lib/hooks";

export default function page({ params }: { params: { id: number } }) {
  useTitle("AtmaKitchen | Karyawan");
  const { mutate } = useSWRConfig(); // // Copy this for create, update, delete
  const router = useRouter(); // // Copy this for create, update, delete
  const [isLoading, setIsLoading] = useState(false); // // Copy this for create, update, delete

  const { data, isValidating } = getKaryawanById(params.id); // Copy this only for update or delete screen to get data by id

  // Update handler
  const onUpdateHandler = async (values: any) => {
    try {
      setIsLoading(true);

      const response = await updateKaryawanById(params.id, {
        id_akun: data?.id_akun,
        ...values,
        password: null,
      });

      // Auto refresh data when successfully created or updated.
      if (response?.status == 200 || response?.status == 201) {
        mutate("/karyawan"); // For auto refresh
        router.push("/karyawan"); // For redirect route
      }
    } catch (error: any) {
      console.error("Error updating karyawan: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Ubah Karyawan">
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Karyawan", link: "/karyawan" }]}
        currentPage="Ubah"
      />

      {data && !isValidating ? (
        <KaryawanForm
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
