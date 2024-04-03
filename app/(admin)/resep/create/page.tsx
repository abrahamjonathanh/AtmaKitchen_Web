"use client";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React from "react";
import ResepForm from "../_components/input-form";
import { useTitle } from "@/lib/hooks";

export default function page() {
  useTitle("AtmaKitchen | Resep");

  const onCreateHandler = async (values: any) => {
    try {
      // setIsLoading(true);
      // await createResep(values);
      console.log(values);
    } catch (error: any) {
      console.error("Error creating resep: ", error);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Tambah Resep">
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Resep", link: "/resep" }]}
        currentPage="Tambah"
      />

      <ResepForm onSubmit={onCreateHandler} />
    </DashboardWrapper>
  );
}
