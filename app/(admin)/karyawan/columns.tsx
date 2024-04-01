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
import { toRupiah } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

import { useState } from "react";
import DeleteDialog from "@/components/deleteDialog";

export type Karyawan = {
  id: number;
  nama: string;
  alamat: string;
  telepon: string;
  gaji_harian: string | number;
  bonus: string | number;
  jabatan: string;
};

export const columns: ColumnDef<Karyawan>[] = [
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
          Nama Lengkap
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
    accessorKey: "gaji_harian",
    header: () => <div>Gaji Harian</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("gaji_harian"));

      return <div>{toRupiah(amount)}</div>;
    },
  },
  {
    accessorKey: "bonus",
    header: () => <div>Bonus</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("bonus"));

      return <div>{amount ? toRupiah(amount) : "-"}</div>;
    },
  },
  {
    accessorKey: "jabatan",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Jabatan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const roleBadges: {
        code: string;
        variant: "success" | "failed";
        label: any;
      }[] = [
        { code: "1", variant: "success", label: "Admin" },
        { code: "2", variant: "failed", label: "Manager" },
      ];

      const roleBadge = roleBadges.find(
        (badge) => badge.code === row.getValue("jabatan")
      );
      return (
        <div className="px-4">
          <Badge variant={roleBadge?.variant}>{roleBadge?.label}</Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [isOpen, setIsOpen] = useState(false);

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
              <DropdownMenuItem>
                <Pencil size={"16"} /> Ubah
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                <Trash2 size={"16"} /> Hapus {row.getValue("id")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={row.getValue("nama")}
            description="Tindakkan ini tidak dapat diulang ketika anda menekan Hapus."
          />
        </>
      );
    },
  },
];
