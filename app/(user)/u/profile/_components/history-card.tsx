// components/UserHistoryCard.tsx
"use client";
import { Badge } from "@/components/ui/badge";
import {
  Box,
  Check,
  CheckCheck,
  Clock,
  CreditCard,
  Hand,
  ShoppingBag,
  Truck,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import { cn, toIndonesiaDate, toRupiah } from "@/lib/utils";
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const statusBadges: {
    code: string;
    variant:
      | "lime"
      | "emerald"
      | "sky"
      | "violet"
      | "fuchsia"
      | "rose"
      | "gray"
      | "success"
      | "alert"
      | "failed";
    icon: React.ReactNode;
  }[] = [
    { code: "Selesai", variant: "success", icon: <Check size={"16"} /> },
    { code: "Menunggu ongkir", variant: "alert", icon: <Clock size={"16"} /> },
    { code: "Sudah dibayar", variant: "sky", icon: <CreditCard size={"16"} /> },
    {
      code: "Pembayaran Valid",
      variant: "sky",
      icon: <CheckCheck size={"16"} />,
    },
    { code: "Ditolak", variant: "failed", icon: <X size={"16"} /> },
    { code: "Diterima", variant: "sky", icon: <Check size={"16"} /> },
    { code: "Diproses", variant: "sky", icon: <Box size={"16"} /> },
    { code: "Siap dipickup", variant: "sky", icon: <Hand size={"16"} /> },
    {
      code: "Sedang dikirim kurir",
      variant: "sky",
      icon: <Truck size={"16"} />,
    },
    { code: "Sudah dipickup", variant: "sky", icon: <Truck size={"16"} /> },
  ];
  const statusVariant = (status: string) =>
    statusBadges.find((badge) => badge.code == status);

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
          variant={statusVariant(data.status_pesanan_latest?.status!)?.variant}
          className="flex items-center gap-1 capitalize"
        >
          {statusVariant(data.status_pesanan_latest?.status!)?.icon}
          {data.status_pesanan_latest?.status ?? "Unknown"}
        </Badge>
      </div>
      <div className="space-y-4">
        {data.detail_pesanan?.map((item: IDetailPesanan, index: number) => (
          <div className="flex w-full items-start gap-4" key={index}>
            <Image
              src={item.produk?.thumbnail?.image!}
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
        {/* <p className="text-body w-full text-slate-500">
          Anda mendapatkan{" "}
          <span className="font-semibold text-orange-600">
            {parseInt(data.total_diskon_poin) / 100} poin
          </span>{" "}
          dari transaksi ini.
        </p> */}
        <div className="flex w-full justify-end space-x-4">
          <DetailTransaksiDialog data={data} />
          {!isAdmin &&
            !data.bukti_pembayaran &&
            data.status_pesanan_latest?.status != "Selesai" && (
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
