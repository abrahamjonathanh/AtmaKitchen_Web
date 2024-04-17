"use client";
import { Button } from "@/components/ui/button";
import { toRupiah } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import Brownies from "@/public/products/Brownies.png";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";

interface Props {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    // id_image: {
    //   image: string;
    // };
  };
  quantity: number;
  onRefresh?: () => void;
}

export default function ProductCart(props: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const onQuantityChange = async (value: number) => {
    try {
      setIsLoading(true);
      const newQuantity = Math.max(1, props.quantity + value);
      //   const response = await UpdateCartQuantityById(props.id, {
      //     quantity: newQuantity,
      //   });
      //   props.onRefresh!();
      console.log(newQuantity);
    } catch (error: any) {
      console.error(error.response?.data?.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
    // setData((prev) => ({ ...prev, quantity: newQuantity }));
    // console.log(data);
  };
  return (
    <div className="p-4 rounded-lg border border-slate-200 w-full flex gap-3.5 bg-white ">
      <Image
        src={Brownies}
        alt="Brownies"
        className="aspect-square rounded max-w-20"
      />
      <div className="w-full flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="font-medium overflow line-clamp-1">Lapis Surabaya</p>
          <p className="text-large">{toRupiah(600000)}</p>
        </div>
        <div className="w-full flex justify-end items-center gap-4">
          <Button variant={"ghost"} className="text-slate-500">
            <Trash2 size={"16"} />
          </Button>
          <div className="flex gap-0 items-center">
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
              defaultValue={props.quantity}
              className="max-w-14 h-8 overflow-x-hidden"
              disabled={isLoading}
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
