"use client";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import {
  createConfirmPembayaranByIdPesanan,
  getPesananById,
} from "@/lib/api/pesanan";
import { useTitle } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSWRConfig } from "swr";
import VerifikasiForm from "../_components/input-form";
import Loading from "@/components/ui/loading";

export default function page({ params }: { params: { id: string } }) {
  useTitle("AtmaKitchen | Ubah Penitip");
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { data, isValidating } = getPesananById(params.id);

  const onUpdateHandler = async (values: any) => {
    try {
      setIsLoading(true);
      console.log(values);
      const response = await createConfirmPembayaranByIdPesanan(
        params.id,
        values,
      );

      if (response?.status == 200 || response?.status == 201) {
        mutate("/a/pesanan");
        router.push("/a/pesanan");
      }
    } catch (error: any) {
      console.error("Error updating pesanan: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle={`Verifikasi Pembayaran `}>
      <BreadcrumbWithSeparator
        previousPage={[{ link: "/a/pesanan", title: "Pesanan" }]}
        currentPage="Verifikasi Pembayaran"
      />
      {data && !isValidating ? (
        <VerifikasiForm
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
