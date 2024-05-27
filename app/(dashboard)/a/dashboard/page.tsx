"use client";
import React from "react";
import SampleChart from "./_components/chart";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import { getAllPendapatanBulananByYear } from "@/lib/api/pesanan";
import Loading from "@/components/ui/loading";

export default function page() {
  const { data, isLoading } = getAllPendapatanBulananByYear();
  return (
    <DashboardWrapper navTitle="Dashboard">
      <BreadcrumbWithSeparator currentPage="Dashboard" />
      {data && !isLoading ? <SampleChart data={data} /> : <Loading />}
    </DashboardWrapper>
  );
}
