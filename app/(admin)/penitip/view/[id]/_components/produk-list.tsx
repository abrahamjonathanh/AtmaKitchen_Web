"use client";

import LapisLegit from "@/public/products/Lapis legit.png";
import LapisSurabaya from "@/public/products/Lapis surabaya.png";
import Brownies from "@/public/products/Brownies.png";
import Mandarin from "@/public/products/Mandarin.png";
import Spikoe from "@/public/products/Spikoe.png";
import RotiSosis from "@/public/products/Roti sosis.png";
// Import komponen yang diperlukan
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import ProdukCard from "./produk-card";

// Data produk
const products = [
  { id: 1, title: "Lapis Legit", image: LapisLegit, price: 150000 },
  { id: 2, title: "Lapis Surabaya", image: LapisSurabaya, price: 150000 },
  { id: 3, title: "Brownies", image: Brownies, price: 150000 },
  { id: 4, title: "Mandarin", image: Mandarin, price: 150000 },
  { id: 5, title: "Spikoe", image: Spikoe, price: 150000 },
  { id: 6, title: "Roti Sosis", image: RotiSosis, price: 15000 },
];

const ProdukList = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State untuk nilai pencarian

  // Filter produk berdasarkan nama
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <p className="font-semibold">Produk Titipan ({filteredProducts.length})</p>

      {/* Input untuk melakukan pencarian berdasarkan nama produk */}
      <Input
        placeholder="Cari berdasarkan nama produk..."
        className="max-w-sm"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Daftar produk */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProdukCard key={product.id} title={product.title} image={product.image} id={0} price={product.price} />
          ))
        ) : (
          <p className="text-slate-500">Produk tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default ProdukList;
