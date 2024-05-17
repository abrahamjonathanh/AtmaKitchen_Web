"use client";
import useSWR from "swr";
import { fetcher } from "../utils";
import { toast } from "sonner";
import { IJarakKirim, IPengiriman } from "../interfaces";
import { axiosInstance } from "../axiosInstance";
import axios from "axios";

export const getAllJarakKirim = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.BASE_API}/pesanan/confirmpayments`,
    fetcher,
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    const data: IJarakKirim[] = [
      {
        id_pesanan: "17.03.24.002",
        pengiriman: {
          nama: "Andrew",
          alamat: "Jln. Babarsari",
          jarak: 27,
          harga: 25000,
          id_pengiriman: "",
          telepon: "",
        },
        status_pesanan_latest: {
          status: "dikirim",
        },
      },
    ];

    return {
      data: data,
      isLoading,
      error,
      mutate,
    };
  }

  return {
    data: data,
    isLoading,
    error,
    mutate,
  };
};

export const getJarakKirimById = (id: number) => {
  const { data, error, isLoading, isValidating } = useSWR(
    `${process.env.BASE_API}/pengiriman/${id}`,
    fetcher,
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    const data: IJarakKirim = {
      id_pesanan: "17.03.24.002",
      pengiriman: {
        nama: "Andrew",
        alamat: "Jln. Babarsari",
        jarak: 27,
        harga: 25000,
        telepon: "0125892935",
        id_pengiriman: "",
      },
      status_pesanan_latest: {
        status: "dikirim",
      },
    };

    return {
      data,
      isLoading,
      error,
      isValidating,
    };
  }

  return {
    data: data,
    isLoading,
    error,
    isValidating,
  };
};

export const createJarakKirim = async (
  id: number,
  data: { jarak: number; harga: number; id_kurir: number },
) => {
  try {
    const response = await axiosInstance().put(`/pengiriman/${id}`, data);

    // Check if the database down
    if (response.status === 500) {
      toast.warning("Database is down! Switching to fakeAPI");

      const response = await axios.post(
        `https://fakestoreapi.com/products/`,
        data,
      );

      return response;
    }

    toast.success(response?.data?.message);

    return response;
  } catch (error: any) {
    if (error.response.data.message) {
      const errorFields = Object.keys(error.response.data.message);
      errorFields.forEach((field) => {
        toast.error(error.response.data.message[field]);
      });
    } else {
      toast.error("Oh no! terjadi kesalahan...");
    }
    console.error(error.response.data.message);
  }
};
