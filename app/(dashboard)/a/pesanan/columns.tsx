"use client";

import { useSWRConfig } from "swr"; // Copy this for create, update, delete
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Box,
  Check,
  CheckCheck,
  Clock,
  CreditCard,
  Grab,
  Hand,
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
import { statusPesananBadge, toIndonesiaDate, toRupiah } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

import { useEffect, useState } from "react";
import DeleteDialog from "@/components/deleteDialog";
import { usePathname, useRouter } from "next/navigation";
import { IPesanan, IPesananv2 } from "@/lib/interfaces";
import { deleteKaryawanById } from "@/lib/api/karyawan";
import {
  fetchBahanBaku,
  getBahanBakuUsage,
  pesananAcceptedById,
  tolakPesananById,
  updateStatusPesanan,
  useBahanBaku,
} from "@/lib/api/pesanan";
import { useFormStatus } from "react-dom";
import { axiosInstance } from "@/lib/axiosInstance";
import BahanBakuDialog from "@/components/bahanBakuDialog";
import { toast } from "sonner";
import { useCurrentUserStore } from "@/lib/state/user-store";
import ConfirmDialog, {
  ConfirmDialogCustomChildren,
} from "@/components/confirmDialog";
import UpdateDialog from "@/components/updateDialog";
import PesananConfirmDialog from "@/components/pesananConfirmDialog";
import TolakDialog from "@/components/tolakDialog";

export const columns = (onRefresh?: () => void): ColumnDef<IPesananv2>[] => [
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
    accessorKey: "tgl_order",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Untuk Tanggal
          <ArrowUpDown className="ml-2" size={"12"} />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="px-4">{toIndonesiaDate(row.getValue("tgl_order"))}</div>
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
          {toRupiah(
            parseInt(row.original.total_setelah_diskon.toString()) +
              (row.original?.pengiriman?.harga!
                ? row.original?.pengiriman?.harga!
                : 0),
          )}
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
      const statusBadge = statusPesananBadge(row.getValue("status"));
      return (
        <div className="px-4">
          <Badge variant={statusBadge.variant}>{statusBadge.children}</Badge>
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
      const [DiprosesDialogOpen, setDiprosesDialogOpen] = useState(false);
      const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
      const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
      const [detailPesananDialogOpen, setDetailPesananDialogOpen] =
        useState(false);
      const [confirmingAction, setConfirmingAction] = useState<
        "accepted" | "rejected" | null
      >(null);
      const [isBahanBakuDialogOpen, setIsBahanBakuDialogOpen] = useState(false);
      const [isBahanBakuUsageDialogOpen, setIsBahanBakuUsageDialogOpen] =
        useState(false);
      const { currentUser } = useCurrentUserStore();
      const handleConfirmation = (action: "accepted" | "rejected") => {
        setConfirmingAction(action);
        setConfirmDialogOpen(true);
      };

      const [kekuranganData, setKekuranganData] = useState([]);
      const [pemakaianData, setPemakaianData] = useState([]);
      // let bahanBakuData = [{}];
      const onDeleteHandler = async () => {
        try {
          setIsLoading(true);

          const response = await deleteKaryawanById(
            row.getValue("id_karyawan"),
          );

          if (response?.status == 200 || response?.status == 201) {
            mutate("/karyawan"); // For auto refresh
          }
        } catch (error: any) {
          console.error("Error deleting karyawan: " + error);
        } finally {
          setIsLoading(false);
          setIsOpen(false);
        }
      };

      // useEffect(() => {
      //   console.log(kekuranganData);
      //   console.log(isBahanBakuDialogOpen);
      // }, [kekuranganData, isBahanBakuDialogOpen]);

      const handleUpdateStatus = async (
        status: "accepted" | "rejected" | "process",
      ) => {
        try {
          setIsLoading(true);
          const pesananId = row.getValue("id_pesanan") as string;

          if (status === "accepted") {
            await pesananAcceptedById(pesananId);
          } else if (status === "rejected") {
            await tolakPesananById(pesananId);
          } else {
            const data = await fetchBahanBaku(pesananId);
            if (data.data.length == 0) {
              await updateStatusPesanan({
                data: { status: "Diproses" },
                id_pesanan: pesananId,
              });
              await useBahanBaku(pesananId);
            } else {
              toast.error("Masih ada bahan baku yang kurang!");
            }
          }
          onRefresh!();
        } catch (error) {
          console.error(`Failed to mark order as ${status}: `, error);
        } finally {
          setIsLoading(false);
          setIsOpen(false);
          setConfirmDialogOpen(false);
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
              {currentUser?.akun?.role?.role == "Admin" && (
                <DropdownMenuItem
                  onClick={() =>
                    router.push(
                      `${pathname}/verify/${row.getValue("id_pesanan")}`,
                    )
                  }
                >
                  Verifikasi pembayaran
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => {
                  setDetailPesananDialogOpen(true);
                }}
              >
                Lihat Pesanan
              </DropdownMenuItem>

              {row.getValue("status") == "Diterima" && (
                <DropdownMenuItem
                  onClick={async () => {
                    const bahanBakuData = await fetchBahanBaku(
                      row.getValue("id_pesanan"),
                    );
                    setKekuranganData(bahanBakuData.data);
                    setIsBahanBakuDialogOpen(true);
                  }}
                >
                  Lihat Kekurangan Bahan Baku
                </DropdownMenuItem>
              )}

              {(row.getValue("status") == "Diproses" ||
                row.getValue("status") == "Siap dipickup" ||
                row.getValue("status") == "Sedang dikirim kurir" ||
                row.getValue("status") == "Sudah dipickup" ||
                row.getValue("status") == "Selesai") && (
                <DropdownMenuItem
                  onClick={async () => {
                    const bahanBakuData = await getBahanBakuUsage(
                      row.getValue("id_pesanan"),
                    );
                    setPemakaianData(bahanBakuData.data);
                    setIsBahanBakuUsageDialogOpen(true);
                  }}
                >
                  Lihat Pemakaian Bahan Baku
                </DropdownMenuItem>
              )}

              {currentUser?.akun?.role?.role == "Admin" && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Truck size={"16"} /> Siap dikirim
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Grab size={"16"} /> Siap dipickup
                  </DropdownMenuItem>
                </>
              )}

              {(row.getValue("status") == "Sudah dipickup" ||
                row.getValue("status") == "Sedang dikirim kurir") && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsOpen(true)}>
                    <Check size={"16"} /> Selesai
                  </DropdownMenuItem>
                </>
              )}
              {currentUser?.akun?.role?.role == "Manager Operasional" && (
                <>
                  <DropdownMenuSeparator />
                  {row.getValue("status") !== "Ditolak" &&
                    row.getValue("status") !== "Diterima" &&
                    row.getValue("status") !== "Diproses" &&
                    row.getValue("status") !== "Siap dipickup" &&
                    row.getValue("status") !== "Sedang dikirim kurir" &&
                    row.getValue("status") !== "Sudah dipickup" &&
                    row.getValue("status") !== "Selesai" && (
                      <>
                        <DropdownMenuItem
                          onClick={() => setConfirmDialogOpen(true)}
                        >
                          <Check size={"16"} /> Diterima
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setRejectDialogOpen(true)}
                        >
                          <X size={"16"} /> Ditolak
                        </DropdownMenuItem>
                      </>
                    )}
                  {row.getValue("status") == "Diterima" && (
                    <DropdownMenuItem
                      onClick={() => setDiprosesDialogOpen(true)}
                    >
                      <Clock size={"16"} /> Diproses
                    </DropdownMenuItem>
                  )}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <ConfirmDialogCustomChildren
            isOpen={detailPesananDialogOpen}
            setIsOpen={setDetailPesananDialogOpen}
            title="Detail Pesanan"
            // onSubmit={() => console.log("SUBMITTED")}
          >
            {row.original.detail_pesanan?.map((data, index) => (
              <div className="flex items-center justify-between" key={index}>
                <p>{data.nama_produk}</p>
                <p>
                  {data.jumlah} x {toRupiah(parseInt(data.harga))}
                </p>
              </div>
            ))}
          </ConfirmDialogCustomChildren>

          <PesananConfirmDialog
            isOpen={confirmDialogOpen}
            setIsOpen={setConfirmDialogOpen}
            title="Terima pesanan untuk diproses"
            buttonText="Terima"
            onSubmit={() => handleUpdateStatus("accepted")}
            isLoading={isLoading}
          >
            {row.original.detail_pesanan?.map((data, index) => (
              <div className="flex items-center justify-between" key={index}>
                <p>
                  {data.nama_produk} {data.produk?.ukuran}
                </p>
                <p>
                  {data.jumlah} x {toRupiah(parseInt(data.harga))}
                </p>
              </div>
            ))}
            {kekuranganData.length && <p>Showing</p>}

            {/* {kekuranganData!.map((data: any, index: number) => (
              <div key={index}>
                <p>
                  {data.nama_bahan_baku} {data.total_kekurangan}
                </p>
              </div>
            ))} */}
          </PesananConfirmDialog>

          <PesananConfirmDialog
            isOpen={DiprosesDialogOpen}
            setIsOpen={setDiprosesDialogOpen}
            title="Proses Pesanan"
            buttonText="Proses"
            onSubmit={() => handleUpdateStatus("process")}
            isLoading={isLoading}
          >
            {row.original.detail_pesanan?.map((data, index) => (
              <div className="flex items-center justify-between" key={index}>
                <p>
                  {data.nama_produk} {data.produk?.ukuran}
                </p>
                <p>
                  {data.jumlah} x {toRupiah(parseInt(data.harga))}
                </p>
              </div>
            ))}
            {kekuranganData.length && <p>Showing</p>}
          </PesananConfirmDialog>

          <TolakDialog
            isOpen={rejectDialogOpen}
            setIsOpen={setRejectDialogOpen}
            title="Tolak"
            onSubmit={() => handleUpdateStatus("rejected")}
          />

          <DeleteDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={row.getValue("pelanggan")}
            description="Tindakkan ini tidak dapat diulang ketika anda menekan Hapus."
            onSubmit={onDeleteHandler}
            isLoading={isLoading}
          />

          <BahanBakuDialog
            isOpen={isBahanBakuDialogOpen}
            setIsOpen={setIsBahanBakuDialogOpen}
            title="Kekurangan Bahan Baku"
            bahanBakuData={kekuranganData as []}
          />

          <BahanBakuDialog
            isOpen={isBahanBakuUsageDialogOpen}
            setIsOpen={setIsBahanBakuUsageDialogOpen}
            title="Pemakaian Bahan Baku"
            bahanBakuData={pemakaianData as []}
          />
        </>
      );
    },
    header: () => {
      return <div className="w-10 max-w-10"></div>;
    },
  },
];
