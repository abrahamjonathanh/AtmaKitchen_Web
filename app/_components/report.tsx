import { Button } from "@/components/ui/button";
import { toIndonesiaDate, toRupiah, toThousand } from "@/lib/utils";
import { File } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getBahanBakuUsageByDate } from "@/lib/api/pesanan";

export const ReportMonthlySelling = ({
  data,
}: {
  data: {
    month: string;
    total_orders: number;
    total_sales: number;
  }[];
}) => {
  const componentRef = useRef<HTMLDivElement>(null);

  // Calculate the sum of total_sales
  const totalSalesSum = data.reduce((sum, item) => sum + item.total_sales, 0);

  return (
    <>
      <ReactToPrint
        trigger={() => (
          <Button
            variant={"outline"}
            className="flex w-full items-center gap-1"
          >
            <File size={"16"} />
            Laporan Penjualan Bulanan
          </Button>
        )}
        content={() => componentRef.current}
        documentTitle={`Laporan Penjualan ${toIndonesiaDate(new Date().toString(), { year: "numeric" })}`}
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
            <p className="font-bold underline">LAPORAN PENJUALAN BULANAN</p>
            <p>Tahun: 2024</p>
            <p>Tanggal cetak: {toIndonesiaDate(new Date().toString())}</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-black">Bulan</TableHead>
                <TableHead className="font-bold text-black">
                  Jumlah Transaksi
                </TableHead>
                <TableHead className="font-bold text-black">
                  Jumlah Uang
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((data, index) => (
                <TableRow key={index}>
                  <TableCell className="py-2 font-normal">
                    {data.month}
                  </TableCell>
                  <TableCell className="py-2">
                    {toThousand(data.total_orders)}
                  </TableCell>
                  <TableCell className="py-2">
                    {toRupiah(data.total_sales)}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow className="font-bold">
                <TableCell colSpan={2} className="py-2 text-right">
                  Total
                </TableCell>
                <TableCell className="py-2">
                  {toRupiah(totalSalesSum)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export const ReportBahanBakuUsageByPeriod = ({
  data,
  start_date,
  end_date,
}: {
  data: {
    nama: string;
    total: number;
    satuan: string;
  }[];
  start_date: string;
  end_date: string;
}) => {
  const componentRef = useRef<HTMLDivElement>(null);
  console.log(start_date, end_date);
  return (
    data && (
      <>
        <ReactToPrint
          trigger={() => (
            <Button
              type="button"
              variant={"outline"}
              className="flex w-full items-center gap-1"
            >
              <File size={"16"} />
              Laporan Penggunaan Bahan Baku
            </Button>
          )}
          content={() => componentRef.current}
          documentTitle={`Laporan Penggunaan Bahan Baku ${toIndonesiaDate(new Date().toString(), { year: "numeric" })}`}
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
              <p className="font-bold underline">
                LAPORAN PEMAKAIAN BAHAN BAKU
              </p>
              <p>
                Periode: {toIndonesiaDate(start_date)} -{" "}
                {toIndonesiaDate(end_date)}
              </p>
              <p>Tanggal cetak: {toIndonesiaDate(new Date().toString())}</p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold text-black">
                    Nama Bahan
                  </TableHead>
                  <TableHead className="font-bold text-black">Satuan</TableHead>
                  <TableHead className="font-bold text-black">
                    Digunakan
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data &&
                  data.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell className="py-2 font-normal">
                        {data.nama}
                      </TableCell>
                      <TableCell className="py-2">{data.satuan}</TableCell>
                      <TableCell className="py-2">
                        {toThousand(data.total)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </>
    )
  );
};
