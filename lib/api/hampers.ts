"use client";
import { toast } from "sonner";
import { fetcher } from "../utils";
import useSWR from "swr";
import { IHampers } from "../interfaces";

export const getAllHampers = () => {
  const { data, error, isLoading, isValidating } = useSWR(
    `${process.env.BASE_API}/hampers`,
    fetcher
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    const data: IHampers[] = [
      {
        id_produk_hampers: 1,
        nama: "Paket A",
        harga_jual: "650",
        detail_produk: [
          { id_produk: "1", nama: "Lapis Legit", ukuran: "10x20 cm" },
          { id_produk: "2", nama: "Brownies", ukuran: "10x20 cm" },
          { id_produk: "3", nama: "Exclusive Box" },
          { id_produk: "4", nama: "Card" },
        ],
      },
      {
        id_produk_hampers: 2,
        nama: "Paket B",
        harga_jual: "550000",
        detail_produk: [
          { id_produk: "1", nama: "Lapis Surabaya", ukuran: "10x20 cm" },
          { id_produk: "2", nama: "Roti Sosis" },
          { id_produk: "3", nama: "Exclusive Box" },
          { id_produk: "4", nama: "Card" },
        ],
      },
    ];
    return { data, error, isLoading, isValidating };
  }
  return { data, error, isLoading, isValidating };
};
