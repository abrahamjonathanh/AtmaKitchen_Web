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

// {
//     "email": "budi3@gmail.com",
//     "password": "r12345",
//     "nama": "Boedi",
//     "telepon": "0812581725",
//     "gaji_harian": 150000,
//     "alamat": "Jln. Kaliurang",
//     "id_role": 3
// }
export type IKaryawanPUT = {
  email: string;
  password?: string;
  nama: string;
  telepon: string;
  gaji_harian: string;
  bonus?: string;
  alamat: string;
  id_role: string;
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
