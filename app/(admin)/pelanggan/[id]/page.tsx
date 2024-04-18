"use client";
import Image from "next/image";
import { useState } from "react";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import DashboardWrapper from "@/components/dashboard-wrapper";
import { Phone, MapPin, ShoppingBag } from "lucide-react";
import { toIndonesiaDate, toRupiah } from "@/lib/utils";
import { IRiwayatPesanan, IPelanggan } from "@/lib/interfaces";
import InfoCard from "./_components/info-card";
import LapisLegitImage from "@/public/products/Lapis legit.png";
import LapisSurabayaImage from "@/public/products/Lapis surabaya.png";
import BrowniesImage from "@/public/products/Brownies.png";
import MandarinImage from "@/public/products/Mandarin.png";
import DetailTransaksiDialog from "@/app/(user)/u/profile/_components/detail-transaksi-dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@radix-ui/react-separator";

export default function PelangganDetailPage() {
  const [pelanggan] = useState<IPelanggan>({
    id_pelanggan: 1,
    nama: "Sasa",
    tgl_lahir: "1990-01-01",
    status: "Aktif",
    akun: {
      id_akun: "1",
      email: "pelanggan@example.com",
    },
  });

  const [riwayatPesanan] = useState<IRiwayatPesanan[]>([
    {
      id_pesanan: "24.02.101",
      id_metode_pembayaran: 1,
      id_pelanggan: 1,
      tgl_order: "2024-04-10",
      total_diskon_poin: 0,
      total_pesanan: 150000,
      total_setelah_diskon: 150000,
      total_dibayarkan: 150000,
      total_tip: 0,
      verified_at: "2024-04-10",
      id_status_pesanan: 1,
      id_karyawan: 1,
      status: "Selesai",
      produk: [
        { id: 1, 
          nama: "Lapis Legit", 
          harga: 10000, 
          images: LapisLegitImage,
          jumlah: 10,
        },
        {
          id: 2,
          nama: "Lapis Surabaya",
          harga: 12000,
          images: LapisSurabayaImage,
          jumlah: 1,
        },
      ],
    },
    {
      id_pesanan: "24.02.102",
      id_metode_pembayaran: 1,
      id_pelanggan: 1,
      tgl_order: "2024-04-05",
      total_diskon_poin: 0,
      total_pesanan: 250000,
      total_setelah_diskon: 250000,
      total_dibayarkan: 250000,
      total_tip: 0,
      verified_at: "2024-04-05",
      id_status_pesanan: 2,
      id_karyawan: 2,
      status: "Diproses",
      produk: [
        { id: 3, nama: "Brownies", harga: 15000, images: BrowniesImage, jumlah: 15 },
        { id: 4, nama: "Mandarin", harga: 8000, images: MandarinImage, jumlah: 8},
      ],
    },
  ]);

  const [selectedPesanan, setSelectedPesanan] =
    useState<IRiwayatPesanan | null>(null);

  const showDetailPesanan = (pesanan: IRiwayatPesanan) => {
    setSelectedPesanan(pesanan);
  };

  const handleCloseDialog = () => {
    setSelectedPesanan(null);
  };

  return (
    <DashboardWrapper navTitle={`Detail Pelanggan - ${pelanggan.nama}`}>
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Pelanggan", link: "/pelanggan" }]}
        currentPage={`Riwayat Pesanan`}
      />

      <div className="space-y-8">
        <InfoCard>
          <p className="text-large font-semibold">{pelanggan.nama}</p>
          <div className="space-y-1">
            <div className="flex items-start xl:items-center">
              <Phone size={16} className="mr-2" />
              <p>{pelanggan.akun.email}</p>
            </div>
            <div className="flex items-start xl:items-center">
              <MapPin size={16} className="mr-2" />
              <p>{toIndonesiaDate(pelanggan.tgl_lahir)}</p>
            </div>
            <p className="text-slate-500 text-body">
              Tanggal bergabung: {toIndonesiaDate(pelanggan.tgl_lahir)}
            </p>
          </div>
        </InfoCard>

        {/* Riwayat Pesanan */}
        
          {riwayatPesanan.map((pesanan) => (
            <div key={pesanan.id_pesanan} className="relative">
            <InfoCard>
              <div className="absolute right-16">
                <span className="text-sm font-semibold"><Badge variant={"success"}>{pesanan.status}</Badge></span>
              </div>
              <div className="flex items-center">
                <ShoppingBag size={16} className="mr-1" />
                <p className="text-sm">
                  Belanja {toIndonesiaDate(pesanan.tgl_order)}
                </p>
              </div>
             
              <div className="mt-4 space-y-2">
                {pesanan.produk.map((item, index) => (
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
              <Separator style={{ borderBottom: '1px solid #ccc', margin:'16px'}} />


              <div className="grid grid-cols-1 gap-4 justify-items-end">
              <div className="text-right mr-12">
                <p className="text-sm font-semibold">Total Pesanan:</p>
                <span>{toRupiah(pesanan.total_pesanan)}</span>
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
    </DashboardWrapper>
  );
}
