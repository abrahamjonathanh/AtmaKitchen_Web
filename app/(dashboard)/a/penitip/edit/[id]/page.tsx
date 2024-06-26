"use client";
import React, { useState } from "react";
import { useTitle } from "@/lib/hooks";
import { IPenitip } from "@/lib/interfaces";
import { getPenitipById, updatePenitipById } from "@/lib/api/penitip";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";
import Loading from "@/components/ui/loading";
import PenitipForm from "../../_components/input-form";

export default function PenitipPage({ params }: { params: { id: string } }) {
  useTitle("AtmaKitchen | Penitip");
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { data, isValidating } = getPenitipById(params.id);

  const onUpdateHandler = async (values: any) => {
    try {
      setIsLoading(true);

      const response = await updatePenitipById(params.id, values);

      if (response?.status == 200 || response?.status == 201) {
        mutate("/a/penitip"); // For auto refresh
        router.push("/a/penitip"); // For redirect route
      }
    } catch (error: any) {
      console.error("Error updating penitip: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Ubah Penitip">
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Penitip", link: "/a/penitip" }]}
        currentPage="Ubah"
      />
      {data && !isValidating ? (
        <PenitipForm
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
