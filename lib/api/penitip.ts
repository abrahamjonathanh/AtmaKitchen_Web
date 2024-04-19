"use client";
import axios from 'axios';
import { toast } from 'sonner';
import { fetcher } from "../utils";
import useSWR from "swr";
import { IPenitip } from "../interfaces";


export const getPenitipById = (id:string) => {
  let { data, error, isLoading , isValidating} = useSWR(
    `${process.env.BASE_API}/penitip/${id}`,
    fetcher
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    data = [
      {
        id_penitip: "1",
        nama: "Albert",
        alamat: "Jln. Babarsari No. 81, Yogyakarta",
        telepon: "08734867348",
        created_at: "03 April 24",
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


export const getAllPenitip = () => {
  let { data, error, isLoading } = useSWR(
    `${process.env.BASE_API}/penitip`,
    fetcher
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    data = [
      {
        id_penitip: "1",
        nama: "Albert",
        alamat: "Jln. Babarsari No. 81, Yogyakarta",
        telepon: "08734867348",
        created_at: "03 April 24",
      },
    ];
  }

  return {
    data: data,
    isLoading,
    isError: error,
  };
};


//create
export const createPenitip = async (data: IPenitip) => {
  try {
    const response = await axios.post(  `${process.env.BASE_API}/penitip`, data);
    toast.success('Berhasil menambah data penitip!');
    return response;
  } catch (error) {
    toast.error('Terjadi kesalahan saat menambah data penitip...');
    throw error;
  }
};

//update
export const updatePenitipById = async (id: string, data: IPenitip) => {
  try {
    const response = await axios.put(`${process.env.BASE_API}/penitip/${id}`, data);
    toast.success('Berhasil mengubah data penitip!');
    return response;
  } catch (error: any) {
    toast.error('Terjadi kesalahan saat mengubah data penitip...');
    throw error;
  }
};

//delete
export const deletePenitipById = async (id: string) => {
  try {
    const response = await axios.delete(  `${process.env.BASE_API}/penitip/${id}`);
    toast.success('Berhasil menghapus data penitip!');
    return response;
  } catch (error: any) {
    toast.error('Terjadi kesalahan saat menghapus data penitip...');
    throw error;
  }
};
