"use client";

import axios from "axios";
import { IMetodePembayaran } from "../interfaces";
import { fetcher } from "../utils";
import useSWR from "swr";
import { toast } from "sonner";

export const getAllMetodePembayaran = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `${process.env.BASE_API}/metode-pembayaran`,
    fetcher,
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    const data: IMetodePembayaran[] = [
      {
        id_metode_pembayaran: 1,
        nama: "Transfer",
      },
      {
        id_metode_pembayaran: 2,
        nama: "Cash",
      },
    ];

    return { data, isLoading, mutate, error };
  }

  return {
    data: data,
    isLoading,
    error,
    isValidating,
    mutate,
  };
};
