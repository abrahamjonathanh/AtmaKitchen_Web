"use client";
import Image from "next/image";
import { useState } from "react";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { Mail, Calendar, ShoppingBag } from "lucide-react";
import { toIndonesiaDate, toRupiah } from "@/lib/utils";
import { getPelangganById } from "@/lib/api/pelanggan";
import Loading from "@/components/ui/loading";
import { IRiwayatPesanan } from "@/lib/interfaces";
import InfoCard from "./_components/info-card";
import RiwayatList from "./_components/riwayat-list";

export default function PelangganDetailPage({
  params,
}: {
  params: { id: number };
}) {
  const [selectedPesanan, setSelectedPesanan] =
    useState<IRiwayatPesanan | null>(null);

  // const showDetailPesanan = (pesanan: IRiwayatPesanan) => {
  //   setSelectedPesanan(pesanan);
  // };

  const handleCloseDialog = () => {
    setSelectedPesanan(null);
  };

  const { data, isLoading } = getPelangganById(params.id);
  console.log(data);

  return (
    <DashboardWrapper navTitle={`Detail Pelanggan`}>
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Pelanggan", link: "/pelanggan" }]}
        currentPage={`Riwayat Pesanan`}
      />

      <div className="space-y-8">
        {data && !isLoading ? (
          <InfoCard>
            <p className="text-large font-semibold">{data.pelanggan.nama}</p>
            <div className="space-y-1">
              <div className="flex items-start xl:items-center">
                <Mail size={16} className="mr-2" />
                <p>{data.pelanggan.id_akun.email}</p>
              </div>
              <div className="flex items-start xl:items-center">
                <Calendar size={16} className="mr-2" />
                <p>{toIndonesiaDate(data.pelanggan.tgl_lahir)}</p>
              </div>
              <p className="text-body text-slate-500">
                Tanggal bergabung: {toIndonesiaDate(data.pelanggan.created_at)}
              </p>
            </div>
          </InfoCard>
        ) : (
          <Loading />
        )}

        {data && !isLoading && <RiwayatList data={data.histori_pesanan} />}
      </div>
    </DashboardWrapper>
  );
}
