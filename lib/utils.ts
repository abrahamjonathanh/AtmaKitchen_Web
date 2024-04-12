import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
  } = { day: "numeric", month: "short", year: "numeric" }
) => {
  return new Date(ISODate).toLocaleDateString("id-ID", options);
};
