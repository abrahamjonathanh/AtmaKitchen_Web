"use client";
import { toast } from "sonner";
import { fetcher } from "../utils";
import useSWR from "swr";
import { IHampers } from "../interfaces";

export const getAllHampers = () => {
  const { data, error, isLoading, isValidating } = useSWR(
    `${process.env.BASE_API}/hampers`,
    fetcher,
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    const data: IHampers[] = [
      {
        id_produk_hampers: 1,
        nama: "Paket A",
        harga_jual: "650",
        detail_hampers: [
          {
            id_produk: "1",
            id_detail_hampers: "1",
            id_produk_hampers: "1",
            produk: {
              nama: "Lapis Surabaya",
              harga_jual: "500000",
              id_produk: "1",
              kapasitas: "20",
              ukuran: "20x20 cm",
            },
          },
        ],
      },
    ];
    return { data, error, isLoading, isValidating };
  }
  return { data, error, isLoading, isValidating };
};
