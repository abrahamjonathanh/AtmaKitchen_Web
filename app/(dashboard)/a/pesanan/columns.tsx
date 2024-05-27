"use client";

import { useSWRConfig } from "swr"; // Copy this for create, update, delete
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Box,
  Check,
  Grab,
  MoreHorizontal,
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
import {
  fetchBahanBaku,
  terimaPesananById,
  tolakPesananById,
} from "@/lib/api/pesanan";
import { useFormStatus } from "react-dom";
import { axiosInstance } from "@/lib/axiosInstance";
import BahanBakuDialog from "@/components/bahanBakuDialog";
import { toast } from "sonner";

export const columns: ColumnDef<IPesananv2>[] = [
  {
    accessorKey: "id_pesanan",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          # ID
          <ArrowUpDown className="ml-2" size={"12"} />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="px-4">{row.getValue("id_pesanan")}</div>;
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

      return <div>{amount ? toRupiah(amount) : "-"}</div>;
    },
  },
  {
    accessorKey: "total_tip",
    header: () => <div className="w-auto max-w-56">Tip</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_tip"));

      return <div>{amount ? toRupiah(amount) : "-"}</div>;
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
        variant:
          | "lime"
          | "emerald"
          | "sky"
          | "violet"
          | "fuchsia"
          | "rose"
          | "gray"
          | "success";
      }[] = [
        { code: "Pesanan diterima", variant: "lime" },
        { code: "Pembayaran diterima", variant: "success" },
        { code: "Menunggu ongkir", variant: "emerald" },
        { code: "Menunggu pembayaran", variant: "sky" },
        { code: "Menunggu konfirmasi pembayaran", variant: "violet" },
        { code: "Pesanan diproses", variant: "fuchsia" },
        { code: "Pesanan dikirim", variant: "rose" },
        { code: "Pesanan ditolak", variant: "gray" },
      ];

      const statusBadge = statusBadges.find(
        (badge) => badge.code == row.getValue("status"),
      );
      return (
        <div className="px-4">
          <Badge variant={statusBadge?.variant}>{statusBadge?.code}</Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const pathname = usePathname();
      const [isOpen, setIsOpen] = useState(false);
      const [pesananId, setPesananId] = useState<string | null>(null);
      const { mutate } = useSWRConfig(); // // Copy this for create, update, delete
      const router = useRouter(); // // Copy this for create, update, delete
      const [isLoading, setIsLoading] = useState(false); // // Copy this for create, update, delete
      const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
      const [confirmingAction, setConfirmingAction] = useState<
        "accepted" | "rejected" | null
      >(null);
      const [isBahanBakuDialogOpen, setIsBahanBakuDialogOpen] = useState(false); // State untuk menampilkan dialog bahan baku

      const handleConfirmation = (action: "accepted" | "rejected") => {
        setConfirmingAction(action);
        setConfirmDialogOpen(true);
      };

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

      const handleUpdateStatus = async (status: "accepted" | "rejected") => {
        try {
          setIsLoading(true);
          if (status === "accepted") {
            const pesananId = row.getValue("id_pesanan") as string;
            if (
              typeof pesananId === "string" ||
              typeof pesananId === "number"
            ) {
              await terimaPesananById(pesananId.toString());
              const bahanBakuData = await fetchBahanBaku(pesananId.toString());
              setPesananId(pesananId);
              setIsBahanBakuDialogOpen(true);

              if (
                bahanBakuData &&
                bahanBakuData.data &&
                bahanBakuData.data.total_kekurangan_per_bahan_baku
              ) {
                const kekuranganBahanBaku =
                  bahanBakuData.data.total_kekurangan_per_bahan_baku;

                const bahanBakuList = kekuranganBahanBaku.map(
                  (bahan: { nama_bahan_baku: any; total_kekurangan: any }) => ({
                    nama: bahan.nama_bahan_baku,
                    kekurangan: bahan.total_kekurangan,
                  }),
                );

                if (bahanBakuList.length > 0) {
                  // Tampilkan informasi dalam satu toast
                  const message = `${bahanBakuData.message}:<br />${bahanBakuList
                    .map(
                      (bahan: { nama: any; kekurangan: any }) => `
                      &nbsp;&nbsp;&nbsp;&nbsp;  - Nama bahan baku: ${bahan.nama}<br />
                      &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;    Total kekurangan: ${bahan.kekurangan}`,
                    )
                    .join("<br /><br />")}`;
                  toast.info(message);
                } else {
                  console.error(
                    "Data bahan baku tidak dalam format yang benar.",
                  );
                }
              } else {
                console.error("Data bahan baku sudah lengkap.");
              }
            } else {
              console.error("Invalid type for pesananId:", typeof pesananId);
            }
          } else {
            const pesananId = row.getValue("id_pesanan");
            if (
              typeof pesananId === "string" ||
              typeof pesananId === "number"
            ) {
              await tolakPesananById(pesananId.toString());
            } else {
              console.error("Invalid type for pesananId:", typeof pesananId);
            }
          }
          mutate("/api/pesanan");
        } catch (error) {
          console.error(`Failed to mark order as ${status}: `, error);
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
              <DropdownMenuItem onClick={() => handleUpdateStatus("accepted")}>
                <Check size={"16"} /> Diproses
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => handleUpdateStatus("rejected")}>
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
