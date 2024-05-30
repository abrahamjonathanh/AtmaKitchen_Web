import { Button } from "@/components/ui/button";
import ReactToPrint from "react-to-print";

import React, { useEffect, useRef, useState } from "react";
import { IBahanBaku, IPesananv2 } from "@/lib/interfaces";
import { fetcher, toIndonesiaDate, toRupiah, toThousand } from "@/lib/utils";
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
import { getPesananByMonth } from "@/lib/api/pesanan";
import useSWR from "swr";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function PenjualanBulananReport() {
  const componentRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useCurrentUserStore();

  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [reportData, setReportData] = useState<{
    data: any;
    isLoading: boolean;
    isError: any;
    isValidating: boolean;
  }>({ data: [], isLoading: false, isError: null, isValidating: false });
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
  };

  useEffect(() => {}, [selectedMonth]);

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(event.target.value);
    setSelectedYear(year);
  };

  useEffect(() => {}, [selectedYear]);

  const { data, error, isLoading, isValidating } = useSWR(
    selectedMonth
      ? `${process.env.BASE_API}/pesanan/laporan/${selectedYear}-${selectedMonth}-01`
      : null,
    fetcher,
  );

  useEffect(() => {
    if (data) {
      setReportData({ data, isLoading, isError: error, isValidating });
    }
  }, [data, error, isLoading, isValidating]);

  const handlePrintReport = () => {
    if (selectedMonth) {
      console.log(data);
      setReportData({ data, isLoading, isError: error, isValidating });
      console.log(reportData);
    }
  };

  const yearsOptions = [];
  const currentYear = new Date().getFullYear();
  for (let year = 2020; year <= currentYear + 1; year++) {
    yearsOptions.push(year);
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <Input
          type="number"
          placeholder="Year"
          min="2020"
          value={selectedYear}
          onChange={handleYearChange}
          className="rounded-md border px-2 py-1"
        />
        <Select onValueChange={handleMonthChange}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih Bulan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="01">Januari</SelectItem>
            <SelectItem value="02">Februari</SelectItem>
            <SelectItem value="03">Maret</SelectItem>
            <SelectItem value="04">April</SelectItem>
            <SelectItem value="05">Mei</SelectItem>
            <SelectItem value="06">Juni</SelectItem>
            <SelectItem value="07">Juli</SelectItem>
            <SelectItem value="08">Agustus</SelectItem>
            <SelectItem value="09">September</SelectItem>
            <SelectItem value="10">Oktober</SelectItem>
            <SelectItem value="11">November</SelectItem>
            <SelectItem value="12">Desember</SelectItem>
          </SelectContent>
        </Select>

        <ReactToPrint
          trigger={() => (
            <Button className="gap-1" onClick={handlePrintReport}>
              Cetak Laporan <Printer size={"16"} />
            </Button>
          )}
          content={() => componentRef.current}
          documentTitle={`Bahan Baku Report ${toIndonesiaDate(new Date().toString())}`}
        />
      </div>

      {!reportData.isLoading && reportData.data && (
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
              <p>Bulan : {toIndonesiaDate(selectedMonth, { month: "long" })}</p>
              <p>Tahun : {selectedYear.toString()}</p>
              <p>Tanggal cetak: {toIndonesiaDate(new Date().toString())}</p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-black">Produk</TableHead>
                  <TableHead className="text-black">Kuantitas</TableHead>
                  <TableHead className="text-black">Harga</TableHead>
                  <TableHead className="text-black">Jumlah Uang</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportData.data.map((data: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="py-2 font-normal">
                      {data.produk}
                    </TableCell>
                    <TableCell className="py-2">{data.kuantitas}</TableCell>
                    <TableCell className="py-2">
                      {toRupiah(parseInt(data.harga))}
                    </TableCell>
                    <TableCell className="py-2">
                      {toRupiah(parseInt(data.jumlah_uang))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
}
