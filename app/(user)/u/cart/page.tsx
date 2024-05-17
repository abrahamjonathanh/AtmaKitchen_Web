"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductCart from "./_components/product_cart";
import ProductRecommendation from "../../_components/recommendation-product";
import { useTitle } from "@/lib/hooks";
import { UserWrapper } from "@/components/user-wrapper";
import ProductSummaryCard from "./_components/product-summary-card";
import {
  getCartsByCustomerId,
  updateQuantityInCustomerCart,
} from "@/lib/api/pesanan";
import Loading from "@/components/ui/loading";
import { IDetailKeranjang } from "@/lib/interfaces";
import { getCurrentUser } from "@/lib/api/auth";

export default function page() {
  useTitle("AtmaKitchen | Keranjang");
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = getCurrentUser();

  const customerCart = getCartsByCustomerId(1);

  const updateQuantityInCustomerCartHandler = async ({
    newQuantity,
    idProduk,
    idDetailKeranjang,
  }: {
    newQuantity: number;
    idProduk: number;
    idDetailKeranjang: number;
  }) => {
    try {
      setIsLoading(true);
      console.log(customerCart.data![0].id_keranjang, newQuantity, idProduk);
      const response = await updateQuantityInCustomerCart(idDetailKeranjang, {
        id_produk: idProduk,
        jumlah: newQuantity,
      });
      customerCart.mutate();
      console.log(response);
    } catch (error: any) {
      console.error(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserWrapper className="space-y-8 bg-slate-50">
      <div className="flex flex-col-reverse gap-4 lg:flex-row">
        <div className="relative space-y-8 lg:w-2/3">
          <div className="space-y-4">
            <p className="text-h4">Pengiriman</p>
            <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-4">
              <p className=" font-medium text-slate-500">Alamat Pengiriman</p>
              <div>
                <p className="text-h4">John Petra</p>
                <p>
                  Jln. Babarsari No. 1, Depok, Kab. Slemak, D.I. Yogyakarta,
                  125712863
                </p>
              </div>
              <Button variant={"outline"}>Ganti Alamat</Button>
            </div>
          </div>
          <div className="space-y-4">
            {/* TODO: Update keranjang API harusnya 1 orang cuman ada 1 keranjang */}
            {!customerCart.isLoading &&
            !customerCart.error &&
            !customerCart.isValidating &&
            customerCart.data ? (
              <>
                <p className="text-h4">
                  Keranjang ({customerCart.data[0].detail_keranjang.length})
                </p>
                <div>
                  {/* Cart list */}
                  <div className="space-y-2">
                    {customerCart.data[0].detail_keranjang.map(
                      (data: IDetailKeranjang, index: number) => (
                        <ProductCart
                          key={index}
                          data={data}
                          onRefresh={updateQuantityInCustomerCartHandler}
                          isLoading={isLoading}
                        />
                      ),
                    )}
                  </div>
                </div>
              </>
            ) : (
              <Loading />
            )}
          </div>
        </div>
        {/* Pricing */}
        <ProductSummaryCard isEditable />
      </div>
      <ProductRecommendation />
    </UserWrapper>
  );
}
