// components/UserHistoryCard.tsx
"use client";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  cn,
  statusPesananBadge,
  toIndonesiaDate,
  toRupiah,
  toThousand,
} from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import DetailTransaksiDialog from "./detail-transaksi-dialog";
import { IDetailPesanan, IPesananv2 } from "@/lib/interfaces";

export default function UserHistoryCard({
  data,
  isAdmin,
}: {
  data: IPesananv2;
  isAdmin: boolean;
}) {
  return (
    <div className="space-y-4 rounded-lg border border-slate-200 p-4">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <ShoppingBag size={"16"} />
          <p className="text-body font-medium">Belanja</p>
          <p className="text-body text-slate-500">
            {toIndonesiaDate(data.created_at!)}
          </p>
          <p className="text-body font-medium">#{data.id_pesanan}</p>
        </span>
        <Badge
          variant={
            statusPesananBadge(data.status_pesanan_latest?.status!)?.variant
          }
          className="flex items-center gap-1 capitalize"
        >
          {/* {statusPesananBadge(data.status_pesanan_latest?.status!)?.icon} */}
          {data.status_pesanan_latest?.status ?? "Unknown"}
        </Badge>
      </div>
      <div className="space-y-4">
        {data.detail_pesanan?.map((item: IDetailPesanan, index: number) => (
          <div className="flex w-full items-start gap-4" key={index}>
            <Image
              src={item.produk?.thumbnail?.image || item.hampers?.image || ""}
              alt={item.produk?.nama!}
              className="h-16 w-16 rounded-lg object-cover"
              width={"72"}
              height={"72"}
              priority
            />
            <div className="flex w-full items-start justify-between gap-4">
              <div>
                <p className="font-medium">
                  {item.nama_produk} {item.produk?.ukuran}
                </p>
                <p className="text-body text-slate-500">
                  {item.jumlah} Barang x {toRupiah(parseInt(item.harga))}
                </p>
              </div>
              <p className="font-medium">
                {toRupiah(parseInt(item.jumlah) * parseInt(item.harga))}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Separator className="bg-slate-200" />
      <div className="flex flex-col items-end justify-end">
        <p className="text-body text-slate-500">Total</p>
        <p className="font-medium">
          {toRupiah(
            parseInt(data.total_setelah_diskon) +
              (data.pengiriman?.harga! ? data.pengiriman?.harga! : 0),
          )}
        </p>
      </div>
      <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        <p className="text-body w-full text-slate-500">
          Anda mendapatkan{" "}
          <span className="font-semibold text-orange-600">
            {toThousand(data.points?.poin ?? 0)} poin
          </span>{" "}
          dari transaksi ini.
        </p>
        <div className="flex w-full justify-end space-x-4">
          <DetailTransaksiDialog data={data} />
          {!isAdmin &&
            !data.bukti_pembayaran &&
            data.status_pesanan_latest?.status == "Menunggu pembayaran" && (
              <Link
                href={`/u/cart/payment/${data.id_pesanan}`}
                className={cn(buttonVariants({ variant: "default" }))}
              >
                Bayar
              </Link>
            )}
          {!isAdmin &&
            data.total_dibayarkan &&
            !data.accepted_at &&
            (data.status_pesanan_latest?.status == "Sedang dikirim kurir" ||
              data.status_pesanan_latest?.status == "Sudah Dipickup") && (
              <Button>Terima Pesanan</Button>
            )}
        </div>
      </div>
    </div>
  );
}
