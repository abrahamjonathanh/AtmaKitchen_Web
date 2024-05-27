"use client";
import { UserWrapper } from "@/components/user-wrapper";
import Image from "next/image";
import React, { useState } from "react";
import ProductQuantityCard from "../../produk/_components/produk-quantity-card";
import ProductRecommendation from "@/app/(user)/_components/recommendation-product";
import { toIndonesiaDate, toRupiah } from "@/lib/utils";
import Loading from "@/components/ui/loading";
import { getHampersById } from "@/lib/api/hampers";

export default function page({ params }: { params: { id: number } }) {
  const [quantity, setQuantity] = useState("1");

  const { data, isLoading } = getHampersById(params.id);

  return (
    <UserWrapper className="space-y-8">
      {data && !isLoading ? (
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Image display */}
          <div className="flex h-max flex-col gap-4 sm:flex-row md:h-max md:flex-col lg:h-max lg:w-1/4">
            <Image
              src={data.image}
              alt={data.nama}
              className="aspect-square h-full max-h-96 w-full rounded-lg object-cover sm:w-4/5 md:w-full"
              width={"500"}
              height={"500"}
            />
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
              {/* <div>
              {data.detail_stok!.map((stock, index: number) => (
                <div
                  key={index}
                  className="flex justify-between gap-4 space-y-2 text-slate-500"
                >
                  <p>{toIndonesiaDate(stock.tanggal)}</p>
                  <p>{stock.stok} Stok</p>
                </div>
              ))}
            </div> */}
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
      ) : (
        <Loading />
      )}
      <ProductRecommendation />
    </UserWrapper>
  );
}
