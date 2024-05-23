"use client";
import { ProductCard } from "@/components/product";
import Loading from "@/components/ui/loading";
import { getAllHampers } from "@/lib/api/hampers";
import { getAllProduk } from "@/lib/api/produk";
import { IHampers, IProduk } from "@/lib/interfaces";
import React from "react";

export default function ProdukList({ searchQuery }: { searchQuery?: string }) {
  const { data: produkData, isLoading: produkLoading } = getAllProduk();
  const { data: hampersData, isLoading: hampersLoading } = getAllHampers();

  const isLoading = produkLoading || hampersLoading;

  const combinedData = [...(produkData || []), ...(hampersData || [])];

  const filteredDummys = searchQuery?.trim()
    ? combinedData.filter((data: IProduk | IHampers) =>
        data.nama
          .concat((data as IProduk).ukuran?.toLowerCase() ?? "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      )
    : combinedData;

  return (
    <>
      {!isLoading ? (
        filteredDummys.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredDummys.map((data: IProduk | IHampers, index: number) => (
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
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {combinedData.map((data: IProduk | IHampers, index: number) => (
                <ProductCard
                  product={data}
                  key={index}
                  className={"shadow-none hover:shadow-sm"}
                />
              ))}
            </div>
          </>
        )
      ) : (
        <Loading />
      )}
    </>
  );
}
