"use client";
import axios from "axios";
import { toast } from "sonner";
import { IBahanBaku } from "../interfaces";
import { fetcher } from "../utils";
import useSWR from "swr";

export const getAllBahanBaku = () => {
  let { data, error, isLoading } = useSWR(
    `${process.env.BASE_API}/bahan-baku`,
    fetcher
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    data = [
      {
        id: 1,
        nama: "Tepung Terigu",
        stok: "100",
        stok_minimum: "10",
        satuan: "kg",
        updated_at: "2024-04-04T10:00:00Z",
      },
    ];
  }

  return {
    data: data,
    isLoading,
    isError: error,
  };
};


// create
export const createBahanBaku = async (data: IBahanBaku) => {
  try {
    const response = await axios.post(
      `${process.env.BASE_API}/bahan-baku`,
      data
    );

    toast.success("Berhasil menambah data bahan baku!");

    return response;
  } catch (error) {
    toast.error("Terjadi kesalahan saat menambah data bahan baku...");
    throw error;
  }
};

// update
export const updateBahanBakuById = async (id: number, data: IBahanBaku) => {
  try {
    const response = await axios.put(
      `${process.env.BASE_API}/bahan-baku/${id}`,
      data
    );

    toast.success("Berhasil mengubah data bahan baku!");

    return response;
  } catch (error: any) {
    toast.error("Terjadi kesalahan saat mengubah data bahan baku...");
    throw error;
  }
};

// delete
export const deleteBahanBakuById = async (id: number) => {
  try {
    const response = await axios.delete(
      `${process.env.BASE_API}/bahan-baku/${id}`,

    );

    toast.success("Berhasil menghapus data bahan baku!");

    return response;
  } catch (error: any) {
    toast.error("Oh no! terjadi kesalahan...");
  }
};
