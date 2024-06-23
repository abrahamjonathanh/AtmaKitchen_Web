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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSWR from "swr";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import axios from "axios";

type ReportDataType = {
  transaksi: any[];
  nama_penitip: string;
  id_penitip: string;
  bulan: string;
  tahun: string;
  tanggal_cetak: string;
  total_diterima: number; // Tambahkan tipe data total_diterima
};

export default function PenitipReport() {
  const componentRef = useRef<HTMLDivElement>(null);

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

  const { data, error } = useSWR<ReportDataType[]>(
    selectedMonth &&
      `${process.env.BASE_API}/laporan-penitip/${selectedYear}/${selectedMonth}`,
    async (url: string) => {
      const response = await axios.get<ReportDataType[]>(url);
      return response.data;
    },
  );

  const reportData: ReportDataType[] | null = data || null;

  useEffect(() => {
    console.log(
      "SWR Route:",
      selectedMonth
        ? `${process.env.BASE_API}/laporan-penitip/${selectedYear}/${selectedMonth}`
        : null,
    );
  }, [selectedMonth, selectedYear]);

  const handlePrintReport = async () => {
    if (selectedMonth) {
      const url = `${process.env.BASE_API}/laporan-penitip/${selectedYear}/${selectedMonth}`;
      try {
        const response = await axios.get<ReportDataType[]>(url);
        const reportData: ReportDataType[] = response.data;
        console.log("Report Data:", reportData);
        printReport(reportData);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    }
  };
  const yearsOptions = [];
  const currentYear = new Date().getFullYear();
  for (let year = 2020; year <= currentYear + 1; year++) {
    yearsOptions.push(year);
  }

  return (
    <>
      <div className="flex items-center gap-2">
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
            <SelectItem value="1">Januari</SelectItem>
            <SelectItem value="2">Februari</SelectItem>
            <SelectItem value="3">Maret</SelectItem>
            <SelectItem value="4">April</SelectItem>
            <SelectItem value="5">Mei</SelectItem>
            <SelectItem value="6">Juni</SelectItem>
            <SelectItem value="7">Juli</SelectItem>
            <SelectItem value="8">Agustus</SelectItem>
            <SelectItem value="9">September</SelectItem>
            <SelectItem value="10">Oktober</SelectItem>
            <SelectItem value="11">November</SelectItem>
            <SelectItem value="12">Desember</SelectItem>
          </SelectContent>
        </Select>

        <ReactToPrint
          trigger={() => (
            <Button className="gap-1" onClick={handlePrintReport}>
              Cetak Laporan <Printer size={16} />
            </Button>
          )}
          content={() => componentRef.current}
          documentTitle={`Penitip Report ${toIndonesiaDate(new Date().toString())}`}
        />
      </div>

      {reportData && (
        <div className="hidden">
          <div className="relative" ref={componentRef}>
            {reportData?.map((penitip: ReportDataType, index: number) => (
              // <div key={index} ref={componentRefs[index]}>
              <div
                className="relative mx-auto flex w-full flex-col gap-4 bg-white p-16 pb-32"
                key={index}
              >
                <div>
                  <p className="font-semibold">Atma Kitchen</p>
                  <p>Jln. Centralpark No.10 Yogyakarta</p>
                </div>
                <div>
                  <p className="font-bold underline">
                    LAPORAN PENJUALAN BULANAN
                  </p>
                  <p>Bulan : {penitip.bulan}</p>
                  <p>Tahun : {penitip.tahun}</p>
                  <p>Tanggal cetak: {toIndonesiaDate(penitip.tanggal_cetak)}</p>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-black">ID Penitip</TableHead>
                      <TableHead className="text-black">Nama Penitip</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="py-2 font-normal">
                        {penitip.id_penitip}
                      </TableCell>
                      <TableCell className="py-2">
                        {penitip.nama_penitip}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                {penitip.transaksi.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-black">
                          Nama Produk
                        </TableHead>
                        <TableHead className="text-black">Qty</TableHead>
                        <TableHead className="text-black">Harga Jual</TableHead>
                        <TableHead className="text-black">Total</TableHead>
                        <TableHead className="text-black">Komisi</TableHead>
                        <TableHead className="text-black">
                          Yang Diterima
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {penitip.transaksi.map(
                        (transaksi: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="py-2 font-normal">
                              {transaksi.nama_produk}
                            </TableCell>
                            <TableCell className="py-2">
                              {transaksi.qty}
                            </TableCell>
                            <TableCell className="py-2">
                              {toRupiah(transaksi.harga_jual)}
                            </TableCell>
                            <TableCell className="py-2">
                              {toRupiah(transaksi.total)}
                            </TableCell>
                            <TableCell className="py-2">
                              {toRupiah(transaksi.komisi)}
                            </TableCell>
                            <TableCell className="py-2">
                              {toRupiah(transaksi.yang_diterima)}
                            </TableCell>
                          </TableRow>
                        ),
                      )}
                      <TableRow>
                        <TableCell colSpan={4} className="py-2 text-right">
                          <b>Total Diterima:</b>
                        </TableCell>
                        <TableCell colSpan={2} className="py-2">
                          <b>{toRupiah(penitip.total_diterima)}</b>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                ) : (
                  <p>Tidak ada transaksi</p>
                )}
                {/* </div> */}
                {index < reportData.length - 1 && (
                  <div className="page-break"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
function printReport(reportData: ReportDataType[]) {
  throw new Error("Function not implemented.");
}
