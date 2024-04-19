"use client";
import axios from "axios";
import { toast } from "sonner";
import { IRiwayatPesanan } from "../interfaces";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "../utils";

export const getAllRiwayatPesananByPelangganId = async (
  idPelanggan: number
) => {
  try {
    const response = await axios.get(
      `/api/pelanggan/${idPelanggan}/riwayat-pesanan`
    );
    toast.success("Berhasil mendapatkan riwayat pesanan");
    return response.data as IRiwayatPesanan[];
  } catch (error) {
    toast.error("Oh no! Terjadi kesalahan saat mengambil riwayat pesanan.");
    throw error;
  }
};

export const getAllPesanan = async () => {
  let { data, error, isLoading } = useSWR(
    `${process.env.BASE_API}/pesanan`,
    fetcher
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    data = [
      {
        id_pesanan: "17.04.24.001",
        id_metode_pembayaran: {
          id_metode_pembayaran: 2,
          nama: "Cash",
        },
        id_pelanggan: 2,
        tgl_order: "2024-04-04",
        total_diskon_poin: 0,
        total_pesanan: 120000,
        total_setelah_diskon: 120000,
        total_dibayarkan: 150000,
        total_tip: 30000,
        verified_at: "2024-03-20 08:47:18",
        accepted_at: null,
        pelanggan: {
          id_pelanggan: 2,
          id_akun: 2,
          nama: "Alyce Boyer I",
          tgl_lahir: "2013-04-24",
          telepon: null,
        },
        status_pesanan: [
          {
            id_status_pesanan: 2,
            id_pesanan: "17.03.24.002",
            id_karyawan: 1,
            status: "selesai",
            created_at: "2024-04-13T15:09:07.000000Z",
          },
        ],
        pengiriman: {
          id_pengiriman: 2,
          id_pesanan: "17.03.24.002",
          id_kategori_pengiriman: 3,
          id_kurir: 10,
          jarak: 11,
          harga: 20000,
          nama: "Giovanni Shields IV",
          telepon: "045361757409605",
          alamat: "5064 Goyette Forks Suite 145\nBernierport, MO 60154",
          created_at: "2024-04-13T15:09:06.000000Z",
        },
      },
    ];
  }

  return {
    data: data,
    isLoading,
    isError: error,
  };
};
