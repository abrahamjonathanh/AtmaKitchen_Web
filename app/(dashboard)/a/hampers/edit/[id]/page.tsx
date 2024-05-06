"use client";
import { useSWRConfig } from "swr";

import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React, { useState } from "react";
import { useTitle } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import HampersForm from "../../_components/input-form";
import { getHampersById, updateHampersById } from "@/lib/api/hampers";
import Loading from "@/components/ui/loading";

export default function page({ params }: { params: { id: number } }) {
  useTitle("AtmaKitchen | Hampers");
  const { mutate } = useSWRConfig(); // // Copy this for create, update, delete
  const router = useRouter(); // // Copy this for create, update, delete
  const [isLoading, setIsLoading] = useState(false); // // Copy this for create, update, delete

  const { data, isValidating } = getHampersById(params.id);
  console.log(data);
  // Update handler
  const onUpdateHandler = async (values: any) => {
    try {
      setIsLoading(true);

      console.log(values);
      const response = await updateHampersById(params.id, {
        id_produk_hampers: data?.id_produk_hampers,
        ...values,
      });

      // Auto refresh data when successfully created or updated.
      if (response?.status == 200 || response?.status == 201) {
        mutate("/a/hampers"); // For auto refresh
        router.push("/a/hampers"); // For redirect route
      }
    } catch (error: any) {
      console.error("Error updating hampers: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Ubah Hampers">
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Hampers", link: "/a/hampers" }]}
        currentPage="Ubah"
      />

      {data && !isValidating ? (
        <HampersForm
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
