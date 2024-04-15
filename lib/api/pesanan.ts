"use client";
import axios from "axios";
import { toast } from "sonner";
import { IRiwayatPesanan } from "../interfaces";

export const getAllRiwayatPesananByPelangganId = async (idPelanggan: number) => {
  try {
    const response = await axios.get(`/api/pelanggan/${idPelanggan}/riwayat-pesanan`);
    toast.success("Berhasil mendapatkan riwayat pesanan");
    return response.data as IRiwayatPesanan[];
  } catch (error) {
    toast.error("Oh no! Terjadi kesalahan saat mengambil riwayat pesanan.");
    throw error;
  }
};
