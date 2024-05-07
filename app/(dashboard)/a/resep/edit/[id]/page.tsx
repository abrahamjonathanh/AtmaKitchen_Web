"use client";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React, { useState } from "react";
import ResepForm from "../../_components/input-form";
import { IResep } from "@/lib/interfaces";
import { useTitle } from "@/lib/hooks";
import { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";
import { getResepById, updateResepById } from "@/lib/api/resep";
import Loading from "@/components/ui/loading";

export default function page({ params }: { params: { id: number } }) {
  useTitle("AtmaKitchen | Resep");

  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useSWRConfig(); // // Copy this for create, update, delete
  const router = useRouter();

  const { data, isValidating } = getResepById(params.id);
  console.log(data);
  const onUpdateHandler = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await updateResepById(values, params.id);

      if (response?.status === 200 || response?.status === 201) {
        mutate("/a/resep"); // For auto refresh
        router.push("/a/resep"); // For redirect route
      }
      console.log(values);
    } catch (error: any) {
      console.error("Error updating resep: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Ubah Resep">
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Resep", link: "/a/resep" }]}
        currentPage="Ubah"
      />

      {data ? (
        <ResepForm
          isEditable
          isLoading={isLoading}
          data={data}
          onSubmit={onUpdateHandler}
        />
      ) : (
        <Loading />
      )}
    </DashboardWrapper>
  );
}
