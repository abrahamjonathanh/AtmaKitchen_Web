"use client";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import ResepList from "./_components/resep-list";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { useTitle } from "@/lib/hooks";

export default function page() {
  useTitle("Atma Kitchen | Resep");

  return (
    <DashboardWrapper navTitle="Resep">
      <BreadcrumbWithSeparator currentPage="Resep" />
      <ResepList />
    </DashboardWrapper>
  );
}
