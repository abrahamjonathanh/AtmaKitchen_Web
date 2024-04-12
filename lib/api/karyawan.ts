"use client";
import axios from "axios";
import { toast } from "sonner";
import { IKaryawan } from "../interfaces";

export const getAllKaryawan = async () => {
  try {
    // Boiler template for fetching api
    // You can use `${process.env.BASE_API}/YOUR_ROUTE` for fetching real api
    // Add BASE_API to your .env file. Example: BASE_API=http://127.0.0.1:8000/api
    const response = await axios.get(`${process.env.BASE_API}/karyawan`);

    // const response = await axios.get(`https://fakestoreapi.com/products`);

    // ✅ Use toast when its done
    toast.success("Berhasil mendapatkan data...");

    return response;
  } catch (error) {
    toast.error("Oh no! terjadi kesalahan...");
  }
};

export const createKaryawan = async (data: IKaryawan) => {
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

export const updateKaryawanById = async (id: number, data: IKaryawan) => {
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

export const deleteKaryawanById = async (id: number) => {
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
