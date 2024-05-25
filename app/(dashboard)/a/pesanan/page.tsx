"use client"; // Copy this for create, update, delete
import React from "react";
import { DataTable } from "./data-table";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { columns } from "./columns";
import Loading from "@/components/ui/loading";
import {
  getAllPesanan,
  getAllPesananInProcess,
  getAllPesananPaymentVerified,
  // getAllPesananRejected,
} from "@/lib/api/pesanan";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTitle } from "@/lib/hooks";

export default function page() {
  useTitle("AtmaKitchen | Pesanan");
  const { data, isLoading } = getAllPesanan();
  const process = getAllPesananInProcess();
  // const rejected = getAllPesananRejected();
  // const paymentVerified = getAllPesananPaymentVerified();

  return (
    // Boiler template for dashboard
    // Please do not change nor delete it unless you know what you are doing
    <DashboardWrapper navTitle="Pesanan">
      <BreadcrumbWithSeparator currentPage="Pesanan" />
      <Tabs defaultValue="confirm">
        <TabsList>
          <TabsTrigger value="confirm">Menunggu Konfirmasi</TabsTrigger>
          <TabsTrigger value="payment">Menunggu Pembayaran</TabsTrigger>
          <TabsTrigger value="delivery">Menunggu Ongkir</TabsTrigger>
          <TabsTrigger value="paymentverified">Pembayaran Diterima</TabsTrigger>
          <TabsTrigger value="process">Diproses</TabsTrigger>
          <TabsTrigger value="accepted">Diterima</TabsTrigger>
          <TabsTrigger value="sent">Dikirim</TabsTrigger>
          <TabsTrigger value="rejected">Ditolak</TabsTrigger>
        </TabsList>
        <TabsContent value="confirm">
          {data && !isLoading ? (
            <DataTable columns={columns} data={data} />
          ) : (
            <Loading />
          )}
        </TabsContent>
        <TabsContent value="paymentverified">
          {/* {paymentVerified.data && !paymentVerified.isLoading ? (
            <DataTable columns={columns} data={paymentVerified.data} />
          ) : (
            <Loading />
          )} */}
          <p>Blm ada</p>
        </TabsContent>
        {/* <TabsContent value="rejected">
          {rejected.data && !rejected.isLoading ? (
            <DataTable columns={columns} data={rejected.data} />
          ) : (
            <Loading />
          )}
        </TabsContent> */}
        <TabsContent value="process">
          {process.data && !process.isLoading ? (
            <DataTable columns={columns} data={process.data} />
          ) : (
            <Loading />
          )}
        </TabsContent>
      </Tabs>
      {/* {data && !isLoading ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <Loading />
      )} */}
    </DashboardWrapper>
  );
}
