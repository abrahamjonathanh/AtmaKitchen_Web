"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { statusPesananBadge, toIndonesiaDate, toRupiah } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IPenarikanSaldo } from "@/lib/interfaces";
import { updatePenarikanSaldoStatus } from "@/lib/api/penarikansaldo";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const columns = (
  onRefresh?: () => void,
): ColumnDef<IPenarikanSaldo>[] => [
  {
    accessorKey: "id_penarikan_saldo",
    header: "# ID",
  },
  {
    accessorKey: "akun.email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2" size={"12"} />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-full px-4 font-medium">
        {row.original.akun && row.original.akun.email}
      </div>
    ),
  },
  {
    accessorKey: "pelanggan.nama",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Pengguna
          <ArrowUpDown className="ml-2" size={"12"} />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-full px-4 font-medium">
        {row.original.pelanggan && row.original.pelanggan.nama}
      </div>
    ),
  },

  {
    accessorKey: "nama_bank",
    header: () => <div>Nama Bank</div>,
    cell: ({ row }) => (
      <div className="w-full px-4">{row.getValue("nama_bank")}</div>
    ),
  },
  {
    accessorKey: "nomor_rekening",
    header: () => <div>Nomor Rekening</div>,
    cell: ({ row }) => (
      <div className="w-full px-4">{row.getValue("nomor_rekening")}</div>
    ),
  },
  {
    accessorKey: "jumlah_penarikan",
    header: () => <div>Jumlah Penarikan</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("jumlah_penarikan"));
      return <div>{toRupiah(amount)}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2" size={"12"} />
        </Button>
      );
    },
    cell: ({ row }) => {
      // const statusBadges: {
      //   code: string;
      //   variant: "success" | "lime" | "fuchia";
      //   label: "Selesai" | "Menunggu" | "Ditolak";
      // }[] = [
      //   { code: "selesai", variant: "success", label: "Selesai" },
      //   { code: "menunggu", variant: "lime", label: "Menunggu" },
      //   { code: "ditolak", variant: "fuchia", label: "Ditolak" },
      // ];

      // const statusBadge = statusBadges.find(
      //   (badge) => badge.code == row.getValue("status"),
      // );

      return (
        <div className="px-4">
          <Badge variant={statusPesananBadge(row.getValue("status")).variant}>
            {statusPesananBadge(row.getValue("status")).children}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "transfer_at",
    header: () => <div>Tanggal Transfer</div>,
    cell: ({ row }) => {
      return <div>{toIndonesiaDate(row.getValue("transfer_at"))}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const pathname = usePathname();
      const [isOpen, setIsOpen] = useState(false);
      const router = useRouter();
      const [isLoading, setIsLoading] = useState(false);

      const onStatusUpdate = async (status: string) => {
        try {
          setIsLoading(true);

          const jumlahPenarikan = parseFloat(row.getValue("jumlah_penarikan"));
          const totalSaldo = parseFloat(row.getValue("total_saldo"));

          // Case 1: Jumlah penarikan melebihi saldo
          if (jumlahPenarikan > totalSaldo) {
            toast.error("Jumlah penarikan melebihi saldo.");
            setIsLoading(false);
            return;
          }

          const response = await updatePenarikanSaldoStatus(
            row.getValue("id_penarikan_saldo"),
            status,
          );

          // Case 2: Tidak ada saldo pelanggan dengan ID akun yang diberikan
          if (!response) {
            toast.error(
              "Tidak ada saldo pelanggan dengan ID akun yang diberikan.",
            );
            setIsLoading(false);
            return;
          }

          toast.success("Status berhasil diperbarui.");
          onRefresh!();
        } catch (error: any) {
          toast.error(
            "Saldo pelanggan tidak mencukupi, penarikan saldo gagal....",
          );
          console.error("Error updating status: " + error);
        } finally {
          setIsLoading(false); // For stopping the loading process
          setIsOpen(false); // For closing the dialog
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onStatusUpdate("selesai")}>
                <Pencil size={"16"} /> Selesai
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onStatusUpdate("ditolak")}>
                <Pencil size={"16"} /> Ditolak
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
