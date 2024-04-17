import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import ResepList from "./_components/resep-list";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AtmaKitchen | Resep",
  description: "AtmaKitchen Resep Dashboard",
};

export default function page() {
  return (
    <DashboardWrapper navTitle="Resep">
      <BreadcrumbWithSeparator currentPage="Resep" />
      <ResepList />
    </DashboardWrapper>
  );
}
