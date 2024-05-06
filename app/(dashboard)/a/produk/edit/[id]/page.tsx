"use client";
import { useSWRConfig } from "swr";

import React, { useState } from "react";
import { getProdukById, updateProdukById } from "@/lib/api/produk";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import Loading from "@/components/ui/loading";
import { useRouter } from "next/navigation";
import ProdukForm from "../../_components/input-form";
import { useTitle } from "@/lib/hooks";

export default function page({ params }: { params: { id: number } }) {
  useTitle("AtmaKitchen | Produk");
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { data, isValidating } = getProdukById(params.id);
  console.log(data);
  // Update handler
  const onUpdateHandler = async (values: any) => {
    try {
      setIsLoading(true);

      const response = await updateProdukById(params.id, {
        id_produk: data?.id_produk,
        ...values,
      });

      // Auto refresh data when successfully created or updated.
      if (response?.status == 200 || response?.status == 201) {
        mutate("/a/produk"); // For auto refresh
        router.push("/a/produk"); // For redirect route
      }
    } catch (error: any) {
      console.error("Error updating produk: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Ubah Produk">
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Produk", link: "/a/produk" }]}
        currentPage="Ubah"
      />

      {data && !isValidating ? (
        <ProdukForm
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
