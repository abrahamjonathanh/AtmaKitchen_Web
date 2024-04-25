"use client";
import React from "react";

import { toIndonesiaDate, toRupiah } from "@/lib/utils";
import InfoCard from "./info-card";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Separator } from "@radix-ui/react-separator";
import DetailTransaksiDialog from "@/app/(user)/u/profile/_components/detail-transaksi-dialog";
import { Badge } from "@/components/ui/badge";
import { IRiwayatPesanan } from "@/lib/interfaces";

interface RiwayatListProps {
  data: IRiwayatPesanan[];
}

const RiwayatList: React.FC<RiwayatListProps> = ({ data }) => {
  return (
    <div className="space-y-4">
      {data.map((history_order) => (
        <div key={history_order.id_pesanan} className="relative">
          <InfoCard>
            <div className="absolute right-16">
              <span className="text-sm font-semibold">
                <Badge variant={"success"}>{history_order.status}</Badge>
              </span>
            </div>
            <div className="flex items-center">
              <ShoppingBag size={16} className="mr-1" />
              <p className="text-sm">
                Belanja {toIndonesiaDate(history_order.tgl_order)}
              </p>
            </div>

            <div className="mt-4 space-y-2">
              {history_order.produk &&
                Array.isArray(history_order.produk) &&
                history_order.produk.length > 0 &&
                history_order.produk.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <Image
                        src={item.images}
                        alt={item.nama}
                        className="w-16 rounded-lg object-cover aspect-square"
                      />
                      <div>
                        <p className="font-medium">{item.nama}</p>
                        <p className="text-body text-slate-500">
                          {item.jumlah} Barang x {toRupiah(item.harga)}
                        </p>
                      </div>
                      <div></div>
                    </div>
                  </div>
                ))}
            </div>
            <Separator
              style={{ borderBottom: "1px solid #ccc", margin: "16px" }}
            />

            <div className="grid grid-cols-1 gap-4 justify-items-end">
              <div className="text-right mr-12">
                <p className="text-sm font-semibold">Total Pesanan:</p>
                <span>{toRupiah(history_order.total_pesanan)}</span>
              </div>

              <div className="relative ml-4">
                <div className=" text-black px-4 py-2 rounded-lg transition-colors duration-300">
                  <DetailTransaksiDialog />
                </div>
              </div>
            </div>
          </InfoCard>
        </div>
      ))}
    </div>
  );
};

export default RiwayatList;
