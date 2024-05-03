"use client";
import axios from "axios";
import { toast } from "sonner";
import { fetcher } from "../utils";
import useSWR from "swr";
import { IPenitip } from "../interfaces";
import { axiosInstance } from "../axiosInstance";

export const getPenitipById = (id: string) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `${process.env.BASE_API}/penitip/${id}`,
    fetcher,
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    const data: IPenitip = {
      id_penitip: "1",
      nama: "Albert",
      alamat: "Jln. Babarsari No. 81, Yogyakarta",
      telepon: "08734867348",
      created_at: "03 April 24",
    };

    return { data, error, isLoading, isValidating, mutate };
  }

  return {
    data: data,
    isLoading,
    error,
    isValidating,
    mutate,
  };
};

export const getAllPenitip = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.BASE_API}/penitip`,
    fetcher,
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    const data: IPenitip[] = [
      {
        id_penitip: "1",
        nama: "Albert",
        alamat: "Jln. Babarsari No. 81, Yogyakarta",
        telepon: "08734867348",
        created_at: "03 April 24",
      },
    ];

    return { data, isLoading, error, mutate };
  }

  return {
    data: data,
    isLoading,
    error,
    mutate,
  };
};

//create
export const createPenitip = async (data: IPenitip) => {
  try {
    const response = await axiosInstance().post(`/penitip`, data);

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
  } catch (error) {
    toast.error("Terjadi kesalahan saat menambah data penitip...");
    throw error;
  }
};

//update
export const updatePenitipById = async (id: string, data: IPenitip) => {
  try {
    const response = await axiosInstance().put(`/penitip/${id}`, data);

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
    toast.error("Terjadi kesalahan saat mengubah data penitip...");
    throw error;
  }
};

//delete
export const deletePenitipById = async (id: string) => {
  try {
    const response = await axiosInstance().delete(`/penitip/${id}`);

    if (response.status === 500) {
      toast.warning("Database is down! Switching to fakeAPI");

      const response = await axios.delete(
        `https://fakestoreapi.com/products/${id}`,
      );

      return response;
    }

    toast.success(response?.data?.message);
    return response;
  } catch (error: any) {
    toast.error("Terjadi kesalahan saat menghapus data penitip...");
    throw error;
  }
};
