"use client";
import { UserProductWrapper } from "@/components/user-wrapper";
import React from "react";
import ProdukList from "./_components/produk-list";

export default function page() {
  return (
    <UserProductWrapper>
      <div className="flex flex-col gap-4">
        <p className="text-h4">Menampilkan: Seluruh Produk</p>
        <ProdukList />
      </div>
    </UserProductWrapper>
  );
}
