"use client";
import React from "react";
import SampleChart from "./_components/chart";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import { getAllPendapatanBulananByYear } from "@/lib/api/pesanan";
import Loading from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import { ReportMonthlySelling } from "@/app/_components/report";
import { DatePickerWithRange } from "@/components/ui/datepicker-with-range";
import BahanBakuInputForm from "./_components/bahan-baku-form";

export default function page() {
  const { data, isLoading } = getAllPendapatanBulananByYear();
  return (
    <DashboardWrapper navTitle="Dashboard">
      <BreadcrumbWithSeparator currentPage="Dashboard" />
      <div className="flex items-start gap-4">
        <div className="lg:w-3/4">
          {data && !isLoading ? <SampleChart data={data} /> : <Loading />}
        </div>
        <div className="space-y-4 lg:w-1/4">
          {data && !isLoading && <ReportMonthlySelling data={data} />}

          <div>
            <BahanBakuInputForm />
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
}
