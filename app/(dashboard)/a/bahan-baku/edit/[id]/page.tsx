"use client";
import React, { useState } from "react";
import BahanBakuForm from "../../_components/input-form";
import { useTitle } from "@/lib/hooks";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";
import { getBahanBakuById, updateBahanBakuById } from "@/lib/api/bahan-baku";
import Loading from "@/components/ui/loading";

export default function page({ params }: { params: { id: number } }) {
  useTitle("AtmaKitchen | Ubah Bahan Baku");
  const { mutate } = useSWRConfig(); // // Copy this for create, update, delete
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { data, isValidating } = getBahanBakuById(params.id); // Copy this only for update or delete screen to get data by id

  const onUpdateHandler = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await updateBahanBakuById(params.id, values);

      if (response?.status == 200 || response?.status == 201) {
        mutate("/a/bahan-baku"); // For auto refresh
        router.push("/a/bahan-baku"); // For redirect route
      }
    } catch (error: any) {
      console.error("Error updating bahan baku: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Ubah Bahan Baku">
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Bahan Baku", link: "/a/bahan-baku" }]}
        currentPage="Ubah"
      />

      {data && !isValidating ? (
        <BahanBakuForm
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
