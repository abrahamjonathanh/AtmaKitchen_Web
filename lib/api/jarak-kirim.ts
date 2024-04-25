"use client";
import useSWR from "swr";
import { fetcher } from "../utils";
import { toast } from "sonner";

export const getAllJarakKirim = () => {
  let { data, error, isLoading } = useSWR(
    `${process.env.BASE_API}/pengiriman`,
    fetcher
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    data = [
      {
        id_pesanan: "17.03.24.002",
        pengiriman: {
          nama: "Andrew",
          alamat: "Jln. Babarsari",
          jarak: 27,
          harga: 25000,
        },
        status_pesanan_latest: {
          status: "dikirim",
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

export const getJarakKirimById = (id: number) => {
  let { data, error, isLoading } = useSWR(
    `${process.env.BASE_API}/pengiriman/${id}`,
    fetcher
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    data = {
      id_pesanan: "17.03.24.002",
      pengiriman: {
        nama: "Andrew",
        alamat: "Jln. Babarsari",
        jarak: 27,
        harga: 25000,
        telepon: "0125892935",
      },
      status_pesanan_latest: {
        status: "dikirim",
      },
    };
  }

  return {
    data: data,
    isLoading,
    isError: error,
  };
};
