"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UserWrapper } from "@/components/user-wrapper";
import { toIndonesiaDate, toRupiah } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import ProductQuantityCard from "../_components/produk-quantity-card";
import ProductRecommendation from "@/app/(user)/_components/recommendation-product";
import {
  getProdukById,
  getStokByIdAndDate,
  getReadyStockByIdAndDate,
} from "@/lib/api/produk";
import Loading from "@/components/ui/loading";
import { createKeranjang } from "@/lib/api/keranjang";
import { useCurrentUserStore } from "@/lib/state/user-store";
import { getCurrentUserWithToken } from "@/lib/api/auth";
import Cookies from "js-cookie";

export default function Page({ params }: { params: { id: number } }) {
  const { currentUser, refresh } = useCurrentUserStore();
  const [indexImageSelected, setIndexImageSelected] = useState(0);
  const [quantity, setQuantity] = useState("1");

  const { data, isLoading } = getProdukById(params.id);

  const date = new Date();
  date.setDate(date.getDate());
  const stok = getStokByIdAndDate(params.id, date.toDateString());
  const ready_stock = getReadyStockByIdAndDate(params.id, date.toDateString());

  const onQuantityChangeHandler = (value: any) => {
    const newQuantity = Math.max(1, parseInt(quantity) + value).toString();
    setQuantity(newQuantity);
  };

  const onSubmitHandler = async () => {
    const data = {
      id_pelanggan: currentUser?.id_pelanggan,
      id_produk: params.id,
      jumlah: quantity,
    };

    const response = await createKeranjang(data);

    if (response?.status === 200 || response?.status === 201) {
      const token = Cookies.get("token");
      const user = await getCurrentUserWithToken(token!);
      refresh(user?.data.data);
    }
  };

  return (
    <UserWrapper className="space-y-8">
      {!isLoading &&
      data &&
      stok.data &&
      !stok.isLoading &&
      ready_stock.data &&
      !ready_stock.isLoading ? (
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Image display */}
          <div className="flex h-max flex-col gap-4 sm:flex-row md:h-max md:flex-col lg:h-max lg:w-1/4">
            <Image
              src={data?.thumbnail?.image}
              alt={data.nama}
              className="aspect-square h-full max-h-96 w-full rounded-lg object-cover sm:w-4/5 md:w-full"
              width={"500"}
              height={"500"}
              priority
            />
            <ScrollArea className="h-max sm:h-96 sm:w-1/5 md:h-max md:w-full lg:h-full">
              <div className="flex gap-2 sm:flex-col sm:gap-4 md:flex-row lg:h-max ">
                {data.images!.map((image: { image: string }, index: number) => (
                  <Image
                    src={image.image}
                    alt={data.nama}
                    key={index}
                    className={`aspect-square h-max w-1/5 cursor-pointer rounded-lg object-cover sm:w-full md:w-1/5 ${
                      index === indexImageSelected
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
            </div>
            <p className="text-h2">{toRupiah(parseInt(data.harga_jual))}</p>
            <div className="space-y-3">
              <p className="text-h4">Kapasitas Stok</p>
              <div className="flex justify-between gap-4 space-y-2 text-slate-500">
                <p>Ready Stock</p>
                <p>{ready_stock.data.ready_stock} Stok</p>
              </div>
              <div>
                {stok.data.map((stock: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between gap-4 space-y-2 text-slate-500"
                  >
                    <p>{toIndonesiaDate(stock.date)}</p>
                    <p>{stock.stock} Stok</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quantity Card */}
          <ProductQuantityCard
            quantity={quantity}
            onQuantityChange={onQuantityChangeHandler}
            onSubmit={onSubmitHandler}
          />
        </div>
      ) : (
        <Loading />
      )}
      <ProductRecommendation />
    </UserWrapper>
  );
}
