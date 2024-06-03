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
  getAllPesananNeedConfirmPayment,
  getAllPesananPaymentVerified,
  // getAllPesananRejected,
} from "@/lib/api/pesanan";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTitle } from "@/lib/hooks";

export default function page() {
  useTitle("AtmaKitchen | Pesanan");
  const allPesanan = getAllPesanan();
  // const { data, isLoading } = getAllPesanan();
  const needConfirm = getAllPesananNeedConfirmPayment();
  const paymentVerified = getAllPesananPaymentVerified();

  const process = getAllPesananInProcess();
  // const rejected = getAllPesananRejected();
  // const paymentVerified = getAllPesananPaymentVerified();

  return (
    <DashboardWrapper navTitle="Pesanan">
      <BreadcrumbWithSeparator currentPage="Pesanan" />
      <Tabs defaultValue="semua">
        <TabsList>
          <TabsTrigger value="semua">Semua</TabsTrigger>
          <TabsTrigger value="confirm">Konfirmasi Pembayaran</TabsTrigger>
          {/* <TabsTrigger value="payment">Menunggu Pembayaran</TabsTrigger> */}
          {/* <TabsTrigger value="delivery">Menunggu Ongkir</TabsTrigger> */}
          <TabsTrigger value="paymentverified">Pembayaran Diterima</TabsTrigger>
          <TabsTrigger value="process">Dalam Proses</TabsTrigger>
          {/* <TabsTrigger value="process">Diproses</TabsTrigger>
          <TabsTrigger value="accepted">Diterima</TabsTrigger>
          <TabsTrigger value="sent">Dikirim</TabsTrigger>
          <TabsTrigger value="rejected">Ditolak</TabsTrigger> */}
        </TabsList>
        <TabsContent value="semua">
          {allPesanan.data && !allPesanan.isLoading ? (
            <DataTable
              columns={columns(allPesanan.mutate)}
              data={allPesanan.data}
            />
          ) : (
            <Loading />
          )}
        </TabsContent>
        <TabsContent value="confirm">
          {needConfirm.data && !needConfirm.isLoading ? (
            <DataTable
              columns={columns(needConfirm.mutate)}
              data={needConfirm.data}
            />
          ) : (
            <Loading />
          )}
        </TabsContent>
        <TabsContent value="paymentverified">
          {paymentVerified.data && !paymentVerified.isLoading ? (
            <DataTable
              columns={columns(paymentVerified.mutate)}
              data={paymentVerified.data}
            />
          ) : paymentVerified.isLoading ? (
            <Loading />
          ) : (
            <p>Data tidak ditemukan</p>
          )}
        </TabsContent>
        <TabsContent value="process">
          {process.data && !process.isLoading ? (
            <DataTable columns={columns(process.mutate)} data={process.data} />
          ) : process.isLoading ? (
            <Loading />
          ) : (
            <p>Data tidak ditemukan</p>
          )}
        </TabsContent>
        {/* <TabsContent value="rejected">
          {rejected.data && !rejected.isLoading ? (
            <DataTable columns={columns} data={rejected.data} />
          ) : (
            <Loading />
          )}
        </TabsContent> */}
        {/* <TabsContent value="process">
          {process.data && !process.isLoading ? (
            <DataTable columns={columns(process)} data={process.data} />
          ) : (
            <Loading />
          )}
        </TabsContent> */}
      </Tabs>
      {/* {data && !isLoading ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <Loading />
      )} */}
    </DashboardWrapper>
  );
}
