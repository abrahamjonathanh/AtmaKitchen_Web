"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toIndonesiaDate } from "@/lib/utils";
import { useState } from "react";
import DeleteDialog from "@/components/deleteDialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IPenitip } from "@/lib/interfaces";
import { deletePenitipById } from "@/lib/api/penitip";

export const columns = (onRefresh?: () => void): ColumnDef<IPenitip>[] => [
  {
    accessorKey: "id_penitip",
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
          Nama Penitip
          <ArrowUpDown className="ml-2" size={"12"} />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="px-4 font-medium">{row.getValue("nama")}</div>
    ),
  },
  {
    accessorKey: "alamat",
    header: () => <div>Alamat</div>,
  },
  {
    accessorKey: "telepon",
    header: () => <div>No Telp</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("telepon")}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: () => <div>Tanggal Bergabung</div>,
    cell: ({ row }) => {
      // ↳ kode di bawah ini boleh dihapus. bisa langsung di convert pakai utils yg ada
      // const isoDate = new Date(row.getValue("created_at")).toISOString().split("T")[0];
      return <div>{toIndonesiaDate(row.getValue("created_at"))}</div>;
    },
  },
  {
    accessorKey: "produk_titipan_count",
    header: () => <div>Jumlah Produk Titipan</div>,
    cell: ({ row }) => <div>{row.getValue("produk_titipan_count") || "-"}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const pathname = usePathname();
      const [isOpen, setIsOpen] = useState(false);
      const [isLoading, setIsLoading] = useState(false);

      const onDeleteHandler = async () => {
        try {
          setIsLoading(true);
          const response = await deletePenitipById(row.getValue("id_penitip"));

          // Auto refresh data when success.
          if (response?.status == 200 || response?.status == 201) {
            onRefresh!(); // For auto refresh
          }
        } catch (error: any) {
          console.error("Error deleting penitip: " + error);
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
              <Link href={`${pathname}/${row.getValue("id_penitip")}`}>
                <DropdownMenuItem>
                  <Search size={"16"} /> Lihat Detail
                </DropdownMenuItem>
              </Link>
              <Link href={`${pathname}/edit/${row.getValue("id_penitip")}`}>
                <DropdownMenuItem>
                  <Pencil size={"16"} /> Ubah
                </DropdownMenuItem>
              </Link>
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
