import { Button } from "@/components/ui/button";
import ReactToPrint from "react-to-print";

import React, { useEffect, useRef, useState } from "react";
import { toIndonesiaDate, toRupiah } from "@/lib/utils";
import { Printer } from "lucide-react";
import { useCurrentUserStore } from "@/lib/state/user-store";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSWR from "swr";
import axios from "axios"; // Import axios

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type ReportDataType = {
  tanggal_cetak: string;
  bulan_tahun: {
    bulan: string;
    tahun: string;
  };
  pemasukkan: {
    penjualan: number;
    tip: number;
  };
  pengeluaran: {
    [key: string]: number;
  };
  total_pemasukkan: number;
  total_pengeluaran: number;
};

export default function PemasukkanPengeluaranReport() {
  const componentRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useCurrentUserStore();

  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(event.target.value);
    setSelectedYear(year);
  };

  // Fetch data using axios
  const { data, error } = useSWR(
    selectedMonth &&
      `${process.env.BASE_API}/laporan-pengeluaran-pemasukkan/${selectedYear}/${selectedMonth}`,
    async (url: string) => {
      const response = await axios.get<ReportDataType>(url);
      return response.data;
    },
  );

  const reportData: ReportDataType | null = data || null;

  const handlePrintReport = () => {
    if (selectedMonth && reportData) {
      console.log("Report Data:", reportData);
    }
  };

  // Log route here
  useEffect(() => {
    console.log(
      "SWR Route:",
      selectedMonth
        ? `${process.env.BASE_API}/laporan-pengeluaran-pemasukkan/${selectedYear}/${selectedMonth}`
        : null,
    );
  }, [selectedMonth, selectedYear]);

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
          documentTitle={`Arus Kas Report ${toIndonesiaDate(new Date().toString())}`}
        />
      </div>

      {reportData && (
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
              <p className="font-bold underline">LAPORAN ARUS KAS</p>
              <p>Bulan : {selectedMonth}</p>
              <p>Tahun : {selectedYear}</p>
              <p>Tanggal cetak: {toIndonesiaDate(reportData.tanggal_cetak)}</p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell className="text-black">Kategori</TableCell>
                  <TableCell className="text-black">Pemasukkan</TableCell>
                  <TableCell className="text-black">Pengeluaran</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="py-2">Penjualan</TableCell>
                  <TableCell className="py-2">
                    {toRupiah(reportData.pemasukkan.penjualan)}
                  </TableCell>
                  <TableCell className="py-2">-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="py-2">Tip</TableCell>
                  <TableCell className="py-2">
                    {toRupiah(reportData.pemasukkan.tip)}
                  </TableCell>
                  <TableCell className="py-2">-</TableCell>
                </TableRow>
                {Object.entries(reportData.pengeluaran).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell className="py-2">{key}</TableCell>
                    <TableCell className="py-2">-</TableCell>
                    <TableCell className="py-2">{toRupiah(value)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="py-2 font-bold">Total</TableCell>
                  <TableCell className="py-2 font-bold">
                    {toRupiah(reportData.total_pemasukkan)}
                  </TableCell>
                  <TableCell className="py-2 font-bold">
                    {toRupiah(reportData.total_pengeluaran)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
}
