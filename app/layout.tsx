import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Indicator from "@/components/indicator";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AtmaKitchen",
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
        <Indicator />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
