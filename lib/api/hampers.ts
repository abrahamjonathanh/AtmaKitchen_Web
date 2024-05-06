"use client";
import axios from "axios";
import { toast } from "sonner";
import { fetcher } from "../utils";
import useSWR from "swr";
import { IHampers } from "../interfaces";
import { axiosInstance } from "../axiosInstance";

export const getAllHampers = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `${process.env.BASE_API}/hampers`,
    fetcher,
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    const data: IHampers[] = [
      {
        id_produk_hampers: 1,
        nama: "Paket A",
        harga_jual: "650",
        detail_hampers: [
          {
            id_produk: "1",
            id_detail_hampers: "1",
            id_produk_hampers: "1",
            produk: {
              nama: "Lapis Surabaya",
              harga_jual: "500000",
              id_produk: "1",
              kapasitas: "20",
              ukuran: "20x20 cm",
            },
          },
        ],
      },
    ];
    return { data, error, isLoading, isValidating, mutate };
  }
  return { data, error, isLoading, isValidating, mutate };
};

export const getHampersById = (id: number) => {
  let { data, error, isLoading, isValidating } = useSWR(
    `${process.env.BASE_API}/hampers/${id}`,
    fetcher,
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    data = {
      id_produk_hampers: 1,
      nama: "Paket A",
      harga_jual: "650",
      detail_hampers: [
        {
          id_produk: "1",
          id_detail_hampers: "1",
          id_produk_hampers: "1",
          produk: {
            nama: "Lapis Surabaya",
            harga_jual: "500000",
            id_produk: "1",
            kapasitas: "20",
            ukuran: "20x20 cm",
          },
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

export const createHampers = async (data: IHampers) => {
  try {
    // Boiler template for fetching api
    // You can use `${process.env.BASE_API}/YOUR_ROUTE` for fetching real api

    console.log(data);
    const response = await axiosInstance().post(`/hampers`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
    // Check if the database down
    if (response.status === 500) {
      toast.warning("Database is down! Switching to fakeAPI");

      const response = await axios.post(
        `https://fakestoreapi.com/hampers/`,
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

export const updateHampersById = async (id: number, data: IHampers) => {
  try {
    // Boiler template for fetching api
    // You can use `${process.env.BASE_API}/YOUR_ROUTE` for fetching real api
    const response = await axiosInstance().post(`/hampers/${id}`, data);

    // Check if the database down
    if (response.status === 500) {
      toast.warning("Database is down! Switching to fakeAPI");

      const response = await axios.put(
        `https://fakestoreapi.com/hampers/${id}`,
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

export const deleteHampersById = async (id: number) => {
  try {
    // Boiler template for fetching api
    // You can use `${process.env.BASE_API}/YOUR_ROUTE` for fetching real api
    const response = await axiosInstance().delete(`/hampers/${id}`);

    if (response.status === 500) {
      toast.warning("Database shutdown! Switching to fakeAPI");
      const response = await axios.delete(
        `https://fakestoreapi.com/hampers/${id}`,
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
