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
import { IPesananv2 } from "@/lib/interfaces";
import UserInvoice from "@/app/_components/userInvoice";
import { getPoinByIdPesanan, getPoinByTotalHarga } from "@/lib/api/poin";
import { useCurrentUserStore } from "@/lib/state/user-store";

export default function DetailTransaksiDialog({ data }: { data?: IPesananv2 }) {
  const { currentUser } = useCurrentUserStore();
  // const getPoin = getPoinByTotalHarga(data?.total_pesanan);
  const poinUser = getPoinByIdPesanan(
    currentUser?.id_pelanggan!,
    data?.id_pesanan!,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"}>Lihat Detail Transaksi</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen max-w-sm sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Detail Transaksi</DialogTitle>
          <Separator />
          <DialogDescription>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <p className="text-body text-slate-500">No Nota</p>
                  <p className="text-body font-medium text-black">
                    {data?.id_pesanan}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-body text-slate-500">Tanggal Pembelian</p>
                  <p className="text-body font-medium text-black">
                    {toIndonesiaDate(data?.created_at!, {
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
                <p className="text-body font-medium text-black">
                  Info Pengiriman
                </p>
                <div className="flex justify-between">
                  <p className="text-body text-slate-500">Kurir</p>
                  <p className="text-body font-medium text-black">
                    {data?.jenis_pengiriman}
                  </p>
                </div>
                {data?.jenis_pengiriman != "Ambil Sendiri" && (
                  <div className="flex justify-between gap-4">
                    <p className="text-body text-slate-500">Alamat</p>
                    <div className="flex flex-col items-end">
                      <p className="text-body font-medium text-black">
                        {data?.pengiriman?.nama}
                      </p>
                      <p className="text-body text-black">
                        {data?.pengiriman?.telepon}
                      </p>
                      <p className="text-body text-right text-black">
                        {data?.pengiriman?.alamat}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <Separator />
              <div className="space-y-1.5">
                <p className="text-body font-medium text-black">
                  Rincian Pembayaran
                </p>
                <div className="flex justify-between">
                  <p className="text-body text-slate-500">Metode Pembayaran</p>
                  <p className="text-body font-medium text-black">
                    Transfer BCA
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-body flex items-center gap-2 text-slate-500">
                    <CreditCard size={"16"} /> Total Harga
                  </p>
                  <p className="text-body text-black">
                    {toRupiah(parseInt(data?.total_pesanan!))}
                  </p>
                </div>
                {data?.pengiriman?.harga && (
                  <div className="flex justify-between">
                    <p className="text-body flex items-center gap-2 text-slate-500">
                      <Truck size={"16"} /> Total Ongkos Kirim
                    </p>
                    <p className="text-body text-black ">
                      {toRupiah(data?.pengiriman?.harga)}
                    </p>
                  </div>
                )}
                {parseInt(data?.total_diskon_poin!) ? (
                  <div className="flex justify-between">
                    <p className="text-body flex items-center gap-2 text-slate-500">
                      <BadgePercent size={"16"} /> Promo Poin
                    </p>
                    <p className="text-body text-black ">
                      {toRupiah(-parseInt(data?.total_diskon_poin!))}
                    </p>
                  </div>
                ) : null}
              </div>
              <Separator />
              <div className="flex justify-between">
                <p className="font-medium text-black">Total Belanja</p>
                <p className="font-medium text-black">
                  {toRupiah(
                    parseInt(data?.total_setelah_diskon!) +
                      (data?.pengiriman?.harga! ? data?.pengiriman?.harga! : 0),
                  )}
                </p>
              </div>
              {data?.points?.poin && (
                <p className="text-body text-slate-500">
                  Anda memperoleh{" "}
                  <span className="font-medium text-orange-600">
                    {data?.points?.poin} poin
                  </span>{" "}
                  dari transaksi ini.
                </p>
              )}
              {data?.bukti_pembayaran &&
                data.accepted_at &&
                data.verified_at && (
                  <UserInvoice
                    data={data!}
                    // poin={getPoin.data}
                    poinUser={poinUser.data}
                  />
                )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
