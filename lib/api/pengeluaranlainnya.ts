"use client";
import axios from "axios";
import { toast } from "sonner";
import { IPengeluaranLainnya } from "../interfaces";

export const getAllPengeluaranLainnya = async () => {
  try {
    const response = await axios.get(`${process.env.BASE_API}/pengeluaran-lainnya`);
    toast.success("Berhasil mendapatkan data");
    return response;
  } catch (error) {
    toast.error("Oh no! terjadi kesalahan...");
  }
};

export const createPengeluaranLainnya = async (data: IPengeluaranLainnya) => {
  try {
    // Boiler template for fetching api
    // You can use `${process.env.BASE_API}/YOUR_ROUTE` for fetching real api
    console.log(data);
    const response = await axios.get(`https://fakestoreapi.com/products`);

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
      `https://fakestoreapi.com/products/${id}`,
      data
    );

    // ✅ Use toast when its done
    toast.success("Berhasil mengubah data...");

    return response;
  } catch (error: any) {
    toast.error("Oh no! terjadi kesalahan...");
  }
};

export const deletePengeluaranLainnyaById = async (id: number) => {
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
