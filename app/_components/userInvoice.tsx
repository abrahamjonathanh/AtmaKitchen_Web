import { Button } from "@/components/ui/button";
import ReactToPrint from "react-to-print";

import React, { useRef } from "react";
import { IPesananv2 } from "@/lib/interfaces";
import { toIndonesiaDate, toRupiah, toThousand } from "@/lib/utils";
import { Printer } from "lucide-react";
import { useCurrentUserStore } from "@/lib/state/user-store";
import { getPoinByIdPelanggan } from "@/lib/api/poin";

export default function UserInvoice({
  data,
  poin,
  poinUser,
}: {
  data: IPesananv2;
  poin: number;
  poinUser: number;
}) {
  const componentRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useCurrentUserStore();

  return (
    <>
      <ReactToPrint
        trigger={() => (
          <Button className="flex w-full gap-1">
            <Printer size={"16"} /> Print
          </Button>
        )}
        content={() => componentRef.current}
        documentTitle={`Invoice_${data.id_pesanan}`}
      />
      <div className="hidden">
        <div
          className={`relative mx-auto flex w-full flex-col gap-4 bg-white p-16 pb-32 `}
          ref={componentRef}
        >
          <div>
            <p className="font-semibold">Atma Kitchen</p>
            <p>Jln. Centralpark No.10 Yogyakarta</p>
          </div>
          <div>
            <div className="flex justify-between">
              <p>No Nota</p>
              <p>{data.id_pesanan}</p>
            </div>
            <div className="flex justify-between">
              <p>Tanggal pesan</p>
              <p>
                {toIndonesiaDate(data.tgl_order, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Lunas pada</p>
              <p>
                {toIndonesiaDate(data.verified_at!, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Tanggal Ambil</p>
              {data.accepted_at && (
                <p>
                  {toIndonesiaDate(data.accepted_at!, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
            </div>
          </div>
          <div>
            <p>
              Customer : {currentUser?.akun.email} / {currentUser?.nama}
            </p>
            <p>{data.pengiriman?.alamat}</p>
            <p>Delivery : {data.jenis_pengiriman}</p>
          </div>
          <div>
            {data.detail_pesanan?.map((data, index) => {
              return (
                <div key={index} className="flex justify-between">
                  <p>
                    {data.jumlah} {data.nama_produk} {data.produk?.ukuran}
                  </p>
                  <p>{toRupiah(parseInt(data.harga))}</p>
                </div>
              );
            })}
          </div>
          <div>
            <div className="flex justify-between">
              <p>Total</p>
              <p>{toRupiah(parseInt(data.total_pesanan))}</p>
            </div>
            <div className="flex justify-between">
              <p>
                Ongkos Kirim (rad.{" "}
                {data.pengiriman?.jarak ? data.pengiriman?.jarak : 0} km)
              </p>
              <p>{toRupiah(data.pengiriman?.harga! ?? 0)}</p>
            </div>
            <div className="flex justify-between">
              <p>Total</p>
              <p>
                {toRupiah(
                  parseInt(
                    (data.pengiriman?.harga ? data.pengiriman?.harga : 0) +
                      data.total_pesanan,
                  ),
                )}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Potongan {parseInt(data.total_diskon_poin) / 100} poin</p>
              <p>- {toRupiah(parseInt(data.total_diskon_poin))}</p>
            </div>
            <div className="flex justify-between">
              <p>Total</p>
              <p>
                {toRupiah(
                  parseInt(
                    data.total_setelah_diskon +
                      (data.pengiriman?.harga ? data.pengiriman?.harga : 0),
                  ),
                )}
              </p>
            </div>
          </div>
          <div>
            <p>Poin dari pesanan ini: {poin}</p>
            <p>Total poin customer: {poinUser}</p>
            {/* Salah ini total poin harusnya ambil setiap invoice berapa total nya terakhir */}
          </div>
        </div>
      </div>
    </>
  );
}
