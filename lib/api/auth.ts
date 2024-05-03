"use client";

import axios from "axios";
import { IAkun } from "../interfaces";
// import { fetcher } from "../utils";
// import useSWR from "swr";
import { toast } from "sonner";
import Cookies from "js-cookie";
import useSWR from "swr";
import { fetcher } from "../utils";
import { useRouter } from "next/navigation";
export const register = async (data: IAkun) => {
  try {
    const response = await axios.post(`${process.env.BASE_API}/register`, data);

    // Check if the database down
    if (response.status === 500) {
      toast.warning("Database is down! Switching to fakeAPI");

      const response = await axios.post(
        `https://fakestoreapi.com/products/`,
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

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(
      `${process.env.BASE_API}/auth/login`,
      data,
    );

    // Check if the database down
    if (response.status === 500) {
      toast.warning("Database is down! Switching to fakeAPI");

      const response = await axios.post(
        `https://fakestoreapi.com/products/`,
        data,
      );

      return response;
    }

    // localStorage.setItem("accessToken", response.data.data.access_token);

    // localStorage.setItem(
    //   "user",
    //   JSON.stringify({
    //     user: response.data.data.user,
    //     akun: response.data.data.akun,
    //   })
    // );
    Cookies.set("token", response.data.access_token, { expires: 1 });

    // ✅ Use toast when its done
    return response;
  } catch (error: any) {
    toast.warning(error.response.data.error);
    console.error(error.response);
  }
};

export const getCurrentUser = () => {
  const { data, isLoading, error, isValidating } = useSWR(
    `${process.env.BASE_API}/auth/me`,
    fetcher,
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    return {
      data: {
        id_pelanggan: 1,
        id_akun: {
          id_akun: 1,
          email: "nepreufrebeije-3962@yopmail.com",
          id_role: 5,
          profile_image:
            "https://via.placeholder.com/640x480.png/00dd88?text=modi",
          email_verified_at: null,
          remember_token: null,
        },
        nama: "Marlene Huels",
        tgl_lahir: "1986-12-31",
        telepon: null,
        created_at: "2024-04-25T08:07:18.000000Z",
        updated_at: "2024-04-25T08:07:18.000000Z",
        deleted_at: null,
      },
    };
  }

  return { data, isLoading, error, isValidating };
};

export const logout = async () => {
  const token = Cookies.get("token");

  const response = await axios.post(
    `${process.env.BASE_API}/auth/logout`,
    undefined,
    { headers: { Authorization: "Bearer " + token } },
  );

  if (response.status === 200) {
    toast.success(response.data.message);
    Cookies.remove("token");
  }

  return response;
};

export const sendOTP = async (data: { email: string }) => {
  try {
    const response = await axios.post(`${process.env.BASE_API}/send-otp`, data);

    if (response.status === 200) {
      toast.success(response.data.message);
    }

    return response;
  } catch (error: any) {
    toast.error(error.response.data.message);
    console.error(error);
  }
};
