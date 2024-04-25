"use client";
import axios from "axios";
import { toast } from "sonner";
import { IPelanggan , IRiwayatPesanan} from "../interfaces";
import { fetcher } from "../utils";
import useSWR from "swr";

export const getAllPelanggan =  () => {
  let { data, error, isLoading } = useSWR(
    `${process.env.BASE_API}/pelanggan`,
    fetcher
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    data = [
      {
        id_pelanggan: 1,
        nama: "Sasa",
        tgl_lahir: "1990-01-01",
        status: "1",
        akun:{
          email: "sasa@gmail.com",
        }
      },
    ];
  }

  return {
    data: data,
    isLoading,
    isError: error,
  };
};


export const getPelangganById = (id: number) => {
  let { data, error, isLoading , isValidating} = useSWR(
    `${process.env.BASE_API}/pelanggan/${id}`,
    fetcher
  );
  

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    data = [
      {
        id_pelanggan: 1,
        nama: "Sasa",
        tgl_lahir: "1990-01-01",
        status: "1",
        akun:{
          email: "sasa@gmail.com",
        },
        riwayatPesanan:[],
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


// export const getRiwayatPesananPelangganById = (id: number) => {
//       let { data, error, isLoading , isValidating} = useSWR(
//         `${process.env.BASE_API}/pelanggan/${id}`,
//         fetcher
//       );
    
//       if (!isLoading && error) {
//         toast.warning("Database is down! Switching to fakeAPI");
//         data = [
//       {
//         id_pesanan: "24.02.101",
//         id_metode_pembayaran: 1,
//         id_pelanggan: 1,
//         tgl_order: "2024-04-10",
//         total_diskon_poin: 0,
//         total_pesanan: 150000,
//         total_setelah_diskon: 150000,
//         total_dibayarkan: 150000,
//         total_tip: 0,
//         verified_at: "2024-04-10",
//         id_status_pesanan: 1,
//         id_karyawan: 1,
//         status: "Selesai",
//         produk: [
//           {
//             id: 1,
//             nama: "Lapis Legit",
//             harga: 10000,
//             jumlah: 10,
//           },
//           {
//             id: 2,
//             nama: "Lapis Surabaya",
//             harga: 12000,
//             jumlah: 1,
//           },
//         ],
//       }
//     ];

//     return {
//       data: data,
//       isLoading,
//       isError: error,
//       isValidating,
//     };
//   }
// };


export const deletePelangganById = async (id: number) => {
  try {
    const response = await axios.delete(
      `${process.env.BASE_API}/pelanggan/${id}`
      );
  
      // ✅ Use toast when its done
      toast.success("Berhasil menghapus data...");
  
      return response;
  } catch (error) {
    toast.error("Oh no! Terjadi kesalahan saat menghapus data pelanggan...");
  }
};
