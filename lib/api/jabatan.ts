"use client";

import axios from "axios";
import { IJabatan } from "../interfaces";
import { fetcher } from "../utils";
import useSWR from "swr";
import { toast } from "sonner";

export const getAllJabatan = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `${process.env.BASE_API}/role`,
    fetcher,
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    const data: IJabatan[] = [
      {
        id_role: 1,
        role: "Role 1",
        akun_count: 7,
      },
      {
        id_role: 2,
        role: "Role 2",
        akun_count: 0,
      },
    ];

    return { data, isLoading, mutate, error };
  }

  return {
    data: data,
    isLoading,
    error,
    isValidating,
    mutate,
  };
};

export const getJabatanById = (id: number) => {
  let { data, error, isLoading, isValidating } = useSWR(
    `${process.env.BASE_API}/role/${id}`,
    fetcher,
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    data = {
      id: 1,
      role: "Customer",
    };
  }

  return {
    data: data,
    isLoading,
    isError: error,
    isValidating,
  };
};

export const createJabatan = async (data: IJabatan) => {
  try {
    const response = await axios.post(`${process.env.BASE_API}/role`, data);

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

export const updateJabatanById = async (id: number, data: IJabatan) => {
  try {
    const response = await axios.put(
      `${process.env.BASE_API}/role/${id}`,
      data,
    );

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

export const deleteJabatanById = async (id: number) => {
  try {
    const response = await axios.delete(`${process.env.BASE_API}/role/${id}`);

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
