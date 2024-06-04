"use client";
import { toast } from "sonner";
import { IPenarikanSaldo } from "../interfaces";
import useSWR from "swr";
import { fetcher } from "../utils";
import { axiosInstance } from "../axiosInstance";

export const getAllPenarikanSaldo = () => {
    const { data, error, isLoading, mutate } = useSWR(
      `${process.env.BASE_API}/penarikan-saldo`,
      fetcher,
    );
  
    if (!isLoading && error) {
      toast.warning("Database is down! Switching to fakeAPI");
      const data: IPenarikanSaldo[] = [
        {
            "id_penarikan_saldo": 1,
            "id_akun": 7,
            "jumlah_penarikan": 375250.55,
            "nama_bank": "bca",
            "nomor_rekening": "1828432968393519",
            "status": "menunggu",
            "transfer_at": "2024-05-27 02:59:43",
           
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

  export const updatePenarikanSaldoStatus = async (id: number, status: string) => {
    if (status !== 'selesai' && status !== 'ditolak') {
      toast.error("Status yang diberikan tidak valid.");
      return null;
  }

  try {
      const response = await axiosInstance().put(
        `${process.env.BASE_API}/penarikan-saldo/${id}`,
        {status},
      );
  
      if (response.status === 200 || response.status === 201) {
        toast.success("Status penarikan saldo berhasil diperbarui.");
        return response.data;
      } else {
        toast.error("Gagal memperbarui status penarikan saldo.");
        return null;
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat memperbarui status penarikan saldo.");
      console.error("Error updating withdrawal status: ", error);
      throw error;
    }
  };
  