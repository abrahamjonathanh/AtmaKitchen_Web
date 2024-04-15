// @Nathan
export type IKaryawan = {
  id_karyawan?: number;
  nama: string;
  alamat: string;
  telepon: string;
  gaji_harian: string;
  bonus?: string;
  id_role?: string;
  akun: {
    id_akun?: string;
    role: {
      id_role: string;
      role: string;
    };
  };
};

export type IResep = {
  id: string;
  nama?: string;
  bahan_baku: {
    id: string;
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
  id: string | number;
  role: string;
};

export type IJarakKirim = {
  id: string | number;
  nama: string;
  alamat: {
    id: string;
    nama: string;
    alamat: string;
    telepon: string;
  };
  jarak?: string;
  harga?: string;
  status: string;
};

// @Jeha
export type IBahanBaku = {
  id?: number;
  nama: string;
  stok: string;
  stok_minimum?: string;
  satuan: string;
  updated_at: string; //terkahir diperbaharui
};

export type IPenitip = {
  id?: string;
  nama: string;
  alamat: string;
  telepon: string;
  created_at: string; //tanggal bergabung
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
  id_metode_pembayaran: number;
  id_pelanggan: number;
  tgl_order: string;
  total_diskon_poin: number;
  total_pesanan: number;
  total_setelah_diskon: number;
  total_dibayarkan: number;
  total_tip: number;
  verified_at: string | null;
}

export interface IRiwayatPesanan extends IPesanan {
  id_status_pesanan: number;
  id_karyawan: number;
  status: string;
  produk: {
    id: number;
    nama: string;
    harga: number;
  }[];
}

