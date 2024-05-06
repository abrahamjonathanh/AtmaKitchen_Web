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
import { toIndonesiaDate, toRupiah, toThousand } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import DeleteDialog from "@/components/deleteDialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IPemesananBahanBaku } from "@/lib/interfaces";
import { deleteProdukById } from "@/lib/api/produk";
import { deletePemesananBahanBakuById } from "@/lib/api/pemesanan-bahan-baku";

export const columns = (
  onRefresh?: () => void,
): ColumnDef<IPemesananBahanBaku>[] => [
  {
    accessorKey: "id_pemesanan_bahan_baku",
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
      <div className="px-4 font-medium">{row.getValue("nama")}</div>
    ),
  },
  {
    accessorKey: "harga_beli",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Harga Satuan
          <ArrowUpDown className="ml-2" size={"12"} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("harga_beli"));

      return <div className="px-4">{toRupiah(amount)}</div>;
    },
  },
  {
    accessorKey: "jumlah",
    header: () => <div>Banyak</div>,
    cell: ({ row }) => {
      return <div>{toThousand(row.getValue("jumlah"))}</div>;
    },
  },

  {
    accessorKey: "satuan",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Satuan
          <ArrowUpDown className="ml-2" size={"12"} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const satuanBadges: {
        code: string;
        variant: "violet" | "sky" | "lime" | "emerald";
        label: "Gram" | "Ml" | "Butir" | "Buah";
      }[] = [
        { code: "gr", variant: "violet", label: "Gram" },
        { code: "ml", variant: "sky", label: "Ml" },
        { code: "butir", variant: "lime", label: "Butir" },
        { code: "buah", variant: "emerald", label: "Buah" },
        // { code: "5", variant: "lime", label: "Hampers" },
      ];

      const satuanBadge = satuanBadges.find(
        (badge) => badge.code === row.getValue("satuan"),
      );
      return (
        <div className="px-4">
          <Badge variant={satuanBadge?.variant}>{satuanBadge?.label}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: () => <div>Tanggal Pesan</div>,
    cell: ({ row }) => {
      const createdAt: string = row.getValue("created_at");
      return <div>{toIndonesiaDate(createdAt)}</div>;
    },
  },
  {
    accessorKey: "total",
    header: () => <div>Total</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));

      return <div>{toRupiah(amount)}</div>;
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
          const response = await deletePemesananBahanBakuById(
            row.getValue("id_pemesanan_bahan_baku"),
          );

          if (response?.status === 200 || response?.status === 201) {
            onRefresh!();
          }
        } catch (error: any) {
          console.error("Error deleting pemesanan bahan baku: " + error);
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
              <Link
                href={`${pathname}/edit/${row.getValue(
                  "id_pemesanan_bahan_baku",
                )}`}
              >
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
    header: () => {
      return <div className="w-10"></div>;
    },
  },
];
