"use client";
import useSWR from "swr";
import { fetcher } from "../utils";
import { toast } from "sonner";
import { axiosInstance } from "../axiosInstance";

export const getAlamatPelangganById = (id_pelanggan: number) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `${process.env.BASE_API}/alamat/${id_pelanggan}`,
    fetcher,
  );

  if (error && !isLoading) {
    toast.warning("Database is down! Switching to fakeAPI");
    return { data, isLoading, error, isValidating, mutate };
  }

  return { data, error, isLoading, isValidating, mutate };
};

export const deleteAlamatById = async (id_alamat: number) => {
  try {
    const response = await axiosInstance().delete(`/alamat/${id_alamat}`);

    toast.success(response.data.message);

    return response;
  } catch (error) {
    toast.error("Error");
  }
};
