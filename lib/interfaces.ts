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
  akun?: IAkun;
  created_at?: string;
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
  thumbnail?: { image: string };
};

export type IProfileAdmin = {
  id: string;
  nama: string;
  alamat: string;
  telepon: string;
  password?: string;
  confirmPassword?: string;
  akun?: IAkun;
};

export type IJabatan = {
  id_role: string | number;
  role: string;
  akun_count?: number;
};

export type IJarakKirim = {
  id_pesanan: string;
  pengiriman: IPengiriman;
  status_pesanan_latest: {
    status: string;
  };
};

export type IPengiriman = {
  id_pesanan?: string;
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
  id_produk: string;
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
  images?: { image: string }[];
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
  detail_hampers?: IDetailHampers[];
};

export type IDetailHampers = {
  id_detail_hampers: string;
  id_produk_hampers?: string;
  id_produk?: string;
  produk: IProduk;
};

export type IAkun = {
  id_akun?: string;
  email: string;
  password?: string;
  id_role: string;
  profile_image?: string;
  email_verified_at?: string | null;
  remember_token?: string | null;
  role?: {
    id_role: string;
    role: string;
  };
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
  stok_minumum?: string;
  satuan: string;
  updated_at: string; //terkahir diperbaharui
  nama_bahan_baku?: string;
  total_kekurangan?: number;
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
  id_karyawan?: string;
  karyawan: IKaryawan;
  nama: string;
  biaya: string;
  tanggal: string;
  kategori: string;
};

export interface IPelanggan {
  id_pelanggan: string;
  akun?: IAkun;
  nama: string;
  tgl_lahir: string;
  status?: string;
  deleted_at?: string;
  alamat?: IAlamat[];
  pesanan?: IPesananv2[];
}

export interface IAlamat {
  id_alamat: string;
  id_pelanggan: string;
  label: string;
  nama: string;
  alamat: string;
  telepon: string;
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
  nama?: string;
  bukti_pembayaran?: string;
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
  detail_pesanan: {
    id_detail_pesanan: number;
    id_produk?: number;
    id_produk_hampers?: number;
    jumlah?: number;
    produk: {
      id_produk: number;
      nama: string;
      harga_jual: string;
      images?: HTMLImageElement | StaticImageData;
      jumlah: number;
      thumbnail: {
        image?: HTMLImageElement | StaticImageData | string;
      };
    };
  }[];
}

export interface IDetailPesanan {
  id_detail_pesanan: string;
  id_produk?: string | null;
  id_produk_hampers?: string | null;
  kategori?: string;
  nama_produk: string;
  harga: string;
  jumlah: string;
  produk?: IProduk;
  hampers?: IHampers;
}

export interface IPesananv2 {
  id_pesanan: string;
  id_metode_pembayaran: string;
  id_pelanggan: string;
  pelanggan: IPelanggan;
  tgl_order: string;
  total_diskon_poin: string;
  total_pesanan: string;
  total_setelah_diskon: string;
  total_dibayarkan?: string | null;
  total_tip?: string | null;
  jenis_pengiriman: string;
  verified_at?: string;
  accepted_at?: string | null;
  created_at?: string;
  bukti_pembayaran?: string;
  detail_pesanan?: IDetailPesanan[];
  status_pesanan_latest?: IStatusPesanan;
  pengiriman?: IPengiriman;
  points?: {
    poin: number;
    is_double_poin: boolean;
  };
}

export interface IStatusPesanan {
  id_status_pesanan: string;
  id_pesanan?: string;
  id_karyawan?: string;
  status: string;
  created_at: string;
}

export interface IDetailKeranjang {
  id_detail_keranjang: string;
  id_keranjang?: string;
  id_produk?: string;
  id_produk_hampers?: string;
  produk?: IProduk;
  hampers?: IHampers;
  jumlah: number;
  ready_stock?: number;
}

export interface IKeranjang {
  id_keranjang: string;
  detail_keranjang: IDetailKeranjang[];
}

export interface IMetodePembayaran {
  id_metode_pembayaran: number;
  nama: string;
}
