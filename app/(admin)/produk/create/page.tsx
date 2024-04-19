"use client";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import React from "react";
import ProdukForm from "../_components/input-form";
import { useTitle } from "@/lib/hooks";

export default function page() {
  useTitle("AtmaKitchen | Produk");

  const onCreateHandler = async (values: any) => {
    try {
      // setIsLoading(true);
      // await createResep(values);
      console.log("te");
      console.log(values);
    } catch (error: any) {
      console.error("Error creating produk: ", error);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <DashboardWrapper navTitle="Tambah Produk">
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Produk", link: "/produk" }]}
        currentPage="Tambah"
      />

      <ProdukForm onSubmit={onCreateHandler} />
    </DashboardWrapper>
  );
}
