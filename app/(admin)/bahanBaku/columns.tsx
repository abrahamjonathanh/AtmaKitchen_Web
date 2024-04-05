"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {toIndonesiaDate} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import { useState } from "react";
import DeleteDialog from "@/components/deleteDialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IBahanBaku } from "@/lib/interfaces";
import { deleteBahanBakuById } from "@/lib/api/bahanbaku";

export const columns: ColumnDef<IBahanBaku>[] = [
  {
    accessorKey: "id",
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
          Nama Bahan
          <ArrowUpDown className="ml-2" size={"12"} />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="px-4 font-medium">{row.getValue("nama")}</div>
    ),
  },
  {
    accessorKey: "stok",
    header: () => <div>Stok</div>,
    cell: ({ row }) => <div>{row.getValue("stok")}</div>,
  },
  {
    accessorKey: "satuan",
    header: () => <div>Satuan</div>,
    cell: ({ row }) => <div>{row.getValue("satuan")}</div>,
  },
  {
    accessorKey: "updated_at",
    header: () => <div>Terakhir Diperbaharui</div>,
    cell: ({ row }) => <div>{toIndonesiaDate(row.getValue("updated_at"))}</div>,
  },
//   {
//     accessorKey: "status",
//     header: () => <div>Status</div>,
//     cell: ({ row }) => <Badge variant="lime">Aktif</Badge>, // Ganti dengan logika status yang sesuai
//   },
  {
    id: "actions",
    cell: ({ row }) => {
      const pathname = usePathname();
      const [isOpen, setIsOpen] = useState(false);
      const [isLoading, setIsLoading] = useState(false);

      const onDeleteHandler = async () => {
        try {
          setIsLoading(true);
          await deleteBahanBakuById(row.getValue("id"));
        } catch (error: any) {
          console.error("Error deleting bahan baku: " + error);
        } finally {
          setIsLoading(false);
          setIsOpen(false);
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
              <Link href={`${pathname}/edit/${row.getValue("id")}`}>
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
            description="Tindakan ini tidak dapat diulang ketika anda menekan Hapus."
            onSubmit={onDeleteHandler}
            isLoading={isLoading}
          />
        </>
      );
    },
  },
];
