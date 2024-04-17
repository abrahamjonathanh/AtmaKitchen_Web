import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toIndonesiaDate, toRupiah } from "@/lib/utils";
import { BadgePercent, CreditCard, Truck } from "lucide-react";

export default function DetailTransaksiDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"}>Lihat Detail Transaksi</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-md max-h-screen">
        <DialogHeader>
          <DialogTitle>Detail Transaksi</DialogTitle>
          <Separator />
          <DialogDescription>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <p className="text-body text-slate-500">No Nota</p>
                  <p className="text-body text-black font-medium">24.02.101</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-body text-slate-500">Tanggal Pembelian</p>
                  <p className="text-body text-black font-medium">
                    {toIndonesiaDate("2024-04-11T10:22:52Z", {
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
              <Separator />

              <div className="space-y-1.5">
                <p className="text-body text-black font-medium">
                  Info Pengiriman
                </p>
                <div className="flex justify-between">
                  <p className="text-body text-slate-500">Kurir</p>
                  <p className="text-body text-black font-medium">Kurir Toko</p>
                </div>
                <div className="flex justify-between gap-4">
                  <p className="text-body text-slate-500">Alamat</p>
                  <div className="flex flex-col items-end">
                    <p className="text-body text-black font-medium">
                      John Petra
                    </p>
                    <p className="text-body text-black">628112352142</p>
                    <p className="text-body text-black text-right">
                      Jln. Tambak Bayan 219 , Depok, Kab. Sleman, D.I.
                      Yogyakarta
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-1.5">
                <p className="text-body text-black font-medium">
                  Rincian Pembayaran
                </p>
                <div className="flex justify-between">
                  <p className="text-body text-slate-500">Metode Pembayaran</p>
                  <p className="text-body text-black font-medium">
                    Transfer BCA
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-body text-slate-500 flex gap-2 items-center">
                    <CreditCard size={"16"} /> Total Harga
                  </p>
                  <p className="text-body text-black">{toRupiah(1000000)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-body text-slate-500 flex gap-2 items-center">
                    <Truck size={"16"} /> Total Ongkos Kirim
                  </p>
                  <p className="text-body text-black ">{toRupiah(10000)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-body text-slate-500 flex gap-2 items-center">
                    <BadgePercent size={"16"} /> Promo Poin
                  </p>
                  <p className="text-body text-black ">{toRupiah(-12000)}</p>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between">
                <p className="text-black font-medium">Total Belanja</p>
                <p className="text-black font-medium">{toRupiah(998000)}</p>
              </div>
              <p className="text-slate-500 text-body">
                Anda memperoleh{" "}
                <span className="text-orange-600 font-medium">112 poin</span>{" "}
                dari transaksi ini.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
