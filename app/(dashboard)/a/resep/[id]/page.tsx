"use client";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React from "react";
import ResepDetail from "../_components/resep-detail";
import { getResepById } from "@/lib/api/resep";
import Loading from "@/components/ui/loading";
import { useTitle } from "@/lib/hooks";

export default function page({ params }: { params: { id: number } }) {
  useTitle("AtmaKitchen | Resep");
  const { data, isLoading } = getResepById(params.id);
  console.log(data);

  return (
    <DashboardWrapper navTitle="Detail Resep">
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Resep", link: "/a/resep" }]}
        currentPage="Detail"
      />
      {data && !isLoading ? <ResepDetail data={data} /> : <Loading />}
    </DashboardWrapper>
  );
}
