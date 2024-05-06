"use client";
import { useSWRConfig } from "swr";

import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React, { useState } from "react";
import { useTitle } from "@/lib/hooks";
import { createProduk } from "@/lib/api/produk";
import { useRouter } from "next/navigation";
import PemesananBahanBakuForm from "../../_components/input-form";
import {
  getPemesananBahanBakuById,
  updatePemesananBahanBakuById,
} from "@/lib/api/pemesanan-bahan-baku";
import Loading from "@/components/ui/loading";

export default function page({ params }: { params: { id: number } }) {
  useTitle("AtmaKitchen | Produk");
  const { mutate } = useSWRConfig(); // // Copy this for create, update, delete
  const router = useRouter(); // // Copy this for create, update, delete
  const [isLoading, setIsLoading] = useState(false); // // Copy this for create, update, delete
  const { data, isValidating } = getPemesananBahanBakuById(params.id);

  const onEditHandler = async (values: any) => {
    try {
      setIsLoading(true);
      console.log(values);
      const response = await updatePemesananBahanBakuById(params.id, {
        ...values,
        total: values.jumlah * values.harga_beli,
      });

      if (response?.status === 200 || response?.status === 201) {
        mutate("/a/pemesanan-bahan-baku"); // For auto refresh
        router.push("/a/pemesanan-bahan-baku"); // For redirect route
      }
    } catch (error: any) {
      console.error("Error creating karyawan: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(data);
  return (
    <DashboardWrapper navTitle="Ubah Pemesanan Bahan Baku">
      <BreadcrumbWithSeparator
        previousPage={[
          { title: "Pemesanan Bahan Baku", link: "/a/pemesanan-bahan-baku" },
        ]}
        currentPage="Ubah"
      />

      {data && !isValidating ? (
        <PemesananBahanBakuForm
          isEditable
          onSubmit={onEditHandler}
          isLoading={isLoading}
          data={data}
        />
      ) : (
        <Loading />
      )}
    </DashboardWrapper>
  );
}
