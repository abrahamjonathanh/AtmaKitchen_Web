"use client";

import axios from "axios";
import { IProduk } from "../interfaces";
import { fetcher } from "../utils";
import useSWR from "swr";
import { toast } from "sonner";
import { axiosInstance } from "../axiosInstance";
import { NumericFormatProps } from "react-number-format";

export const getPoinByIdPelanggan = (id: string) => {
  let { data, error, isLoading, isValidating } = useSWR(
    `${process.env.BASE_API}/poin/${id}`,
    fetcher,
  );

  return {
    data: data,
    isLoading,
    isError: error,
    isValidating,
  };
};

export const getPoinByTotalHarga = (total_harga: any) => {
  let { data, error, isLoading, isValidating } = useSWR(
    `${process.env.BASE_API}/poin/harga/${total_harga}`,
    fetcher,
  );

  return {
    data: data,
    isLoading,
    isError: error,
    isValidating,
  };
};
