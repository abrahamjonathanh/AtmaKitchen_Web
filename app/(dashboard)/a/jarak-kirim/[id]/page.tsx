"use client";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React, { useState } from "react";
import JarakKirimForm from "../_components/input-form";
import { createJarakKirim, getJarakKirimById } from "@/lib/api/jarak-kirim";
import Loading from "@/components/ui/loading";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

export default function page({ params }: { params: { id: number } }) {
  const ongkir = getJarakKirimById(params.id);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onSubmitHandler = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await createJarakKirim(params.id, values);
      console.log(response);
      if (response?.status === 200 || response?.status === 201) {
        mutate("/a/jarak-kirim");
        router.push("/a/jarak-kirim");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Atur Jarak Kirim">
      <BreadcrumbWithSeparator
        currentPage="Atur"
        previousPage={[{ title: "Jarak Kirim", link: "/a/jarak-kirim" }]}
      />
      {ongkir.data && !ongkir.isLoading && !ongkir.isValidating ? (
        <JarakKirimForm
          isEditable
          data={ongkir.data}
          onSubmit={onSubmitHandler}
          isLoading={isLoading}
        />
      ) : (
        <Loading />
      )}
    </DashboardWrapper>
  );
}
