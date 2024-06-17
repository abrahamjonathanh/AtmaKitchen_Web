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

import { useEffect, useReducer, useState } from "react";
import DeleteDialog from "@/components/deleteDialog";
import { usePathname, useRouter } from "next/navigation";
import { IPesanan, IPesananv2 } from "@/lib/interfaces";
import { deleteKaryawanById } from "@/lib/api/karyawan";
import {
  fetchBahanBaku,
  getBahanBakuUsage,
  pesananAcceptedById,
  pushNotification,
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
      const [statusDialogOpen, setStatusDialogOpen] = useReducer(
        (state: any, action: any) => {
          switch (action.type) {
            case "OPEN":
              return { isOpen: true, value: action.value };
            case "CLOSE":
              return { isOpen: false, value: undefined };
            default:
              return state;
          }
        },
        { isOpen: false, value: undefined },
      );

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

      const getBahanBakuKurang = async () => {
        try {
          const response = await fetchBahanBaku(row.getValue("id_pesanan"));
          console.log(response.data.total_kekurangan_per_bahan_baku);

          setKekuranganData(response.data.total_kekurangan_per_bahan_baku);
          console.log(kekuranganData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      const updateStatusPesananHandler = async (status: string) => {
        try {
          setIsLoading(true);
          const response = await updateStatusPesanan({
            data: { status },
            id_pesanan: row.getValue("id_pesanan"),
          });
          console.log(response);
          if (status == "Sedang dikirim kurir" || status == "Siap dipickup") {
            const response = await pushNotification({
              title: `Pesanan ${status}`,
              description: `Pesanan anda ${status}`,
              user_id: row.original.id_pelanggan,
            });

            console.log(response);
          }

          if (response?.status === 200) {
            onRefresh!();
          }
        } catch (error) {
          console.error("Error updating status pesanan: ", error);
        } finally {
          setIsLoading(false);
          setStatusDialogOpen({ type: "CLOSE", value: undefined });
        }
      };

      return (
        <>
          {row.getValue("status") != "Dibatalkan otomatis" && (
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
                  {/* Verifikasi pembayaran by Admin */}
                  {currentUser?.akun?.role?.role == "Admin" &&
                    row.getValue("status") == "Sudah dibayar" && (
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
                  {/* Lihat pesanan by ALL */}
                  <DropdownMenuItem
                    onClick={() => setDetailPesananDialogOpen(true)}
                  >
                    Lihat Pesanan
                  </DropdownMenuItem>

                  {/* Lihat kekurangan bahan baku setelah Diterima */}
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

                  {/* Lihat Pemakaian bahan baku */}
                  {(row.getValue("status") == "Diproses" ||
                    row.getValue("status") == "Siap dipickup" ||
                    row.getValue("status") == "Sedang dikirim kurir" ||
                    row.getValue("status") == "Sudah dipickup" ||
                    row.getValue("status") == "Selesai") && (
                    <DropdownMenuItem
                      onClick={async () => {
                        const bahanBakuData: any = await getBahanBakuUsage(
                          row.getValue("id_pesanan"),
                        );
                        setPemakaianData(bahanBakuData.data);
                        setIsBahanBakuUsageDialogOpen(true);
                      }}
                    >
                      Lihat Pemakaian Bahan Baku
                    </DropdownMenuItem>
                  )}

                  {/* Ubah status pesanan ADMIN ONLY: sedang dikirim kurir, siap dipickup*/}
                  {currentUser?.akun?.role?.role == "Admin" &&
                    row.getValue("status") == "Diproses" && (
                      <>
                        <DropdownMenuSeparator />
                        {row.getValue("jenis_pengiriman") !=
                          "Ambil Sendiri" && (
                          <DropdownMenuItem
                            onClick={() => {
                              setStatusDialogOpen({
                                type: "OPEN",
                                value: "Sedang dikirim kurir",
                              });
                            }}
                          >
                            <Truck size={"16"} /> Sedang dikirim kurir
                          </DropdownMenuItem>
                        )}

                        {row.getValue("jenis_pengiriman") ==
                          "Ambil Sendiri" && (
                          <DropdownMenuItem
                            onClick={() => {
                              setStatusDialogOpen({
                                type: "OPEN",
                                value: "Siap dipickup",
                              });
                            }}
                          >
                            <Grab size={"16"} /> Siap dipickup
                          </DropdownMenuItem>
                        )}
                      </>
                    )}

                  {/* Ubah status pesanan ADMIN ONLY: SELESAI */}
                  {(row.getValue("status") == "Siap dipickup" ||
                    row.getValue("status") == "Sedang dikirim kurir") &&
                    currentUser?.akun?.role?.role == "Admin" && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setStatusDialogOpen({
                              type: "OPEN",
                              value: "Selesai",
                            });
                          }}
                        >
                          <Check size={"16"} /> Selesai
                        </DropdownMenuItem>
                      </>
                    )}

                  <DropdownMenuSeparator />

                  {currentUser?.akun?.role?.role == "Manager Operasional" && (
                    <>
                      <DropdownMenuSeparator />
                      {row.getValue("status") == "Pembayaran valid" && (
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
            </>
          )}

          <ConfirmDialogCustomChildren
            isOpen={detailPesananDialogOpen}
            setIsOpen={setDetailPesananDialogOpen}
            title="Detail Pesanan"
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

          <ConfirmDialogCustomChildren
            isOpen={statusDialogOpen.isOpen}
            title={`Ubah status menjadi ${statusDialogOpen.value}`}
            setIsOpen={(isOpen) =>
              setStatusDialogOpen({ type: isOpen ? "OPEN" : "CLOSE" })
            }
            isLoading={isLoading}
            onSubmit={() => updateStatusPesananHandler(statusDialogOpen.value)}
          >
            <p>
              Apakah anda yakin untuk mengubah status menjadi{" "}
              {statusDialogOpen.value}?
            </p>
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
