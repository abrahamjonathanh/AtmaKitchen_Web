"use client";
import { getPenitipById } from "@/lib/api/penitip";
import { BreadcrumbWithSeparator } from "@/components/breadcrumb";
import ProdukList from "./_components/produk-list";
import DashboardWrapper from "@/components/dashboard-wrapper";
import InfoCard from "./_components/info-card";
import { Phone, MapPin, TrendingDown, TrendingUp } from "lucide-react";
import { toIndonesiaDate, toRupiah } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Loading from "@/components/ui/loading";
import { useTitle } from "@/lib/hooks";

export default function page({ params }: { params: { id: string } }) {
  useTitle("AtmaKitchen | Penitip");

  const { data, isLoading } = getPenitipById(params.id);
  console.log(data);
  return (
    <DashboardWrapper navTitle="Detail Penitip">
      <BreadcrumbWithSeparator
        previousPage={[{ title: "Penitip", link: "/a/penitip" }]}
        currentPage="Detail"
      />

      <div className="space-y-8">
        {data && !isLoading ? (
          <>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <InfoCard>
                <p className="text-large font-semibold">{data.nama}</p>

                <div className="space-y-1">
                  <div className="flex items-start xl:items-center">
                    <Phone size={16} className="mr-2" />
                    <p>{data.telepon}</p>
                  </div>
                  <div className="flex items-start xl:items-center">
                    <MapPin size={16} className="mr-2" />
                    <p>{data.alamat}</p>
                  </div>
                  <p className="text-body text-slate-500">
                    Tanggal bergabung: {toIndonesiaDate(data.created_at)}
                  </p>
                </div>
              </InfoCard>

              <InfoCard>
                <p className="text-large font-semibold">Pendapatan Bulan Ini</p>
                <div className="flex flex-wrap items-center space-x-2">
                  <p className="text-h3">{toRupiah(2159382)} </p>
                  <Badge
                    variant={"success"}
                    className="flex items-center gap-1"
                  >
                    <TrendingUp size={"16"} /> 12,4%
                  </Badge>
                </div>
                <p className="text-body text-slate-500">
                  Pendapatan bulan ini meningkat 12,4% dari bulan lalu.
                </p>
              </InfoCard>

              <InfoCard>
                <p className="text-large font-semibold">Transaksi Bulan Ini</p>

                <div className="flex items-center space-x-2">
                  <p className="text-h3">{"112"} </p>
                  <Badge variant={"failed"} className="flex items-center gap-1">
                    <TrendingDown size={"16"} /> 5,22%
                  </Badge>
                </div>
                <p className="text-body text-slate-500">
                  Transaksi bulan ini menurun 5,22% dari bulan lalu.
                </p>
              </InfoCard>
            </div>
          </>
        ) : (
          <Loading />
        )}
        {data && !isLoading && <ProdukList penitip={data} />}
      </div>
    </DashboardWrapper>
  );
}
