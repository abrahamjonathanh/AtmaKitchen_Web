"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UserWrapper } from "@/components/user-wrapper";
import { IProduk } from "@/lib/interfaces";
import { toIndonesiaDate, toRupiah } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import ProductQuantityCard from "../_components/produk-quantity-card";
import ProductRecommendation from "@/app/(user)/_components/recommendation-product";

export default function page() {
  const [indexImageSelected, setIndexImageSelected] = useState(0);
  const [quantity, setQuantity] = useState("1");

  const data: IProduk = {
    id_produk: 1,
    image: [
      { image: "https://atmaimages.blob.core.windows.net/images/Brownies.png" },
      {
        image:
          "https://atmaimages.blob.core.windows.net/images/Choco creamy latte.png",
      },
      {
        image:
          "https://atmaimages.blob.core.windows.net/images/Choco creamy latte.png",
      },
      {
        image:
          "https://atmaimages.blob.core.windows.net/images/Choco creamy latte.png",
      },
      {
        image:
          "https://atmaimages.blob.core.windows.net/images/Choco creamy latte.png",
      },
    ],
    thumbnail: {
      image: "https://atmaimages.blob.core.windows.net/images/Brownies.png",
    },
    harga_jual: "300000",
    kapasitas: "20",
    nama: "Lapis Surabaya",
    ukuran: "20x20 cm",
    terjual: "10",
    detail_stok: [
      { tanggal: "2024-04-27T14:11:40Z", stok: "20" },
      { tanggal: "2024-04-28T14:11:40Z", stok: "19" },
      { tanggal: "2024-04-29T14:11:40Z", stok: "16" },
      { tanggal: "2024-05-01T14:11:40Z", stok: "20" },
      { tanggal: "2024-05-02T14:11:40Z", stok: "20" },
      { tanggal: "2024-05-03T14:11:40Z", stok: "20" },
      { tanggal: "2024-05-04T14:11:40Z", stok: "20" },
    ],
  };

  return (
    <UserWrapper className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Image display */}
        <div className="flex h-max flex-col gap-4 sm:flex-row md:h-max md:flex-col lg:h-max lg:w-1/4">
          <Image
            src={(data.thumbnail as { image: string }).image}
            alt={data.nama}
            className="aspect-square h-full max-h-96 w-full rounded-lg object-cover sm:w-4/5 md:w-full"
            width={"500"}
            height={"500"}
          />
          <ScrollArea className="h-max sm:h-96 sm:w-1/5 md:h-max md:w-full lg:h-full">
            <div className="flex gap-2 sm:flex-col sm:gap-4 md:flex-row lg:h-max ">
              {data.image!.map((image, index) => (
                <Image
                  src={(image as { image: string }).image}
                  alt={`${(image as { image: string }).image}-${index}`}
                  key={index}
                  className={`aspect-square h-max w-1/5 cursor-pointer rounded-lg object-cover sm:w-full md:w-1/5 ${
                    index == indexImageSelected
                      ? "brightness-100"
                      : "brightness-50"
                  } transition hover:brightness-100`}
                  width={"250"}
                  height={"250"}
                  onClick={() => {
                    setIndexImageSelected(index);
                  }}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        {/* Content */}
        <div className="space-y-4 lg:w-5/12">
          <div className="space-y-2">
            <p className="text-h3">
              {data.nama} {data.ukuran}
            </p>
            <p>Terjual {data.terjual}</p>
          </div>
          <p className="text-h2">{toRupiah(parseInt(data.harga_jual))}</p>
          <div className="space-y-3">
            <p className="text-h4">Kapasitas Stok</p>
            <div>
              {data.detail_stok!.map((stock, index) => (
                <div
                  key={index}
                  className="flex justify-between gap-4 space-y-2 text-slate-500"
                >
                  <p>{toIndonesiaDate(stock.tanggal)}</p>
                  <p>{stock.stok} Stok</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quantity Card */}
        <ProductQuantityCard
          quantity={quantity}
          onQuantityChange={(value) => {
            const newQuantity = Math.max(
              1,
              parseInt(quantity) + value,
            ).toString();
            setQuantity(newQuantity);
          }}
        />
      </div>
      <ProductRecommendation />
    </UserWrapper>
  );
}
