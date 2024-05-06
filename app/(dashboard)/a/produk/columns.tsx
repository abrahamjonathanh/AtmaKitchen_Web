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
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IProduk } from "@/lib/interfaces";
import { deleteProdukById } from "@/lib/api/produk";

export const columns = (onRefresh?: () => void): ColumnDef<IProduk>[] => [
  {
    accessorKey: "id_produk",
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
          Nama Produk
          <ArrowUpDown className="ml-2" size={"12"} />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="px-4 font-medium">
        {row.getValue("nama")} {row.original.ukuran}
      </div>
    ),
  },
  {
    accessorKey: "Ready_Stock",
    header: () => <div>Ready Stock</div>,
  },
  {
    accessorKey: "harga_jual",
    header: () => <div>Harga</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("harga_jual"));

      return <div>{toRupiah(amount)}</div>;
    },
  },
  {
    accessorKey: "kapasitas",
    header: () => <div>Kapasitas</div>,
    cell: ({ row }) => (
      <div className="px-4">{row.getValue("kapasitas")} pcs</div>
    ),
  },
  {
    accessorKey: "id_kategori",
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
      const roleBadges: {
        code: number;
        variant: "violet" | "sky" | "lime";
        label: "Kue" | "Minuman" | "Roti";
      }[] = [
        { code: 1, variant: "violet", label: "Kue" },
        { code: 2, variant: "sky", label: "Roti" },
        { code: 3, variant: "lime", label: "Minuman" },
        // { code: "4", variant: "lime", label: "Titipan" },
        // { code: "5", variant: "lime", label: "Hampers" },
      ];

      const roleBadge = roleBadges.find(
        (badge) => badge.code === row.getValue("id_kategori"),
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
      const pathname = usePathname();
      const [isOpen, setIsOpen] = useState(false);
      const [isLoading, setIsLoading] = useState(false);

      const onDeleteHandler = async () => {
        try {
          setIsLoading(true);
          console.log("hit");
          const response = await deleteProdukById(row.getValue("id_produk"));

          // Auto refresh data when success.
          if (response?.status == 200 || response?.status == 201) {
            onRefresh!();
          }
        } catch (error: any) {
          console.error("Error deleting karyawan: " + error);
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
              <Link href={`${pathname}/${row.getValue("id_produk")}`}>
                <DropdownMenuItem>
                  <Pencil size={"16"} /> Ubah
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                <Trash2 size={"16"} /> Hapus {row.getValue("id_produk")}
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
    header: () => {
      return <div className="w-10"></div>;
    },
  },
];
