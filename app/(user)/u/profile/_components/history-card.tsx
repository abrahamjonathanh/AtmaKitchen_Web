"use client";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import React, { useReducer } from "react";
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
import { updateStatusPesanan } from "@/lib/api/pesanan";
import { ConfirmDialogCustomChildren } from "@/components/confirmDialog";
import NotAvailable from "@/public/products/Not Available.png";

export default function UserHistoryCard({
  data,
  isAdmin,
  onRefresh,
}: {
  data: IPesananv2;
  isAdmin: boolean;
  onRefresh?: () => void;
}) {
  const [isDialogOpen, setIsDialogOpen] = useReducer(
    (state: any, action: any) => {
      switch (action.type) {
        case "OPEN":
          return {
            isOpen: true,
            value: action.value,
            isLoading: action.isLoading,
          };
        case "CLOSE":
          return { isOpen: false, value: undefined, isLoading: false };
        default:
          return state;
      }
    },
    { isOpen: false, value: undefined, isLoading: false },
  );

  const onAcceptPesanan = async () => {
    try {
      setIsDialogOpen({ type: "OPEN", isLoading: true });
      const response = await updateStatusPesanan({
        data: { status: "Diterima" },
        id_pesanan: data.id_pesanan,
      });

      if (response?.status == 200 || response?.status == 201) {
        onRefresh!();
      }
    } catch (error) {
    } finally {
      setIsDialogOpen({ type: "CLOSE" });
    }
  };

  return (
    <div className="space-y-4 rounded-lg border border-slate-200 p-4">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <ShoppingBag size={"16"} />
          <p className="text-body font-medium">Belanja</p>
          <p className="text-body text-slate-500">
            {toIndonesiaDate(data.tgl_order!)}
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
          <Link
            href={`${item.id_produk ? "/u/produk" : "/u/hampers"}/${item.id_produk ?? item.id_produk_hampers}`}
            className="flex w-full items-start gap-4"
            key={index}
          >
            <Image
              src={
                item.produk?.thumbnail?.image ||
                item.hampers?.image ||
                NotAvailable
              }
              alt={item.produk?.nama || item.hampers?.nama || "Produk"}
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
          </Link>
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
          {data.points?.is_double_poin && (
            <span className="text-green-600">
              <span className="font-medium ">Selamat Ulang Tahun! </span>
              <span>Poin Anda digandakan. </span>
            </span>
          )}
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
              <Button
                type="button"
                onClick={() =>
                  setIsDialogOpen({ type: "OPEN", isLoading: false })
                }
              >
                Terima Pesanan
              </Button>
            )}
          <ConfirmDialogCustomChildren
            isLoading={isDialogOpen.isLoading}
            isOpen={isDialogOpen.isOpen}
            setIsOpen={(isOpen) =>
              setIsDialogOpen({ type: isOpen ? "OPEN" : "CLOSE" })
            }
            title="Terima pesanan"
            description="Apakah pesanan Anda sudah diterima dengan baik?"
            onSubmit={onAcceptPesanan}
          >
            <p>HEY</p>
          </ConfirmDialogCustomChildren>
        </div>
      </div>
    </div>
  );
}
