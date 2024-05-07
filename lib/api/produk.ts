"use client";

import axios from "axios";
import { IProduk } from "../interfaces";
import { fetcher } from "../utils";
import useSWR from "swr";
import { toast } from "sonner";
import { axiosInstance } from "../axiosInstance";

export const getAllProduk = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.BASE_API}/produk`,
    fetcher,
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    const data: IProduk[] = [
      {
        id_produk: "1",
        nama: "Lapis Legit",
        id_kategori: "1",
        id_penitip: null,
        kapasitas: "20",
        ukuran: "20x20 cm",
        harga_jual: "500000",
        image: [],
      },
      {
        id_produk: "2",
        nama: "Lapis Surabaya",
        id_kategori: "1",
        id_penitip: null,
        kapasitas: "20",
        ukuran: "20x20 cm",
        harga_jual: "400000",
        image: [],
      },
      {
        id_produk: "3",
        nama: "Roti Sobek",
        id_kategori: "3",
        id_penitip: null,
        kapasitas: "20",
        ukuran: "10x10 cm",
        harga_jual: "30000",
        image: [],
      },
      {
        id_produk: "4",
        nama: "Boba Milk Tea",
        id_kategori: "2",
        id_penitip: "1",
        kapasitas: "20",
        ukuran: "500ml",
        harga_jual: "20000",
        image: [],
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

export const getProdukById = (id: number) => {
  let { data, error, isLoading, isValidating } = useSWR(
    `${process.env.BASE_API}/produk/${id}`,
    fetcher,
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    data = {
      id_produk: 1,
      nama: "Lapis Legit",
      id_kategori: "1",
      id_penitip: null,
      kapasitas: "20",
      ukuran: "20x20 cm",
      harga_jual: "500000",
      image: [],
    };
  }

  return {
    data: data,
    isLoading,
    isError: error,
    isValidating,
  };
};

export const createProduk = async (data: IProduk) => {
  try {
    // Boiler template for fetching api
    // You can use `${process.env.BASE_API}/YOUR_ROUTE` for fetching real api
    console.log(data);
    const response = await axiosInstance().post(`/produk`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
    // Check if the database down
    if (response.status === 500) {
      toast.warning("Database is down! Switching to fakeAPI");

      const response = await axios.post(
        `https://fakestoreapi.com/products/`,
        data,
      );

      return response;
    }

    // ✅ Use toast when its done
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

export const updateProdukById = async (id: number, data: IProduk) => {
  try {
    // Boiler template for fetching api
    // You can use `${process.env.BASE_API}/YOUR_ROUTE` for fetching real api
    const response = await axiosInstance().post(`/produk/${id}`, data);

    // Check if the database down
    if (response.status === 500) {
      toast.warning("Database is down! Switching to fakeAPI");

      const response = await axios.put(
        `https://fakestoreapi.com/products/${id}`,
        data,
      );

      return response;
    }

    // ✅ Use toast when its done
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

export const deleteProdukById = async (id: number) => {
  try {
    // Boiler template for fetching api
    // You can use `${process.env.BASE_API}/YOUR_ROUTE` for fetching real api
    const response = await axiosInstance().delete(`/produk/${id}`);

    if (response.status === 500) {
      toast.warning("Database shutdown! Switching to fakeAPI");
      const response = await axios.delete(
        `https://fakestoreapi.com/products/${id}`,
      );

      return response;
    }

    // ✅ Use toast when its done
    toast.success(response?.data?.message);

    return response;
  } catch (error: any) {
    toast.error("Oh no! terjadi kesalahan...");
  }
};
