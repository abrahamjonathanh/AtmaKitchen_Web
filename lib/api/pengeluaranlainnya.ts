"use client";
import axios from "axios";
import { toast } from "sonner";
import { IPengeluaranLainnya } from "../interfaces";
import useSWR from "swr";
import { fetcher } from "../utils";

export const getAllPengeluaranLainnya = () => {
  let { data, error, isLoading } = useSWR(
    `${process.env.BASE_API}/pengeluaran-lainnya`,
    fetcher
  );
  console.log(data);
  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    data = [
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
          akun: { role: { id_role: "1", role: "Admin" } },
       },
      },
    ];
  }

  return {
    data: data,
    isLoading,
    isError: error,
  };
};

export const getPengeluaranLainnyaById = (id: number) => {
  let { data, error, isLoading, isValidating } = useSWR(
    `${process.env.BASE_API}/pengeluaran-lainnya/${id}`,
    fetcher
  );

   if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    data = [
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
          akun: { role: { id_role: "1", role: "Admin" } },
       },
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

export const createPengeluaranLainnya = async (data: IPengeluaranLainnya) => {
  try {
    // Boiler template for fetching api
    // You can use `${process.env.BASE_API}/YOUR_ROUTE` for fetching real api
    console.log(data);
    const response = await axios.post(`${process.env.BASE_API}/pengeluaran-lainnya`, data);

    // ✅ Use toast when its done
    toast.success("Berhasil menambah data...");

    return response;
  } catch (error) {
    toast.error("Oh no! terjadi kesalahan...");
  }
};

export const updatePengeluaranLainnyaById = async (id: number, data: IPengeluaranLainnya) => {
  try {
    // Boiler template for fetching api
    // You can use `${process.env.BASE_API}/YOUR_ROUTE` for fetching real api
    const response = await axios.put(
      `${process.env.BASE_API}/pengeluaran-lainnya/${id}`,
      data
    );

    // ✅ Use toast when its done
    toast.success("Berhasil mengubah data...");

    return response;
  } catch (error: any) {
    toast.error("Oh no! terjadi kesalahan...");
    console.error(error);
  }
};

export const deletePengeluaranLainnyaById = async (id: number) => {
  try {
    // Boiler template for fetching api
    // You can use `${process.env.BASE_API}/YOUR_ROUTE` for fetching real api
    const response = await axios.delete(
      `${process.env.BASE_API}/pengeluaran-lainnya/${id}`
    );

    // ✅ Use toast when its done
    toast.success("Berhasil menghapus data...");

    return response;
  } catch (error: any) {
    toast.error("Oh no! terjadi kesalahan...");
  }
};
