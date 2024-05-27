// components/UserHistoryCard.tsx
"use client";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Truck } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import { cn, toIndonesiaDate, toRupiah } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import DetailTransaksiDialog from "./detail-transaksi-dialog";
import { IDetailPesanan, IPesananv2 } from "@/lib/interfaces";
import { uploadPaymentProof } from "@/lib/api/pesanan";

export default function UserHistoryCard({
  data,
  isAdmin,
}: {
  data: IPesananv2;
  isAdmin: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      try {
        const response = await uploadPaymentProof(
          data.id_pelanggan,
          data.id_pesanan,
          file,
        );
        console.log(response);
        // Handle successful upload (e.g., show a success message or update the UI)
      } catch (error) {
        console.error("File upload failed", error);
        // Handle upload failure (e.g., show an error message)
      }
    }
  };

  const handlePayClick = () => {
    fileInputRef.current?.click();
  };

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
        <Badge variant={"alert"} className="flex items-center gap-1 capitalize">
          <Truck size={"16"} />
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
            parseInt(data.total_setelah_diskon) + data.pengiriman?.harga!,
          )}
        </p>
      </div>
      <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        <p className="text-body w-full text-slate-500">
          Anda mendapatkan{" "}
          <span className="font-semibold text-orange-600">
            {parseInt(data.total_diskon_poin) / 100} poin
          </span>{" "}
          dari transaksi ini.
        </p>
        <div className="flex w-full justify-end space-x-4">
          <DetailTransaksiDialog data={data} />
          {!isAdmin && data.total_dibayarkan && (
            <>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
              />
              <button
                className={cn(buttonVariants({ variant: "default" }))}
                onClick={handlePayClick}
              >
                Bayar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
