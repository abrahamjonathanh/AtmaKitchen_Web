"use client";

import { useSWRConfig } from "swr"; // Copy this for create, update, delete
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Box,
  Check,
  Grab,
  MoreHorizontal,
  Pencil,
  Trash2,
  Truck,
  X,
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
import { usePathname, useRouter } from "next/navigation";
import { IPesanan, IPesananv2 } from "@/lib/interfaces";
import { deleteKaryawanById } from "@/lib/api/karyawan";

export const columns: ColumnDef<IPesananv2>[] = [
  {
    accessorKey: "id_pesanan",
    header: () => {
      return <div className="w-10 max-w-16"># ID</div>;
    },
  },
  {
    accessorKey: "pelanggan",
    accessorFn: (row) => row.pelanggan.nama,
    header: ({ column }) => {
      return (
        <div className="w-auto">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Pelanggan
            <ArrowUpDown className="ml-2" size={"12"} />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="line-clamp-2 w-full px-4 font-medium ">
        {row.getValue("pelanggan")}
      </div>
    ),
  },
  {
    accessorKey: "jenis_pengiriman",
    header: () => <div className="w-auto max-w-56">Jenis Pengiriman</div>,
    cell: ({ row }) => {
      return (
        <div className="capitalize">{row.getValue("jenis_pengiriman")}</div>
      );
    },
  },
  {
    accessorKey: "tagihan",
    accessorFn: (row) =>
      (row.id_metode_pembayaran! as unknown as { nama: string }).nama,
    header: () => <div className="line-clamp-2 w-auto">Tagihan</div>,
    cell: ({ row }) => {
      return (
        <div className="line-clamp-2">
          <Badge variant={"outline"}>{row.getValue("tagihan")}</Badge>{" "}
          {toRupiah(parseInt(row.original.total_setelah_diskon.toString()))}
        </div>
      );
    },
  },
  {
    accessorKey: "total_dibayarkan",
    header: () => <div className="w-auto max-w-56">Diterima</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_dibayarkan"));

      return <div>{toRupiah(amount)}</div>;
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
      const statusBadges: {
        code: string;
        variant: "lime" | "emerald" | "sky" | "violet" | "fuchsia";
        label: "Selesai" | "Manager" | "Admin" | "Customer" | "Driver";
      }[] = [
        { code: "selesai", variant: "lime", label: "Selesai" },
        { code: "2", variant: "emerald", label: "Manager" },
        { code: "3", variant: "sky", label: "Admin" },
        { code: "4", variant: "violet", label: "Customer" },
        { code: "5", variant: "fuchsia", label: "Driver" },
      ];

      const statusBadge = statusBadges.find(
        (badge) => badge.code == row.getValue("status"),
      );
      return (
        <div className="px-4">
          <Badge variant={statusBadge?.variant}>{statusBadge?.label}</Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const pathname = usePathname();
      const [isOpen, setIsOpen] = useState(false);
      const { mutate } = useSWRConfig(); // // Copy this for create, update, delete
      const router = useRouter(); // // Copy this for create, update, delete
      const [isLoading, setIsLoading] = useState(false); // // Copy this for create, update, delete

      const onDeleteHandler = async () => {
        try {
          setIsLoading(true);

          const response = await deleteKaryawanById(
            row.getValue("id_karyawan"),
          );

          // Auto refresh data when success.
          if (response?.status == 200 || response?.status == 201) {
            mutate("/karyawan"); // For auto refresh
          }
        } catch (error: any) {
          console.error("Error deleting karyawan: " + error);
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
              {/* <Link href={`${pathname}/${row.getValue("id_karyawan")}`}> */}
              <DropdownMenuItem
                onClick={() =>
                  router.push(
                    `${pathname}/verify/${row.getValue("id_pesanan")}`,
                  )
                }
              >
                Verifikasi pembayaran
              </DropdownMenuItem>
              <DropdownMenuItem>Batalkan pesanan</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Truck size={"16"} /> Siap dikirim
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Grab size={"16"} /> Siap diambil
              </DropdownMenuItem>
              {/* <DropdownMenuItem
                onClick={() =>
                  router.push(`${pathname}/${row.getValue("id_karyawan")}`)
                }
              >
                <Pencil size={"16"} /> Ubah
              </DropdownMenuItem> */}
              {/* </Link> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                <Check size={"16"} /> Selesai
              </DropdownMenuItem>
              <DropdownMenuLabel>MO ONLY</DropdownMenuLabel>
              <DropdownMenuItem>Lihat Pesanan</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Box size={"16"} /> Diproses
              </DropdownMenuItem>
              <DropdownMenuItem>
                <X size={"16"} /> Ditolak
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={row.getValue("pelanggan")}
            description="Tindakkan ini tidak dapat diulang ketika anda menekan Hapus."
            onSubmit={onDeleteHandler}
            isLoading={isLoading}
          />
        </>
      );
    },
    header: () => {
      return <div className="w-10 max-w-10"></div>;
    },
  },
];
