import { StaticImageData } from "next/image";

// @Nathan
export type IKaryawan = {
  id_karyawan?: number;
  email?: string;
  password?: string;
  nama: string;
  alamat: string;
  telepon: string;
  gaji_harian: string;
  bonus?: string;
  id_role?: string;
  id_akun?: string;
  akun: {
    email?: string;
    password?: string;
    id_akun?: string;
    id_role?: string;
    role: {
      id_role: string;
      role: string;
    };
  };
};

export type IResep = {
  id_produk: string;
  nama?: string;
  ukuran?: string;
  images?: {
    image: string;
  }[];
  bahan_baku: {
    id_bahan_baku: string;
    nama?: string;
    satuan?: string;
    jumlah: string;
  }[];
};

export type IProfileAdmin = {
  id: string;
  nama: string;
  alamat: string;
  email: string;
  telepon: string;
  password?: string;
  confirmPassword?: string;
};

export type IJabatan = {
  id_role: string | number;
  role: string;
  akun_count?: number;
};

export type IJarakKirim = {
  id_pesanan: string;
  pengiriman: {
    id_pengiriman: string;
    nama: string;
    alamat: string;
    jarak: number;
    harga: number;
    telepon: string;
    label?: string;
  };
  status_pesanan_latest: {
    status: string;
  };
};

export type IPengiriman = {
  id_pengiriman: string;
  nama: string;
  alamat: string;
  jarak: number;
  harga: number;
  telepon: string;
  label?: string;
};

// @yori
export type IProduk = {
  id_produk: string | number;
  nama: string;
  id_kategori?: string;
  id_penitip?: string | null;
  kapasitas: string;
  ukuran: string;
  harga_jual: string;
  thumbnail?: {
    image: string;
  };
  image?:
    | {
        image: string;
      }[]
    | StaticImageData[];
  link?: string;
  terjual?: string;
  detail_stok?: {
    tanggal: string;
    stok: string;
  }[];
};

export type IHampers = {
  id_produk_hampers: string | number;
  nama: string;
  harga_jual: string;
  image?: HTMLImageElement | StaticImageData;
  detail_produk?: {
    id_produk: string;
    nama?: string;
    ukuran?: string;
  }[];
};

export type IAkun = {
  nama: string;
  email: string;
  password: string;
  nama_alamat: string;
  alamat: string;
  telepon: string;
};

export type IPemesananBahanBaku = {
  id_pemesanan_bahan_baku?: string;
  id_bahan_baku?: string;
  nama?: string;
  satuan: "gr" | "ml" | "butir" | "buah";
  jumlah: string;
  harga_beli: string;
  total?: string;
  created_at?: string;
};

// @Jeha
export type IBahanBaku = {
  id_bahan_baku?: number;
  nama: string;
  stok: string;
  stok_minimum?: string;
  satuan: string;
  updated_at: string; //terkahir diperbaharui
};

export type IPenitip = {
  id_penitip?: string;
  nama: string;
  alamat: string;
  telepon: string;
  created_at: string; //tanggal bergabung
  produk?: IProduk[];
  produk_titipan_count?: number;
};

export type IPengeluaranLainnya = {
  id_pengeluaran_lainnya: number;
  karyawan: IKaryawan;
  nama: string;
  biaya: string;
  tanggal: string;
  kategori: string;
};

export interface IPelanggan {
  id_pelanggan: number;
  akun: {
    id_akun?: string;
    email: string;
  };
  nama: string;
  tgl_lahir: string;
  status: string;
}

export interface IPesanan {
  id_pesanan: string;
  id_metode_pembayaran?:
    | number
    | {
        id_metode_pembayaran?: number;
        nama: string;
      };
  id_pelanggan: number;
  tgl_order: string;
  total_diskon_poin: number;
  total_pesanan: number;
  total_setelah_diskon: number;
  total_dibayarkan: string;
  total_tip: number;
  verified_at: string | null;
  jenis_pengiriman?: string;
  pelanggan?: {
    id_pelanggan: number;
    id_akun?: number;
    nama: string;
    tgl_lahir?: string;
    telepon?: string;
  };
  status_pesanan?: {
    id_status_pesanan: number;
    id_karyawan: number;
    status: string;
  }[];
  pengiriman?: {
    id_pengiriman: number;
    id_kategori_pengiriman?: number;
    id_kurir?: number;
    jarak?: number;
    harga: number;
    nama: string;
    telepon: string;
    alamat: string;
  };
  created_at?: string;
}

export interface IRiwayatPesanan extends IPesanan {
  id_status_pesanan: number;
  id_karyawan: number;
  status: string;
  produk: {
    id: number;
    nama: string;
    harga: number;
    images: HTMLImageElement | StaticImageData;
    jumlah: number;
  }[];
}
