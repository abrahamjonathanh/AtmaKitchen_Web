export type IKaryawan = {
  id?: number;
  nama: string;
  alamat: string;
  telepon: string;
  gaji_harian: string;
  bonus?: string;
  id_role?: string;
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
