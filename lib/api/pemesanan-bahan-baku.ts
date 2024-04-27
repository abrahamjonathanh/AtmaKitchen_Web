"use client";
import { toast } from "sonner";
import useSWR from "swr";
import { fetcher } from "../utils";
import { IPemesananBahanBaku } from "../interfaces";

export const getAllPemesananBahanBaku = () => {
  const { data, error, isLoading, isValidating } = useSWR(
    `${process.env.BASE_API}/pemesananbahanbaku`,
    fetcher
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    const data: IPemesananBahanBaku[] = [
      {
        id_pemesanan_bahan_baku: "1",
        id_bahan_baku: "1",
        nama: "Coklat Batang",
        harga_beli: "3000",
        jumlah: "300",
        satuan: "gr",
        created_at: "2024-04-27T08:35:00Z",
        total: (300 * 3000).toString(),
      },
    ];
    return { data, error, isLoading, isValidating };
  }
  return { data, error, isLoading, isValidating };
};
