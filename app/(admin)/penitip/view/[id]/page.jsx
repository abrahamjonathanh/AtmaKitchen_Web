"use client";
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import ProdukList from "./_components/produk-list";
import DashboardWrapper from "@/components/dashboard-wrapper";
import InfoCard from "./_components/info-card"; // Sesuaikan dengan struktur direktori yang benar
import { User,Phone,MapPin, DollarSign, ExchangeAlt} from "lucide-react";

export const fetchData = async () => {
  return {
    penitipData: {
      nama: "Abraham",
      telepon: "0812345678",
      alamat: "Panorama",
      tanggalBergabung: "01 April 2024"
    },
    pendapatanBulanIni: 5000000,
    transaksiBulanIni: 10
  };
};

export default function ProdukPage() {
  const pageTitle = "AtmaKitchen | Produk Titipan";
  const pageDescription = "AtmaKitchen Produk Titipan Dashboard";

  const [penitipData, setPenitipData] = useState(null);
  const [pendapatanBulanIni, setPendapatanBulanIni] = useState(null);
  const [transaksiBulanIni, setTransaksiBulanIni] = useState(null);

  useEffect(() => {
    fetchData().then((result) => {
      setPenitipData(result.penitipData);
      setPendapatanBulanIni(result.pendapatanBulanIni);
      setTransaksiBulanIni(result.transaksiBulanIni);
    });
  }, []);

  return (
    <DashboardWrapper navTitle="Penitip">
       <BreadcrumbWithSeparator
        previousPage={[{ title: "Penitip", link: "/penitip" }]}
        currentPage="Detail"
      />
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        {penitipData && (
          <>
            <InfoCard icon={<User size={24} />}>
              <p className="mb-1 font-semibold">{penitipData.nama}</p>
              
              <div className="flex items-center mb-1">
                <Phone size={16} className="mr-2" />
                <p>{penitipData.telepon}</p>
              </div>
              <div className="flex items-center mb-1">
                <MapPin size={16} className="mr-2" />
                <p>{penitipData.alamat}</p>
              </div>
              <p className="text-gray-400 text-xs">{penitipData.tanggalBergabung}</p>
            </InfoCard>


            <InfoCard title="Pendapatan Bulan Ini" icon={<DollarSign size={24} />}>
              <p>Rp. {pendapatanBulanIni}</p>
            </InfoCard>

            <InfoCard title="Transaksi Bulan Ini" icon="exchange-alt">
              <p>{transaksiBulanIni}</p>
            </InfoCard>
          </>
        )}
      </div>

      <ProdukList />
    </DashboardWrapper>
  );
}
