"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
  Trash2,
  Clock,
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
import { toRupiah } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

import { useState } from "react";
import DeleteDialog from "@/components/deleteDialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IPelanggan } from "@/lib/interfaces";
import { deletePelangganById } from "@/lib/api/pelanggan";

export const columns: ColumnDef<IPelanggan>[] = [
  {
    accessorKey: "id_pelanggan",
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
          Nama Pelanggan
          <ArrowUpDown className="ml-2" size={"12"} />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="px-4 font-medium w-full">{row.getValue("nama")}</div>
    ),
  },
  {
    accessorKey: "tgl_lahir",
    header: "Tanggal Lahir",
    cell: ({ row }) => <div className="px-4">{row.getValue("tgl_lahir")}</div>,
  },
  {
    accessorKey: "deleted_at",
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
      const statusBadges: {
        code: string;
        variant: "lime" | "sky" | "violet";
        label: "Aktif" | "Tidak Aktif";
      }[] = [
        { code: "1", variant: "lime", label: "Aktif" },
        { code: "2", variant: "sky", label: "Tidak Aktif" },
      ];

      // Check if deleted_at is null
      const isDeleted = row.original.deleted_at === null;

      // Determine status label and variant
      const statusLabel = !isDeleted ? "Tidak Aktif" : "Aktif";
      const statusVariant = isDeleted ? "sky" : "lime";

      return (
        <div className="px-4">
          <Badge variant={statusVariant}>{statusLabel}</Badge>
        </div>
      );
    },
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
          await deletePelangganById(row.getValue("id_pelanggan"));
        } catch (error: any) {
          console.error("Error deleting pelanggan: " + error);
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
              <Link href={`${pathname}/${row.getValue("id_pelanggan")}`}>
                <DropdownMenuItem>
                  <Clock size={"16"} /> Riwayat Pesanan
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                <Trash2 size={"16"} /> Hapus {row.getValue("id_pelanggan")}
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
