"use client";
import axios from "axios";
import { IKaryawan } from "../interfaces";
import { fetcher } from "../utils";
import useSWR from "swr";
import { toast } from "sonner";
import { axiosInstance } from "../axiosInstance";

export const getAllKaryawan = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.BASE_API}/karyawan`,
    fetcher,
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    const data: IKaryawan[] = [
      {
        id_karyawan: 1,
        nama: "Sample Agus",
        alamat: "Jln. Babarsari",
        gaji_harian: "10000",
        telepon: "012912598",
        akun: {
          email: "emailags@gmail.com",
          role: { id_role: "1", role: "Admin" },
        },
      },
    ];

    return { data, error, isLoading, mutate };
  }

  return {
    data: data,
    isLoading,
    isError: error,
  };
};

export const getKaryawanById = (id: number) => {
  let { data, error, isLoading, isValidating } = useSWR(
    `${process.env.BASE_API}/karyawan/${id}`,
    fetcher,
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    data = {
      nama: "budi",
      alamat: "Jln babarsari",
      gaji_harian: "1000",
      id_role: "2",
      telepon: "1825912",
      akun: {
        id_akun: "1",
        role: {
          id_role: "3",
          role: "admin",
        },
      },
    };
  }

  return {
    data: data,
    isLoading,
    isError: error,
    isValidating,
  };
};

export const createKaryawan = async (data: IKaryawan) => {
  try {
    const response = await axiosInstance().post(`/karyawan`, data);

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

// export const getKaryawanById = async (id: number) => {
//   try {
//     const response = await axios.get(`${process.env.BASE_API}/karyawan/${id}`);

//     // Check if the database down
//     if (response.status === 500) {
//       // toast.warning("Database shutdown! Switching to fakeAPI");
//       return {
//         nama: "budi",
//         alamat: "Jln babarsari",
//         gaji_harian: "1000",
//         id_role: "2",
//         telepon: "1825912",
//         akun: {
//           id_akun: "1",
//           role: {
//             id_role: "3",
//             role: "admin",
//           },
//         },
//       };
//     }

//     return response;
//   } catch (error) {
//     // toast.error("Oh no! terjadi kesalahan...");
//   }
// };

export const updateKaryawanById = async (id: number, data: IKaryawan) => {
  try {
    // Boiler template for fetching api
    // You can use `${process.env.BASE_API}/YOUR_ROUTE` for fetching real api
    const response = await axiosInstance().put(`/karyawan/${id}`, data);

    // Check if the database down
    if (response.status === 500) {
      toast.warning("Database is down! Switching to fakeAPI");

      const response = await axios.put(
        `https://fakestoreapi.com/products/${id}`,
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

export const deleteKaryawanById = async (id: number) => {
  try {
    // Boiler template for fetching api
    // You can use `${process.env.BASE_API}/YOUR_ROUTE` for fetching real api
    const response = await axios.delete(
      `${process.env.BASE_API}/karyawan/${id}`,
    );

    if (response.status === 500) {
      toast.warning("Database shutdown! Switching to fakeAPI");
      const response = await axios.delete(
        `https://fakestoreapi.com/products/${id}`,
      );

      return response;
    }

    // ✅ Use toast when its done
    toast.success(response?.data?.message);

    return response;
  } catch (error: any) {
    toast.error("Oh no! terjadi kesalahan...");
  }
};
