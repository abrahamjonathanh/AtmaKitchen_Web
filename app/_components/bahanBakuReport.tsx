import { Button } from "@/components/ui/button";
import ReactToPrint from "react-to-print";

import React, { useRef } from "react";
import { IBahanBaku, IPesananv2 } from "@/lib/interfaces";
import { toIndonesiaDate, toRupiah, toThousand } from "@/lib/utils";
import { Printer } from "lucide-react";
import { useCurrentUserStore } from "@/lib/state/user-store";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BahanBakuReport({ data }: { data: IBahanBaku[] }) {
  const componentRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useCurrentUserStore();

  return (
    <>
      <ReactToPrint
        trigger={() => (
          <Button className="me-3 gap-1">
            Cetak Laporan <Printer size={"16"} />
          </Button>
        )}
        content={() => componentRef.current}
        documentTitle={`Bahan Baku Report ${toIndonesiaDate(new Date().toString())}`}
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
            <p className="font-bold underline">LAPORAN Stok Bahan Baku</p>
            <p>Tanggal cetak: {toIndonesiaDate(new Date().toString())}</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-black">
                  Nama Bahan
                </TableHead>
                <TableHead className="font-bold text-black">Satuan</TableHead>
                <TableHead className="font-bold text-black">Stok</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((data) => (
                <TableRow key={data.id_bahan_baku}>
                  <TableCell className="py-2 font-normal">
                    {data.nama}
                  </TableCell>
                  <TableCell className="py-2">{data.satuan}</TableCell>
                  <TableCell className="py-2">
                    {toThousand(parseInt(data.stok))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
