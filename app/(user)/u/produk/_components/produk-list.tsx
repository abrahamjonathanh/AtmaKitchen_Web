import { ProductCard } from "@/components/product";
import { IProduk } from "@/lib/interfaces";
import Brownies from "@/public/products/Brownies.png";
import React from "react";

export default function ProdukList({ searchQuery }: { searchQuery?: string }) {
  const dummys: IProduk[] = [
    {
      id_produk: 1,
      nama: "Lapis Legit",
      ukuran: "20x20 cm",
      harga_jual: "500000",
      id_kategori: "1",
      id_penitip: null,
      kapasitas: "20",
      image: [
        {
          image:
            "https://atmaimages.blob.core.windows.net/images/Choco creamy latte.png",
        },
      ],
    },
    {
      id_produk: 2,
      nama: "Lapis Legit",
      ukuran: "10x20 cm",
      harga_jual: "500000",
      id_kategori: "1",
      id_penitip: null,
      kapasitas: "20",
      image: [
        {
          image:
            "https://atmaimages.blob.core.windows.net/images/Choco creamy latte.png",
        },
      ],
    },
    {
      id_produk: 3,
      nama: "Lapis Legit",
      ukuran: "10x20 cm",
      harga_jual: "500000",
      id_kategori: "1",
      id_penitip: null,
      kapasitas: "20",
      image: [
        {
          image:
            "https://atmaimages.blob.core.windows.net/images/Choco creamy latte.png",
        },
      ],
    },
    {
      id_produk: 1,
      nama: "Lapis Legit",
      ukuran: "20x20 cm",
      harga_jual: "500000",
      id_kategori: "1",
      id_penitip: null,
      kapasitas: "20",
      image: [
        {
          image:
            "https://atmaimages.blob.core.windows.net/images/Choco creamy latte.png",
        },
      ],
    },
    {
      id_produk: 2,
      nama: "Lapis Legit",
      ukuran: "10x20 cm",
      harga_jual: "500000",
      id_kategori: " 1",
      id_penitip: null,
      kapasitas: "20",
      image: [
        {
          image:
            "https://atmaimages.blob.core.windows.net/images/Choco creamy latte.png",
        },
      ],
    },
    {
      id_produk: 3,
      nama: "Lapis Legit",
      ukuran: "10x20 cm",
      harga_jual: "500000",
      id_kategori: "1",
      id_penitip: null,
      kapasitas: "20",
      image: [
        {
          image:
            "https://atmaimages.blob.core.windows.net/images/Choco creamy latte.png",
        },
      ],
    },
  ];

  const filteredDummys = searchQuery?.trim()
    ? dummys.filter((data) =>
        data.nama
          .concat(data.ukuran.toLowerCase().toString())
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : dummys;

  return (
    <>
      {filteredDummys.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredDummys.map((data, index) => (
            <ProductCard
              product={data}
              key={index}
              className={"shadow-none hover:shadow-sm"}
            />
          ))}
        </div>
      ) : (
        <>
          <p>
            Kami tidak dapat menemukan hasil untuk{" "}
            <span className="font-bold capitalize">
              &quot;{searchQuery}&quot;
            </span>
            . Menampilkan hasil untuk seluruh produk.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {dummys.map((data, index) => (
              <ProductCard
                product={data}
                key={index}
                className={"shadow-none hover:shadow-sm"}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
