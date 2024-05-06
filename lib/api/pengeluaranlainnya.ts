"use client";
import { toast } from "sonner";
import { IPengeluaranLainnya } from "../interfaces";
import useSWR from "swr";
import { fetcher } from "../utils";
import { axiosInstance } from "../axiosInstance";

export const getAllPengeluaranLainnya = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.BASE_API}/pengeluaran-lainnya`,
    fetcher,
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    const data: IPengeluaranLainnya[] = [
      {
        id_pengeluaran_lainnya: 1,
        nama: "listrik",
        tanggal: "2024-04-12",
        kategori: "1",
        biaya: "500000",
        karyawan: {
          id_karyawan: 1,
          nama: "Sasa",
          alamat: "Jl. Anggur",
          gaji_harian: "70000",
          telepon: "0812345678",
          akun: {
            role: { id_role: "1", role: "Admin" },
            email: "email@gmail.com",
            id_role: "1",
          },
        },
      },
    ];

    return { data, isLoading, error, mutate };
  }

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export const getPengeluaranLainnyaById = (id: number) => {
  const { data, error, isLoading, isValidating } = useSWR(
    `${process.env.BASE_API}/pengeluaran-lainnya/${id}`,
    fetcher,
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    const data: IPengeluaranLainnya = {
      id_pengeluaran_lainnya: 1,
      nama: "listrik",
      tanggal: "2024-04-12",
      kategori: "1",
      biaya: "500000",
      karyawan: {
        id_karyawan: 1,
        nama: "Sasa",
        alamat: "Jl. Anggur",
        gaji_harian: "70000",
        telepon: "0812345678",
        akun: {
          role: { id_role: "1", role: "Admin" },
          email: "email@gmail.com",
          id_role: "1",
        },
      },
    };
    return { data, isLoading, error, isValidating };
  }

  return {
    data: data,
    isLoading,
    error,
    isValidating,
  };
};

export const createPengeluaranLainnya = async (data: IPengeluaranLainnya) => {
  try {
    const response = await axiosInstance().post(`/pengeluaran-lainnya`, data);

    // ✅ Use toast when its done
    toast.success(response.data.message);

    return response;
  } catch (error) {
    toast.error("Oh no! terjadi kesalahan...");
  }
};

export const updatePengeluaranLainnyaById = async (
  id: number,
  data: IPengeluaranLainnya,
) => {
  try {
    const response = await axiosInstance().put(
      `/pengeluaran-lainnya/${id}`,
      data,
    );

    // ✅ Use toast when its done
    toast.success(response.data.message);

    return response;
  } catch (error: any) {
    toast.error("Oh no! terjadi kesalahan...");
    console.error(error);
  }
};

export const deletePengeluaranLainnyaById = async (id: number) => {
  try {
    const response = await axiosInstance().delete(`/pengeluaran-lainnya/${id}`);

    // ✅ Use toast when its done
    toast.success(response.data.message);

    return response;
  } catch (error: any) {
    toast.error("Oh no! terjadi kesalahan...");
  }
};
