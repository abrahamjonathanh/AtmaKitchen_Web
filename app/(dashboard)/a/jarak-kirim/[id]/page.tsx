"use client";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React, { useState } from "react";
import JarakKirimForm from "../_components/input-form";
import { createJarakKirim, getJarakKirimById } from "@/lib/api/jarak-kirim";
import Loading from "@/components/ui/loading";

export default function page({ params }: { params: { id: number } }) {
  const ongkir = getJarakKirimById(params.id);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = (values: any) => {
    console.log(values);
    try {
      setIsLoading(true);
      // const response = createJarakKirim(ongkir.data.)
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
