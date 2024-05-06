"use client";
import { toast } from "sonner";
import useSWR from "swr";
import { fetcher } from "../utils";
import { IPemesananBahanBaku } from "../interfaces";
import { axiosInstance } from "../axiosInstance";
import axios from "axios";

export const getAllPemesananBahanBaku = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.BASE_API}/bahan-baku/pemesanan`,
    fetcher,
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
    return { data, error, isLoading, mutate };
  }
  return { data, error, isLoading, mutate };
};

export const getPemesananBahanBakuById = (id: number) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `${process.env.BASE_API}/bahan-baku/pemesanan/${id}`,
    fetcher,
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    const data: IPemesananBahanBaku = {
      id_pemesanan_bahan_baku: "1",
      id_bahan_baku: "1",
      nama: "Coklat Batang",
      harga_beli: "3000",
      jumlah: "300",
      satuan: "gr",
      created_at: "2024-04-27T08:35:00Z",
      total: (300 * 3000).toString(),
    };

    return { data, error, isLoading, isValidating, mutate };
  }
  return { data, error, isLoading, isValidating, mutate };
};

export const deletePemesananBahanBakuById = async (id: number) => {
  try {
    const response = await axiosInstance().delete(
      `/bahan-baku/pemesanan/${id}`,
    );

    // Check if the database down
    if (response.status === 500) {
      toast.warning("Database is down! Switching to fakeAPI");

      const response = await axios.delete(
        `https://fakestoreapi.com/products/1`,
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

export const createPemesananBahanBaku = async (data: IPemesananBahanBaku) => {
  try {
    const response = await axiosInstance().post("/bahan-baku/pemesanan", data);

    if (response.status === 500) {
      toast.warning("Database is down! Switching to fakeAPI");

      const response = await axios.delete(
        `https://fakestoreapi.com/products/1`,
      );

      return response;
    }
    toast.success(response.data.message);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updatePemesananBahanBakuById = async (
  id: number,
  data: IPemesananBahanBaku,
) => {
  try {
    const response = await axiosInstance().put(
      `/bahan-baku/pemesanan/${id}`,
      data,
    );

    if (response.status === 500) {
      toast.warning("Database is down! Switching to fakeAPI");

      const response = await axios.delete(
        `https://fakestoreapi.com/products/1`,
      );

      return response;
    }
    toast.success(response.data.message);
    return response;
  } catch (error) {
    console.error(error);
  }
};
