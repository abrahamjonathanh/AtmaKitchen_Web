"use client";
import { Button } from "@/components/ui/button";
import { toRupiah } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import Brownies from "@/public/products/Brownies.png";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import { IDetailKeranjang } from "@/lib/interfaces";

export default function ProductCart({
  data,
  onRefresh,
  isLoading = false,
}: {
  data: IDetailKeranjang;
  onRefresh?: ({
    newQuantity,
    idProduk,
    idDetailKeranjang,
  }: {
    newQuantity: number;
    idProduk: number;
    idDetailKeranjang: number;
  }) => void;
  isLoading: boolean;
}) {
  const onQuantityChange = async (value: number) => {
    try {
      const newQuantity = Math.max(1, data.jumlah + value);

      onRefresh!({
        newQuantity,
        idProduk: parseInt(data.produk.id_produk),
        idDetailKeranjang: parseInt(data.id_detail_keranjang),
      });
    } catch (error: any) {
      console.error(error.response?.data?.message);
    } finally {
    }
  };

  return (
    <div className="flex w-full gap-3.5 rounded-lg border border-slate-200 bg-white p-4 ">
      <Image
        src={Brownies}
        alt="Brownies"
        className="aspect-square max-w-20 rounded"
      />
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="overflow line-clamp-1 font-medium">
            {data.produk.nama} {data.produk.ukuran}
          </p>
          <p className="text-large">
            {toRupiah(parseInt(data.produk.harga_jual.toString()))}
          </p>
        </div>
        <div className="flex w-full items-center justify-end gap-4">
          <Button variant={"ghost"} className="text-slate-500">
            <Trash2 size={"16"} />
          </Button>
          <div className="flex items-center gap-0">
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => onQuantityChange(-1)}
              disabled={isLoading}
              className="hover:bg-transparent"
            >
              {isLoading ? <Loading iconOnly /> : <Minus size={"16"} />}
            </Button>
            <Input
              type="number"
              defaultValue={data.jumlah}
              className="h-8 max-w-14 overflow-x-hidden text-black"
            />
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => onQuantityChange(1)}
              disabled={isLoading}
              className="hover:bg-transparent"
            >
              {isLoading ? <Loading iconOnly /> : <Plus size={"16"} />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
