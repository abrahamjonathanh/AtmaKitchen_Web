"use client";
import { UserProductWrapper } from "@/components/user-wrapper";
import React from "react";
import ProdukList from "./_components/produk-list";
import { useCurrentUserStore } from "@/lib/state/user-store";

export default function page() {
  const { currentUser } = useCurrentUserStore();

  console.log(currentUser);
  return (
    <UserProductWrapper>
      <div className="flex flex-col gap-4">
        <p className="text-h4">Menampilkan: Seluruh Produk</p>
        <ProdukList />
      </div>
    </UserProductWrapper>
  );
}
