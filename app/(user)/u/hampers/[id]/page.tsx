"use client";
import { UserWrapper } from "@/components/user-wrapper";
import { toIndonesiaDate, toRupiah } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import ProductQuantityCard from "../_components/produk-quantity-card";
import ProductRecommendation from "@/app/(user)/_components/recommendation-product";
import { getHampersById, getStokByIdAndDate } from "@/lib/api/hampers";
import Loading from "@/components/ui/loading";
import { createKeranjang } from "@/lib/api/keranjang";
import { useCurrentUserStore } from "@/lib/state/user-store";
import { IDetailHampers } from "@/lib/interfaces";
import Cookies from "js-cookie";
import { getCurrentUserWithToken } from "@/lib/api/auth";

export default function page({ params }: { params: { id: number } }) {
  const { currentUser, refresh } = useCurrentUserStore();
  const [quantity, setQuantity] = useState("1");

  const { data, isLoading } = getHampersById(params.id);

  const date = new Date();
  date.setDate(date.getDate());
  const stok = getStokByIdAndDate(params.id, date.toDateString());

  const onQuantityChangeHandler = (value: any) => {
    const newQuantity = Math.max(1, parseInt(quantity) + value).toString();
    setQuantity(newQuantity);
  };

  const onSubmitHandler = async () => {
    const data = {
      id_pelanggan: currentUser?.id_pelanggan,
      id_produk_hampers: params.id,
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
      {!isLoading && data && stok.data && !stok.isLoading ? (
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Image display */}
          <div className="flex h-max flex-col gap-4 sm:flex-row md:h-max md:flex-col lg:h-max lg:w-1/4">
            <Image
              src={data?.image}
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
            </div>
            <p className="text-h2">{toRupiah(parseInt(data.harga_jual))}</p>
            <div className="space-y-3">
              <p className="text-h4">Isi Paket</p>
              <div className="space-y-2">
                {data.detail_hampers.map(
                  (hampers: IDetailHampers, index: number) => (
                    <div
                      className="flex items-center justify-between text-slate-500"
                      key={index}
                    >
                      <p>
                        {hampers.produk.nama} {hampers.produk.ukuran}
                      </p>{" "}
                      <p>1 Buah</p>
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-h4">Kapasitas Stok</p>
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
