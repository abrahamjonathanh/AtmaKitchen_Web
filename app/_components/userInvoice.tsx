import { Button } from "@/components/ui/button";
import ReactToPrint from "react-to-print";

import React, { useRef } from "react";
import { IPesananv2 } from "@/lib/interfaces";
import { toIndonesiaDate } from "@/lib/utils";
import { Printer } from "lucide-react";

export default function UserInvoice({ data }: { data: IPesananv2 }) {
  const componentRef = useRef<HTMLDivElement>(null);

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
              <p>{toIndonesiaDate(data.tgl_order)}</p>
            </div>
            <div className="flex justify-between">
              <p>Lunas pada</p>
              <p>{toIndonesiaDate(data.verified_at!)}</p>
            </div>
            <div className="flex justify-between">
              <p>Tanggal Ambil</p>
              {data.accepted_at && <p>{toIndonesiaDate(data.accepted_at!)}</p>}
            </div>
          </div>
          <div>
            <p>Customer</p>
            <p>{/* {data.pelanggan.akun?.email} / {data.pelanggan.nama} */}</p>
            {/* <p>{data}</p> */}
          </div>
        </div>
      </div>
    </>
  );
}
