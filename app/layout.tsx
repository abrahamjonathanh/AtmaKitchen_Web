import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Indicator from "@/components/indicator";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AtmaKitchen | Beranda",
  description: "AtmaKitchen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster richColors />
        <Indicator />
        {children}
      </body>
    </html>
  );
}
