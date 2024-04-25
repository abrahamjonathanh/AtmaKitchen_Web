"use client";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React from "react";
import JarakKirimForm from "../_components/input-form";
import { getJarakKirimById } from "@/lib/api/jarak-kirim";
import Loading from "@/components/ui/loading";

export default function page({ params }: { params: { id: number } }) {
  const { data, isLoading } = getJarakKirimById(params.id);

  return (
    <DashboardWrapper navTitle="Atur Jarak Kirim">
      <BreadcrumbWithSeparator
        currentPage="Atur"
        previousPage={[{ title: "Jarak Kirim", link: "/jarak-kirim" }]}
      />
      {data && !isLoading ? (
        <JarakKirimForm isEditable data={data} />
      ) : (
        <Loading />
      )}
    </DashboardWrapper>
  );
}
