import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BadgeProps } from "@/components/ui/badge";
import Cookies from "js-cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utils for SWR
export const fetcher = async (url: string) => {
  const token = Cookies.get("token");

  const response = await axios.get(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response.data.data;
};

// Utils for convert number into Rupiah currency
export const toRupiah = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);
};

export const toThousand = (number: number) => {
  return number.toLocaleString("id-ID", { minimumFractionDigits: 0 });
};

// Utils for convert datetime into indonesian date format
export const toIndonesiaDate = (
  ISODate: string,
  options: {
    day?: "numeric" | "2-digit";
    month?: "numeric" | "2-digit" | "narrow" | "short" | "long";
    year?: "numeric" | "2-digit";
    hour?: "numeric" | "2-digit";
    minute?: "numeric" | "2-digit";
    second?: "numeric" | "2-digit";
  } = { day: "numeric", month: "short", year: "numeric" },
) => {
  return new Date(ISODate).toLocaleDateString("id-ID", options);
};

export const categoryBadge = (value: number | string): BadgeProps => {
  const roleBadges: {
    code: number;
    variant: "violet" | "sky" | "lime";
    label: "Kue" | "Minuman" | "Roti" | string;
  }[] = [
    { code: 1, variant: "violet", label: "Kue" },
    { code: 2, variant: "sky", label: "Roti" },
    { code: 3, variant: "lime", label: "Minuman" },
  ];

  const roleBadge = roleBadges.find((badge) => badge.code == value);

  return roleBadge
    ? { variant: roleBadge.variant, children: roleBadge.label }
    : { variant: "violet", children: "Unknown Category" };
};

export const statusPesananBadge = (value: string): BadgeProps => {
  const statusBadges: {
    code:
      | "Menunggu pembayaran"
      | "Menunggu ongkir"
      | "Dibatalkan otomatis"
      | "Sudah dibayar"
      | "Pembayaran valid"
      | "Ditolak"
      | "Diterima"
      | "Diproses"
      | "Siap dipickup"
      | "Sedang dikirim kurir"
      | "Sudah dipickup"
      | "Selesai"
      | "Unknown";
    variant:
      | "lime"
      | "emerald"
      | "sky"
      | "violet"
      | "fuchsia"
      | "rose"
      | "gray"
      | "success"
      | "alert"
      | "failed";
    icon?: React.ReactNode;
  }[] = [
    { code: "Menunggu pembayaran", variant: "alert" },
    { code: "Menunggu ongkir", variant: "alert" },
    { code: "Dibatalkan otomatis", variant: "gray" },
    { code: "Sudah dibayar", variant: "sky" },
    { code: "Pembayaran valid", variant: "sky" },
    { code: "Diterima", variant: "lime" },
    { code: "Ditolak", variant: "failed" },
    { code: "Diproses", variant: "violet" },
    { code: "Siap dipickup", variant: "emerald" },
    { code: "Sedang dikirim kurir", variant: "emerald" },
    { code: "Sudah dipickup", variant: "emerald" },
    { code: "Selesai", variant: "success" },
  ];

  const statusBadge = statusBadges.find((badge) => badge.code == value);
  return statusBadge
    ? { variant: statusBadge.variant, children: statusBadge.code }
    : { variant: "violet", children: "Unknown" };
};
