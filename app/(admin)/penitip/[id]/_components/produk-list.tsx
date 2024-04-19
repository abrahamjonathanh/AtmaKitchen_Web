"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/product";
// import ProdukCard from "./produk-card";

const ProdukList = ({
  data,
}: {
  data: {
    nama: string;
    kapasitas: number;
    harga_jual: string;
    id_penitip?: string;
    thumbnail: {
      image: string;
    };
  }[];
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter produk berdasarkan nama
  const filteredProducts = data.filter((product) =>
    product.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <p className="text-h3">
        Seluruh Produk Dari Celine ({filteredProducts.length})
      </p>

      {/* Input untuk melakukan pencarian berdasarkan nama produk */}
      <Input
        placeholder="Cari berdasarkan nama produk..."
        className="max-w-sm"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Daftar produk */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            // <p>{product.thumbnail.image}</p>
            <ProductCard
              key={index}
              name={product.nama}
              price={product.harga_jual}
              image={product.thumbnail.image}
            />
          ))
        ) : (
          <p className="text-slate-500">Produk tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default ProdukList;
