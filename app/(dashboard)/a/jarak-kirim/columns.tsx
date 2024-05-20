"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Trash2, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import DeleteDialog from "@/components/deleteDialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IJarakKirim } from "@/lib/interfaces";
import { deleteKaryawanById } from "@/lib/api/karyawan";
import { toRupiah } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<IJarakKirim>[] = [
  {
    accessorKey: "id_pesanan",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full"
        >
          # ID
          <ArrowUpDown className="ml-2" size={"12"} />
        </Button>
      );
    },
  },
  {
    accessorKey: "nama",
    accessorFn: (row) => row.pengiriman?.nama,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Lengkap
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
    accessorFn: (row) => row.pengiriman?.alamat,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Alamat
          <ArrowUpDown className="ml-2" size={"12"} />
        </Button>
      );
    },
    cell: ({ row }) => <div className="px-4">{row.getValue("alamat")}</div>,
  },
  {
    accessorKey: "jarak",
    accessorFn: (row) => row.pengiriman?.jarak,

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Jarak
          <ArrowUpDown className="ml-2" size={"12"} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("jarak"));

      return <div className="px-4">{amount ? `${amount} km` : "-"}</div>;
    },
  },
  {
    accessorKey: "harga",
    accessorFn: (row) => row.pengiriman?.harga,

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ongkir
          <ArrowUpDown className="ml-2" size={"12"} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("harga"));

      return <div className="px-4">{amount ? toRupiah(amount) : "-"}</div>;
    },
  },
  {
    accessorKey: "status",
    accessorFn: (row) => row.status_pesanan_latest?.status,

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
      const amount = parseFloat(row.getValue("jarak"));
      const status: String = row.getValue("status");
      return (
        <div className="px-4">
          {row.getValue("status") ? (
            <Badge
              variant={!status.startsWith("Menunggu") ? "success" : "alert"}
            >
              {row.getValue("status")}
            </Badge>
          ) : (
            <Badge variant={"alert"}>Menunggu</Badge>
          )}
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
          await deleteKaryawanById(row.getValue("id_pesanan"));
        } catch (error: any) {
          console.error("Error deleting jabatan: " + error);
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
              <Link
                href={`${pathname}/${row.original.pengiriman.id_pengiriman}`}
              >
                <DropdownMenuItem>
                  <Truck size={"16"} /> Atur Jarak Kirim
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                <Trash2 size={"16"} /> Hapus {row.getValue("id_pesanan")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={row.getValue("id_pesanan")}
            description="Tindakkan ini tidak dapat diulang ketika anda menekan Hapus."
            onSubmit={onDeleteHandler}
            isLoading={isLoading}
          />
        </>
      );
    },
  },
];
