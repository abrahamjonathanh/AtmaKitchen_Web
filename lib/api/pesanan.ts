"use client";
import axios from "axios";
import { toast } from "sonner";
import { IPesanan, IKeranjang, IRiwayatPesanan } from "../interfaces";
import useSWR from "swr";
import { fetcher } from "../utils";
import { axiosInstance } from "../axiosInstance";

export const updateConfirmation = async (id: number, data: IPesanan) => {
  try {
    const response = await axios.put(
      `${process.env.BASE_API}/pesanan/verify/${id}`,
      data,
    );

    toast.success("Berhasil konfirmasi!");

    return response;
  } catch (error: any) {
    toast.error("Terjadi kesalahan saat konfirmasi...");
    throw error;
  }
};

export const getAllRiwayatPesananByPelangganId = async (
  idPelanggan: number,
) => {
  try {
    const response = await axios.get(
      `/api/pelanggan/${idPelanggan}/riwayat-pesanan`,
    );
    toast.success("Berhasil mendapatkan riwayat pesanan");
    return response.data as IRiwayatPesanan[];
  } catch (error) {
    toast.error("Oh no! Terjadi kesalahan saat mengambil riwayat pesanan.");
    throw error;
  }
};

export const getAllPesanan = () => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${process.env.BASE_API}/pesanan`,
    fetcher,
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
  }

  return {
    data,
    isLoading,
    error,
    isValidating,
    mutate,
  };
};

export const getAllPesananNeedConfirmPayment = () => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${process.env.BASE_API}/pesanan/confirmpayments`,
    fetcher,
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
  }

  return {
    data,
    isLoading,
    error,
    isValidating,
    mutate,
  };
};

export const getAllPesananPaymentVerified = () => {
  let { data, error, isLoading, isValidating, mutate } = useSWR(
    `${process.env.BASE_API}/pesanan/paymentverified`,
    fetcher,
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
  }

  return {
    data,
    isLoading,
    error,
    isValidating,
    mutate,
  };
};

export const getPesananById = (id: string) => {
  const { data, isLoading, error, isValidating } = useSWR(
    `${process.env.BASE_API}/pesanan/${id}`,
    fetcher,
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");

    const data = {
      id_pesanan: "17.04.24.001",
      id_metode_pembayaran: {
        id_metode_pembayaran: 2,
        nama: "Cash",
      },
      id_pelanggan: 2,
      tgl_order: "2024-04-04",
      total_diskon_poin: 0,
      total_pesanan: 120000,
      total_setelah_diskon: 120000,
      total_dibayarkan: 150000,
      total_tip: 30000,
      verified_at: "2024-03-20 08:47:18",
      accepted_at: null,
      jenis_pengiriman: "kurir toko",
      pelanggan: {
        id_pelanggan: 2,
        id_akun: 2,
        nama: "Alyce Boyer I",
        tgl_lahir: "2013-04-24",
        telepon: 92358718256,
      },
      status_pesanan: [
        {
          id_status_pesanan: 2,
          id_pesanan: "17.03.24.002",
          id_karyawan: 1,
          status: "selesai",
          created_at: "2024-04-13T15:09:07.000000Z",
        },
      ],
      pengiriman: {
        id_pengiriman: 2,
        id_pesanan: "17.03.24.002",
        id_kategori_pengiriman: 3,
        id_kurir: 10,
        jarak: 11,
        harga: 20000,
        nama: "Giovanni Shields IV",
        telepon: "045361757409605",
        alamat: "5064 Goyette Forks Suite 145 Bernierport, MO 60154",
        created_at: "2024-04-13T15:09:06.000000Z",
      },
      created_at: "2024-04-13T15:09:06.000000Z",
    };
    return { data, isLoading, error, isValidating };
  }

  return { data, isLoading, error, isValidating };
};

export const getCartsByCustomerId = (customerId: number, date: any) => {
  const { data, isLoading, error, isValidating, mutate } = useSWR(
    `${process.env.BASE_API}/keranjang/${customerId}/${date}`,
    fetcher,
  );

  if (!isLoading && error) {
    const data: IKeranjang[] = [
      {
        id_keranjang: "1",
        detail_keranjang: [
          {
            id_detail_keranjang: "7",
            id_keranjang: "1",
            id_produk: "2",
            jumlah: 1,
            produk: {
              id_produk: "1",
              harga_jual: "250000",
              kapasitas: "20",
              nama: "Tester",
              ukuran: "20x20cm",
            },
          },
        ],
      },
    ];
    return { data, isLoading, error, isValidating, mutate };
  }

  return { data, isLoading, error, isValidating, mutate };
};

export const updateQuantityInCustomerCart = async (
  cartId: number,
  data: any,
) => {
  try {
    const response = await axiosInstance().put(
      `/detail-keranjang/${cartId}`,
      data,
    );

    toast.success(response.data.message);

    return response;
  } catch (error) {
  } finally {
  }
};

export const createPembayaranByIdPesanan = async (
  id_pesanan: String,
  data: any,
) => {
  try {
    const response = await axiosInstance().put(
      `/pesanan/confirmpayments/${id_pesanan}`,
      data,
    );

    if (response.status === 200 || response.status === 201) {
      toast.success(response.data.message);
    }

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getAllPesananInProcess = () => {
  let { data, error, isLoading, isValidating } = useSWR(
    `${process.env.BASE_API}/pesanan/in-process`,
    fetcher,
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    data = [
      {
        id_pesanan: "17.04.24.001",
        id_metode_pembayaran: {
          id_metode_pembayaran: 2,
          nama: "Cash",
        },
        id_pelanggan: 2,
        tgl_order: "2024-04-04",
        total_diskon_poin: 0,
        total_pesanan: 120000,
        total_setelah_diskon: 120000,
        total_dibayarkan: 150000,
        total_tip: 30000,
        verified_at: "2024-03-20 08:47:18",
        accepted_at: null,
        jenis_pengiriman: "kurir toko",
        pelanggan: {
          id_pelanggan: 2,
          id_akun: 2,
          nama: "Alyce Boyer I",
          tgl_lahir: "2013-04-24",
          telepon: null,
        },
        status_pesanan: [
          {
            id_status_pesanan: 2,
            id_pesanan: "17.03.24.002",
            id_karyawan: 1,
            status: "selesai",
            created_at: "2024-04-13T15:09:07.000000Z",
          },
        ],
        pengiriman: {
          id_pengiriman: 2,
          id_pesanan: "17.03.24.002",
          id_kategori_pengiriman: 3,
          id_kurir: 10,
          jarak: 11,
          harga: 20000,
          nama: "Giovanni Shields IV",
          telepon: "045361757409605",
          alamat: "5064 Goyette Forks Suite 145 Bernierport, MO 60154",
          created_at: "2024-04-13T15:09:06.000000Z",
        },
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

// export const getAllPesananRejected = () => {
//   let { data, error, isLoading, isValidating } = useSWR(
//     `${process.env.BASE_API}/pesanan/tolak`,
//     fetcher,
//   );

//   if (!isLoading && error) {
//     toast.warning("Database is down! Switching to fakeAPI");
//     data = [
//       {
//         id_pesanan: "17.04.24.001",
//         id_metode_pembayaran: {
//           id_metode_pembayaran: 2,
//           nama: "Cash",
//         },
//         id_pelanggan: 2,
//         tgl_order: "2024-04-04",
//         total_diskon_poin: 0,
//         total_pesanan: 120000,
//         total_setelah_diskon: 120000,
//         total_dibayarkan: 150000,
//         total_tip: 30000,
//         verified_at: "2024-03-20 08:47:18",
//         accepted_at: null,
//         jenis_pengiriman: "kurir toko",
//         pelanggan: {
//           id_pelanggan: 2,
//           id_akun: 2,
//           nama: "Alyce Boyer I",
//           tgl_lahir: "2013-04-24",
//           telepon: null,
//         },
//         status_pesanan: [
//           {
//             id_status_pesanan: 2,
//             id_pesanan: "17.03.24.002",
//             id_karyawan: 1,
//             status: "selesai",
//             created_at: "2024-04-13T15:09:07.000000Z",
//           },
//         ],
//         pengiriman: {
//           id_pengiriman: 2,
//           id_pesanan: "17.03.24.002",
//           id_kategori_pengiriman: 3,
//           id_kurir: 10,
//           jarak: 11,
//           harga: 20000,
//           nama: "Giovanni Shields IV",
//           telepon: "045361757409605",
//           alamat: "5064 Goyette Forks Suite 145 Bernierport, MO 60154",
//           created_at: "2024-04-13T15:09:06.000000Z",
//         },
//       },
//     ];
//   }

//   return {
//     data: data,
//     isLoading,
//     isError: error,
//     isValidating,
//   };
// };

export const terimaPesananById = async (id: string) => {
  try {
    const response = await axiosInstance().post(`/pesanan/${id}/terima`);
    // toast.success("Pesanan berhasil diterima!");
    if (response.status === 500) {
      toast.warning("Database is down! Switching to fakeAPI");

      const response = await axios.post(`https://fakestoreapi.com/products/`);

      return response;
    }

    toast.success(response?.data?.message);

    const ambilBahanBakuResponse = await axiosInstance().get(
      `/pesanan/${id}/bahan-baku`,
    );
    toast.info(ambilBahanBakuResponse?.data?.message);

    return ambilBahanBakuResponse.data;
  } catch (error: any) {
    toast.error("Terjadi kesalahan saat menerima pesanan...");
    throw error;
  }
};
export const fetchBahanBaku = async (id: string) => {
  try {
    const response = await axiosInstance().get(`/pesanan/${id}/bahan-baku`);
    return response.data; // Return the data received from the API call
  } catch (error) {
    console.error("Error fetching bahan baku:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const tolakPesananById = async (id: string) => {
  try {
    const response = await axiosInstance().post(`/pesanan/${id}/tolak`);
    if (response.status === 500) {
      toast.warning("Database is down! Switching to fakeAPI");

      const response = await axios.post(`https://fakestoreapi.com/products/`);

      return response;
    }

    toast.success(response?.data?.message);
  } catch (error: any) {
    toast.error("Terjadi kesalahan saat menolak pesanan...");
    throw error;
  }
};

export const uploadPaymentProof = async (
  id_pelanggan: string,
  id_pesanan: string,
  file: File,
) => {
  try {
    const response = await axiosInstance().post(
      `/pelanggan/${id_pelanggan}/pesanan/${id_pesanan}/upload-bukti-pembayaran`,
      { bukti_pembayaran: file },
      {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure correct content type
        },
      },
    );

    if (response.status !== 200) {
      throw new Error("File upload failed");
    }

    toast.success(response?.data?.message);
  } catch (error) {
    toast.error("Terjadi kesalahan...");
    throw new Error("File upload failed: " + error);
  }
};

export const getAllPesananConfirmation = async () => {
  let { data, error, isLoading, isValidating } = useSWR(
    `${process.env.BASE_API}/pesanan/perlu-dikonfirmasi`,
    fetcher,
  );

  if (!isLoading && error) {
    toast.warning("Database is down! Switching to fakeAPI");
    data = [
      {
        id_pesanan: "17.04.24.001",
        id_metode_pembayaran: {
          id_metode_pembayaran: 2,
          nama: "Cash",
        },
        id_pelanggan: 2,
        tgl_order: "2024-04-04",
        total_diskon_poin: 0,
        total_pesanan: 120000,
        total_setelah_diskon: 120000,
        total_dibayarkan: 150000,
        total_tip: 30000,
        verified_at: "2024-03-20 08:47:18",
        accepted_at: null,
        jenis_pengiriman: "kurir toko",
        pelanggan: {
          id_pelanggan: 2,
          id_akun: 2,
          nama: "Alyce Boyer I",
          tgl_lahir: "2013-04-24",
          telepon: null,
        },
        status_pesanan: [
          {
            id_status_pesanan: 2,
            id_pesanan: "17.03.24.002",
            id_karyawan: 1,
            status: "selesai",
            created_at: "2024-04-13T15:09:07.000000Z",
          },
        ],
        pengiriman: {
          id_pengiriman: 2,
          id_pesanan: "17.03.24.002",
          id_kategori_pengiriman: 3,
          id_kurir: 10,
          jarak: 11,
          harga: 20000,
          nama: "Giovanni Shields IV",
          telepon: "045361757409605",
          alamat: "5064 Goyette Forks Suite 145 Bernierport, MO 60154",
          created_at: "2024-04-13T15:09:06.000000Z",
        },
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

export const createPesanan = async (data: any) => {
  try {
    // Boiler template for fetching api
    // You can use `${process.env.BASE_API}/YOUR_ROUTE` for fetching real api
    console.log(data);
    const response = await axiosInstance().post(`/pesanan`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
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

export const getAllPendapatanBulananByYear = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `${process.env.BASE_API}/pesanan/laporan`,
    fetcher,
  );

  return { data, error, isLoading, isValidating, mutate };
};
