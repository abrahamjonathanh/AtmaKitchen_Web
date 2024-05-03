"use client";
import axios from "axios";
import { toast } from "sonner";
import useSWR from "swr";
import { fetcher } from "../utils";
import Brownies from "@/public/products/Brownies.png";
import { IResep } from "../interfaces";

// TODO: Make Resep Interface
export const getAllResep = () => {
  let { data, error, isLoading, isValidating } = useSWR(
    `${process.env.BASE_API}/resep`,
    fetcher
  );

  // Ini kondisi kalau databasenya error atau mati. Di pastikan dulu sudah tidak loading lagi (!isLoading) dan terjadi error (error). Itu alasan kenapa muncul !isLoading && error.
  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");

    // Ini data dummy nya, disesuaikan sama hasil API nya, ceritanya ini bohongan, kalau databasenya mati, biar nanti dia balikin data "palsu"
    data = [
      {
        id: 1,
        title: "Lapis Legit",
        image: "https://via.placeholder.com/640x480.png/0033bb?text=impedit",
      },
      {
        id: 3,
        title: "Lapis Surabaya",
        image: "https://via.placeholder.com/640x480.png/0033bb?text=impedit",
      },
      {
        id: 5,
        title: "Brownies",
        image: "https://via.placeholder.com/640x480.png/0033bb?text=impedit",
      },
      {
        id: 7,
        title: "Mandarin",
        image: "https://via.placeholder.com/640x480.png/0033bb?text=impedit",
      },
      {
        id: 9,
        title: "Spikoe",
        image: "https://via.placeholder.com/640x480.png/0033bb?text=impedit",
      },
    ];
  }

  return {
    data: data,
    isLoading,
    isError: error,
    isValidating,
  };
};

export const getResepById = (id: number) => {
  let { data, error, isLoading, isValidating } = useSWR(
    `${process.env.BASE_API}/resep/${id}`,
    fetcher
  );

  // Ini kondisi kalau databasenya error atau mati. Di pastikan dulu sudah tidak loading lagi (!isLoading) dan terjadi error (error). Itu alasan kenapa muncul !isLoading && error.
  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");

    // Ini data dummy nya, disesuaikan sama hasil API nya, ceritanya ini bohongan, kalau databasenya mati, biar nanti dia balikin data "palsu"
    data = {
      id_produk: id,
      nama: "Brownies",
      ukuran: "20x20",
      images: Brownies,
      resep: [
        {
          id_bahan_baku: {
            id_bahan_baku: 1,
            nama: "Coklat batang",
            satuan: "gr",
          },
          jumlah: 250,
        },
        {
          id_bahan_baku: {
            id_bahan_baku: 2,
            nama: "Butter",
            satuan: "gr",
          },
          jumlah: 100,
        },
        {
          id_bahan_baku: {
            id_bahan_baku: 3,
            nama: "Minyak goreng",
            satuan: "ml",
          },
          jumlah: 50,
        },
        {
          id_bahan_baku: {
            id_bahan_baku: 4,
            nama: "Telur",
            satuan: "butir",
          },
          jumlah: 6,
        },
        {
          id_bahan_baku: {
            id_bahan_baku: 5,
            nama: "Gula pasir",
            satuan: "gr",
          },
          jumlah: 200,
        },
        {
          id_bahan_baku: {
            id_bahan_baku: 5,
            nama: "Tepung terigu",
            satuan: "gr",
          },
          jumlah: 150,
        },
        {
          id_bahan_baku: {
            id_bahan_baku: 5,
            nama: "Coklat bubuk",
            satuan: "gr",
          },
          jumlah: 60,
        },
      ],
    };
  }

  return {
    data: data,
    isLoading,
    isError: error,
    isValidating,
  };
};

export const deleteResepById = async (id: number) => {
  try {
    // Boiler template for fetching api
    // You can use `${process.env.BASE_API}/YOUR_ROUTE` for fetching real api
    const response = await axios.delete(
      `https://fakestoreapi.com/products/${id}`
    );

    // ✅ Use toast when its done
    toast.success("Berhasil menghapus data...");

    return response;
  } catch (error: any) {
    toast.error("Oh no! terjadi kesalahan...");
  }
};

export const createResep = async (data: IResep) => {
  try {
    // Boiler template for fetching api
    // You can use `${process.env.BASE_API}/YOUR_ROUTE` for fetching real api
    const response = await axios.post(`${process.env.BASE_API}/resep`, data);

    // Check if the database down
    if (response.status === 500) {
      toast.warning("Database is down! Switching to fakeAPI");

      const response = await axios.post(
        `https://fakestoreapi.com/products/`,
        data
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
export const updateResepById = async (data: IResep, id_produk: number) => {
  try {
    // Boiler template for fetching api
    // You can use `${process.env.BASE_API}/YOUR_ROUTE` for fetching real api
    const response = await axios.put(
      `${process.env.BASE_API}/resep/${id_produk}`,
      data
    );

    // Check if the database down
    if (response.status === 500) {
      toast.warning("Database is down! Switching to fakeAPI");

      const response = await axios.post(
        `https://fakestoreapi.com/products/`,
        data
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
