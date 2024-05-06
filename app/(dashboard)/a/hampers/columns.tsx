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
import { IHampers, IProduk } from "@/lib/interfaces";
import { deleteProdukById } from "@/lib/api/produk";

export const columns: ColumnDef<IHampers>[] = [
  {
    accessorKey: "id_produk_hampers",
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
          Nama Produk Hampers
          <ArrowUpDown className="ml-2" size={"12"} />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="px-4 font-medium">{row.getValue("nama")}</div>
    ),
  },
  {
    accessorKey: "detail_hampers",
    header: () => <div>Isi Hampers</div>,
    cell: ({ row }) => {
      const detailHampers: { id_detail_hampers: string; produk: IProduk }[] =
        row.getValue("detail_hampers");
      console.log(detailHampers);
      return (
        <div className="flex flex-wrap gap-1 ">
          {detailHampers.map((data, index: number) => (
            <Badge variant={"outline"} key={index}>
              {data.produk.nama} {data!.produk.ukuran}
            </Badge>
          ))}
        </div>
      );
    },
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
    id: "actions",
    cell: ({ row }) => {
      const pathname = usePathname();
      const [isOpen, setIsOpen] = useState(false);
      const [isLoading, setIsLoading] = useState(false);

      const onDeleteHandler = async () => {
        try {
          setIsLoading(true);
          console.log("hit");
          await deleteProdukById(row.getValue("id"));
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
              <Link
                href={`${pathname}/edit/${row.getValue("id_produk_hampers")}`}
              >
                <DropdownMenuItem>
                  <Pencil size={"16"} /> Ubah
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                <Trash2 size={"16"} /> Hapus {row.getValue("id_produk_hampers")}
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
