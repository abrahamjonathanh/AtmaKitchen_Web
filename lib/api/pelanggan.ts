"use client";
import axios from "axios";
import { toast } from "sonner";

// Mendapatkan semua pelanggan
export const getAllPelanggan = async () => {
  try {
    const response = await axios.get(`${process.env.BASE_API}/pelanggan`);
    toast.success("Berhasil mendapatkan data pelanggan...");
    return response;
  } catch (error) {
    toast.error("Oh no! Terjadi kesalahan saat mengambil data pelanggan...");
  }
};

// Mendapatkan detail pelanggan berdasarkan ID
export const getPelangganById = async (id: number) => {
  try {
    const response = await axios.get(`${process.env.BASE_API}/pelanggan/${id}`);
    toast.success("Berhasil mendapatkan detail pelanggan...");
    return response;
  } catch (error) {
    toast.error("Oh no! Terjadi kesalahan saat mengambil detail pelanggan...");
  }
};

// Mendapatkan riwayat pesanan pelanggan berdasarkan ID
export const getRiwayatPesananPelangganById = async (id: number) => {
  try {
    const response = await axios.get(
      `${process.env.BASE_API}/pelanggan/${id}/riwayat-pesanan`
    );
    toast.success("Berhasil mendapatkan riwayat pesanan pelanggan...");
    return response;
  } catch (error) {
    toast.error(
      "Oh no! Terjadi kesalahan saat mengambil riwayat pesanan pelanggan..."
    );
  }
};

// Menghapus pelanggan berdasarkan ID
export const deletePelangganById = async (id: number) => {
  try {
    const response = await axios.delete(
      `https://fakestoreapi.com/products/${id}`
    );

    // ✅ Use toast when its done
    toast.success("Berhasil menghapus data...");

    return response;
  } catch (error) {
    toast.error("Oh no! Terjadi kesalahan saat menghapus data pelanggan...");
  }
};
