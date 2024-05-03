"use client";
import { useSWRConfig } from "swr";
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
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { data, isValidating } = getJabatanById(params.id);

  const onUpdateHandler = async (values: any) => {
    try {
      setIsLoading(true);

      const response = await updateJabatanById(params.id, values);

      // Auto refresh data when successfully created or updated.
      if (response?.status == 200 || response?.status == 201) {
        mutate("/a/jabatan"); // For auto refresh
        router.push("/a/jabatan"); // For redirect route
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
        previousPage={[{ title: "Jabatan", link: "/a/jabatan" }]}
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
