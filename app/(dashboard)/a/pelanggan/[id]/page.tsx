"use client";
import Image from "next/image";
import { useState } from "react";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { Mail, Calendar } from "lucide-react";
import { toIndonesiaDate } from "@/lib/utils";
import { getPelangganById } from "@/lib/api/pelanggan";
import Loading from "@/components/ui/loading";
import { UserListHistory } from "@/app/(user)/u/profile/_components/history";
import { useTitle } from "@/lib/hooks";

export default function PelangganDetailPage({
  params,
}: {
  params: { id: number };
}) {
  useTitle("AtmaKitchen | Pelanggan");
  const { data, isLoading } = getPelangganById(params.id);
  console.log(data);
  return (
    <DashboardWrapper navTitle={`Detail Pelanggan`}>
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Pelanggan", link: "/a/pelanggan" }]}
        currentPage={`Riwayat Pesanan`}
      />

      <div className="space-y-4">
        {data && !isLoading ? (
          <div className="space-y-1 rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-large font-semibold">{data.nama}</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <p>{data.id_akun.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <p>{toIndonesiaDate(data.tgl_lahir)}</p>
              </div>
              <p className="text-body text-slate-500">
                Tanggal bergabung:{" "}
                {toIndonesiaDate(data.created_at, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })}
              </p>
            </div>
          </div>
        ) : (
          <Loading />
        )}

        {data && !isLoading && <UserListHistory data={data.pesanan} isAdmin />}
      </div>
    </DashboardWrapper>
  );
}
