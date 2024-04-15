"use client"; // // Copy this for create, update, delete
import { useSWRConfig } from "swr"; // // Copy this for create, update, delete
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React, { useState } from "react";
import JabatanForm from "../../_components/input-form";
import { useTitle } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { getJabatanById, updateJabatanById } from "@/lib/api/jabatan";
import Loading from "@/components/ui/loading";

export default function page({ params }: { params: { id: number } }) {
  useTitle("AtmaKitchen | Jabatan");
  const { mutate } = useSWRConfig(); // // Copy this for create, update, delete
  const router = useRouter(); // // Copy this for create, update, delete
  const [isLoading, setIsLoading] = useState(false); // // Copy this for create, update, delete

  const { data, isValidating } = getJabatanById(params.id); // Copy this only for update or delete screen to get data by id

  const onUpdateHandler = async (values: any) => {
    try {
      setIsLoading(true);

      const response = await updateJabatanById(params.id, values);
      // Auto refresh data when successfully created or updated.
      if (response?.status == 200 || response?.status == 201) {
        mutate("/jabatan"); // For auto refresh
        router.push("/jabatan"); // For redirect route
      }
    } catch (error: any) {
      console.error("Error updating jabatan: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Ubah Jabatan">
      <BreadcrumbWithSeparator
        currentPage="Ubah"
        previousPage={[{ title: "Jabatan", link: "/jabatan" }]}
      />
      {data && !isValidating ? (
        <JabatanForm
          isEditable
          onSubmit={onUpdateHandler}
          data={data}
          isLoading={isLoading}
        />
      ) : (
        <Loading />
      )}
    </DashboardWrapper>
  );
}
