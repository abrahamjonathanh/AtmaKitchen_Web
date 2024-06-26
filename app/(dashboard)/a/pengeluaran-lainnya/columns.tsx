"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toIndonesiaDate, toRupiah } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

import { useState } from "react";
import DeleteDialog from "@/components/deleteDialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IPengeluaranLainnya } from "@/lib/interfaces";
import { deletePengeluaranLainnyaById } from "@/lib/api/pengeluaranlainnya";
import { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";

export const columns = (
  onRefresh?: () => void,
): ColumnDef<IPengeluaranLainnya>[] => [
  {
    accessorKey: "id_pengeluaran_lainnya",
    header: "# ID",
  },
  {
    accessorKey: "nama",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Transaksi
          <ArrowUpDown className="ml-2" size={"12"} />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-full px-4 font-medium">{row.getValue("nama")}</div>
    ),
  },
  {
    accessorKey: "tanggal",
    header: () => <div>Tanggal Transaksi</div>,
    cell: ({ row }) => {
      return <div>{toIndonesiaDate(row.getValue("tanggal"))}</div>;
    },
  },
  {
    accessorKey: "biaya",
    header: () => <div>Jumlah</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("biaya"));

      return <div>{toRupiah(amount)}</div>;
    },
  },
  {
    accessorKey: "kategori",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kategori
          <ArrowUpDown className="ml-2" size={"12"} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const kategoriBadges: {
        code: string;
        variant: "lime" | "sky";
        label: "Pemasukan" | "Pengeluaran";
      }[] = [
        { code: "Pemasukan", variant: "lime", label: "Pemasukan" },
        { code: "Pengeluaran", variant: "sky", label: "Pengeluaran" },
      ];

      const kategoriBadge = kategoriBadges.find(
        (badge) => badge.code == row.getValue("kategori"),
      );

      return (
        <div className="px-4">
          <Badge variant={kategoriBadge?.variant}>{kategoriBadge?.label}</Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const pathname = usePathname();
      const [isOpen, setIsOpen] = useState(false);
      const router = useRouter();
      const [isLoading, setIsLoading] = useState(false);

      const onDeleteHandler = async () => {
        try {
          setIsLoading(true);
          const response = await deletePengeluaranLainnyaById(
            row.getValue("id_pengeluaran_lainnya"),
          );

          if (response?.status === 200 || response?.status === 201) {
            onRefresh!();
          }
        } catch (error: any) {
          console.error("Error deleting pengeluaran lainnya: " + error);
        } finally {
          setIsLoading(false); //For stop the loading process
          setIsOpen(false); // For close the dialog
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
              <DropdownMenuItem
                onClick={() =>
                  router.push(
                    `${pathname}/${row.getValue("id_pengeluaran_lainnya")}`,
                  )
                }
              >
                <Pencil size={"16"} /> Ubah
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                <Trash2 size={"16"} /> Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={row.getValue("nama")}
            description="Tindakkan ini tidak dapat diulang ketika anda menekan Hapus."
            onSubmit={onDeleteHandler}
            isLoading={isLoading}
          />
        </>
      );
    },
  },
];
