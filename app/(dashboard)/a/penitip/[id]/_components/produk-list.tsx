"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/product";
import { IPenitip, IProduk } from "@/lib/interfaces";
// import ProdukCard from "./produk-card";

const ProdukList = ({ penitip }: { penitip?: IPenitip }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter produk berdasarkan nama
  const filteredProducts = penitip?.produk!.filter((product) =>
    product.nama.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <p className="text-h3">
        Seluruh Produk Dari {penitip?.nama} ({filteredProducts!.length})
      </p>

      {/* Input untuk melakukan pencarian berdasarkan nama produk */}
      <Input
        placeholder="Cari berdasarkan nama produk..."
        className="max-w-sm"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Daftar produk */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-5">
        {filteredProducts!.length > 0 ? (
          filteredProducts!.map((product: IProduk, index: number) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <p className="text-slate-500">Produk tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default ProdukList;
