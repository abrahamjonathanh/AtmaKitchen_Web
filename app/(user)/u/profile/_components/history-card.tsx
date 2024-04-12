import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Truck } from "lucide-react";
import Image from "next/image";
import React from "react";
import Brownies from "@/public/products/Brownies.png";
import { cn, toIndonesiaDate, toRupiah } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

import DetailTransaksiDialog from "./detail-transaksi-dialog";

export default function UserHistoryCard() {
  return (
    <div className="border border-slate-200 p-4 rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <ShoppingBag size={"16"} />
          <p className="font-medium text-body">Belanja</p>
          <p className="text-slate-500 text-body">
            {toIndonesiaDate("2024-04-11T10:22:52Z")}
          </p>
        </span>
        <Badge variant={"alert"} className="flex gap-1 items-center">
          <Truck size={"16"} />
          Menunggu
        </Badge>
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((data, index) => (
          <div className="flex gap-4 w-full items-start" key={index}>
            <Image src={Brownies} alt="Brownies" className="w-16 rounded-lg" />
            <div className="flex justify-between items-start gap-4 w-full">
              <div>
                <p className="font-medium">Brownies 20x20 cm</p>
                <p className="text-slate-500 text-body">
                  1 Barang x {toRupiah(250000)}
                </p>
              </div>
              <p className="font-medium">{toRupiah(250000)}</p>
            </div>
          </div>
        ))}
      </div>
      <Separator className="bg-slate-200" />
      <div className="flex justify-end flex-col items-end">
        <p className="text-slate-500 text-body">Total</p>
        <p className="font-medium">{toRupiah(750000)}</p>
      </div>
      <div className="flex justify-between items-center flex-col-reverse sm:flex-row gap-4">
        <p className="text-body text-slate-500 w-full">
          Anda mendapatkan{" "}
          <span className="font-semibold text-orange-600">112 poin</span> dari
          transaksi ini.
        </p>
        <div className="space-x-4 w-full flex justify-end">
          <DetailTransaksiDialog />
          <Link
            href={""}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Bayar
          </Link>
        </div>
      </div>
    </div>
  );
}
