"use client";
import React, { useEffect, useState } from "react";
import { toRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProductCart from "./_components/product_cart";
import { deleteKaryawanById } from "@/lib/api/karyawan";
import ProductRecommendation from "../../_components/recommendation-product";
import UserWrapper from "@/components/user-wrapper";
import { useTitle } from "@/lib/hooks";

export default function page() {
  useTitle("AtmaKitchen | Keranjang");
  const [isLoading, setIsLoading] = useState(false);
  const getCarts = async () => {
    try {
      setIsLoading(true);
      //   const response = await deleteKaryawanById(1);
      //   setProducts(response?.data.data.carts || []);
      //   console.log("Carts:", response?.data.data);
    } catch (error: any) {
      console.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCarts();
  }, []);
  return (
    <UserWrapper className="bg-slate-50 space-y-8">
      <div className="space-y-4 relative ">
        <p className="text-h4">Keranjang (4)</p>
        <div className="flex gap-4 flex-col-reverse lg:flex-row">
          {/* Cart list */}
          <div className="space-y-2 lg:w-2/3">
            {[
              {
                id: 1,
                product: { id: 2, name: "Brownies", price: 150000 },
                quantity: 1,
              },
              {
                id: 1,
                product: { id: 2, name: "Brownies", price: 150000 },
                quantity: 1,
              },
            ].map((data, index) => (
              <ProductCart key={index} {...data} onRefresh={() => getCarts()} />
            ))}
          </div>
          {/* Pricing */}
          <div className="border border-slate-200 lg:w-1/3 h-max rounded-lg p-4 pb-6 space-y-2 sticky bg-white">
            <p className="text-h4">Ringkasan Belanja</p>
            <div className="flex justify-between items-center">
              <p className="text-slate-500">Total Belanja</p>
              <p className="text-h4">{toRupiah(15000000)}</p>
            </div>
            <Separator />
            <Button variant={"default"} className="w-full">
              Beli
            </Button>
          </div>
        </div>
      </div>
      <ProductRecommendation />
    </UserWrapper>
  );
}
