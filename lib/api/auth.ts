"use client";

import axios from "axios";
import { IAkun } from "../interfaces";
// import { fetcher } from "../utils";
// import useSWR from "swr";
import { toast } from "sonner";

export const register = async (data: IAkun) => {
  try {
    const response = await axios.post(`${process.env.BASE_API}/register`, data);

    // Check if the database down
    if (response.status === 500) {
      toast.warning("Database is down! Switching to fakeAPI");

      const response = await axios.post(
        `https://fakestoreapi.com/products/`,
        data
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

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${process.env.BASE_API}/login`, data);

    // Check if the database down
    if (response.status === 500) {
      toast.warning("Database is down! Switching to fakeAPI");

      const response = await axios.post(
        `https://fakestoreapi.com/products/`,
        data
      );

      return response;
    }

    localStorage.setItem("accessToken", response.data.data.access_token);
    localStorage.setItem("akun", JSON.stringify(response.data.data.akun));

    // ✅ Use toast when its done
    toast.success(response?.data?.message);

    return response;
  } catch (error: any) {
    toast.warning(error.response.data.message);
    console.error(error.response.data.message);
  }
};
