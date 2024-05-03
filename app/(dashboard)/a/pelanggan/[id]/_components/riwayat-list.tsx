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
      {data && data.length > 0 ? (
        data.map((histori_pesanan) => (
          <div key={histori_pesanan.id_pesanan} className="relative">
            <InfoCard>
              <div className="absolute right-16">
                <span className="text-sm font-semibold">
                  <Badge variant={"success"}>Selesai</Badge>
                </span>
              </div>
              <div className="flex items-center">
                <ShoppingBag size={16} className="mr-1" />
                <p className="text-sm">
                  Belanja {toIndonesiaDate(histori_pesanan.tgl_order)}
                </p>
              </div>

              <div className="mt-4 space-y-2">
                {histori_pesanan.detail_pesanan.map((detail) => (
                  <div
                    key={detail.id_detail_pesanan}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div>
                        {detail.produk.thumbnail && (
                          <Image
                            src={detail.produk.thumbnail.image as string}
                            alt={detail.produk.nama}
                            width={64}
                            height={64}
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{detail.produk.nama}</p>
                        <p className="text-body text-slate-500">
                          {detail.jumlah} x {detail.produk.harga_jual}
                        </p>
                      </div>
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
                  <span>{toRupiah(histori_pesanan.total_pesanan)}</span>
                </div>
                <div className="relative ml-4">
                  <div className=" text-black px-4 py-2 rounded-lg transition-colors duration-300">
                    <DetailTransaksiDialog />
                  </div>
                </div>
              </div>
            </InfoCard>
          </div>
        ))
      ) : (
        <p className="text-center">Belum ada riwayat pesanan</p>
      )}
    </div>
  );
};

export default RiwayatList;
